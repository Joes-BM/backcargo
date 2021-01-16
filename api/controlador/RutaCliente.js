"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerRutaClienteByIdCliente = exports.getRutaClienteById = exports.deleteRutaCliente = exports.updateRutaCliente = exports.posRutaCliente = exports.getRutaCliente = exports.obtenerRutaCliente = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// DESDE
exports.obtenerRutaCliente = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.RutaCliente.findAll({
        offset: desde,
        limit: 5
    }).then((objRutaCliente) => {
        const amount = Sequelize_1.RutaCliente.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objRutaCliente,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando RutaClientes',
            errors: err
        });
    });
};
// TODOS
exports.getRutaCliente = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.RutaCliente.findAll({
        include: [{ model: Sequelize_1.Rutas }, { model: Sequelize_1.Persona }],
        offset: desde,
        limit: 5
    }).then((objRutaCliente) => {
        const amount = Sequelize_1.RutaCliente.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objRutaCliente,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando RutaClientes',
            errors: err
        });
    });
};
// GRABAR
exports.posRutaCliente = (req, res) => {
    let objRutaCliente = Sequelize_1.RutaCliente.build(req.body);
    objRutaCliente.save().then((objRutaClienteCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objRutaClienteCreado,
            mensaje: "RutaCliente Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
// ACTUALIZAR
exports.updateRutaCliente = (req, res) => {
    Sequelize_1.RutaCliente.update({
        rucli_tipo: req.body.RutaCliente.rucli_tipo,
        rucli_xflete: req.body.RutaCliente.rucli_xflete,
        rucli_flete: req.body.RutaCliente.rucli_flete,
        rucli_xpeso: req.body.RutaCliente.rucli_xpeso,
        rucli_peso: req.body.RutaCliente.rucli_peso,
        rucli_esta: req.body.RutaCliente.rucli_esta,
        rucli_desc: req.body.RutaCliente.rucli_desc,
    }, {
        where: {
            id: req.body.RutaCliente.id
        }
    }).then((Actualizado) => {
        Sequelize_1.RutaCliente.findByPk(Actualizado[0]).then((objRutaCliente) => {
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
// BORRAR
exports.deleteRutaCliente = (req, res) => {
    let { id } = req.params;
    Sequelize_1.RutaCliente.destroy({
        where: {
            id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "RutaCliente Eliminado",
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
// BUSCAR POR ID - [ACTUALIZAR]
exports.getRutaClienteById = (req, res) => {
    Sequelize_1.RutaCliente.findByPk(req.params.id, {
        include: [{ model: Sequelize_1.Rutas }, { model: Sequelize_1.Persona, attributes: ['pers_raso'] }]
    }).then((objRutaCliente) => {
        if (objRutaCliente) {
            res.status(200).json({
                message: 'RutaCliente encontrado ',
                contenido: objRutaCliente
            });
        }
        else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al RutaCliente'
            });
        }
    });
};
exports.obtenerRutaClienteByIdCliente = (req, res) => {
    Sequelize_1.RutaCliente.findAll({
        include: [
            {
                model: Sequelize_1.Persona,
                attributes: ['pers_id', 'pers_raso', 'pers_ruc', 'pers_ndoc', 'pers_dire', 'pers_esta']
            },
            {
                model: Sequelize_1.Rutas,
                attributes: ['ruta_inic', 'ruta_fin', 'ruta_km']
            }
        ],
        where: {
            pers_id: req.params.id,
            rucli_carr: req.params.carr
        }
    })
        .then((objetoRutaCliente) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoRutaCliente
        });
    });
};
