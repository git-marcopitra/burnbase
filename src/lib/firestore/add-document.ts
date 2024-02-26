import { addDoc } from "firebase/firestore";
import getCollectionRef from "./get-collection-ref";
import type { TAddDocument } from "./firestore.protocol";

const addDocument: TAddDocument = (collectionName, docData) =>
  addDoc(getCollectionRef(collectionName), docData as Partial<unknown>);

export default addDocument;
