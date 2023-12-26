"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const utils_1 = require("../firestore/utils");
const getLoggedInUser = () => new Promise((resolve, reject) => {
    (0, auth_1.onAuthStateChanged)(utils_1.auth, (user) => resolve(user || null), reject);
});
exports.default = getLoggedInUser;
