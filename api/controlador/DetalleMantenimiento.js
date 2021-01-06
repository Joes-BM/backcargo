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
exports.posMantenimientoDetalle = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const { Op } = require("sequelize");
let crearMantenimientoDetalle = (arrDetalle) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.conexion.transaction();
    try {
        // let ordenCreado= await MantenimientoDetalle.create(orden,{transaction: t});
        // let guiasCreadas=[];
        for (let i = 0; i < arrDetalle.length; i++) {
            let detallesCreadas = yield Sequelize_1.MantenimientoDetalle.create(arrDetalle[i], { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.posMantenimientoDetalle = (req, res) => {
    crearMantenimientoDetalle(req.body.detalle)
        .then(() => {
        res.status(201).json({
            ok: true,
            mensaje: "MantenimientoDetalle Creada correctamente"
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
