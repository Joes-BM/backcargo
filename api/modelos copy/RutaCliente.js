"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutaCliente_model = void 0;
const sequelize_1 = require("sequelize");
exports.RutaCliente_model = (sequelize) => {
    let rutacliente = sequelize.define('t_rutacliente', {
        rucli_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        rucli_carr: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        rucli_xflete: {
            type: sequelize_1.DataTypes.STRING(2),
            allowNull: true
        },
        rucli_flete: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        rucli_xpeso: {
            type: sequelize_1.DataTypes.STRING(2),
            allowNull: true
        },
        rucli_peso: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: true
        },
        rucli_desc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        rucli_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_rutacliente',
        timestamps: true
    });
    return rutacliente;
};
