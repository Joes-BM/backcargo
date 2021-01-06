"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDopeByIdTiDo = exports.deleteDocumentosPersonales = exports.updateDocumentosPersonales = exports.posDocumentosPersonales = exports.getDocumentosPersonalesById = exports.getDocumentosPersonales = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getDocumentosPersonales = (req, res) => {
    Sequelize_1.DocumentosPersonales.findAll({})
        .then((objetoDocumentosPersonales) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoDocumentosPersonales
        });
    });
};
exports.getDocumentosPersonalesById = (req, res) => {
    Sequelize_1.DocumentosPersonales.findByPk(req.params.id).then((objDocumentosPersonales) => {
        if (objDocumentosPersonales) {
            res.status(200).json({
                mensaje: 'DocumentosPersonales encontrado ',
                DocumentosPersonales: objDocumentosPersonales
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al DocumentosPersonales'
            });
        }
    });
};
exports.posDocumentosPersonales = (req, res) => {
    let objDocumentosPersonales = Sequelize_1.DocumentosPersonales.build(req.body);
    objDocumentosPersonales.save().then((objDocumentosPersonalesCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objDocumentosPersonalesCreado,
            mensaje: "DocumentosPersonales Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateDocumentosPersonales = (req, res) => {
    Sequelize_1.DocumentosPersonales.update({
        dope_nom: req.body.DocumentosPersonales.dope_nom
    }, {
        where: {
            dope_id: req.body.DocumentosPersonales.dope_id
        }
    }).then((Actualizado) => {
        Sequelize_1.DocumentosPersonales.findByPk(Actualizado[0]).then((objDocumentosPersonales) => {
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
exports.deleteDocumentosPersonales = (req, res) => {
    let { id } = req.params;
    Sequelize_1.DocumentosPersonales.destroy({
        where: {
            dope_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "DocumentosPersonales Eliminado",
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
exports.getDopeByIdTiDo = (req, res) => {
    Sequelize_1.DocumentosPersonales.findAll({
        where: {
            tdoc_id: req.params.id
        }
    })
        .then((objetoCargo) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoCargo
        });
    });
};
