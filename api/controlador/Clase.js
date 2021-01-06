"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClase = exports.updateClase = exports.posClase = exports.getClase = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getClase = (req, res) => {
    Sequelize_1.Clase.findAll({})
        .then((objetoClase) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoClase
        });
    });
};
exports.posClase = (req, res) => {
    let objClase = Sequelize_1.Clase.build(req.body);
    objClase.save().then((objClaseCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objClaseCreado,
            mensaje: "Clase Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateClase = (req, res) => {
    Sequelize_1.Clase.update({
        clase_nom: req.body.Clase.clase_nom,
    }, {
        where: {
            clase_id: req.body.Clase.clase_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Clase.findByPk(Actualizado[0]).then((objClase) => {
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
exports.deleteClase = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Clase.destroy({
        where: {
            clase_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Clase Eliminado",
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
