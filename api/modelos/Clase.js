"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clase_model = void 0;
const sequelize_1 = require("sequelize");
exports.Clase_model = (sequelize) => {
    let clase = sequelize.define('t_clase', {
        clase_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        clase_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_clase',
        timestamps: true
    });
    return clase;
};
