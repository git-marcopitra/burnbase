"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const utils_1 = require("./utils");
const getPagination = (collectionName, dataCallback) => (queryParams) => new Promise((resolve, rejected) => {
    (0, firestore_1.onSnapshot)(!queryParams
        ? (0, utils_1.getCollection)(collectionName)
        : (0, firestore_1.query)((0, utils_1.getCollection)(collectionName), ...(0, utils_1.mapQueryParams)(queryParams)), (snapshot) => {
        var _a;
        return resolve({
            data: snapshot.docs.map((doc) => (Object.assign(Object.assign(Object.assign({}, doc.data()), { uid: doc.id }), dataCallback === null || dataCallback === void 0 ? void 0 : dataCallback(doc)))),
            page: ((_a = queryParams === null || queryParams === void 0 ? void 0 : queryParams.pagination) === null || _a === void 0 ? void 0 : _a.page) || 1,
            next: () => getPagination(collectionName, dataCallback)(Object.assign(Object.assign({}, queryParams), ((queryParams === null || queryParams === void 0 ? void 0 : queryParams.pagination) && {
                pagination: {
                    target: "next",
                    limit: queryParams.pagination.limit,
                    firstItem: !queryParams.pagination.firstItem
                        ? [snapshot.docs[0]]
                        : [...queryParams.pagination.firstItem, snapshot.docs[0]],
                    page: queryParams.pagination.page
                        ? queryParams.pagination.page + 1
                        : 2,
                    targetDocument: snapshot.docs[snapshot.size - 1],
                },
            }))),
            previous: () => {
                var _a;
                return getPagination(collectionName, dataCallback)(Object.assign(Object.assign({}, queryParams), ((queryParams === null || queryParams === void 0 ? void 0 : queryParams.pagination) && {
                    pagination: {
                        target: "previous",
                        firstItem: queryParams.pagination.firstItem.slice(0, -1),
                        targetDocument: (_a = queryParams.pagination.firstItem) === null || _a === void 0 ? void 0 : _a.slice(-1).shift(),
                        page: queryParams.pagination.page
                            ? queryParams.pagination.page - 1
                            : 1,
                        limit: queryParams.pagination.limit,
                    },
                })));
            },
        });
    }, (error) => rejected(error));
});
exports.default = getPagination;
