import { onSnapshot, query } from "firebase/firestore";

import { getCollection, mapQueryParams } from "./utils";

import { IQueryParams, TGenericCollection } from "./firestore.protocol";

const getGenericCollection = <T>(
  collectionName: string,
  queryParams?: IQueryParams
): TGenericCollection<T> => {
  const genericCollection = getCollection(collectionName);

  return new Promise((resolve, rejected) =>
    onSnapshot(
      queryParams
        ? query(genericCollection, ...mapQueryParams(queryParams))
        : genericCollection,
      (snapshot) => {
        const data: Array<T> = [];
        //
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
