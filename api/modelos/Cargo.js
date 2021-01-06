"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargo_model = void 0;
const sequelize_1 = require("sequelize");
exports.Cargo_model = (sequelize) => {
    let cargo = sequelize.define('t_cargo', {
        cargo_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cargo_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_cargo',
        timestamps: true
    });
    return cargo;
};
