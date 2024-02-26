import { doc } from "firebase/firestore";
import type { TGetDocumentRef } from "./firestore.protocol";
import getCollectionRef from "./get-collection-ref";

const getDocumentRef: TGetDocumentRef = (collectionName, docUid) =>
  doc(getCollectionRef(collectionName), docUid);

export default getDocumentRef;
