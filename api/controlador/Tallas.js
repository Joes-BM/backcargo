"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posTallasEpp = exports.getTallasEpp = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getTallasEpp = (req, res) => {
    Sequelize_1.TallasEpp.findAll({})
        .then((objetoTallasEpp) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoTallasEpp
        });
    });
};
exports.posTallasEpp = (req, res) => {
    let objTallasEpp = Sequelize_1.TallasEpp.build(req.body);
    objTallasEpp.save().then((objTallasEppCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objTallasEppCreado,
            mensaje: "TallasEpp Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
