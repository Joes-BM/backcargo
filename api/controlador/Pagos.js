"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagosById = exports.deletePagos = exports.updatePagos = exports.posPagos = exports.getPagos = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getPagos = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Pagos.findAll({
        include: [{
                model: Sequelize_1.Vehiculos,
                attributes: ['vehi_id', 'vehi_placa']
            }],
        offset: desde,
        limit: 5
    }).then((objetoPagos) => {
        const amount = Sequelize_1.Pagos.count()
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
exports.posPagos = (req, res) => {
    let objPagos = Sequelize_1.Pagos.build(req.body);
    objPagos.save().then((objPagosCreado) => {
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
exports.updatePagos = (req, res) => {
    Sequelize_1.Pagos.update({
        pag_tipo: req.body.Pagos.pag_tipo,
        pag_fein: req.body.Pagos.pag_fein,
        pag_fefi: req.body.Pagos.pag_fefi,
        pag_cost: req.body.Pagos.pag_cost,
        pag_arch: req.body.Pagos.pag_arch,
    }, {
        where: {
            pag_id: req.body.Pagos.pag_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Pagos.findByPk(Actualizado[0]).then((objPagos) => {
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
exports.deletePagos = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Pagos.destroy({
        where: {
            pag_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Pagos Eliminado",
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
exports.getPagosById = (req, res) => {
    Sequelize_1.Pagos.findByPk(req.params.id, {
        include: [{ model: Sequelize_1.Vehiculos,
                attributes: ['vehi_id', 'vehi_placa']
            }]
    }).then((objPagos) => {
        if (objPagos) {
            res.status(200).json({
                mensaje: 'PAgo encontrado ',
                Pago: objPagos
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro el Pago'
            });
        }
    });
};
