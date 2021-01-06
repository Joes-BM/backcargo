"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModelo = exports.updateModelo = exports.posModelo = exports.getModelo = exports.getModeloByIdMarca = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getModeloByIdMarca = (req, res) => {
    Sequelize_1.Modelo.findAll({
        where: {
            marc_id: req.params.id
        }
    })
        .then((objetoModelo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoModelo
        });
    });
};
exports.getModelo = (req, res) => {
    Sequelize_1.Modelo.findAll({})
        .then((objetoModelo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoModelo
        });
    });
};
exports.posModelo = (req, res) => {
    let objModelo = Sequelize_1.Modelo.build(req.body);
    objModelo.save().then((objModeloCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objModeloCreado,
            mensaje: "Modelo Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateModelo = (req, res) => {
    Sequelize_1.Modelo.update({
        mod_nom: req.body.Modelo.mod_nom,
    }, {
        where: {
            mod_id: req.body.Modelo.mod_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Modelo.findByPk(Actualizado[0]).then((objModelo) => {
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
exports.deleteModelo = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Modelo.destroy({
        where: {
            mod_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Modelo Eliminado",
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
