"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario_model = void 0;
const sequelize_1 = require("sequelize");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
exports.usuario_model = (sequelize) => {
    let usuario = sequelize.define('t_usuario', {
        usu_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usu_email: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: true,
            unique: true
        },
        usu_hash: {
            type: sequelize_1.DataTypes.TEXT,
        },
        usu_salt: {
            type: sequelize_1.DataTypes.TEXT,
        },
        usu_esta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        usu_tipo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        usu_google: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        usu_img: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 't_usuario',
        timestamps: true
    });
    usuario.prototype.setSaltYHash = function (password) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    };
    usuario.prototype.validPass = function (password) {
        let usu_hash_temp = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
        return usu_hash_temp === this.usu_hash;
    };
    usuario.prototype.generarJWT = function () {
        let payload = {
            usu_id: this.usu_id,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`
        };
        let token = jwt.sign(payload, 'cotizaYa', { expiresIn: '1h' }, { algorithm: 'RS256' });
        return token;
    };
    return usuario;
};
