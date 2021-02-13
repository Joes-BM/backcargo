"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiquidacionByIdCaja = exports.posLiquidacion = exports.getCajaByGastosAdministrativosPorIdTrabajador = exports.getCajaByEstadoFiniFfin = exports.getCajaByGastosAdministrativos = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const moment = require('moment');
const { Op } = require("sequelize");
exports.getCajaByGastosAdministrativos = (req, res) => {
    Sequelize_1.Caja.findAll({
        include: [
            {
                model: Sequelize_1.Persona,
                attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo1', 'pers_temo2', 'pers_email', 'pers_tcta', 'pers_ncta', 'pers_banc']
            },
            {
                model: Sequelize_1.OrdenTrabajo,
                attributes: ['ordt_nser']
            }
        ],
        where: {
            caja_motivo: 'Gastos Operativos',
            caja_esta: {
                [Op.or]: ['EN PROCESO', 'PENDIENTE', 'POR PAGAR']
            }
        }
    }).then((objetoCaja) => {
        const amount = Sequelize_1.Caja.count({
            where: {
                caja_motivo: 'Gastos Operativos',
                caja_esta: {
                    [Op.or]: ['EN PROCESO', 'PENDIENTE', 'POR PAGAR']
                }
            }
        })
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
exports.getCajaByEstadoFiniFfin = (req, res) => {
    var finicio = req.body.fechaIni || moment('2021-01-01');
    var ffinal = req.body.fechaFin || moment();
    var estado = req.body.estado || 'TODO';
    var desde = req.query.desde || 0;
    desde = Number(desde);
    if (estado == "TODO") {
        Sequelize_1.Caja.findAll({
            include: [
                {
                    model: Sequelize_1.Persona,
                    attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo1', 'pers_temo2', 'pers_email', 'pers_tcta', 'pers_ncta', 'pers_banc']
                },
                {
                    model: Sequelize_1.OrdenTrabajo,
                    attributes: ['ordt_nser']
                }
            ],
            where: {
                caja_motivo: 'Gastos Operativos',
                caja_esta: {
                    [Op.ne]: estado
                },
                caja_fech: {
                    [Op.and]: {
                        [Op.gte]: finicio,
                        [Op.lte]: ffinal
                    }
                }
            },
            offset: desde,
            limit: 5
        }).then((objetoCaja) => {
            const amount = Sequelize_1.Caja.count({
                where: {
                    caja_motivo: 'Gastos Operativos',
                    caja_esta: {
                        [Op.ne]: estado
                    },
                    caja_fech: {
                        [Op.and]: {
                            [Op.gte]: finicio,
                            [Op.lte]: ffinal
                        }
                    }
                }
            })
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
    }
    else {
        Sequelize_1.Caja.findAll({
            include: [
                {
                    model: Sequelize_1.Persona,
                    attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo1', 'pers_temo2', 'pers_email', 'pers_tcta', 'pers_ncta', 'pers_banc']
                },
                {
                    model: Sequelize_1.OrdenTrabajo,
                    attributes: ['ordt_nser']
                }
            ],
            where: {
                caja_motivo: 'Gastos Operativos',
                caja_esta: estado,
                caja_fech: {
                    [Op.and]: {
                        [Op.gte]: finicio,
                        [Op.lte]: ffinal
                    }
                }
            },
            offset: desde,
            limit: 5
        }).then((objetoCaja) => {
            const amount = Sequelize_1.Caja.count({
                where: {
                    caja_motivo: 'Gastos Operativos',
                    caja_esta: estado,
                    caja_fech: {
                        [Op.and]: {
                            [Op.gte]: finicio,
                            [Op.lte]: ffinal
                        }
                    }
                }
            })
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
    }
};
exports.getCajaByGastosAdministrativosPorIdTrabajador = (req, res) => {
    var pers_id = req.params.idconductor;
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Caja.findAll({
        include: [
            {
                model: Sequelize_1.Persona,
                attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo1', 'pers_temo2', 'pers_email', 'pers_tcta', 'pers_ncta', 'pers_banc']
            },
            {
                model: Sequelize_1.OrdenTrabajo,
                attributes: ['ordt_nser']
            }
        ],
        where: {
            caja_motivo: 'Gastos Operativos',
            caja_esta: {
                [Op.or]: ['EN PROCESO', 'PENDIENTE']
            },
            pers_id: pers_id
        },
        offset: desde,
        limit: 5
    }).then((objetoCaja) => {
        const amount = Sequelize_1.Caja.count({
            where: {
                caja_motivo: 'Gastos Operativos',
                caja_esta: {
                    [Op.or]: ['EN PROCESO', 'PENDIENTE']
                },
                pers_id: pers_id
            }
        })
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
let crearLiquidacion = (arrDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        // let ordenCreado= await Liquidacion.create(orden,{transaction: t});
        // let guiasCreadas=[];
        for (let i = 0; i < arrDetalle.length; i++) {
            if (arrDetalle[i].liqui_id == 0) {
                let detallesCreadas = yield Sequelize_1.Liquidacion.create(arrDetalle[i], { transaction: t });
                if (arrDetalle[i].liqui_tipo = "A cuenta Viaje") {
                }
            }
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.posLiquidacion = (req, res) => {
    crearLiquidacion(req.body.detalle)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "Liquidacion Creada correctamente"
        });
    })
        .catch(error => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.getLiquidacionByIdCaja = (req, res) => {
    Sequelize_1.Liquidacion.findAll({
        where: {
            caja_id: req.params.id
        }
    }).then((objetoVehiculo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoVehiculo
        });
    });
};
