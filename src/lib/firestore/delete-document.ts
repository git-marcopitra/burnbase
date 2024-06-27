import { deleteDoc } from "firebase/firestore";
import getCollectionRef from "./get-collection-ref";
import type {  TDeleteDocument } from "./firestore.protocol";
import getDocumentRef from "./get-document-ref";

const deleteDocument: TDeleteDocument = (collectionName, docId) =>
  deleteDoc(getDocumentRef(collectionName, docId));

export default deleteDocument;
