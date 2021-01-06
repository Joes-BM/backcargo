"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provincia_model = void 0;
const sequelize_1 = require("sequelize");
exports.provincia_model = (sequelize) => {
    let provincia = sequelize.define('t_provincia', {
        prov_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        prov_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_provincia',
        timestamps: true
    });
    return provincia;
};
