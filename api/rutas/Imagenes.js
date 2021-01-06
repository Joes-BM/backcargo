"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagenes_router = void 0;
const express_1 = require("express");
const Imagenes_1 = require("../controlador/Imagenes");
exports.imagenes_router = express_1.Router();
exports.imagenes_router.get('/img/:tabla/:img', Imagenes_1.getImagenes);
