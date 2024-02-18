import { onSnapshot, query } from "firebase/firestore";
import { getCollectionRef, mapQueryParams } from "./firestore.utils";
import { TPageGetter } from "./firestore.protocol";

const getPagination: TPageGetter =
  (collectionName, dataCallback) => (queryParams) =>
    new Promise((resolve, rejected) => {
      onSnapshot(
        !queryParams
          ? getCollectionRef(collectionName)
          : query(
              getCollectionRef(collectionName),
              ...mapQueryParams(queryParams)
            ),
        (snapshot) =>
          resolve({
            data: snapshot.docs.map((doc) => ({
              ...doc.data(),
              uid: doc.id,
              ...dataCallback?.(doc),
            })),
            page: queryParams?.pagination?.page || 1,
            next: () =>
              getPagination(
                collectionName,
                dataCallback
              )({
                ...queryParams,
                ...(queryParams?.pagination && {
                  pagination: {
                    target: "next",
                    limit: queryParams.pagination.limit,
                    firstItem: !queryParams.pagination.firstItem
                      ? [snapshot.docs[0]]
                      : [...queryParams.pagination.firstItem, snapshot.docs[0]],
                    page: queryParams.pagination.page
                      ? queryParams.pagination.page + 1
                      : 2,
                    targetDocument: snapshot.docs[snapshot.size - 1],
                  },
                }),
              }),
            previous: () =>
              getPagination(
                collectionName,
                dataCallback
              )({
                ...queryParams,
                ...(queryParams?.pagination && {
                  pagination: {
                    target: "previous",
                    firstItem: queryParams.pagination.firstItem!.slice(0, -1),
                    targetDocument: queryParams.pagination.firstItem
                      ?.slice(-1)
                      .shift(),
                    page: queryParams.pagination.page
                      ? queryParams.pagination.page - 1
                      : 1,
                    limit: queryParams.pagination.limit,
                  },
                }),
              }),
          }),
        (error) => rejected(error)
      );
    });

export default getPagination;
