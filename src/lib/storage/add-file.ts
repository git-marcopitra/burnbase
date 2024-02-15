import unikey from "unikey";

import { bucket } from "../firestore/utils";
import {
  UploadMetadata,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const addFile = (
  file: File,
  path: string,
  options?: { metadata?: UploadMetadata; prefix?: string; suffix?: string }
): Promise<string> =>
  new Promise((resolve, reject) => {
    const storageRef = ref(
      bucket,
      `${path}/${options?.prefix ?? ""}${unikey()}${options?.suffix ?? ""}`
    );

    const uploadFile = uploadBytesResumable(
      storageRef,
      file,
      options?.metadata
    );

    uploadFile.on(
      "state_changed",
      () => {},
      (error) => reject(error),
      () => getDownloadURL(uploadFile.snapshot.ref).then(resolve)
    );
  });

export default addFile;
