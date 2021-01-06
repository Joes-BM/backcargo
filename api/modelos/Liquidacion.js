"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Liquidacion_model = void 0;
const sequelize_1 = require("sequelize");
exports.Liquidacion_model = (sequelize) => {
    let liquidacion = sequelize.define('t_liquidacion', {
        liqui_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        liqui_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        liqui_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        liqui_deta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        liqui_cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_liquidacion',
        timestamps: true
    });
    return liquidacion;
};
