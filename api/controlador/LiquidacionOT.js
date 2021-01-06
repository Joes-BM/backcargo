"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiquidacionOTByIdOT = exports.posLiquidacionOT = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
let crearLiquidacionOT = (arrDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        for (let i = 0; i < arrDetalle.length; i++) {
            if (arrDetalle[i].liot_id == 0) {
                let detallesCreadas = yield Sequelize_1.LiquidarOrdenTrabajo.create(arrDetalle[i], { transaction: t });
            }
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.posLiquidacionOT = (req, res) => {
    crearLiquidacionOT(req.body.detalle)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "Liquidacion Creada correctamente"
        });
    })
        .catch(error => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.getLiquidacionOTByIdOT = (req, res) => {
    Sequelize_1.LiquidarOrdenTrabajo.findAll({
        where: {
            ordt_id: req.params.id
        }
    }).then((objetoOrdenT) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoOrdenT
        });
    });
};
