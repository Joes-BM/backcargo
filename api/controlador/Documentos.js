"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocumentos = exports.updateDocumentos = exports.posDocumentos = exports.getDocumentosById = exports.getDocumentos = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getDocumentos = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Documentos.findAll({
        include: [{ model: Sequelize_1.Persona }, { model: Sequelize_1.DocumentosPersonales }],
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
