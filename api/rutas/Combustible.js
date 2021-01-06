"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combustible_router = void 0;
const express_1 = require("express");
const Combustible_1 = require("../controlador/Combustible");
exports.combustible_router = express_1.Router();
exports.combustible_router.post('/combustible', Combustible_1.posCombustible);
exports.combustible_router.get('/combustible', Combustible_1.getCombustible);
exports.combustible_router.get('/combustible/orden/:id', Combustible_1.getCombustibleByIdOrdenTrabajo);
