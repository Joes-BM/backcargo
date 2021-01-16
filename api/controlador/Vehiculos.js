"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCarretas = exports.obtenerRemolcador = exports.deleteVehiculos = exports.updateVehiculos = exports.postVehiculos = exports.getVehiculosByPlaca = exports.getVehiculosById = exports.obtenerVehiculos = exports.getVehiculos = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// ****************************
//     OBTENER VEHICULOS desde 5
// ****************************
exports.getVehiculos = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Vehiculos.findAll({
        attributes: ['vehi_id', 'vehi_placa', 'vehi_cond', 'vehi_aniof', 'vehi_camx', 'vehi_esta'],
        include: [
            { model: Sequelize_1.Persona, as: 'trabajador' },
            { model: Sequelize_1.Persona, as: 'proveedor' },
            { model: Sequelize_1.Clase }
        ],
        offset: desde,
        limit: 5
    }).then((objVehiculos) => {
        const amount = Sequelize_1.Vehiculos.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objVehiculos,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Vehiculos',
            errors: err
        });
    });
};
// OBTENER TODOS LOS VEHICULOS
exports.obtenerVehiculos = (req, res) => {
    Sequelize_1.Vehiculos.findAll({
    // attributes:['vehi_id','vehi_placa','vehi_cond','vehi_alias','vehi_camx','vehi_esta']
    })
        .then((objetoVehiculos) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoVehiculos
        });
    });
};
// ****************************
//     OBTENER VEHICULOS BY ID
// ****************************
exports.getVehiculosById = (req, res) => {
    Sequelize_1.Vehiculos.findByPk(req.params.id, {
        include: [{
                model: Sequelize_1.Clase,
                attributes: ['clase_id', 'clase_nom']
            }, {
                model: Sequelize_1.Modelo,
                attributes: ['mod_id', 'mod_nom'],
                include: [
                    {
                        model: Sequelize_1.Marca,
                        attributes: ['marc_id', 'marc_nom']
                    }
                ]
            }]
    }).then((objVehiculos) => {
        if (objVehiculos) {
            res.status(200).json({
                mensaje: 'Vehiculos encontrado ',
                contenido: objVehiculos
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al Vehiculos'
            });
        }
    });
};
// ****************************
//     OBTENER VEHICULOS BY PLACA
// ****************************
exports.getVehiculosByPlaca = (req, res) => {
    Sequelize_1.Vehiculos.findAll({
        include: [{
                model: Sequelize_1.Clase,
                attributes: ['clase_id', 'clase_nom']
            }, {
                model: Sequelize_1.Modelo,
                attributes: ['mod_id', 'mod_nom'],
                include: [
                    {
                        model: Sequelize_1.Marca,
                        attributes: ['marc_id', 'marc_nom']
                    }
                ]
            }],
        where: {
            vehi_placa: req.params.placa
        }
    }).then((objVehiculos) => {
        if (objVehiculos) {
            res.status(200).json({
                mensaje: 'Vehiculos encontrado ',
                contenido: objVehiculos
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al Vehiculos'
            });
        }
    });
};
// ****************************
//     GRABAR POST VEHICULOS 
// ****************************
exports.postVehiculos = (req, res) => {
    let objVehiculos = Sequelize_1.Vehiculos.build(req.body);
    objVehiculos.save().then((objVehiculosCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objVehiculosCreado,
            mensaje: "Vehiculos Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
// ****************************
//     ACTUALIZAR VEHICULOS
// ****************************
exports.updateVehiculos = (req, res) => {
    Sequelize_1.Vehiculos.update({
        // vehi_nom: req.body.Vehiculos.vehi_nom,
        //LOS DEMAS CAMPOS A ACTUALIZAR
        vehi_cond: req.body.Vehiculos.vehi_cond,
        vehi_placa: req.body.Vehiculos.vehi_placa,
        vehi_aniom: req.body.Vehiculos.vehi_aniom,
        vehi_aniof: req.body.Vehiculos.vehi_aniof,
        vehi_alias: req.body.Vehiculos.vehi_alias,
        vehi_tipo: req.body.Vehiculos.vehi_tipo,
        vehi_color: req.body.Vehiculos.vehi_color,
        vehi_camx: req.body.Vehiculos.vehi_camx,
        vehi_carr: req.body.Vehiculos.vehi_carr,
        vehi_ejes: req.body.Vehiculos.vehi_ejes,
        vehi_rued: req.body.Vehiculos.vehi_rued,
        vehi_esta: req.body.Vehiculos.vehi_esta,
        vehi_chas: req.body.Vehiculos.vehi_chas,
        vehi_moto: req.body.Vehiculos.vehi_moto,
        vehi_cil: req.body.Vehiculos.vehi_cil,
        vehi_nasi: req.body.Vehiculos.vehi_nasi,
        vehi_npas: req.body.Vehiculos.vehi_npas,
        vehi_galo: req.body.Vehiculos.vehi_galo,
        vehi_pese: req.body.Vehiculos.vehi_pese,
        vehi_pebr: req.body.Vehiculos.vehi_pebr,
        vehi_caut: req.body.Vehiculos.vehi_caut,
        vehi_long: req.body.Vehiculos.vehi_long,
        vehi_alt: req.body.Vehiculos.vehi_alt,
        vehi_anch: req.body.Vehiculos.vehi_anch,
        vehi_tokm: req.body.Vehiculos.vehi_tokm,
        pers_raso: req.body.Vehiculos.pers_raso,
        mod_id: req.body.Vehiculos.mod_id,
        clase_id: req.body.Vehiculos.clase_id,
        pers_id: req.body.Vehiculos.pers_id,
        prov_id: req.body.Vehiculos.prov_id
    }, {
        where: {
            vehi_id: req.body.Vehiculos.vehi_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Vehiculos.findByPk(Actualizado[0]).then((objVehiculos) => {
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
// ****************************
//     BORRAR VEHICULOS
// ****************************
exports.deleteVehiculos = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Vehiculos.destroy({
        where: {
            vehi_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Vehiculos Eliminado",
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
// OBTENER TODO LOS REMOLCADORES
exports.obtenerRemolcador = (req, res) => {
    Sequelize_1.Vehiculos.findAll({
        attributes: ['vehi_id', 'vehi_placa', 'vehi_cond', 'vehi_alias', 'vehi_camx', 'vehi_esta', 'clase_id', 'vehi_tipo'],
        include: [{
                model: Sequelize_1.Clase,
                Attributes: ['clase_nom']
            }],
        where: {
            clase_id: {
                [Op.ne]: 7
            }
        }
    })
        .then((objetoVehiculos) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoVehiculos
        });
    });
};
// OBTENER TODO LOS SEMIREMOLQUES
exports.obtenerCarretas = (req, res) => {
    Sequelize_1.Vehiculos.findAll({
        attributes: ['vehi_id', 'vehi_placa', 'vehi_cond', 'vehi_alias', 'vehi_camx', 'vehi_esta', 'clase_id', 'vehi_tipo'],
        include: [{
                model: Sequelize_1.Clase,
                Attributes: ['clase_nom']
            }],
        where: {
            clase_id: 7
        }
    })
        .then((objetoVehiculos) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoVehiculos
        });
    });
};
