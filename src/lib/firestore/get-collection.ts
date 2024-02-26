import { onSnapshot, query } from "firebase/firestore";

import { mapQueryParams } from "./firestore.utils";

import type { IQueryParams, TGenericCollection } from "./firestore.protocol";
import getCollectionRef from "./get-collection-ref";

const getGenericCollection = <T>(
  collectionName: string,
  queryParams?: IQueryParams
): TGenericCollection<T> => {
  const genericCollectionRef = getCollectionRef(collectionName);

  return new Promise((resolve, rejected) =>
    onSnapshot(
      queryParams
        ? query(genericCollectionRef, ...mapQueryParams(queryParams))
        : genericCollectionRef,
      (snapshot) => {
        const data: Array<T> = [];

        snapshot.forEach((doc) =>
          data.push(
            Object.defineProperty(doc.data(), "uid", { value: doc.id }) as T
          )
        );
        resolve(data as ReadonlyArray<T>);
      },
      (error) => rejected(error.name)
    )
  );
};

export default getGenericCollection;
