import { deleteObject, ref, getStorage } from "firebase/storage";
import type { TDeleteObject } from "./storage.protocol";

const deleteFile: TDeleteObject = (url) => deleteObject(ref(getStorage(), url));

export default deleteFile;
