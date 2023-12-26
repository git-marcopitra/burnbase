import { TGetCollection, TGetDocument, TGetDocumentReference, TSetDocument, TUpdateDocument, TAddDocument, TDeleteObject, TGetCollectionSize, TMapQueryParams, TGetPathStorage } from "./firestore.protocol";
export declare const app: import("firebase/app").FirebaseApp;
export declare const auth: import("firebase/auth").Auth;
export declare const bucket: import("firebase/storage").FirebaseStorage;
export declare const getCollection: TGetCollection;
export declare const getDocument: TGetDocument;
export declare const getDocumentReference: TGetDocumentReference;
export declare const setDocument: TSetDocument;
export declare const updateDocument: TUpdateDocument;
export declare const addDocument: TAddDocument;
export declare const deleteFile: TDeleteObject;
export declare const getCollectionSize: TGetCollectionSize;
export declare const mapQueryParams: TMapQueryParams;
export declare const getPathStorageFromUrl: TGetPathStorage;
