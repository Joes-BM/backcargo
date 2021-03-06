"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelo_router = void 0;
const express_1 = require("express");
const Modelo_1 = require("../controlador/Modelo");
exports.modelo_router = express_1.Router();
exports.modelo_router.get('/modelo', Modelo_1.getModelo);
exports.modelo_router.get('/modelo/:id', Modelo_1.getModeloByIdMarca);
exports.modelo_router.post('/modelo', Modelo_1.posModelo);
exports.modelo_router.put('/modelo', Modelo_1.updateModelo);
exports.modelo_router.delete('/modelo', Modelo_1.deleteModelo);
