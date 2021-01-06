"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagosPersonal_model = void 0;
const sequelize_1 = require("sequelize");
exports.PagosPersonal_model = (sequelize) => {
    let pagospers = sequelize.define('t_pagospersonal', {
        pagper_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pagper_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pagper_fein: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        pagper_fefi: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        pagper_cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        pagper_estt: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pagper_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pagper_feli: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        pagper_deta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pagper_liqu: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        ordt_nser: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_pagospersonal',
        timestamps: true
    });
    return pagospers;
};
