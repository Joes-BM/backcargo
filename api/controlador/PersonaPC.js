"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersona = exports.updatePersona = exports.postPersona = exports.getPersonaById = exports.getTrabajadores = exports.getClientes = exports.getProveedoresSinVehiculoCombustible = exports.getProveedoresOfTipo = exports.getConductores = exports.getCliente = exports.getProveedor = exports.getPersona = exports.getPersonaByRuc = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
// ****************************
//     OBTENER PERSONA POR NRO DOCUMENTO [RUC][DNI]
// ****************************
exports.getPersonaByRuc = (req, res) => {
    var ndoc = req.params.ndoc;
    Sequelize_1.Persona.findAll({
        where: [{
                [Op.or]: [
                    { pers_ruc: ndoc }, { pers_ndoc: ndoc, pers_ruc: null }
                ]
            }],
        include: [
            {
                model: Sequelize_1.Distrito,
                attributes: ['dist_id', 'dist_nom'],
                include: [{
                        model: Sequelize_1.Provincia,
                        attributes: ['prov_id', 'prov_nom'],
                        include: [{
                                model: Sequelize_1.Departamento,
                                attributes: ['dpto_id', 'dpto_nom'],
                            }]
                    }]
            },
            {
                model: Sequelize_1.Cargo,
                attributes: ['cargo_id', 'cargo_nom'],
                include: [{
                        model: Sequelize_1.Area,
                        attributes: ['area_id', 'area_nom']
                    }]
            },
            {
                model: Sequelize_1.TallasEpp
            }
        ]
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Personas',
            errors: err
        });
    });
};
// ****************************
//     OBTENER DESDE => PERSONAL - PROVEEDOR - CLIENTE 
// ****************************
exports.getPersona = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo2'],
        where: [{
                pers_maes: "TRABAJADOR",
                pers_esta: "ACTIVO"
            }],
        include: [{
                model: Sequelize_1.Cargo
            }],
        offset: desde,
        limit: 5
    }).then((objPersona) => {
        const amount = Sequelize_1.Persona.count({
            where: [{ pers_maes: "TRABAJADOR", pers_esta: "ACTIVO" }]
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objPersona,
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
exports.getProveedor = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_ruc', 'pers_raso', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo2', 'pers_contac', 'pers_temo', 'pers_tper'],
        where: [{
                pers_maes: "PROVEEDOR"
            }],
        offset: desde,
        limit: 5
    }).then((objPersona) => {
        const amount = Sequelize_1.Persona.count({
            where: [{ pers_maes: "PROVEEDOR" }]
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objPersona,
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
exports.getCliente = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_ruc', 'pers_raso', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo2', 'pers_contac', 'pers_temo'],
        where: [{
                pers_maes: "CLIENTE"
            }],
        offset: desde,
        limit: 5
    }).then((objPersona) => {
        const amount = Sequelize_1.Persona.count({
            where: [{ pers_maes: "CLIENTE" }]
        })
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objPersona,
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
//ACTUALIZAR PERSONA
// export let getClienteById=(req:Request,res:Response)=>{
//     Persona.findByPk(req.params.id).
//     then((objPersona:any)=>{
//         res.status(200).json({
//             mensaje:'OK',
//             contenido:objPersona,
//         })
//     }).catch((err:any)=>{
//         res.status(500).json({
//                ok: false,
//                mensaje: 'Error Cargando Personas',
//                errors: err
//            });
//    });
// }
// ****************************
//     OBTENER TODOS CONDUCTORES - PROVEEDORES - CLIENTES
// ****************************
// CONDUCTORES=3
exports.getConductores = (req, res) => {
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma'],
        where: [{
                pers_maes: "TRABAJADOR",
                cargo_id: 3,
                pers_esta: "ACTIVO"
            }],
        include: [{
                model: Sequelize_1.Cargo
            }],
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Conductores',
            errors: err
        });
    });
};
//BUSCAR PROVEEDOR ACTIVO DE [COMBUSTIBLE][ACEITE][VEHICULO]
exports.getProveedoresOfTipo = (req, res) => {
    let tipoPers = req.params.tipo;
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_ruc', 'pers_raso', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_contac', 'pers_temo', 'pers_esta'],
        where: [{
                pers_maes: "PROVEEDOR",
                pers_esta: "ACTIVO",
                pers_tper: tipoPers
            }],
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Proveedores',
            errors: err
        });
    });
};
// BUSCA PROEVEEDORES QUE NO SEAN DE COMBUSTIBLE NI VEHICULO
exports.getProveedoresSinVehiculoCombustible = (req, res) => {
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_ruc', 'pers_raso', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_contac', 'pers_temo', 'pers_esta'],
        where: [{
                pers_maes: "PROVEEDOR",
                pers_esta: "ACTIVO",
                pers_tper: {
                    [Op.and]: [
                        { [Op.ne]: 'COMBUSTIBLE' },
                        { [Op.ne]: 'VEHICULO' },
                    ]
                }
            }],
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Proveedores',
            errors: err
        });
    });
};
// PROVEEDORES DE COMBUSTIBLE ACTIVOS
// export let getProveedores = (req:Request,res:Response)=>{
//     Persona.findAll({
//         attributes:['pers_id','pers_ruc','pers_raso','pers_contac','pers_temo','pers_esta'],
//         where:[{
//             pers_maes:"PROVEEDOR",
//             pers_esta:"ACTIVO",
//             pers_tper:"COMBUSTIBLE"
//         }],
//     }).then((objPersona:any)=>{
//         res.status(200).json({
//             mensaje:'OK',
//             contenido:objPersona,
//         })
//     }).catch((err:any)=>{
//         res.status(500).json({
//                ok: false,
//                mensaje: 'Error Cargando Proveedores',
//                errors: err
//            });
//    });
// }
// PROVEEDORES ACTIVOS Y DE VEHICULOS
// export let getProveedoresOfVehiculos = (req:Request,res:Response)=>{
//     Persona.findAll({
//         attributes:['pers_id','pers_ruc','pers_raso','pers_nomb','pers_appa','pers_apma','pers_contac','pers_temo','pers_esta'],
//         where:[{
//             pers_maes:"PROVEEDOR",
//             pers_esta:"ACTIVO",
//             pers_tper:"VEHICULO"
//         }],
//     }).then((objPersona:any)=>{
//         res.status(200).json({
//             mensaje:'OK',
//             contenido:objPersona,
//         })
//     }).catch((err:any)=>{
//         res.status(500).json({
//                ok: false,
//                mensaje: 'Error Cargando Proveedores',
//                errors: err
//            });
//    });
// }
// CLIENTES
exports.getClientes = (req, res) => {
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_ruc', 'pers_raso', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo2', 'pers_contac', 'pers_temo'],
        where: [{
                pers_maes: "CLIENTE"
            }]
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Personas',
            errors: err
        });
    });
};
// TRABAJADORES
exports.getTrabajadores = (req, res) => {
    Sequelize_1.Persona.findAll({
        attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'cargo_id', 'pers_contac', 'pers_temo', 'pers_esta'],
        where: [{
                pers_maes: "TRABAJADOR",
                pers_esta: "ACTIVO"
            }]
    }).then((objPersona) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Personas',
            errors: err
        });
    });
};
//  CRUD
// ****************************
//     OBTENER PERSONA BY ID
// ****************************
exports.getPersonaById = (req, res) => {
    Sequelize_1.Persona.findByPk(req.params.id, {
        include: [
            {
                model: Sequelize_1.Distrito,
                attributes: ['dist_id', 'dist_nom'],
                include: [{
                        model: Sequelize_1.Provincia,
                        attributes: ['prov_id', 'prov_nom'],
                        include: [{
                                model: Sequelize_1.Departamento,
                                attributes: ['dpto_id', 'dpto_nom'],
                            }]
                    }]
            },
            {
                model: Sequelize_1.Cargo,
                attributes: ['cargo_id', 'cargo_nom'],
                include: [{
                        model: Sequelize_1.Area,
                        attributes: ['area_id', 'area_nom']
                    }]
            },
            {
                model: Sequelize_1.TallasEpp
            }
        ]
    }).then((objPersona) => {
        if (objPersona) {
            res.status(200).json({
                mensaje: 'Persona encontrado ',
                Persona: objPersona
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al Persona'
            });
        }
    });
};
// ****************************
//     GRABAR POST PERSONA 
// ****************************
exports.postPersona = (req, res) => {
    let objPersona = Sequelize_1.Persona.build(req.body);
    objPersona.save().then((objPersonaCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objPersonaCreado,
            mensaje: "Persona Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
// ****************************
//     ACTUALIZAR PERSONA
// ****************************
exports.updatePersona = (req, res) => {
    Sequelize_1.Persona.update({
        pers_ruc: req.body.Persona.pers_ruc,
        pers_raso: req.body.Persona.pers_raso,
        pers_ndoc: req.body.Persona.pers_ndoc,
        pers_nomb: req.body.Persona.pers_nomb,
        pers_appa: req.body.Persona.pers_appa,
        pers_apma: req.body.Persona.pers_apma,
        pers_dire: req.body.Persona.pers_dire,
        pers_sexo: req.body.Persona.pers_sexo,
        pers_fena: req.body.Persona.pers_fena,
        pers_temo1: req.body.Persona.pers_temo1,
        pers_temo2: req.body.Persona.pers_temo2,
        pers_email: req.body.Persona.pers_email,
        pers_tcta: req.body.Persona.pers_tcta,
        pers_ncta: req.body.Persona.pers_ncta,
        pers_banc: req.body.Persona.pers_banc,
        pers_contac: req.body.Persona.pers_contac,
        pers_temo: req.body.Persona.pers_temo,
        pers_ause: req.body.Persona.pers_ause,
        pers_esta: req.body.Persona.pers_esta,
        pers_trab: req.body.Persona.pers_trab,
        pers_terc: req.body.Persona.pers_terc,
        pers_fopa: req.body.Persona.pers_fopa,
        pers_suel: req.body.Persona.pers_suel,
        pers_fein: req.body.Persona.pers_fein,
        pers_fefi: req.body.Persona.pers_fefi,
        pers_tper: req.body.Persona.pers_tper,
        pers_plaz: req.body.Persona.pers_plaz,
        pers_afpa: req.body.Persona.pers_afpa,
        dist_id: req.body.Persona.dist_id,
        tall_id: req.body.Persona.tall_id,
        cargo_id: req.body.Persona.cargo_id,
    }, {
        where: {
            pers_id: req.body.Persona.pers_id
        }
    }).then((Actualizado) => {
        Sequelize_1.Persona.findByPk(Actualizado[0]).then((objPersona) => {
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
// ****************************
//     BORRAR PERSONA
// ****************************
exports.deletePersona = (req, res) => {
    let { id } = req.params;
    Sequelize_1.Persona.destroy({
        where: {
            pers_id: id
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Persona Eliminado",
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
