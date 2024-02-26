import { onSnapshot, query } from "firebase/firestore";
import { mapQueryParams } from "./firestore.utils";
import type { IQueryParams } from "./firestore.protocol";
import getCollectionRef from "./get-collection-ref";

const getAllData =
  <T>(collectionName: string) =>
  (queryParams?: IQueryParams): Promise<ReadonlyArray<T>> =>
    new Promise((resolve, rejected) =>
      onSnapshot(
        !queryParams
          ? getCollectionRef(collectionName)
          : query(
              getCollectionRef(collectionName),
              ...mapQueryParams(queryParams)
            ),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data() as T);
          resolve(data);
        },
        (error) => rejected(error)
      )
    );

export default getAllData;
