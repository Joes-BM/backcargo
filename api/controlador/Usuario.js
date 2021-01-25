"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarSesion = exports.deleteUsuario = exports.updateUsuario = exports.cambiarContraseñaUsuario = exports.postUsuario = exports.getUsuarioByEmail = exports.getUsuarioById = exports.getUsuario = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// ****************************
//     INICIO CRUD DE USUARIOS
// ****************************
exports.getUsuario = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Usuario.findAll({
        attributes: ['usu_id', 'usu_email', 'usu_tipo', 'usu_esta', 'usu_img', 'pers_id'],
        include: [{ model: Sequelize_1.Persona, attributes: ['pers_nomb', 'pers_appa', 'pers_apma'] }],
        offset: desde,
        limit: 5
    }).then((objUsers) => {
        const amount = Sequelize_1.Usuario.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objUsers,
                total: conteo
            });
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Documentos',
            errors: err
        });
    });
};
exports.getUsuarioById = (req, res) => {
    Sequelize_1.Usuario.findByPk(req.params.id, {
        include: [{
                model: Sequelize_1.Persona
            }]
    }).then((objUsuario) => {
        if (objUsuario) {
            res.status(200).json({
                message: 'Usuario encontrado ',
                usuario: objUsuario
            });
        }
        else {
            res.status(500).json({
                mensaje: 'error',
                contenido: 'No se encontro al usuario'
            });
        }
    });
};
exports.getUsuarioByEmail = (req, res) => {
    Sequelize_1.Usuario.findAll({
        where: {
            usu_email: req.params.email
        }
    }).then((resultado) => {
        res.status(200).json({
            message: 'ok',
            contenido: resultado
        });
    });
};
//CREAR USUARIO
exports.postUsuario = (req, res) => {
    // console.log("***********************");
    // console.log(req.body);
    // console.log("***********************");
    //{ usuario: { usu_email: 'test1@test.com', usu_pass: '123456' } }
    let objUsuario = Sequelize_1.Usuario.build(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    // save()=> promesa que GUARDA el registro en la Base de Datos
    objUsuario.save().then((usuarioCreado) => {
        console.log("USU CREADO", usuarioCreado);
        Sequelize_1.Usuario.findByPk(usuarioCreado.usu_id)
            .then((usuarioEncontrado) => {
            console.log("USU ENCONTRADO", usuarioEncontrado);
            res.status(201).json({
                mensaje: 'Usuario creado',
                contenido: usuarioEncontrado
            });
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'Error',
            contenido: error
        });
    });
};
exports.cambiarContraseñaUsuario = (req, res) => {
    let objUsuario = Sequelize_1.Usuario.build(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    Sequelize_1.Usuario.update({
        usu_hash: objUsuario.usu_hash,
        usu_salt: objUsuario.usu_salt,
        usu_email: objUsuario.usu_email
    }, {
        where: {
            usu_id: req.body.usuario.usu_id
        }
    }).then((resp) => {
        res.status(201).json({
            mensaje: 'ok',
            contenido: resp
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'Error',
            contenido: error
        });
    });
};
exports.updateUsuario = (req, res) => {
    Sequelize_1.Usuario.update({
        usu_email: req.body.usuario.usu_email,
        usu_tipo: req.body.usuario.usu_tipo,
        usu_esta: req.body.usuario.usu_esta,
        usu_img: req.body.usuario.usu_img
    }, {
        where: {
            usu_id: req.body.usuario.usu_id
        }
    }).then((usuActualizado) => {
        Sequelize_1.Usuario.findByPk(usuActualizado[0]).then((objUsuario) => {
            res.status(200).json({
                mensaje: 'ok',
                contenido: objUsuario
            });
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'error',
            contenido: error
        });
    });
};
exports.deleteUsuario = (req, res) => {
    let { id_usuario } = req.params;
    Sequelize_1.Usuario.destroy({
        where: {
            usu_id: id_usuario
        }
    }).then((cantidad) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                mensaje: "Usuario Eliminado",
                contenido: cantidad
            };
            res.status(200).send(rpta);
        }
        else {
            let rpta = {
                success: false,
                mensaje: 'No se ha Eliminado',
                contenido: ''
            };
            res.status(500).send(rpta);
        }
    });
};
// ****************************
//     FIN CRUD USUARIO
// ****************************
// ****************************
//     LOGIN USUARIO
// ****************************
exports.iniciarSesion = (req, res) => {
    let { usu_email, usu_pass } = req.body;
    // tenemos que encriptar la contraseñe en hexadecimal
    let buff = Buffer.from(usu_pass, 'utf-8').toString('ascii');
    Sequelize_1.Usuario.findOne({
        where: {
            usu_email
            // usu_email: usu_email
        }
    }).then((objUsuario) => {
        if (objUsuario) {
            let validarPass = objUsuario.validPass(buff);
            if (validarPass) {
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    message: 'Ok',
                    token,
                    contenido: objUsuario
                });
            }
            else {
                res.status(500).json({
                    message: 'error',
                    valid: 0,
                    content: 'Usuario o contraseña incorrectos.'
                });
            }
        }
        else {
            res.status(500).json({
                message: 'error',
                findUser: 0,
                content: 'No se encontro el usuario'
            });
        }
    });
};
