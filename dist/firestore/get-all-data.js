"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const utils_1 = require("./utils");
const getAllData = (collectionName) => (queryParams) => new Promise((resolve, rejected) => (0, firestore_1.onSnapshot)(!queryParams
    ? (0, utils_1.getCollection)(collectionName)
    : (0, firestore_1.query)((0, utils_1.getCollection)(collectionName), ...(0, utils_1.mapQueryParams)(queryParams)), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    resolve(data);
}, (error) => rejected(error)));
exports.default = getAllData;
