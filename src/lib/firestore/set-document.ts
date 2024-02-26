import { setDoc } from "firebase/firestore";
import type { TSetDocument } from "./firestore.protocol";
import getDocumentRef from "./get-document-ref";

const setDocument: TSetDocument = (collectionName, docUid, docData) =>
  setDoc(getDocumentRef(collectionName, docUid), docData);

export default setDocument;
