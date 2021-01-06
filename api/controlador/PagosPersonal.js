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
exports.grabarACuentaViajeConductor = exports.obtenerPagosPersonalByNroServicio = exports.putPagoPersonal = exports.posPagoPersonal = exports.obtenerPagosPersonalByLiquidar = exports.actualizarFechaFinal = exports.actualizarEstado = exports.actualizarMonto = exports.actualizarPagoPersonal = exports.removeViajeParaLiquidar = exports.addViajeParaLiquidar = exports.obtenerPagosPersonalDetalleById = exports.obtenerPagosPersonalConcluidos = exports.grabarPagosConductores = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.grabarPagosConductores = (req, res) => {
    let objPagosPersonal = Sequelize_1.PagosPersonal.build(req.body);
    objPagosPersonal.save().then((objPagosCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objPagosCreado,
            mensaje: "Pagos Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.obtenerPagosPersonalConcluidos = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.PagosPersonal.findAll({
        include: [{
                model: Sequelize_1.Persona,
                attributes: ['pers_nomb', 'pers_appa', 'pers_apma', 'pers_tcta', 'pers_ncta', 'pers_banc', 'pers_fopa', 'pers_suel']
            }],
        where: {
            // pagper_estt:"CONCLUIDO",
            pagper_esta: "PENDIENTE"
        },
        offset: desde,
        limit: 5
    }).then((objetoPagos) => {
        const amount = Sequelize_1.PagosPersonal.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoPagos,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Personas',
            errors: err
        });
    });
};
exports.obtenerPagosPersonalDetalleById = (req, res) => {
    Sequelize_1.PagosPersonalDetalle.findAll({
        where: {
            pagper_id: req.params.id
        }
    }).then((objPagosPersonalDetalle) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPagosPersonalDetalle
        });
    });
};
// AGREGAR QUITAR VIAJE POR LIQUIDAR
exports.addViajeParaLiquidar = (req, res) => {
    Sequelize_1.PagosPersonal.update({
        pagper_liqu: true
    }, {
        where: {
            pagper_id: req.body.PagosPersonal.pagper_id
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPAgPer) => {
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
exports.removeViajeParaLiquidar = (req, res) => {
    Sequelize_1.PagosPersonal.update({
        pagper_liqu: false
    }, {
        where: {
            pagper_id: req.body.PagosPersonal.pagper_id
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPagPer) => {
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
exports.actualizarPagoPersonal = (req, res) => {
    Sequelize_1.PagosPersonal.update({
        pagper_liqu: false
    }, {
        where: {
            pagper_id: req.body.PagosPersonal.pagper_id
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPagPer) => {
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
exports.actualizarMonto = (req, res) => {
    console.log("==================");
    console.log(req.body);
    console.log("==================");
    Sequelize_1.PagosPersonal.update({
        pagper_cost: req.body.PagosPersonal.pagper_cost
    }, {
        where: {
            pagper_id: req.body.PagosPersonal.pagper_id
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPagPer) => {
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
exports.actualizarEstado = (req, res) => {
    // console.log("==================");
    // console.log(req.body);
    // console.log("==================");
    Sequelize_1.PagosPersonal.update({
        pagper_esta: req.body.PagosPersonal.pagper_esta,
        pagper_feli: req.body.PagosPersonal.pagper_feli
    }, {
        where: {
            pagper_id: req.body.PagosPersonal.pagper_id
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPagPer) => {
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
exports.actualizarFechaFinal = (req, res) => {
    console.log("---------------------------");
    console.log(req.body);
    console.log("---------------------------");
    Sequelize_1.PagosPersonal.update({
        pagper_fefi: new Date(),
        pagper_estt: req.body.pagper_estt
    }, {
        where: {
            ordt_nser: req.body.ordt_nser
        }
    }).then((Actualizado) => {
        Sequelize_1.PagosPersonal.findByPk(Actualizado[0]).then((objPagPer) => {
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
// AGREGAR QUITAR VIAJE POR LIQUIDAR
exports.obtenerPagosPersonalByLiquidar = (req, res) => {
    Sequelize_1.PagosPersonal.findAll({
        // include:[{
        //     model:Persona,
        //     attributes:['pers_nomb','pers_appa','pers_apma','pers_tcta','pers_ncta','pers_banc','pers_fopa','pers_suel']
        // }],
        where: {
            pagper_liqu: true,
            pagper_esta: "PENDIENTE"
        },
    }).then((objetoPagos) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoPagos,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Personas',
            errors: err
        });
    });
};
exports.posPagoPersonal = (req, res) => {
    crearPAgoPersonal(req.body.pago, req.body.pagodetalle)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "PAgo PErsonal Creada correctamente"
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
let crearPAgoPersonal = (pagoPersonal, arrPagoPersonalDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        let pagoCreado = yield Sequelize_1.PagosPersonal.create(pagoPersonal, { transaction: t });
        // let guiasCreadas=[];
        for (let i = 0; i < arrPagoPersonalDetalle.length; i++) {
            arrPagoPersonalDetalle[i].pagper_id = pagoCreado.pagper_id;
            let pagoDetalleCreadas = yield Sequelize_1.PagosPersonalDetalle.create(arrPagoPersonalDetalle[i], { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
// update
exports.putPagoPersonal = (req, res) => {
    console.log("=====================");
    console.log(req.body.pago);
    console.log(req.body.pagodetalle);
    console.log("=====================");
    actualizarPAgoPersonal(req.body.pago, req.body.pagodetalle)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "PAgo PErsonal Creada correctamente"
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
let actualizarPAgoPersonal = (pagoPersonal, arrPagoPersonalDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        for (let i = 0; i < arrPagoPersonalDetalle.length; i++) {
            if (arrPagoPersonalDetalle[i].depa_id == 0) {
                let pagoDetalleCreadas = yield Sequelize_1.PagosPersonalDetalle.create(arrPagoPersonalDetalle[i], { transaction: t });
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
exports.obtenerPagosPersonalByNroServicio = (req, res) => {
    Sequelize_1.PagosPersonal.findAll({
        attributes: ['pagper_id', 'pagper_deta', 'ordt_nser'],
        where: {
            ordt_nser: req.params.nservicio
        }
    }).then((objPagosPersonalDetalle) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPagosPersonalDetalle
        });
    });
};
exports.grabarACuentaViajeConductor = (req, res) => {
    let objDetallePagoPersonal = Sequelize_1.PagosPersonalDetalle.build(req.body);
    objDetallePagoPersonal.save().then((objDetalleCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objDetalleCreado,
            mensaje: "Detalle Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
