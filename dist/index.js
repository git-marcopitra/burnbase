"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const app_1 = require("firebase/app");
const init = (args) => (0, app_1.getApps)().length ? (0, app_1.getApp)() : (0, app_1.initializeApp)(args);
exports.init = init;
