"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquidacionCliente_router = void 0;
const express_1 = require("express");
const LiquidacionCliente_1 = require("../controlador/LiquidacionCliente");
exports.liquidacionCliente_router = express_1.Router();
exports.liquidacionCliente_router.get('/liquidar/cliente/facturados', LiquidacionCliente_1.obtenerOrdenesTrabajoFacturados);
exports.liquidacionCliente_router.put('/liquidar/cliente', LiquidacionCliente_1.cobrarOrdenTrabajo);
