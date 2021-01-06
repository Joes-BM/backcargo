"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modelo_model = void 0;
const sequelize_1 = require("sequelize");
exports.Modelo_model = (sequelize) => {
    let modelo = sequelize.define('t_modelo', {
        mod_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mod_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_modelo',
        timestamps: true
    });
    return modelo;
};
