import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

import {
  TGetCollectionRef,
  TGetDocument,
  TGetDocumentRef,
  TSetDocument,
  TUpdateDocument,
  TAddDocument,
  TDeleteObject,
  TGetCollectionSize,
  TMapQueryParams,
} from "./firestore.protocol";
import { app } from "../app/app.utils";

const db = getFirestore(app);

export const getCollectionRef: TGetCollectionRef = (collectionName) =>
  collection(db, collectionName);

export const getDocumentRef: TGetDocumentRef = (
  collectionName,
  docUid
) => doc(getCollectionRef(collectionName), docUid);

export const getDocument: TGetDocument = (collectionName, docUid) =>
  getDoc(getDocumentRef(collectionName, docUid));

export const setDocument: TSetDocument = (collectionName, docUid, docData) =>
  setDoc(getDocumentRef(collectionName, docUid), docData);

export const updateDocument: TUpdateDocument = (
  collectionName,
  docUid,
  docData
) =>
  updateDoc(
    getDocumentRef(collectionName, docUid),
    docData as Partial<unknown>
  );

export const addDocument: TAddDocument = (collectionName, docData) =>
  addDoc(getCollectionRef(collectionName), docData as Partial<unknown>);

export const deleteFile: TDeleteObject = (urlPhoto) =>
  deleteObject(ref(getStorage(), urlPhoto));

export const getCollectionSize: TGetCollectionSize = (
  collectionName,
  callback,
  queryParams
) =>
  onSnapshot(
    queryParams
      ? query(getCollectionRef(collectionName), ...mapQueryParams(queryParams))
      : getCollectionRef(collectionName),
    (snapshot) => callback(snapshot.size),
    (error) => error.name
  );

export const mapQueryParams: TMapQueryParams = ({
  conditions,
  ordinateBy,
  pagination,
}) => {
  const query = [];

  conditions?.forEach((condition) =>
    query.push(where(condition[0], condition[1], condition[2]))
  );

  ordinateBy?.forEach(({ label, orderDirection }) =>
    query.push(orderBy(label, orderDirection))
  );

  if (pagination) {
    query.push(limit(pagination.limit));
    if (pagination.targetDocument)
      query.push(
        pagination.target === "next"
          ? startAfter(pagination.targetDocument)
          : startAt(pagination.targetDocument)
      );
  }

  return query;
};
