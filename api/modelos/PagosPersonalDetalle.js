"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagosPersonalDetalle_model = void 0;
const sequelize_1 = require("sequelize");
exports.PagosPersonalDetalle_model = (sequelize) => {
    let pagospersonaldetalle = sequelize.define('t_pagospersonaldetalle', {
        depa_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        depa_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        depa_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        depa_deta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        depa_acta: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_pagospersonaldetalle',
        timestamps: true
    });
    return pagospersonaldetalle;
};
