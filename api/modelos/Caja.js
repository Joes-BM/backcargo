"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caja_model = void 0;
const sequelize_1 = require("sequelize");
exports.Caja_model = (sequelize) => {
    let caja = sequelize.define('t_caja', {
        caja_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        caja_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        caja_motivo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        caja_mopa: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        caja_cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        caja_gast: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        caja_sald: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        caja_obs: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        caja_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_caja',
        timestamps: true
    });
    return caja;
};
