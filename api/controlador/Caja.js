"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCajaByIdOrdenTrabajo = exports.getCajaById = exports.deleteCaja = exports.updateCaja = exports.posCaja = exports.getCaja = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getCaja = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Caja.findAll({
        include: [
            {
                model: Sequelize_1.Persona,
            },
            {
                model: Sequelize_1.OrdenTrabajo,
                // attributes:[],
                include: [{
                        model: Sequelize_1.Vehiculos, as: 'vehiculoOrden'
                    }]
            }
        ],
        offset: desde,
        limit: 5
    }).then((objetoCaja) => {
        const amount = Sequelize_1.Caja.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoCaja,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Documentos',
            errors: err
        });
    });
};
exports.posCaja = (req, res) => {
    let objCaja = Sequelize_1.Caja.build(req.body);
    objCaja.save().then((objCajaCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objCajaCreado,
            mensaje: "Caja Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateCaja = (req, res) => {
    console.log("==================");
    console.log(req.body);
    console.log("==================");
    Sequelize_1.Caja.update({
        caja_fech: req.body.caja_fech,
        caja_motivo: req.body.caja_motivo,
        caja_mopa: req.body.caja_mopa,
        caja_cost: req.body.caja_cost,
        caja_gast: req.body.caja_gast,
        caja_sald: req.body.caja_sald,
        caja_obs: req.body.caja_obs,
        caja_esta: req.body.caja_esta,
        pers_id: req.body.pers_id,
    }, {
        where: {
            caja_id: req.body.caja_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Caja.findByPk(Actualizado[0]).then((objCaja) => {
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
exports.deleteCaja = (req, res) => {
    let { id } = req.params;
    console.log("======");
    console.log(id);
    console.log("======");
    Sequelize_1.Caja.destroy({
        where: {
            caja_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Caja Eliminado",
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
exports.getCajaById = (req, res) => {
    Sequelize_1.Caja.findByPk(req.params.id, {
        include: [
            {
                model: Sequelize_1.OrdenTrabajo,
                attributes: ['ordt_id', 'ordt_nser']
            }
        ]
    }).then((objCaja) => {
        if (objCaja) {
            res.status(200).json({
                mensaje: 'Caja encontrado ',
                contenido: objCaja
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al Caja'
            });
        }
    });
};
exports.getCajaByIdOrdenTrabajo = (req, res) => {
    Sequelize_1.Caja.findAll({
        where: {
            ordt_id: req.params.id
        }
    }).then((objetoCaja) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoCaja,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Documentos',
            errors: err
        });
    });
};
