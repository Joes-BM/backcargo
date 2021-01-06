"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distrito_model = void 0;
const sequelize_1 = require("sequelize");
exports.Distrito_model = (sequelize) => {
    let distrito = sequelize.define('t_distrito', {
        dist_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dist_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_distrito',
        timestamps: true
    });
    return distrito;
};
