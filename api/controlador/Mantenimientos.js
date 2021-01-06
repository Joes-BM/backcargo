"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posMantenimiento = exports.getMantenimientoByIdVehiculo = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getMantenimientoByIdVehiculo = (req, res) => {
    Sequelize_1.Mantenimiento.findAll({
        where: {
            vehi_id: req.params.id
        }
    }).then((objetoVehiculo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoVehiculo
        });
    });
    // Mantenimiento.findAll({})
    //     .then((objetoMantenimiento:any)=>{
    //         res.status(200).json({
    //             mensaje:'OK',
    //             contenido:objetoMantenimiento
    //         })
    //     })
};
exports.posMantenimiento = (req, res) => {
    let objMantenimiento = Sequelize_1.Mantenimiento.build(req.body);
    objMantenimiento.save().then((objMantenimientoCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objMantenimientoCreado,
            mensaje: "Mantenimiento Creado correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
