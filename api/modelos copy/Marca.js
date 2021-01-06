"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marca_model = void 0;
const sequelize_1 = require("sequelize");
exports.Marca_model = (sequelize) => {
    let marca = sequelize.define('t_marca', {
        marc_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        marc_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_marca',
        timestamps: true
    });
    return marca;
};
