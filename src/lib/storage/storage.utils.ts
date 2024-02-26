import { getStorage } from "firebase/storage";
import { app } from "../app/app.utils";
import type { TGetPathStorage } from "./storage.protocol";

export const bucket = getStorage(app);

export const getPathStorageFromUrl: TGetPathStorage = (url) => {
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;

  const imagePath: string = url.replace(baseUrl, "").replace(/%2F/g, "/");

  return imagePath.slice(0, imagePath.indexOf("?"));
};
