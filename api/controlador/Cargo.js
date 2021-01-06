"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCargo = exports.updateCargo = exports.posCargo = exports.getCargoByIdArea = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getCargoByIdArea = (req, res) => {
    Sequelize_1.Cargo.findAll({
        where: {
            area_id: req.params.id
        }
    })
        .then((objetoCargo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoCargo
        });
    });
};
exports.posCargo = (req, res) => {
    let objCargo = Sequelize_1.Cargo.build(req.body);
    objCargo.save().then((objCargoCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objCargoCreado,
            mensaje: "Cargo Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateCargo = (req, res) => {
    Sequelize_1.Cargo.update({
        cargo_nom: req.body.Cargo.cargo_nom,
    }, {
        where: {
            cargo_id: req.body.Cargo.cargo_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Cargo.findByPk(Actualizado[0]).then((objCargo) => {
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
exports.deleteCargo = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Cargo.destroy({
        where: {
            cargo_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Cargo Eliminado",
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
