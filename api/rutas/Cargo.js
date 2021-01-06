"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargo_router = void 0;
const express_1 = require("express");
const Cargo_1 = require("../controlador/Cargo");
exports.cargo_router = express_1.Router();
exports.cargo_router.get('/cargo/:id', Cargo_1.getCargoByIdArea);
