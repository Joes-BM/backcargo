"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mantenimientodetalle_model = void 0;
const sequelize_1 = require("sequelize");
exports.Mantenimientodetalle_model = (sequelize) => {
    let mantenimientodetalle = sequelize.define('t_mantenimientodetalle', {
        made_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        made_cant: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        made_desc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        made_puni: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        made_sfact: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        made_nfact: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        made_cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_mantenimientodetalle',
        timestamps: true
    });
    return mantenimientodetalle;
};
