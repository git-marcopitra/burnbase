import { getAuth } from "firebase/auth";
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

import { getApp } from "firebase/app";
import {
  TGetCollection,
  TGetDocument,
  TGetDocumentReference,
  TSetDocument,
  TUpdateDocument,
  TAddDocument,
  TDeleteObject,
  TGetCollectionSize,
  TMapQueryParams,
  TGetPathStorage,
} from "./firestore.protocol";

export const app = getApp("burnbase");

const db = getFirestore(app);

export const auth = getAuth(app);

export const bucket = getStorage(app);

export const getCollection: TGetCollection = (collectionName) =>
  collection(db, collectionName);

export const getDocument: TGetDocument = (collectionName, docUid) =>
  getDoc(doc(getCollection(collectionName), docUid));

export const getDocumentReference: TGetDocumentReference = (
  collectionName,
  docUid
) => doc(getCollection(collectionName), docUid);

export const setDocument: TSetDocument = (collectionName, docUid, docData) =>
  setDoc(getDocumentReference(collectionName, docUid), docData);

export const updateDocument: TUpdateDocument = (
  collectionName,
  docUid,
  docData
) =>
  updateDoc(
    getDocumentReference(collectionName, docUid),
    docData as Partial<unknown>
  );
export const addDocument: TAddDocument = (collectionName, docData) =>
  addDoc(getCollection(collectionName), docData as Partial<unknown>);

export const deleteFile: TDeleteObject = (urlPhoto) =>
  deleteObject(ref(getStorage(), urlPhoto));

export const getCollectionSize: TGetCollectionSize = (
  collectionName,
  callback,
  queryParams
) =>
  onSnapshot(
    queryParams
      ? query(getCollection(collectionName), ...mapQueryParams(queryParams))
      : getCollection(collectionName),
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

export const getPathStorageFromUrl: TGetPathStorage = (url) => {
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;

  const imagePath: string = url.replace(baseUrl, "").replace(/%2F/g, "/");

  return imagePath.slice(0, imagePath.indexOf("?"));
};
