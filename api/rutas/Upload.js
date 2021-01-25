"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_router = void 0;
const express_1 = require("express");
const Upload_1 = require("../controlador/Upload");
exports.upload_router = express_1.Router();
exports.upload_router.put('/upload/:tabla/:id', Upload_1.subirArchivo);
