"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistritoById = exports.getDistritoByIdProv = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getDistritoByIdProv = (req, res) => {
    Sequelize_1.Distrito.findAll({
        where: {
            prov_id: req.params.id
        }
    })
        .then((objetoDistrito) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoDistrito
        });
    });
};
exports.getDistritoById = (req, res) => {
    Sequelize_1.Distrito.findByPk(req.params.id, {
        include: [{
                model: Sequelize_1.Provincia,
                include: [{
                        model: Sequelize_1.Departamento
                    }]
            }]
    })
        .then((objetoDistrito) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoDistrito
        });
    });
};
