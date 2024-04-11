import { onSnapshot, query } from "firebase/firestore";
import { mapQueryParams } from "./firestore.utils";
import type { IQueryParams, WithUid } from "./firestore.protocol";
import getCollectionRef from "./get-collection-ref";

const getAllData =
  <T>(collectionName: string) =>
  (queryParams?: IQueryParams): Promise<ReadonlyArray<WithUid<T>>> =>
    new Promise((resolve, rejected) =>
      onSnapshot(
        !queryParams
          ? getCollectionRef(collectionName)
          : query(
              getCollectionRef(collectionName),
              ...mapQueryParams(queryParams)
            ),
        (snapshot) => {
          const data = snapshot.docs.map(
            (doc) => ({ uid: doc.id, ...doc.data() } as WithUid<T>)
          );
          resolve(data);
        },
        (error) => rejected(error)
      )
    );

export default getAllData;
