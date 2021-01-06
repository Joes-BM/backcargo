"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TallasEpp_model = void 0;
const sequelize_1 = require("sequelize");
exports.TallasEpp_model = (sequelize) => {
    let tallasepp = sequelize.define('t_tallasepp', {
        tall_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tall_man: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_lent: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_casc: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_zap: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_pant: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_cami: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_gcue: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_gjeb: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_resp: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_polo: {
            type: sequelize_1.DataTypes.TEXT,
        },
        tall_chal: {
            type: sequelize_1.DataTypes.TEXT,
        }
    }, {
        tableName: 't_tallasepp',
        timestamps: true
    });
    return tallasepp;
};
