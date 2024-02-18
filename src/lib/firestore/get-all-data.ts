import { onSnapshot, query } from "firebase/firestore";
import { getCollectionRef, mapQueryParams } from "./firestore.utils";
import { IQueryParams } from "./firestore.protocol";

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
