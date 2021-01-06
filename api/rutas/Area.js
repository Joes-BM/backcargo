"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.area_router = void 0;
const express_1 = require("express");
const Area_1 = require("../controlador/Area");
exports.area_router = express_1.Router();
exports.area_router.get('/area', Area_1.getArea);
