"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantenimientoDetalle_router = void 0;
const express_1 = require("express");
const MantenimientoDetalle_1 = require("../controlador/MantenimientoDetalle");
exports.mantenimientoDetalle_router = express_1.Router();
exports.mantenimientoDetalle_router.post('/detallemantenimiento', MantenimientoDetalle_1.posMantenimientoDetalle);
exports.mantenimientoDetalle_router.get('/detallemantenimiento/:id', MantenimientoDetalle_1.getMantDetalleByIdMantenimiento);
