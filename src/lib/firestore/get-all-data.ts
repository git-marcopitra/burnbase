import { onSnapshot, query } from "firebase/firestore";
import { getCollection, mapQueryParams } from "./utils";
import { IQueryParams } from "./firestore.protocol";

const getAllData =
  <T>(collectionName: string) =>
  (queryParams?: IQueryParams): Promise<ReadonlyArray<T>> =>
    new Promise((resolve, rejected) =>
      onSnapshot(
        !queryParams
          ? getCollection(collectionName)
          : query(
              getCollection(collectionName),
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
