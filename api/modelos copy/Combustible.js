"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combustible_model = void 0;
const sequelize_1 = require("sequelize");
exports.Combustible_model = (sequelize) => {
    let combustible = sequelize.define('t_combustible', {
        comb_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comb_nro: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        comb_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        comb_estc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_pago: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_gln: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        comb_pxgl: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        comb_prov: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_comprob: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_obs: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        comb_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
    }, {
        tableName: 't_combustible',
        timestamps: true
    });
    return combustible;
};
