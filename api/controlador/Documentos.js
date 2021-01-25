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
exports.getDocumentosXVencerByIdTrabajador = exports.getDocumentosVencidos = exports.actualizarEstados = exports.deleteDocumentos = exports.updateDocumentos = exports.posDocumentos = exports.getDocumentosById = exports.getDocumentosEstados = exports.getDocumentos = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const moment = require('moment');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
exports.getDocumentos = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Documentos.findAll({
        include: [
            { model: Sequelize_1.Persona },
            {
                model: Sequelize_1.DocumentosPersonales,
                include: [{ model: Sequelize_1.TipoDocumento }]
            }
        ],
        offset: desde,
        limit: 5
    }).then((objetoDocumentos) => {
        const amount = Sequelize_1.Documentos.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoDocumentos,
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
exports.getDocumentosEstados = (req, res) => {
    Sequelize_1.Documentos.findAll({
        include: [
            { model: Sequelize_1.Persona },
            {
                model: Sequelize_1.DocumentosPersonales,
                include: [{ model: Sequelize_1.TipoDocumento }]
            }
        ],
        where: {
            docu_esta: {
                [Op.ne]: "VENCIDO"
            }
            //     docu_esta:"VENCIDO"
            // }
        }
    }).then((objetoDocumentos) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoDocumentos,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Documentos',
            errors: err
        });
    });
};
exports.getDocumentosById = (req, res) => {
    Sequelize_1.Documentos.findByPk(req.params.id, {
        include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.DocumentosPersonales }]
    }).then((objDocumentos) => {
        if (objDocumentos) {
            res.status(200).json({
                mensaje: 'Documentos encontrado ',
                Documentos: objDocumentos
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al Documentos'
            });
        }
    });
};
exports.posDocumentos = (req, res) => {
    let objDocumentos = Sequelize_1.Documentos.build(req.body);
    objDocumentos.save().then((objDocumentosCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objDocumentosCreado,
            mensaje: "Documentos Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateDocumentos = (req, res) => {
    Sequelize_1.Documentos.update({
        docu_tipo: req.body.Documentos.docu_tipo,
        docu_docu: req.body.Documentos.docu_docu,
        docu_nro: req.body.Documentos.docu_nro,
        docu_fein: req.body.Documentos.docu_fein,
        docu_fefi: req.body.Documentos.docu_fefi,
        docu_arch: req.body.Documentos.docu_arch,
        docu_esta: req.body.Documentos.docu_esta,
    }, {
        where: {
            docu_id: req.body.Documentos.docu_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Documentos.findByPk(Actualizado[0]).then((objDocumentos) => {
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
exports.deleteDocumentos = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Documentos.destroy({
        where: {
            docu_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Documentos Eliminado",
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
let actualizaEstados = (lista) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        for (let i = 0; i < lista.length; i++) {
            let estados = yield Sequelize_1.Documentos.update(lista[i], {
                where: {
                    docu_id: lista[i].docu_id
                },
                transaction: t
            });
        }
        // let facturaCreado= await Factura.create(factura,{transaction:t});
        // Detalle.fact_id= facturaCreado.fact_id;
        // SerieNro.fact_id= facturaCreado.fact_id;
        // let detalleCreada=  await FacturaDetalle.create(Detalle, {transaction: t});
        // let serieNroCreado= await SerieNumeroDocumentos.create(SerieNro, {transaction: t});
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.actualizarEstados = (req, res) => {
    actualizaEstados(req.body.lista)
        .then((listaDocumentos) => {
        res.status(201).json({
            ok: true,
            mensaje: "lista de Documentos Actualizado correctamente",
            contenido: listaDocumentos
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
exports.getDocumentosVencidos = (req, res) => {
    let hoy = moment();
    Sequelize_1.Documentos.findAll({
        include: [
            { model: Sequelize_1.Persona },
            {
                model: Sequelize_1.DocumentosPersonales,
                include: [{ model: Sequelize_1.TipoDocumento }]
            }
        ],
        where: {
            docu_fefi: {
                [Op.lt]: hoy
            }
        }
    }).then((objetoDocumento) => {
        const amount = Sequelize_1.Documentos.count({
            where: {
                docu_fefi: {
                    [Op.lt]: hoy
                }
            }
        }).then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoDocumento,
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
exports.getDocumentosXVencerByIdTrabajador = (req, res) => {
    var pers_id = req.params.idtrabajador;
    let hoy = moment();
    let fechaAviso = moment().add(20, 'days');
    Sequelize_1.Documentos.findAll({
        include: [
            { model: Sequelize_1.Persona },
            {
                model: Sequelize_1.DocumentosPersonales,
                include: [{ model: Sequelize_1.TipoDocumento }]
            }
        ],
        where: {
            docu_fefi: {
                [Op.and]: [
                    { [Op.lt]: fechaAviso },
                    { [Op.gte]: hoy },
                ]
            },
            pers_id: pers_id
        }
    }).then((objetoDocumento) => {
        const amount = Sequelize_1.Documentos.count({
            where: {
                docu_fefi: {
                    [Op.and]: [
                        { [Op.lt]: fechaAviso },
                        { [Op.gte]: hoy },
                    ]
                },
                pers_id: pers_id
            }
        }).then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoDocumento,
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
