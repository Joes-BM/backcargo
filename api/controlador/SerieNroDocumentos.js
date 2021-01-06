"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNroOT = exports.getSerieNroBySerie = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getSerieNroBySerie = (req, res) => {
    Sequelize_1.SerieNumeroDocumentos.max('senu_nro', {
        where: {
            senu_serie: req.params.serie
        }
    })
        .then((objSerieNro) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objSerieNro
        });
    });
};
exports.getNroOT = (req, res) => {
    Sequelize_1.OrdenTrabajo.max('ordt_nser')
        .then((objSerieNro) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objSerieNro
        });
    });
};
