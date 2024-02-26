import { onSnapshot, query } from "firebase/firestore";

import getCollectionRef from "./get-collection-ref";
import { mapQueryParams } from "./firestore.utils";
import type { TGetCollectionSize } from "./firestore.protocol";

const getCollectionSize: TGetCollectionSize = (collectionName, queryParams) =>
  new Promise((resolve, reject) => {
    onSnapshot(
      queryParams
        ? query(
            getCollectionRef(collectionName),
            ...mapQueryParams(queryParams)
          )
        : getCollectionRef(collectionName),
      (snapshot) => resolve(snapshot.size),
      reject
    );
  });

export default getCollectionSize;
