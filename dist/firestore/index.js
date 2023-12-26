"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.getPagination = exports.getAllData = void 0;
var get_all_data_1 = require("./get-all-data");
Object.defineProperty(exports, "getAllData", { enumerable: true, get: function () { return __importDefault(get_all_data_1).default; } });
var get_pagination_1 = require("./get-pagination");
Object.defineProperty(exports, "getPagination", { enumerable: true, get: function () { return __importDefault(get_pagination_1).default; } });
var get_collection_1 = require("./get-collection");
Object.defineProperty(exports, "getCollection", { enumerable: true, get: function () { return __importDefault(get_collection_1).default; } });
