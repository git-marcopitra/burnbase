"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const utils_1 = require("../firestore/utils");
const logout = () => (0, auth_1.signOut)(utils_1.auth);
exports.default = logout;
