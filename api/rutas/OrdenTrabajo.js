"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordentrabajo_router = void 0;
const express_1 = require("express");
const OrdenTrabajo_1 = require("../controlador/OrdenTrabajo");
exports.ordentrabajo_router = express_1.Router();
exports.ordentrabajo_router.get('/ordentrabajo', OrdenTrabajo_1.getOrdenTrabajo);
exports.ordentrabajo_router.post('/ordentrabajo', OrdenTrabajo_1.posOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo', OrdenTrabajo_1.updateOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo/saldos', OrdenTrabajo_1.updateSaldosOfOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo/iniciar', OrdenTrabajo_1.iniciarOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo/terminar', OrdenTrabajo_1.terminarOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo/facturado', OrdenTrabajo_1.facturarOrdenTrabajo);
exports.ordentrabajo_router.put('/ordentrabajo/add', OrdenTrabajo_1.addOrdenTrabajoParaFacturar);
exports.ordentrabajo_router.put('/ordentrabajo/remove', OrdenTrabajo_1.removeOrdenTrabajoParaFacturar);
exports.ordentrabajo_router.delete('/ordentrabajo/:id', OrdenTrabajo_1.deleteOrdenTrabajo);
exports.ordentrabajo_router.get('/ordentrabajo/:id', OrdenTrabajo_1.getOrdenTrabajoById);
//CAJA
exports.ordentrabajo_router.get('/ordentrabajo/estado/autorizado', OrdenTrabajo_1.getOrdenTrabajoAutorizadas);
//ORDENES DE TRABAJO FACTURADO POR ID DE PROVEEDOR
exports.ordentrabajo_router.get('/ordentrabajo/terminado/proveedor/:id', OrdenTrabajo_1.getOrdenTrabajoFacturadasByIdProveedor);
