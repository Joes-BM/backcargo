"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTipoDocumentoById = exports.deleteTipoDocumento = exports.updateTipoDocumento = exports.posTipoDocumento = exports.getTipoDocumento = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getTipoDocumento = (req, res) => {
    Sequelize_1.TipoDocumento.findAll({})
        .then((objetoTipoDocumento) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoTipoDocumento
        });
    });
};
exports.posTipoDocumento = (req, res) => {
    let objTipoDocumento = Sequelize_1.TipoDocumento.build(req.body);
    objTipoDocumento.save().then((objTipoDocumentoCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objTipoDocumentoCreado,
            mensaje: "TipoDocumento Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateTipoDocumento = (req, res) => {
    Sequelize_1.TipoDocumento.update({
        tdoc_nom: req.body.TipoDocumento.tdoc_nom,
    }, {
        where: {
            tdoc_id: req.body.TipoDocumento.tdoc_id
        }
    }).then((Actualizado) => {
        Sequelize_1.TipoDocumento.findByPk(Actualizado[0]).then((objTipoDocumento) => {
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
exports.deleteTipoDocumento = (req, res) => {
    let { id } = req.params;
    Sequelize_1.TipoDocumento.destroy({
        where: {
            tdoc_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "TipoDocumento Eliminado",
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
exports.getTipoDocumentoById = (req, res) => {
    Sequelize_1.TipoDocumento.findByPk(req.params.id).then((objTipoDocumento) => {
        if (objTipoDocumento) {
            res.status(200).json({
                mensaje: 'TipoDocumento encontrado ',
                TipoDocumento: objTipoDocumento
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al TipoDocumento'
            });
        }
    });
};
