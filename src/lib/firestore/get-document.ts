import { getDoc } from "firebase/firestore";
import { TGetDocument } from "./firestore.protocol";
import getDocumentRef from "./get-document-ref";

const getDocument: TGetDocument = (collectionName, docUid) =>
  getDoc(getDocumentRef(collectionName, docUid));

export default getDocument;
