"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentos_router = void 0;
const express_1 = require("express");
const Documentos_1 = require("../controlador/Documentos");
exports.documentos_router = express_1.Router();
exports.documentos_router.get('/documentos', Documentos_1.getDocumentos);
exports.documentos_router.post('/documentos', Documentos_1.posDocumentos);
exports.documentos_router.put('/documentos', Documentos_1.updateDocumentos);
exports.documentos_router.put('/documentos/estados', Documentos_1.actualizarEstados);
exports.documentos_router.delete('/documentos/:id', Documentos_1.deleteDocumentos);
exports.documentos_router.get('/documentos/:id', Documentos_1.getDocumentosById);
exports.documentos_router.get('/documentos/diferente/vencidos', Documentos_1.getDocumentosEstados);
