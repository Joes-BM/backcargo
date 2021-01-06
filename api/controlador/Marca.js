"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarca = exports.updateMarca = exports.posMarca = exports.getMarca = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getMarca = (req, res) => {
    Sequelize_1.Marca.findAll({})
        .then((objetoMarca) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoMarca
        });
    });
};
exports.posMarca = (req, res) => {
    let objMarca = Sequelize_1.Marca.build(req.body);
    objMarca.save().then((objMarcaCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objMarcaCreado,
            mensaje: "Marca Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateMarca = (req, res) => {
    Sequelize_1.Marca.update({
        marc_nom: req.body.Marca.marc_nom,
    }, {
        where: {
            marc_id: req.body.Marca.marc_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Marca.findByPk(Actualizado[0]).then((objMarca) => {
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
exports.deleteMarca = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Marca.destroy({
        where: {
            marc_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Marca Eliminado",
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
