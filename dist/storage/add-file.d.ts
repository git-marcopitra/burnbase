import { UploadMetadata } from "firebase/storage";
declare const addFile: (file: File, path: string, options: {
    metadata?: UploadMetadata;
    prefix?: string;
    suffix?: string;
}) => Promise<unknown>;
export default addFile;
