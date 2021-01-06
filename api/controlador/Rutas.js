"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRutasById = exports.deleteRutas = exports.updateRutas = exports.posRutas = exports.getRutas = exports.obtenerRutas = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.obtenerRutas = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Rutas.findAll({
        offset: desde,
        limit: 5
    }).then((objRutas) => {
        const amount = Sequelize_1.Rutas.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objRutas,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Rutass',
            errors: err
        });
    });
};
exports.getRutas = (req, res) => {
    Sequelize_1.Rutas.findAll({})
        .then((objetoRutas) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoRutas
        });
    });
};
exports.posRutas = (req, res) => {
    let objRutas = Sequelize_1.Rutas.build(req.body);
    objRutas.save().then((objRutasCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objRutasCreado,
            mensaje: "Rutas Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateRutas = (req, res) => {
    Sequelize_1.Rutas.update({
        ruta_nom: req.body.Rutas.ruta_nom,
        ruta_inic: req.body.Rutas.ruta_inic,
        ruta_fin: req.body.Rutas.ruta_fin,
        ruta_km: req.body.Rutas.ruta_km,
        ruta_esta: req.body.Rutas.ruta_esta
    }, {
        where: {
            ruta_id: req.body.Rutas.ruta_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Rutas.findByPk(Actualizado[0]).then((objRutas) => {
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
exports.deleteRutas = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Rutas.destroy({
        where: {
            ruta_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Rutas Eliminado",
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
exports.getRutasById = (req, res) => {
    Sequelize_1.Rutas.findByPk(req.params.id).then((objRutas) => {
        if (objRutas) {
            res.status(200).json({
                message: 'Rutas encontrado ',
                Rutas: objRutas
            });
        }
        else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Rutas'
            });
        }
    });
};
