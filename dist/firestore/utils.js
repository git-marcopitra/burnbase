"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathStorageFromUrl = exports.mapQueryParams = exports.getCollectionSize = exports.deleteFile = exports.addDocument = exports.updateDocument = exports.setDocument = exports.getDocumentReference = exports.getDocument = exports.getCollection = exports.bucket = exports.auth = exports.app = void 0;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const app_1 = require("firebase/app");
exports.app = (0, app_1.getApp)();
const db = (0, firestore_1.getFirestore)(exports.app);
exports.auth = (0, auth_1.getAuth)(exports.app);
exports.bucket = (0, storage_1.getStorage)(exports.app);
const getCollection = (collectionName) => (0, firestore_1.collection)(db, collectionName);
exports.getCollection = getCollection;
const getDocument = (collectionName, docUid) => (0, firestore_1.getDoc)((0, firestore_1.doc)((0, exports.getCollection)(collectionName), docUid));
exports.getDocument = getDocument;
const getDocumentReference = (collectionName, docUid) => (0, firestore_1.doc)((0, exports.getCollection)(collectionName), docUid);
exports.getDocumentReference = getDocumentReference;
const setDocument = (collectionName, docUid, docData) => (0, firestore_1.setDoc)((0, exports.getDocumentReference)(collectionName, docUid), docData);
exports.setDocument = setDocument;
const updateDocument = (collectionName, docUid, docData) => (0, firestore_1.updateDoc)((0, exports.getDocumentReference)(collectionName, docUid), docData);
exports.updateDocument = updateDocument;
const addDocument = (collectionName, docData) => (0, firestore_1.addDoc)((0, exports.getCollection)(collectionName), docData);
exports.addDocument = addDocument;
const deleteFile = (urlPhoto) => (0, storage_1.deleteObject)((0, storage_1.ref)((0, storage_1.getStorage)(), urlPhoto));
exports.deleteFile = deleteFile;
const getCollectionSize = (collectionName, callback, queryParams) => (0, firestore_1.onSnapshot)(queryParams
    ? (0, firestore_1.query)((0, exports.getCollection)(collectionName), ...(0, exports.mapQueryParams)(queryParams))
    : (0, exports.getCollection)(collectionName), (snapshot) => callback(snapshot.size), (error) => error.name);
exports.getCollectionSize = getCollectionSize;
const mapQueryParams = ({ conditions, ordinateBy, pagination, }) => {
    const query = [];
    conditions === null || conditions === void 0 ? void 0 : conditions.forEach((condition) => query.push((0, firestore_1.where)(condition[0], condition[1], condition[2])));
    ordinateBy === null || ordinateBy === void 0 ? void 0 : ordinateBy.forEach(({ label, orderDirection }) => query.push((0, firestore_1.orderBy)(label, orderDirection)));
    if (pagination) {
        query.push((0, firestore_1.limit)(pagination.limit));
        if (pagination.targetDocument)
            query.push(pagination.target === "next"
                ? (0, firestore_1.startAfter)(pagination.targetDocument)
                : (0, firestore_1.startAt)(pagination.targetDocument));
    }
    return query;
};
exports.mapQueryParams = mapQueryParams;
const getPathStorageFromUrl = (url) => {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;
    const imagePath = url.replace(baseUrl, "").replace(/%2F/g, "/");
    return imagePath.slice(0, imagePath.indexOf("?"));
};
exports.getPathStorageFromUrl = getPathStorageFromUrl;
