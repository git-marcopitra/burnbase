import { deleteObject, ref, getStorage } from "firebase/storage";
import type { TDeleteObject } from "./storage.protocol";
import { bucket } from "./storage.utils";

const deleteFile: TDeleteObject = (url) => deleteObject(ref(bucket, url));

export default deleteFile;
