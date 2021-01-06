"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documento_model = void 0;
const sequelize_1 = require("sequelize");
exports.Documento_model = (sequelize) => {
    let documento = sequelize.define('t_documento', {
        docu_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        docu_nro: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        docu_fein: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        docu_fefi: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        docu_arch: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        docu_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_documento',
        timestamps: true
    });
    return documento;
};
