"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departamento_model = void 0;
const sequelize_1 = require("sequelize");
exports.Departamento_model = (sequelize) => {
    let departamento = sequelize.define('t_departamento', {
        dpto_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dpto_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_departamento',
        timestamps: true
    });
    return departamento;
};
