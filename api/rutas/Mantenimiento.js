"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantenimiento_router = void 0;
const express_1 = require("express");
const Mantenimientos_1 = require("../controlador/Mantenimientos");
exports.mantenimiento_router = express_1.Router();
exports.mantenimiento_router.get('/mantenimiento/:id', Mantenimientos_1.getMantenimientoByIdVehiculo);
exports.mantenimiento_router.post('/mantenimiento', Mantenimientos_1.posMantenimiento);
