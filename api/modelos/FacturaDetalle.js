"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaDetalle_model = void 0;
const sequelize_1 = require("sequelize");
exports.FacturaDetalle_model = (sequelize) => {
    let facturadetalle = sequelize.define('t_facturadetalle', {
        fade_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fade_cant: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        fade_unid: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        fade_desc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        fade_puni: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        fade_stot: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        fade_igv: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
    }, {
        tableName: 't_facturadetalle',
        timestamps: true
    });
    return facturadetalle;
};
