"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidarOrdenTrabajo_model = void 0;
const sequelize_1 = require("sequelize");
exports.LiquidarOrdenTrabajo_model = (sequelize) => {
    let liquidarordentrabajo = sequelize.define('t_liquidarordentrabajo', {
        liot_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        liot_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        liot_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        liot_obse: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        liot_mont: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        tableName: 't_liquidarordentrabajo',
        timestamps: true
    });
    return liquidarordentrabajo;
};
