"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departamento_router = void 0;
const express_1 = require("express");
const Departamento_1 = require("../controlador/Departamento");
exports.departamento_router = express_1.Router();
exports.departamento_router.get('/departamento', Departamento_1.getDepartamento);
