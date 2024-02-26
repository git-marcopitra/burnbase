import type { UploadMetadata } from "firebase/storage";

export type TGetPathStorage = (url: string) => string;

export type TDeleteObject = (url: string) => Promise<void>;

export type TAddFile = (
  file: File,
  path: string,
  options?: { metadata?: UploadMetadata; prefix?: string; suffix?: string }
) => Promise<string>;
