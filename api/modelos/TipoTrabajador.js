"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoTrabajador_model = void 0;
const sequelize_1 = require("sequelize");
exports.TipoTrabajador_model = (sequelize) => {
    let tipotrabajador = sequelize.define('t_tipotrabajador', {
        titra_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titra_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_tipotrabajador',
        timestamps: true
    });
    return tipotrabajador;
};
