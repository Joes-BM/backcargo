"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDocumento_model = void 0;
const sequelize_1 = require("sequelize");
exports.TipoDocumento_model = (sequelize) => {
    let tipoDocumento = sequelize.define('t_tipodocumento', {
        tdoc_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tdoc_nom: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_tipodocumento',
        timestamps: true
    });
    return tipoDocumento;
};
