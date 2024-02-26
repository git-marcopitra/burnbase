import { collection } from "firebase/firestore";
import { firestore } from "./firestore.utils";
import type { TGetCollectionRef } from "./firestore.protocol";

const getCollectionRef: TGetCollectionRef = (collectionName) =>
  collection(firestore, collectionName);

export default getCollectionRef;
