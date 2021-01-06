"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagos_model = void 0;
const sequelize_1 = require("sequelize");
exports.Pagos_model = (sequelize) => {
    let pagos = sequelize.define('t_pagos', {
        pag_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pag_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pag_fein: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        pag_fefi: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        pag_cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        pag_arch: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 't_pagos',
        timestamps: true
    });
    return pagos;
};
