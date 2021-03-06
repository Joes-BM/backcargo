"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagosPersonal_router = void 0;
const express_1 = require("express");
const PagosPersonal_1 = require("../controlador/PagosPersonal");
exports.pagosPersonal_router = express_1.Router();
exports.pagosPersonal_router.post('/pagospersonal', PagosPersonal_1.grabarPagosConductores);
exports.pagosPersonal_router.post('/pagospersonal/grabar', PagosPersonal_1.posPagoPersonal);
exports.pagosPersonal_router.post('/pagospersonal/detalle', PagosPersonal_1.putPagoPersonal); // cambiar el put
exports.pagosPersonal_router.post('/pagospersonal/grabar/acuentaviaje', PagosPersonal_1.grabarACuentaViajeConductor);
exports.pagosPersonal_router.get('/pagospersonal/detalle/:id', PagosPersonal_1.obtenerPagosPersonalDetalleById);
exports.pagosPersonal_router.get('/pagospersonal', PagosPersonal_1.obtenerPagosPersonalConcluidos);
exports.pagosPersonal_router.get('/pagospersonal/conductor/:idconductor', PagosPersonal_1.obtenerPagosPersonalConcluidosPorIdConductor);
exports.pagosPersonal_router.get('/pagospersonal/liquidar', PagosPersonal_1.obtenerPagosPersonalByLiquidar);
exports.pagosPersonal_router.get('/pagospersonal/nservicio/:nservicio', PagosPersonal_1.obtenerPagosPersonalByNroServicio);
exports.pagosPersonal_router.put('/pagospersonal/add', PagosPersonal_1.addViajeParaLiquidar);
exports.pagosPersonal_router.put('/pagospersonal/remove', PagosPersonal_1.removeViajeParaLiquidar);
exports.pagosPersonal_router.put('/pagospersonal/monto', PagosPersonal_1.actualizarMonto);
exports.pagosPersonal_router.put('/pagospersonal/estado', PagosPersonal_1.actualizarEstado);
exports.pagosPersonal_router.put('/pagospersonal/fechafin', PagosPersonal_1.actualizarFechaFinal);
//REPORTES
exports.pagosPersonal_router.post('/pagospersonal/reporte/todos', PagosPersonal_1.obtenerPagosPersonalEstadoFiniFfin);
