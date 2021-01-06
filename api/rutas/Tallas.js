"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tallas_router = void 0;
const express_1 = require("express");
const Tallas_1 = require("../controlador/Tallas");
exports.tallas_router = express_1.Router();
exports.tallas_router.get('/tallas', Tallas_1.getTallasEpp);
exports.tallas_router.post('/tallas', Tallas_1.posTallasEpp);
