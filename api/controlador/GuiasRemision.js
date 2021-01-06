"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuiasRemision = exports.updateGuiasRemision = exports.posGuiasRemision = exports.getGuiasRemisionById = exports.getGuiasRemisionbyIdOrdenTrabajo = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
exports.getGuiasRemisionbyIdOrdenTrabajo = (req, res) => {
    Sequelize_1.GuiasRemision.findAll({
        where: {
            ordt_id: req.params.id
        }
    }).then((objetoGuiasRemision) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoGuiasRemision
        });
    });
};
exports.getGuiasRemisionById = (req, res) => {
    Sequelize_1.GuiasRemision.findByPk(req.params.id, {
    // include:[{model:Persona},{model:Vehiculos},{model:RutaCliente}]
    }).then((objGuiasRemision) => {
        if (objGuiasRemision) {
            res.status(200).json({
                mensaje: 'GuiasRemision encontrado ',
                contenido: objGuiasRemision
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al GuiasRemision'
            });
        }
    });
};
exports.posGuiasRemision = (req, res) => {
    let objGuiasRemision = Sequelize_1.GuiasRemision.build(req.body);
    objGuiasRemision.save().then((objGuiasRemisionCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objGuiasRemisionCreado,
            mensaje: "GuiasRemision Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.updateGuiasRemision = (req, res) => {
    Sequelize_1.GuiasRemision.update({
        grem_de: req.body.GuiasRemision.grem_de,
        grem_serie: req.body.GuiasRemision.grem_serie,
        grem_nro: req.body.GuiasRemision.grem_nro,
        grem_inic: req.body.GuiasRemision.grem_inic,
        grem_fin: req.body.GuiasRemision.grem_fin,
        grem_oser: req.body.GuiasRemision.grem_oser,
    }, {
        where: {
            grem_id: req.body.GuiasRemision.grem_id
        }
    }).then((Actualizado) => {
        Sequelize_1.GuiasRemision.findByPk(Actualizado[0]).then((objGuiasRemision) => {
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
exports.deleteGuiasRemision = (req, res) => {
    let { id } = req.params;
    Sequelize_1.GuiasRemision.destroy({
        where: {
            grem_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "GuiasRemision Eliminado",
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
