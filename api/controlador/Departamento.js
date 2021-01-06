"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartamento = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getDepartamento = (req, res) => {
    Sequelize_1.Departamento.findAll({})
        .then((objetoDpto) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoDpto
        });
    });
};
