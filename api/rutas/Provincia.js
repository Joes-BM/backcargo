"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provincia_router = void 0;
const express_1 = require("express");
const Provincia_1 = require("../controlador/Provincia");
exports.provincia_router = express_1.Router();
exports.provincia_router.get('/provincia/:id', Provincia_1.getProvinciaByIdDpro);
