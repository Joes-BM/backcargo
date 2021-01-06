"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosPersonales_model = void 0;
const sequelize_1 = require("sequelize");
exports.DocumentosPersonales_model = (sequelize) => {
    let documentosPersonales = sequelize.define('t_documentosPersonales', {
        dope_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dope_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_documentosPersonales',
        timestamps: true
    });
    return documentosPersonales;
};
