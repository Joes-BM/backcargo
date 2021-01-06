"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura_model = void 0;
const sequelize_1 = require("sequelize");
exports.Factura_model = (sequelize) => {
    let factura = sequelize.define('t_factura', {
        fact_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fact_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        fact_feve: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        fact_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        fact_snro: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        fact_nserv: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        fact_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        fact_total: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_factura',
        timestamps: true
    });
    return factura;
};
