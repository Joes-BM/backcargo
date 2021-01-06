"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona_model = void 0;
const sequelize_1 = require("sequelize");
exports.Persona_model = (sequelize) => {
    let persona = sequelize.define('t_persona', {
        pers_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pers_maes: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pers_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_ruc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_raso: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_ndoc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_nomb: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_appa: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_apma: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_dire: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pers_sexo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_fena: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        pers_temo1: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_temo2: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_email: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pers_tcta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_ncta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_banc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_contac: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_temo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_ause: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        pers_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_trab: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        pers_terc: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        pers_fopa: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_suel: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        }, pers_fein: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        pers_fefi: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        pers_tper: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pers_plaz: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        pers_afpa: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        tableName: 't_persona',
        timestamps: true
    });
    return persona;
};
