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
const app_1 = require("firebase/app");
const createUser = (email, password, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!options)
        return (0, auth_1.createUserWithEmailAndPassword)(utils_1.auth, email, password);
    if (!options.hasInstance)
        return (0, auth_1.createUserWithEmailAndPassword)(utils_1.auth, email, password).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!options.userCollectionName)
                return user;
            yield (0, utils_1.setDocument)(options.userCollectionName, user.user.uid, Object.assign({ email }, ((_a = options.userInfo) !== null && _a !== void 0 ? _a : {})));
            return user;
        }));
    const temporaryAuth = (0, auth_1.getAuth)((0, app_1.initializeApp)(utils_1.app.options, "temporary"));
    return (0, auth_1.createUserWithEmailAndPassword)(temporaryAuth, email, password).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (!options.userCollectionName)
            return user;
        yield (0, utils_1.setDocument)(options.userCollectionName, user.user.uid, Object.assign({ email }, ((_b = options.userInfo) !== null && _b !== void 0 ? _b : {})));
        return user;
    })).finally(() => (0, auth_1.signOut)(temporaryAuth));
});
exports.default = createUser;
