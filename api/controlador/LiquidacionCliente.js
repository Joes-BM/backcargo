"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cobrarOrdenTrabajo = exports.obtenerOrdenesTrabajoFacturados = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
exports.obtenerOrdenesTrabajoFacturados = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
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
                        model: Sequelize_1.Persona,
                        attributes: ['pers_id', 'pers_raso', 'pers_plaz', 'pers_afpa'],
                    }]
            },
        ],
        where: {
            ordt_esta: "FACTURADO"
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
exports.cobrarOrdenTrabajo = (req, res) => {
    Sequelize_1.OrdenTrabajo.update({
        ordt_esta: "COBRADO",
        ordt_fpbanco: req.body.OrdenTrabajo.ordt_fpbanco,
        ordt_dbanc: req.body.OrdenTrabajo.ordt_dbanc
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
