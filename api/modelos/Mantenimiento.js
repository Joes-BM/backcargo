"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mantenimiento_model = void 0;
const sequelize_1 = require("sequelize");
exports.Mantenimiento_model = (sequelize) => {
    let mantenimiento = sequelize.define('t_mantenimiento', {
        mant_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mant_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        mant_nomb: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        mant_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        mant_deta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        mant_km: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_mantenimiento',
        timestamps: true
    });
    return mantenimiento;
};
