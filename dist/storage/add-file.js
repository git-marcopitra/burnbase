"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unikey_1 = __importDefault(require("unikey"));
const utils_1 = require("../firestore/utils");
const storage_1 = require("firebase/storage");
const addFile = (file, path, options) => new Promise((resolve, reject) => {
    const storageRef = (0, storage_1.ref)(utils_1.bucket, `${path}/${options === null || options === void 0 ? void 0 : options.prefix}${(0, unikey_1.default)()}${options === null || options === void 0 ? void 0 : options.suffix}`);
    const uploadFile = (0, storage_1.uploadBytesResumable)(storageRef, file, options.metadata);
    uploadFile.on("state_changed", () => { }, (error) => reject(error), () => (0, storage_1.getDownloadURL)(uploadFile.snapshot.ref).then(resolve));
});
exports.default = addFile;
