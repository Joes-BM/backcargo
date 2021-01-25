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
exports.getOTByIdTrabajador = exports.getOrdenesProcesoPorIdConductor = exports.getOrdenesProceso = exports.getOrdenTrabajoFacturadasByIdProveedor = exports.getOrdenTrabajoAutorizadas = exports.removeOrdenTrabajoParaFacturar = exports.addOrdenTrabajoParaFacturar = exports.terminarOrdenTrabajo = exports.iniciarOrdenTrabajo = exports.facturarOrdenTrabajo = exports.deleteOrdenTrabajo = exports.updateOrdenTrabajo = exports.updateSaldosOfOrdenTrabajo = exports.posOrdenTrabajo = exports.getOrdenTrabajoById = exports.getOrdenTrabajoPorIdTrabajador = exports.getOrdenTrabajo = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
const moment = require('moment');
exports.getOrdenTrabajo = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            { model: Sequelize_1.Persona },
            { model: Sequelize_1.Vehiculos, as: 'vehiculoOrden' },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }]
            }
        ],
        where: {
            ordt_esta: {
                [Op.ne]: 'TERMINADO'
            }
        },
        offset: desde,
        limit: 5
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando OrdenTrabajo',
            errors: err
        });
    });
};
exports.getOrdenTrabajoPorIdTrabajador = (req, res) => {
    var desde = req.query.desde || 0;
    var pers_id = req.params.idtrabajador;
    desde = Number(desde);
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            { model: Sequelize_1.Persona },
            { model: Sequelize_1.Vehiculos, as: 'vehiculoOrden' },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }]
            }
        ],
        where: {
            ordt_esta: {
                [Op.ne]: 'TERMINADO'
            },
            pers_id: pers_id
        },
        offset: desde,
        limit: 5
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            where: {
                ordt_esta: {
                    [Op.ne]: 'TERMINADO'
                },
                pers_id: pers_id
            },
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando OrdenTrabajo',
            errors: err
        });
    });
};
exports.getOrdenTrabajoById = (req, res) => {
    Sequelize_1.OrdenTrabajo.findByPk(req.params.id, {
        include: [
            { model: Sequelize_1.Persona },
            {
                model: Sequelize_1.Vehiculos, as: 'vehiculoOrden',
                include: [{
                        model: Sequelize_1.Persona, as: 'proveedor',
                        attributes: ['pers_raso']
                    }]
            },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            { model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }]
            }
        ]
    }).then((objOrdenTrabajo) => {
        if (objOrdenTrabajo) {
            res.status(200).json({
                mensaje: 'OrdenTrabajo encontrado ',
                contenido: objOrdenTrabajo
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al OrdenTrabajo'
            });
        }
    });
};
let crearOrdenDeTrabajo = (orden, arrGuiasRemision) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        let ordenCreado = yield Sequelize_1.OrdenTrabajo.create(orden, { transaction: t });
        // let guiasCreadas=[];
        for (let i = 0; i < arrGuiasRemision.length; i++) {
            arrGuiasRemision[i].ordt_id = ordenCreado.ordt_id;
            let guiasCreadas = yield Sequelize_1.GuiasRemision.create(arrGuiasRemision[i], { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.posOrdenTrabajo = (req, res) => {
    crearOrdenDeTrabajo(req.body.orden, req.body.guias)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "OrdenTrabajo Creada correctamente"
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
exports.updateSaldosOfOrdenTrabajo = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_acta: req.body.ordt_acta,
        ordt_sald: req.body.ordt_sald,
        ordt_esta: req.body.ordt_esta,
    }, {
        where: {
            ordt_id: req.body.ordt_id
        }
    }).then((Actualizado) => {
        // console.log(Actualizado);
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.updateOrdenTrabajo = (req, res) => {
    console.log("***************************");
    console.log(req.body);
    console.log("***************************");
    Sequelize_1.OrdenTrabajo.update({
        ordt_fech: req.body.OrdenTrabajo.ordt_fech,
        ordt_nser: req.body.OrdenTrabajo.ordt_nser,
        ordt_tcam: req.body.OrdenTrabajo.ordt_tcam,
        ordt_moda: req.body.OrdenTrabajo.ordt_moda,
        ordt_deta: req.body.OrdenTrabajo.ordt_deta,
        ordt_pter: req.body.OrdenTrabajo.ordt_pter,
        ordt_flet: req.body.OrdenTrabajo.ordt_flet,
        ordt_peso: req.body.OrdenTrabajo.ordt_peso,
        ordt_detra: req.body.OrdenTrabajo.ordt_detra,
        ordt_dotro: req.body.OrdenTrabajo.ordt_dotro,
        ordt_dbanc: req.body.OrdenTrabajo.ordt_dbanc,
        ordt_iigv: req.body.OrdenTrabajo.ordt_iigv,
        ordt_fpbanco: req.body.OrdenTrabajo.ordt_fpbanco,
        ordt_esta: req.body.OrdenTrabajo.ordt_esta,
        ordt_fact: req.body.OrdenTrabajo.ordt_fact,
        vehi_id: req.body.OrdenTrabajo.vehi_id,
        carr_id: req.body.OrdenTrabajo.carr_id,
        pers_id: req.body.OrdenTrabajo.pers_id,
        rucli_id: req.body.OrdenTrabajo.rucli_id,
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.deleteOrdenTrabajo = (req, res) => {
    let { id } = req.params;
    Sequelize_1.OrdenTrabajo.destroy({
        where: {
            ordent_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "OrdenTrabajo Eliminado",
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
//CAMBIAR EL ESTADO Y FACT EN LA TABLA ORDEN DE TRABAJO
exports.facturarOrdenTrabajo = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_esta: "FACTURADO",
        ordt_fact: 1
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.iniciarOrdenTrabajo = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_esta: "INICIADO"
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.terminarOrdenTrabajo = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_esta: "TERMINADO",
        ordt_fefi: new Date()
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.addOrdenTrabajoParaFacturar = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_fact: true
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
exports.removeOrdenTrabajoParaFacturar = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_fact: false
    }, {
        where: {
            ordt_id: req.body.OrdenTrabajo.ordt_id
        }
    }).then((Actualizado) => {
        Sequelize_1.OrdenTrabajo.findByPk(Actualizado[0]).then((objOrdenTrabajo) => {
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
//CAJA
exports.getOrdenTrabajoAutorizadas = (req, res) => {
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            { model: Sequelize_1.Persona },
            //obtener la placa de la carreta
            //una opcion que grabe en un campo carreta
            { model: Sequelize_1.Vehiculos, as: 'vehiculoOrden' },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            //obtener la placa del vehiculo
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }]
            }
        ],
        where: {
            ordt_esta: "AUTORIZADA"
        },
        limit: 5
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            where: {
                ordt_esta: "AUTORIZADA"
            }
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando OrdenTrabajo',
            errors: err
        });
    });
};
// OBTENER ORDENES DE TRABAJO "PAGADAS" "FACTURADAS" "" SEGUND ID DEL PROVEEDOR
exports.getOrdenTrabajoFacturadasByIdProveedor = (req, res) => {
    Sequelize_1.OrdenTrabajo.findAll({
        attributes: ['ordt_id', 'ordt_nser', 'ordt_acta', 'ordt_sald', 'ordt_flet', 'ordt_detra', 'ordt_dotro', 'ordt_esta', 'ordt_fech', 'ordt_fefi', 'ordt_fpbanco', 'ordt_pter', 'ordt_dbanc'],
        include: [
            {
                model: Sequelize_1.Vehiculos, as: 'vehiculoOrden',
                attributes: ['vehi_placa', 'pers_raso'],
                include: [
                    {
                        model: Sequelize_1.Persona, as: 'proveedor',
                        attributes: ['pers_id', 'pers_tcta', 'pers_banc', 'pers_ncta', 'pers_temo1', 'pers_email']
                    }
                ],
                where: {
                    prov_id: req.params.id
                }
            },
            {
                model: Sequelize_1.Vehiculos, as: 'carretaOrden',
                attributes: ['vehi_placa']
            },
            {
                model: Sequelize_1.RutaCliente,
                attributes: ['id'],
                include: [{
                        model: Sequelize_1.Rutas,
                        attributes: ['ruta_inic', 'ruta_fin'],
                    }]
            },
        ],
        where: {
            [Op.or]: [
                { ordt_esta: 'COBRADO' },
                { ordt_esta: 'POR PAGAR' }
            ]
        },
        limit: 5
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando OrdenTrabajo',
            errors: err
        });
    });
};
//DASHBOARD
exports.getOrdenesProceso = (req, res) => {
    let hoy = moment();
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            {
                model: Sequelize_1.Vehiculos, as: 'vehiculoOrden',
                attributes: ['vehi_placa', 'pers_raso'],
                include: [
                    {
                        model: Sequelize_1.Persona, as: 'proveedor',
                        attributes: ['pers_id', 'pers_tcta', 'pers_banc', 'pers_ncta', 'pers_temo1', 'pers_email']
                    }
                ]
            },
            {
                model: Sequelize_1.Vehiculos, as: 'carretaOrden',
                attributes: ['vehi_placa']
            },
            {
                model: Sequelize_1.RutaCliente,
                attributes: ['id'],
                include: [{
                        model: Sequelize_1.Rutas,
                        attributes: ['ruta_inic', 'ruta_fin'],
                    }]
            },
        ],
        where: {
            ordt_esta: req.params.estado
        }
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            where: {
                ordt_esta: req.params.estado
            }
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
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
exports.getOrdenesProcesoPorIdConductor = (req, res) => {
    var pers_id = req.params.idconductor;
    let hoy = moment();
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            {
                model: Sequelize_1.Vehiculos, as: 'vehiculoOrden',
                attributes: ['vehi_placa', 'pers_raso'],
                include: [
                    {
                        model: Sequelize_1.Persona, as: 'proveedor',
                        attributes: ['pers_id', 'pers_tcta', 'pers_banc', 'pers_ncta', 'pers_temo1', 'pers_email']
                    }
                ]
            },
            {
                model: Sequelize_1.Vehiculos, as: 'carretaOrden',
                attributes: ['vehi_placa']
            },
            {
                model: Sequelize_1.RutaCliente,
                attributes: ['id'],
                include: [{
                        model: Sequelize_1.Rutas,
                        attributes: ['ruta_inic', 'ruta_fin'],
                    }]
            },
        ],
        where: {
            ordt_esta: req.params.estado,
            pers_id: pers_id
        }
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            where: {
                ordt_esta: req.params.estado,
                pers_id: pers_id
            }
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
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
exports.getOTByIdTrabajador = (req, res) => {
    var pers_id = req.params.idtrabajador;
    Sequelize_1.OrdenTrabajo.findAll({
        where: {
            pers_id: pers_id,
            ordt_esta: {
                [Op.and]: [
                    { [Op.ne]: 'AUTORIZADA' }, { [Op.ne]: 'INICIADA' }
                ]
            },
        }
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            where: {
                pers_id: pers_id,
                ordt_esta: {
                    [Op.and]: [
                        { [Op.ne]: 'AUTORIZADA' }, { [Op.ne]: 'INICIADA' }
                    ]
                }
            }
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoOrdenTrabajo,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando OrdenTrabajo',
            errors: err
        });
    });
};
