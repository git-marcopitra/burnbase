"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const utils_1 = require("./utils");
const getGenericCollection = (collectionName, queryParams) => {
    const genericCollection = (0, utils_1.getCollection)(collectionName);
    return new Promise((resolve, rejected) => (0, firestore_1.onSnapshot)(queryParams
        ? (0, firestore_1.query)(genericCollection, ...(0, utils_1.mapQueryParams)(queryParams))
        : genericCollection, (snapshot) => {
        const data = [];
        //
        snapshot.forEach((doc) => data.push(Object.defineProperty(doc.data(), "uid", { value: doc.id })));
        resolve(data);
    }, (error) => rejected(error.name)));
};
exports.default = getGenericCollection;
