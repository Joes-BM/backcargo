"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiasRemision_model = void 0;
const sequelize_1 = require("sequelize");
exports.GuiasRemision_model = (sequelize) => {
    let guiasremision = sequelize.define('t_guiasremision', {
        grem_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        grem_de: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        grem_serie: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        grem_nro: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        grem_inic: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        grem_fin: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        grem_oser: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 't_guiasremision',
        timestamps: true
    });
    return guiasremision;
};
