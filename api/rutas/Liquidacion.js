"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquidacion_router = void 0;
const express_1 = require("express");
const Liquidacion_1 = require("../controlador/Liquidacion");
exports.liquidacion_router = express_1.Router();
// liquidacion_router.post('/liquidacion',posliquidacion);
exports.liquidacion_router.get('/liquidacion/gastosadministrativos', Liquidacion_1.getCajaByGastosAdministrativos);
exports.liquidacion_router.get('/liquidacion/gastosadministrativos/:idconductor', Liquidacion_1.getCajaByGastosAdministrativosPorIdTrabajador);
exports.liquidacion_router.post('/liquidacion/gastosadministrativos', Liquidacion_1.posLiquidacion);
exports.liquidacion_router.get('/liquidacion/caja/:id', Liquidacion_1.getLiquidacionByIdCaja);
//REPORTES
exports.liquidacion_router.post('/liquidacion/reporte/gastosadministrativos', Liquidacion_1.getCajaByEstadoFiniFfin);
