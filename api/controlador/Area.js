"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArea = exports.updateArea = exports.posArea = exports.getArea = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getArea = (req, res) => {
    Sequelize_1.Area.findAll({})
        .then((objetoArea) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoArea
        });
    });
};
exports.posArea = (req, res) => {
    let objArea = Sequelize_1.Area.build(req.body);
    objArea.save().then((objAreaCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objAreaCreado,
            mensaje: "Area Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateArea = (req, res) => {
    Sequelize_1.Area.update({
        area_nom: req.body.Area.area_nom,
    }, {
        where: {
            area_id: req.body.Area.area_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Area.findByPk(Actualizado[0]).then((objArea) => {
            res.status(200).json({
                mensaje: 'ok',
                contenido: Actualizado
            });
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'error',
            contenido: error
        });
    });
};
exports.deleteArea = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Area.destroy({
        where: {
            area_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Area Eliminado",
                id: id
            };
            res.status(200).send(rpta);
        }
        else {
            let rpta = {
                success: false,
                mensaje: 'No se ha Eliminado',
                id: ''
            };
            res.status(500).send(rpta);
        }
    });
};
