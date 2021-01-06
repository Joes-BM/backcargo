"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenTrabajo_model = void 0;
const sequelize_1 = require("sequelize");
exports.OrdenTrabajo_model = (sequelize) => {
    let ordentrabajo = sequelize.define('t_ordentrabajo', {
        ordt_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ordt_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        ordt_fefi: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        ordt_nser: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        ordt_tcam: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        ordt_moda: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        ordt_deta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        ordt_pter: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        ordt_flet: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        ordt_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        ordt_fact: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        ordt_peso: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_ordentrabajo',
        timestamps: true
    });
    return ordentrabajo;
};
