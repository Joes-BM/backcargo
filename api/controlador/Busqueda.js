"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscar = exports.busqEspecifica = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
// ****************************
//     BUSQUEDA ESPECIFICA
// ****************************
exports.busqEspecifica = (req, res) => {
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var promesa;
    switch (tabla) {
        case 'cliente':
            promesa = buscarClientes(busqueda);
            break;
        case 'proveedor':
            promesa = buscarProveedores(busqueda);
            break;
        case 'trabajador':
            promesa = buscarTrabajadores(busqueda);
            break;
        case 'vehiculo':
            promesa = buscarVehiculos(busqueda);
            break;
        case 'ruta':
            promesa = buscarRutas(busqueda);
            break;
        case 'rutacliente':
            promesa = buscarRutaCliente(busqueda);
            break;
        case 'documento':
            promesa = buscarDocumentos(busqueda);
            break;
        case 'pago':
            promesa = buscarPagos(busqueda);
            break;
        case 'caja':
            promesa = buscarCaja(busqueda);
            break;
        case 'facturar':
            promesa = buscarOrdenTrabajoPorFacturar(busqueda);
            break;
        case 'pagospersonal':
            promesa = buscarPagosPersonalByConcluidos(busqueda);
            break;
        // case 'combustible':
        //     promesa= buscarCombustible(busqueda);
        //     break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda solo son clientes, proveedores, trabajadores',
                error: { message: 'tipo de tabla/coleccion no valido' }
            });
    }
    promesa.then((data) => {
        res.status(200).json({
            mensaje: 'OK',
            [tabla]: data
        });
    });
};
// ****************************
//     BUSQUEDA GENERAL
// ****************************
exports.buscar = (req, res) => {
    var busqueda = req.params.busqueda;
    Promise.all([
        buscarTrabajadores(busqueda),
        buscarProveedores(busqueda),
        buscarClientes(busqueda),
        buscarVehiculos(busqueda),
        buscarRutas(busqueda),
        buscarRutaCliente(busqueda),
        buscarDocumentos(busqueda),
        buscarPagos(busqueda),
        buscarCaja(busqueda),
        buscarOrdenTrabajoPorFacturar(busqueda),
        buscarPagosPersonalByConcluidos(busqueda),
    ]).then((respuestas) => {
        res.status(200).json({
            mensaje: 'OK',
            trabajador: respuestas[0],
            proveedor: respuestas[1],
            cliente: respuestas[2],
            vehiculo: respuestas[3],
            ruta: respuestas[4],
            rutacliente: respuestas[5],
            documento: respuestas[6],
            pago: respuestas[7],
            caja: respuestas[8],
            factura: respuestas[9],
            pagospersonal: respuestas[10],
        });
    });
    // buscarTrabajadores(busqueda)
    // .then((resp:any)=>{
    // })
};
function buscarTrabajadores(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Persona.findAll({
            attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma', 'pers_temo2'],
            where: [{
                    //QUE BUSQUE POR NOMBRE APELLIDOS UTILIZANDO UN OR
                    [Op.or]: [{
                            pers_nomb: {
                                [Op.regexp]: busqueda
                            }
                        }, {
                            pers_appa: {
                                [Op.regexp]: busqueda
                            }
                        }, {
                            pers_apma: {
                                [Op.regexp]: busqueda
                            }
                        }],
                    pers_maes: 'TRABAJADOR'
                }],
            include: [{
                    model: Sequelize_1.Cargo
                }]
        })
            .then((objTrabajadores) => {
            resolve(objTrabajadores);
        })
            .catch((err) => {
            reject("Error al cargar Trabajadores" + err);
        });
    });
}
function buscarProveedores(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Persona.findAll({
            attributes: ['pers_ruc', 'pers_raso', 'pers_contac', 'pers_temo'],
            where: [{
                    pers_raso: {
                        [Op.regexp]: busqueda
                    },
                    pers_maes: 'PROVEEDOR'
                }]
        })
            .then((objProveedores) => {
            resolve(objProveedores);
        })
            .catch((err) => {
            reject("Error al cargar Proveedores" + err);
        });
    });
}
function buscarClientes(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Persona.findAll({
            attributes: ['pers_ruc', 'pers_raso', 'pers_contac', 'pers_temo'],
            where: [{
                    pers_raso: {
                        [Op.regexp]: busqueda
                    },
                    pers_maes: 'CLIENTE'
                }]
        })
            .then((objClientes) => {
            resolve(objClientes);
        })
            .catch((err) => {
            reject("Error al cargar Clientes" + err);
        });
    });
}
function buscarVehiculos(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Vehiculos.findAll({
            attributes: ['vehi_id', 'vehi_placa', 'vehi_esta', 'vehi_cond'],
            where: [{
                    vehi_placa: {
                        [Op.regexp]: busqueda
                    },
                    vehi_esta: 'ACTIVO'
                }],
            include: [{
                    model: Sequelize_1.Persona, as: 'trabajador',
                    attributes: ['pers_nomb', 'pers_appa', 'pers_apma']
                }, {
                    model: Sequelize_1.Clase,
                    attributes: ['clase_id', 'clase_nom']
                }, {
                    model: Sequelize_1.Persona, as: 'proveedor'
                }]
        }).then((objVehiculos) => {
            resolve(objVehiculos);
        })
            .catch((err) => {
            reject("Error al cargar Vehiculos" + err);
        });
    });
}
function buscarRutas(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Rutas.findAll({
            where: [{
                    [Op.or]: [{
                            ruta_inic: {
                                [Op.regexp]: busqueda
                            }
                        }, {
                            ruta_fin: {
                                [Op.regexp]: busqueda
                            }
                        }]
                }],
        })
            .then((objRutas) => {
            resolve(objRutas);
        })
            .catch((err) => {
            reject("Error al cargar Rutas" + err);
        });
    });
}
function buscarRutaCliente(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.RutaCliente.findAll({
            include: [
                {
                    model: Sequelize_1.Rutas,
                    where: [{
                            [Op.or]: [{
                                    ruta_inic: {
                                        [Op.regexp]: busqueda
                                    }
                                }, {
                                    ruta_fin: {
                                        [Op.regexp]: busqueda
                                    }
                                }
                            ]
                        }],
                },
                {
                    model: Sequelize_1.Persona
                }
            ]
        })
            .then((objRutaCliente) => {
            resolve(objRutaCliente);
        })
            .catch((err) => {
            reject("Error al cargar Rutas Clientes" + err);
        });
    });
}
function buscarDocumentos(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Documentos.findAll({
            include: [{
                    model: Sequelize_1.Persona,
                    attributes: ['pers_id', 'pers_nomb', 'pers_appa', 'pers_apma'],
                    where: [{
                            [Op.or]: [{
                                    pers_nomb: {
                                        [Op.regexp]: busqueda
                                    }
                                }, {
                                    pers_appa: {
                                        [Op.regexp]: busqueda
                                    }
                                }, {
                                    pers_apma: {
                                        [Op.regexp]: busqueda
                                    }
                                }]
                        }]
                }, {
                    model: Sequelize_1.DocumentosPersonales,
                    attributes: ['dope_id', 'dope_nom']
                }]
        })
            .then((objDocumentos) => {
            resolve(objDocumentos);
        })
            .catch((err) => {
            reject("Error al cargar Documentos" + err);
        });
    });
}
function buscarPagos(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Pagos.findAll({
            include: [{
                    model: Sequelize_1.Vehiculos,
                    attributes: ['vehi_id', 'vehi_placa'],
                    where: [{
                            [Op.or]: [{
                                    vehi_placa: {
                                        [Op.regexp]: busqueda
                                    }
                                }]
                        }]
                }]
        })
            .then((objPagos) => {
            resolve(objPagos);
        })
            .catch((err) => {
            reject("Error al cargar Pagos" + err);
        });
    });
}
function buscarCaja(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.Caja.findAll({
            where: [{
                    [Op.or]: [{
                            caja_girar_a: {
                                [Op.regexp]: busqueda
                            }
                        }, {
                            caja_esta: {
                                [Op.regexp]: busqueda
                            }
                        }]
                }]
        }).then((objPagos) => {
            resolve(objPagos);
        }).catch((err) => {
            reject("Error al cargar Pagos" + err);
        });
    });
}
function buscarOrdenTrabajoPorFacturar(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.OrdenTrabajo.findAll({
            where: [{
                    ordt_esta: 'TERMINADO',
                }],
            include: [{
                    model: Sequelize_1.RutaCliente,
                    required: true,
                    include: [{ model: Sequelize_1.Persona,
                            where: {
                                pers_raso: {
                                    [Op.regexp]: busqueda
                                }
                            }
                        },
                        { model: Sequelize_1.Rutas }],
                }, { model: Sequelize_1.Persona },
                //obtener la placa de la carreta
                //una opcion que grabe en un campo carreta
                { model: Sequelize_1.Vehiculos },
            ],
        }).then((objPagos) => {
            resolve(objPagos);
        }).catch((err) => {
            reject("Error al cargar Pagos" + err);
        });
    });
}
function buscarPagosPersonalByConcluidos(busqueda) {
    return new Promise((resolve, reject) => {
        Sequelize_1.PagosPersonal.findAll({
            where: [{
                    pagper_estt: "CONCLUIDO",
                }],
            include: [{
                    model: Sequelize_1.Persona,
                    required: true,
                    attributes: ['pers_nomb', 'pers_appa', 'pers_apma', 'pers_tcta', 'pers_ncta', 'pers_banc', 'pers_fopa', 'pers_suel'],
                    where: {
                        [Op.or]: [{
                                pers_nomb: {
                                    [Op.regexp]: busqueda
                                }
                            }, {
                                pers_appa: {
                                    [Op.regexp]: busqueda
                                }
                            }, {
                                pers_apma: {
                                    [Op.regexp]: busqueda
                                }
                            }],
                        pers_maes: 'TRABAJADOR'
                    }
                }]
        }).then((objPagos) => {
            resolve(objPagos);
        }).catch((err) => {
            reject("Error al cargar Pagos del Personal" + err);
        });
    });
}
