"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const utils_1 = require("../firestore/utils");
const firestore_1 = require("../firestore");
const loginWithEmailAndPassword = (email, password, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, auth_1.signInWithEmailAndPassword)(utils_1.auth, email, password).catch(() => {
        throw new Error("wrong email or password");
    });
    if (!options || !options.firestoreCollectionName)
        return user;
    const users = yield (0, firestore_1.getAllData)(options.firestoreCollectionName)({
        conditions: [["email", "==", email]].concat((_a = options.firestoreCondition) !== null && _a !== void 0 ? _a : []),
    });
    if (!users.length)
        throw new Error("User does not exist");
    return user;
});
exports.default = loginWithEmailAndPassword;
