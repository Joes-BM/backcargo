"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distrito_router = void 0;
const express_1 = require("express");
const Distrito_1 = require("../controlador/Distrito");
exports.distrito_router = express_1.Router();
exports.distrito_router.get('/distrito/:id', Distrito_1.getDistritoByIdProv);
exports.distrito_router.get('/distrito/datos/:id', Distrito_1.getDistritoById);
