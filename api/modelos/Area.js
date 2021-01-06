"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area_model = void 0;
const sequelize_1 = require("sequelize");
exports.Area_model = (sequelize) => {
    let area = sequelize.define('t_area', {
        area_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        area_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_area',
        timestamps: true
    });
    return area;
};
