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
exports.posFactura = exports.getOTSeleccionados = exports.getOrdenTrabajoPorFacturar = exports.getOrdenTrabajoPorFacturarPorCliente = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
// FACTURAR
exports.getOrdenTrabajoPorFacturarPorCliente = (req, res) => {
    var idCliente = req.params.idCliente;
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            { model: Sequelize_1.Persona },
            //obtener la placa de la carreta
            //una opcion que grabe en un campo carreta
            { model: Sequelize_1.Vehiculos, as: 'vehiculoOrden' },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }],
                where: {
                    pers_id: idCliente
                }
            }
        ],
        where: {
            ordt_esta: 'TERMINADO'
        }
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            include: [
                {
                    model: Sequelize_1.RutaCliente,
                    include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }],
                    where: {
                        pers_id: idCliente
                    }
                }
            ],
            where: {
                ordt_esta: 'TERMINADO'
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
exports.getOrdenTrabajoPorFacturar = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            { model: Sequelize_1.Persona },
            //obtener la placa de la carreta
            //una opcion que grabe en un campo carreta
            { model: Sequelize_1.Vehiculos, as: 'vehiculoOrden' },
            { model: Sequelize_1.Vehiculos, as: 'carretaOrden' },
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }],
            }
        ],
        where: {
            ordt_esta: 'TERMINADO'
        },
        offset: desde,
        limit: 5
    }).then((objetoOrdenTrabajo) => {
        const amount = Sequelize_1.OrdenTrabajo.count({
            include: [
                {
                    model: Sequelize_1.RutaCliente,
                    include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.Rutas }],
                }
            ],
            where: {
                ordt_esta: 'TERMINADO'
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
exports.getOTSeleccionados = (req, res) => {
    Sequelize_1.OrdenTrabajo.findAll({
        include: [
            {
                model: Sequelize_1.RutaCliente,
                include: [{ model: Sequelize_1.Persona }]
            }
        ],
        where: {
            ordt_fact: true,
            ordt_esta: "TERMINADO"
        }
    })
        .then((objetoArea) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoArea
        });
    });
};
// grabar FACTURA
let crearFactura = (factura, Detalle, SerieNro) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        let facturaCreado = yield Sequelize_1.Factura.create(factura, { transaction: t });
        Detalle.fact_id = facturaCreado.fact_id;
        SerieNro.fact_id = facturaCreado.fact_id;
        let detalleCreada = yield Sequelize_1.FacturaDetalle.create(Detalle, { transaction: t });
        let serieNroCreado = yield Sequelize_1.SerieNumeroDocumentos.create(SerieNro, { transaction: t });
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.posFactura = (req, res) => {
    // console.log("********************************");
    // console.log(req.body);
    // console.log("********************************");
    crearFactura(req.body.factura, req.body.detalle, req.body.serienro)
        .then((factura) => {
        res.status(201).json({
            ok: true,
            mensaje: "Factura Creada correctamente",
            contenido: factura
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
