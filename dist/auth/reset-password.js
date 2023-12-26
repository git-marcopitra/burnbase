"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const resetPassword = (user, newPassword) => (0, auth_1.updatePassword)(user, newPassword);
exports.default = resetPassword;
