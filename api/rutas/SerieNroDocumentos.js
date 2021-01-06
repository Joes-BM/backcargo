"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serienro_router = void 0;
const express_1 = require("express");
const SerieNroDocumentos_1 = require("../controlador/SerieNroDocumentos");
exports.serienro_router = express_1.Router();
exports.serienro_router.get('/serienro/:serie', SerieNroDocumentos_1.getSerieNroBySerie);
exports.serienro_router.get('/mayornroot', SerieNroDocumentos_1.getNroOT);
