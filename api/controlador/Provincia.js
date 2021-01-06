"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvinciaByIdDpro = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getProvinciaByIdDpro = (req, res) => {
    Sequelize_1.Provincia.findAll({
        where: {
            dpto_id: req.params.id
        }
    })
        .then((objetoPRovincia) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoPRovincia
        });
    });
};
