"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busqueda_router = void 0;
const express_1 = require("express");
const Busqueda_1 = require("../controlador/Busqueda");
exports.busqueda_router = express_1.Router();
exports.busqueda_router.get('/busqueda/todo/:busqueda', Busqueda_1.buscar);
exports.busqueda_router.get('/busqueda/coleccion/:tabla/:busqueda', Busqueda_1.busqEspecifica);
