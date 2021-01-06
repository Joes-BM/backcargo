"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerieNro_model = void 0;
const sequelize_1 = require("sequelize");
exports.SerieNro_model = (sequelize) => {
    let sernum = sequelize.define('t_serienrodocum', {
        senu_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        senu_serie: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        senu_nro: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 't_serienrodocum',
        timestamps: true
    });
    return sernum;
};
