import { deleteDoc } from "firebase/firestore";

import type { TDeleteDocument } from "./firestore.protocol";
import getDocumentRef from "./get-document-ref";

const deleteDocument: TDeleteDocument = (collectionName, docId) =>
  deleteDoc(getDocumentRef(collectionName, docId));

export default deleteDocument;
