"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerieNumeroDocumentos = exports.DocumentosPersonales = exports.TipoDocumento = exports.Cargo = exports.Area = exports.PagosPersonalDetalle = exports.PagosPersonal = exports.Pagos = exports.Vehiculos = exports.Usuario = exports.TipoTrabajador = exports.TallasEpp = exports.Rutas = exports.RutaCliente = exports.Persona = exports.OrdenTrabajo = exports.Modelo = exports.Marca = exports.MantenimientoDetalle = exports.Mantenimiento = exports.Liquidacion = exports.LiquidarOrdenTrabajo = exports.GuiasRemision = exports.FacturaDetalle = exports.Factura = exports.Documentos = exports.Combustible = exports.Clase = exports.Caja = exports.Distrito = exports.Provincia = exports.Departamento = exports.conexion = void 0;
const Departamento_1 = require("../modelos/Departamento");
const Provincia_1 = require("../modelos/Provincia");
const Distrito_1 = require("../modelos/Distrito");
const Caja_1 = require("../modelos/Caja");
const Clase_1 = require("../modelos/Clase");
const Combustible_1 = require("../modelos/Combustible");
const Documentos_1 = require("../modelos/Documentos");
const Factura_1 = require("../modelos/Factura");
const FacturaDetalle_1 = require("../modelos/FacturaDetalle");
const GuiasRemision_1 = require("../modelos/GuiasRemision");
const Liquidacion_1 = require("../modelos/Liquidacion");
const Mantenimiento_1 = require("../modelos/Mantenimiento");
const MantenimientoDetalle_1 = require("../modelos/MantenimientoDetalle");
const Marca_1 = require("../modelos/Marca");
const Modelo_1 = require("../modelos/Modelo");
const PersonaPC_1 = require("../modelos/PersonaPC");
const OrdenTrabajo_1 = require("../modelos/OrdenTrabajo");
const RutaCliente_1 = require("../modelos/RutaCliente");
const Rutas_1 = require("../modelos/Rutas");
const TallasEpp_1 = require("../modelos/TallasEpp");
const TipoTrabajador_1 = require("../modelos/TipoTrabajador");
const Usuario_1 = require("../modelos/Usuario");
const Vehiculos_1 = require("../modelos/Vehiculos");
const Pagos_1 = require("../modelos/Pagos");
const Area_1 = require("../modelos/Area");
const Cargo_1 = require("../modelos/Cargo");
const TipoDocumento_1 = require("../modelos/TipoDocumento");
const DocumentosPersonales_1 = require("../modelos/DocumentosPersonales");
const PagosPersonalDetalle_1 = require("../modelos/PagosPersonalDetalle");
const PagosPersonal_1 = require("../modelos/PagosPersonal");
const LiquidarOrdenTrabajo_1 = require("../modelos/LiquidarOrdenTrabajo");
const SerieNroDocumentos_1 = require("../modelos/SerieNroDocumentos");
const Sequelize = require('sequelize');
// exports.conexion = new Sequelize("operbam", "root", "root", {
//     host: 'localhost',
//     dialect: 'mysql',
//     timezone: '-05:00',
//     // configuración para lectura de fechas en la base de datos
//     dialectOptions: {
//         useUTC: false,
//         dateStrings: true,
//         typeCast: true
//     }
// });
exports.conexion = new Sequelize("JFUbCDh2H4", "JFUbCDh2H4", "KYG2VG9Agt", {
    host: 'remotemysql.com',
    dialect: 'mysql',
    timezone: '-05:00',
    // configuración para lectura de fechas en la base de datos
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    }
});
exports.Departamento = Departamento_1.Departamento_model(exports.conexion);
exports.Provincia = Provincia_1.provincia_model(exports.conexion);
exports.Distrito = Distrito_1.Distrito_model(exports.conexion);
exports.Caja = Caja_1.Caja_model(exports.conexion);
exports.Clase = Clase_1.Clase_model(exports.conexion);
exports.Combustible = Combustible_1.Combustible_model(exports.conexion);
exports.Documentos = Documentos_1.Documento_model(exports.conexion);
exports.Factura = Factura_1.Factura_model(exports.conexion);
exports.FacturaDetalle = FacturaDetalle_1.FacturaDetalle_model(exports.conexion);
exports.GuiasRemision = GuiasRemision_1.GuiasRemision_model(exports.conexion);
exports.LiquidarOrdenTrabajo = LiquidarOrdenTrabajo_1.LiquidarOrdenTrabajo_model(exports.conexion);
exports.Liquidacion = Liquidacion_1.Liquidacion_model(exports.conexion);
exports.Mantenimiento = Mantenimiento_1.Mantenimiento_model(exports.conexion);
exports.MantenimientoDetalle = MantenimientoDetalle_1.Mantenimientodetalle_model(exports.conexion);
exports.Marca = Marca_1.Marca_model(exports.conexion);
exports.Modelo = Modelo_1.Modelo_model(exports.conexion);
exports.OrdenTrabajo = OrdenTrabajo_1.OrdenTrabajo_model(exports.conexion);
exports.Persona = PersonaPC_1.Persona_model(exports.conexion);
exports.RutaCliente = RutaCliente_1.RutaCliente_model(exports.conexion);
exports.Rutas = Rutas_1.Rutas_model(exports.conexion);
exports.TallasEpp = TallasEpp_1.TallasEpp_model(exports.conexion);
exports.TipoTrabajador = TipoTrabajador_1.TipoTrabajador_model(exports.conexion);
exports.Usuario = Usuario_1.usuario_model(exports.conexion);
exports.Vehiculos = Vehiculos_1.Vehiculos_model(exports.conexion);
exports.Pagos = Pagos_1.Pagos_model(exports.conexion);
exports.PagosPersonal = PagosPersonal_1.PagosPersonal_model(exports.conexion);
exports.PagosPersonalDetalle = PagosPersonalDetalle_1.PagosPersonalDetalle_model(exports.conexion);
exports.Area = Area_1.Area_model(exports.conexion);
exports.Cargo = Cargo_1.Cargo_model(exports.conexion);
exports.TipoDocumento = TipoDocumento_1.TipoDocumento_model(exports.conexion);
exports.DocumentosPersonales = DocumentosPersonales_1.DocumentosPersonales_model(exports.conexion);
exports.SerieNumeroDocumentos = SerieNroDocumentos_1.SerieNro_model(exports.conexion);
//RELACIONES
exports.Marca.hasMany(exports.Modelo, { foreignKey: "marc_id" });
exports.Modelo.belongsTo(exports.Marca, { foreignKey: "marc_id" });
exports.Modelo.hasMany(exports.Vehiculos, { foreignKey: "mod_id" });
exports.Vehiculos.belongsTo(exports.Modelo, { foreignKey: "mod_id" });
exports.Clase.hasMany(exports.Vehiculos, { foreignKey: "clase_id" });
exports.Vehiculos.belongsTo(exports.Clase, { foreignKey: "clase_id" });
exports.Vehiculos.hasMany(exports.Mantenimiento, { foreignKey: "vehi_id" });
exports.Mantenimiento.belongsTo(exports.Vehiculos, { foreignKey: "vehi_id" });
exports.Vehiculos.hasMany(exports.Pagos, { foreignKey: "vehi_id" });
exports.Pagos.belongsTo(exports.Vehiculos, { foreignKey: "vehi_id" });
exports.Persona.hasMany(exports.PagosPersonal, { foreignKey: "pers_id" });
exports.PagosPersonal.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.PagosPersonal.hasMany(exports.PagosPersonalDetalle, { foreignKey: "pagper_id" });
exports.PagosPersonalDetalle.belongsTo(exports.PagosPersonal, { foreignKey: "pagper_id" });
// VEHICULO - ORDEN DE TRABAJO
exports.Vehiculos.hasMany(exports.OrdenTrabajo, { as: 'vehiculoOrden', foreignKey: "vehi_id" });
exports.OrdenTrabajo.belongsTo(exports.Vehiculos, { as: 'vehiculoOrden', foreignKey: "vehi_id" });
exports.Vehiculos.hasMany(exports.OrdenTrabajo, { as: 'carretaOrden', foreignKey: "carr_id" });
exports.OrdenTrabajo.belongsTo(exports.Vehiculos, { as: 'carretaOrden', foreignKey: "carr_id" });
//==============================
exports.RutaCliente.hasMany(exports.OrdenTrabajo, { foreignKey: "rucli_id" });
exports.OrdenTrabajo.belongsTo(exports.RutaCliente, { foreignKey: "rucli_id" });
// UBIGEO
exports.Provincia.hasMany(exports.Distrito, { foreignKey: "prov_id" });
exports.Distrito.belongsTo(exports.Provincia, { foreignKey: "prov_id" });
exports.Departamento.hasMany(exports.Provincia, { foreignKey: "dpto_id" });
exports.Provincia.belongsTo(exports.Departamento, { foreignKey: "dpto_id" });
exports.Distrito.hasMany(exports.Persona, { foreignKey: "dist_id" });
exports.Persona.belongsTo(exports.Distrito, { foreignKey: "dist_id" });
//==============================
//PERSONA - VEHICULO
exports.Persona.hasMany(exports.Vehiculos, { as: 'trabajador', foreignKey: "pers_id" });
exports.Vehiculos.belongsTo(exports.Persona, { as: 'trabajador', foreignKey: "pers_id" });
exports.Persona.hasMany(exports.Vehiculos, { as: 'proveedor', foreignKey: "prov_id" });
exports.Vehiculos.belongsTo(exports.Persona, { as: 'proveedor', foreignKey: "prov_id" });
//==============================
exports.Persona.hasMany(exports.OrdenTrabajo, { foreignKey: "pers_id" });
exports.OrdenTrabajo.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.Persona.hasMany(exports.Usuario, { foreignKey: "pers_id" });
exports.Usuario.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.Persona.hasMany(exports.RutaCliente, { foreignKey: "pers_id" });
exports.RutaCliente.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.OrdenTrabajo.hasMany(exports.GuiasRemision, { foreignKey: "ordt_id" });
exports.GuiasRemision.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
exports.OrdenTrabajo.hasMany(exports.GuiasRemision, { foreignKey: "ordt_id" });
exports.GuiasRemision.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
//OJO REVISAR
// 1 ORDEN DE TRABAJO LE CORRESPONDE 1 FACTURA
exports.OrdenTrabajo.hasMany(exports.Factura, { foreignKey: "ordt_id" });
exports.Factura.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
exports.OrdenTrabajo.hasMany(exports.Combustible, { foreignKey: "ordt_id" });
exports.Combustible.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
exports.OrdenTrabajo.hasMany(exports.Caja, { foreignKey: "ordt_id" });
exports.Caja.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
//aumentando la relacion ot-liquidarot
exports.OrdenTrabajo.hasMany(exports.LiquidarOrdenTrabajo, { foreignKey: "ordt_id" });
exports.LiquidarOrdenTrabajo.belongsTo(exports.OrdenTrabajo, { foreignKey: "ordt_id" });
// 1 LIQUIDACION DE ORDEN DE TRABJO SE PAGA A 1 PERSONA
// LiquidarOrdenTrabajo.hasOne(Persona,{foreignKey:"liot_id"});
// Persona.belongsTo(LiquidarOrdenTrabajo,{foreignKey:"liot_id"});
//
exports.Factura.hasMany(exports.FacturaDetalle, { foreignKey: "fact_id" });
exports.FacturaDetalle.belongsTo(exports.Factura, { foreignKey: "fact_id" });
//1 FACT -> * SN; 1SN->1F
exports.Factura.hasMany(exports.SerieNumeroDocumentos, { foreignKey: "fact_id" });
exports.SerieNumeroDocumentos.belongsTo(exports.Factura, { foreignKey: "fact_id" });
exports.Caja.hasMany(exports.Liquidacion, { foreignKey: "caja_id" });
exports.Liquidacion.belongsTo(exports.Caja, { foreignKey: "caja_id" });
exports.Persona.hasMany(exports.Caja, { foreignKey: "pers_id" });
exports.Caja.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.TipoDocumento.hasMany(exports.DocumentosPersonales, { foreignKey: "tdoc_id" });
exports.DocumentosPersonales.belongsTo(exports.TipoDocumento, { foreignKey: "tdoc_id" });
//muchos a muchos entre persona y documentos
exports.Persona.hasMany(exports.Documentos, { foreignKey: "pers_id" });
exports.Documentos.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.DocumentosPersonales.hasMany(exports.Documentos, { foreignKey: "dope_id" });
exports.Documentos.belongsTo(exports.DocumentosPersonales, { foreignKey: "dope_id" });
// 
exports.TallasEpp.hasMany(exports.Persona, { foreignKey: "tall_id" });
exports.Persona.belongsTo(exports.TallasEpp, { foreignKey: "tall_id" });
exports.Rutas.hasMany(exports.RutaCliente, { foreignKey: "ruta_id" });
exports.RutaCliente.belongsTo(exports.Rutas, { foreignKey: "ruta_id" });
exports.Mantenimiento.hasMany(exports.MantenimientoDetalle, { foreignKey: "mant_id" });
exports.MantenimientoDetalle.belongsTo(exports.Mantenimiento, { foreignKey: "mant_id" });
exports.Persona.hasMany(exports.MantenimientoDetalle, { foreignKey: "pers_id" });
exports.MantenimientoDetalle.belongsTo(exports.Persona, { foreignKey: "pers_id" });
exports.Area.hasMany(exports.Cargo, { foreignKey: "area_id" });
exports.Cargo.belongsTo(exports.Area, { foreignKey: "area_id" });
exports.Cargo.hasMany(exports.Persona, { foreignKey: "cargo_id" });
exports.Persona.belongsTo(exports.Cargo, { foreignKey: "cargo_id" });