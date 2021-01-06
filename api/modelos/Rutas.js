"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rutas_model = void 0;
const sequelize_1 = require("sequelize");
exports.Rutas_model = (sequelize) => {
    let rutas = sequelize.define('t_rutas', {
        ruta_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ruta_inic: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        ruta_fin: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        ruta_km: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        ruta_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_rutas',
        timestamps: true
    });
    return rutas;
};
