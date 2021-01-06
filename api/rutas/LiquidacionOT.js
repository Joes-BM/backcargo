"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquidacionOT_router = void 0;
const express_1 = require("express");
const LiquidacionOT_1 = require("../controlador/LiquidacionOT");
exports.liquidacionOT_router = express_1.Router();
exports.liquidacionOT_router.post('/liquidacionot', LiquidacionOT_1.posLiquidacionOT);
exports.liquidacionOT_router.get('/liquidacionot/:id', LiquidacionOT_1.getLiquidacionOTByIdOT);
