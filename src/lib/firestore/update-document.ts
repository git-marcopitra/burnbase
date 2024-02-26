import { updateDoc } from "firebase/firestore";
import type { TUpdateDocument } from "./firestore.protocol";
import getDocumentRef from "./get-document-ref";

const updateDocument: TUpdateDocument = (collectionName, docUid, docData) =>
  updateDoc(
    getDocumentRef(collectionName, docUid),
    docData as Partial<unknown>
  );

export default updateDocument;
