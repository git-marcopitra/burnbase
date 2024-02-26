import unikey from "unikey";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { bucket } from "./storage.utils";
import type { TAddFile } from "./storage.protocol";

const addFile: TAddFile = (file, path, options) =>
  new Promise((resolve, reject) => {
    const prefix = options?.prefix ?? "";
    const suffix = options?.suffix ?? "";
    const storageRef = ref(bucket, `${path}/${prefix}${unikey()}${suffix}`);

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
