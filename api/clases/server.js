"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Sequelize_1 = require("../configuracion/Sequelize");
const Usuario_1 = require("../rutas/Usuario");
const PersonaPC_1 = require("../rutas/PersonaPC");
const Vehiculos_1 = require("../rutas/Vehiculos");
const Upload_1 = require("../rutas/Upload");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Imagenes_1 = require("../rutas/Imagenes");
const Departamento_1 = require("../rutas/Departamento");
const Provincia_1 = require("../rutas/Provincia");
const Distrito_1 = require("../rutas/Distrito");
const Area_1 = require("../rutas/Area");
const Cargo_1 = require("../rutas/Cargo");
const Tallas_1 = require("../rutas/Tallas");
const Busqueda_1 = require("../rutas/Busqueda");
const Clase_1 = require("../rutas/Clase");
const Marca_1 = require("../rutas/Marca");
const Modelo_1 = require("../rutas/Modelo");
const Rutas_1 = require("../rutas/Rutas");
const RutaCliente_1 = require("../rutas/RutaCliente");
const Documentos_1 = require("../rutas/Documentos");
const TipoDocumento_1 = require("../rutas/TipoDocumento");
const DocumentoPersonal_1 = require("../rutas/DocumentoPersonal");
const Pagos_1 = require("../rutas/Pagos");
const OrdenTrabajo_1 = require("../rutas/OrdenTrabajo");
const GuiasRemision_1 = require("../rutas/GuiasRemision");
const Caja_1 = require("../rutas/Caja");
const Combustible_1 = require("../rutas/Combustible");
const Facturar_1 = require("../rutas/Facturar");
const Mantenimiento_1 = require("../rutas/Mantenimiento");
const MantenimientoDetalle_1 = require("../rutas/MantenimientoDetalle");
const Liquidacion_1 = require("../rutas/Liquidacion");
const LiquidacionOT_1 = require("../rutas/LiquidacionOT");
const LiquidacionCliente_1 = require("../rutas/LiquidacionCliente");
const SerieNroDocumentos_1 = require("../rutas/SerieNroDocumentos");
const PagosPersonal_1 = require("../rutas/PagosPersonal");
class Server {
    constructor() {
        this.app = express_1.default();
        this.puerto = process.env.PORT || 3000;
        this.habilitarCORS();
        this.configurarBodyParser();
        this.configurarRutas();
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log("Servidor Corriendo en el puerto: " + this.puerto);
            Sequelize_1.conexion.sync({ force: false, alter: false }).then(() => {
                console.log("Base de datos creada correctamente");
            });
        });
    }
    habilitarCORS() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
            next();
        });
    }
    configurarBodyParser() {
        this.app.use(body_parser_1.default.json());
    }
    configurarRutas() {
        this.app.use("/api", Departamento_1.departamento_router);
        this.app.use("/api", Provincia_1.provincia_router);
        this.app.use("/api", Distrito_1.distrito_router);
        this.app.use("/api", Area_1.area_router);
        this.app.use("/api", Cargo_1.cargo_router);
        this.app.use("/api", Tallas_1.tallas_router);
        this.app.use("/api", Clase_1.clase_router);
        this.app.use("/api", Marca_1.marca_router);
        this.app.use("/api", Modelo_1.modelo_router);
        this.app.use("/api", Rutas_1.rutas_router);
        this.app.use("/api", RutaCliente_1.rutacliente_router);
        this.app.use("/api", Documentos_1.documentos_router);
        this.app.use("/api", TipoDocumento_1.tipoDocumento_router);
        this.app.use("/api", DocumentoPersonal_1.dope_router);
        this.app.use("/api", Pagos_1.pagos_router);
        this.app.use("/api", OrdenTrabajo_1.ordentrabajo_router);
        this.app.use("/api", GuiasRemision_1.guiasremision_router);
        this.app.use("/api", Caja_1.caja_router);
        this.app.use("/api", Combustible_1.combustible_router);
        this.app.use("/api", Facturar_1.facturar_router);
        this.app.use("/api", SerieNroDocumentos_1.serienro_router);
        this.app.use("/api", Mantenimiento_1.mantenimiento_router);
        this.app.use("/api", MantenimientoDetalle_1.mantenimientoDetalle_router);
        this.app.use("/api", Liquidacion_1.liquidacion_router);
        this.app.use("/api", LiquidacionOT_1.liquidacionOT_router);
        this.app.use("/api", LiquidacionCliente_1.liquidacionCliente_router);
        this.app.use("/api", PagosPersonal_1.pagosPersonal_router);
        this.app.use("/api", Usuario_1.usuario_router);
        this.app.use("/api", PersonaPC_1.persona_router);
        this.app.use("/api", Vehiculos_1.vehiculos_router);
        this.app.use(express_fileupload_1.default());
        this.app.use("/api", Upload_1.upload_router);
        this.app.use("/api", Imagenes_1.imagenes_router);
        this.app.use("/api", Busqueda_1.busqueda_router);
    }
}
exports.Server = Server;
