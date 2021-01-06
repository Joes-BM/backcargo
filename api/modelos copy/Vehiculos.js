"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculos_model = void 0;
const sequelize_1 = require("sequelize");
exports.Vehiculos_model = (sequelize) => {
    let vehiculos = sequelize.define('t_vehiculos', {
        vehi_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vehi_cond: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        vehi_placa: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        vehi_aniom: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_aniof: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_alias: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_color: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_camx: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        vehi_carr: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_ejes: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_rued: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        vehi_chas: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_moto: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        vehi_cil: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_nasi: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_npas: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_galo: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        vehi_pese: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_pebr: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_caut: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_long: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_alt: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_anch: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        vehi_tokm: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        pers_raso: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 't_vehiculos',
        timestamps: true
    });
    return vehiculos;
};
