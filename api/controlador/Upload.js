"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
var fs = require('fs');
exports.subirArchivo = (req, res) => {
    var tabla = req.params.tabla;
    var id = req.params.id;
    var tablasAceptadas = ['documentos', 'vehiculos', 'usuarios'];
    if (tablasAceptadas.indexOf(tabla) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: ' Tabla No Valida',
            errors: { message: 'las coleccion validas son  ' + tablasAceptadas.join(', ') }
        });
    }
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: ' No selecciono nada',
            errors: { message: 'debe seleccioar una imagen' }
        });
    }
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extension = nombreCortado[nombreCortado.length - 1];
    //solo estas extencones aceptams
    var extensionesAceptadas = ['jpg', 'gif', 'png', 'jpeg'];
    if (extensionesAceptadas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: ' Extension No Valida',
            errors: { message: 'las extenciones validas son  ' + extensionesAceptadas.join(', ') }
        });
    }
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
    var path = `./api/upload/${tabla}/${nombreArchivo}`;
    console.log(path);
    archivo.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' Erro al mover archivo',
                errors: err
            });
        }
        var id2 = parseInt(id);
        subirPorTipo(tabla, id2, nombreArchivo, res);
    });
    function subirPorTipo(tabla, id, nombreArchivo, res) {
        if (tabla === 'usuarios') {
            Sequelize_1.Usuario.findByPk(id).then((usuario) => {
                var pathViejo = './api/upload/usuarios/' + usuario.usu_img;
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, (err) => {
                        if (err)
                            throw err;
                        console.log(pathViejo + ' was deleted');
                    });
                }
                usuario.usu_img = nombreArchivo;
                usuario.save().then((usuarioActualizado) => {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario Actualizado',
                        usuario: usuarioActualizado
                    });
                });
            });
        }
        // ****************************
        //     ver los then y el nombre del campo de nombre
        // ****************************
        //
        if (tabla === 'vehiculos') {
            Sequelize_1.Vehiculos.findById(id, (err, vehiculo) => {
                var pathViejo = './upload/vehiculos/' + vehiculo.img;
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, (err) => {
                        if (err)
                            throw err;
                        console.log(pathViejo + ' was deleted');
                    });
                }
                vehiculo.img = nombreArchivo;
                Sequelize_1.Vehiculos.save((err, vehiculoActualizado) => {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de vehiculo Actualizado',
                        vehiculo: vehiculoActualizado
                    });
                });
            });
        }
        // if (tabla === 'documentos') {
        //     Documentos.findById(id, (err:any, documentos:any) => {
        //         var pathViejo = './upload/documentos/' + documentos.img;
        //         if (fs.existsSync(pathViejo)) {
        //             fs.unlink(pathViejo, (err:any) => {
        //                 if (err) throw err;
        //                 console.log(pathViejo + ' was deleted');
        //             });
        //         }
        //         documentos.img = nombreArchivo;
        //         documentos.save((err:any, documentosActualizado:any) => {
        //             res.status(200).json({
        //                 ok: true,
        //                 mensaje: 'Imagen de documentos Actualizado',
        //                 documentos: documentosActualizado
        //             });
        //         })
        //     });
        //     // return
        // }
    }
};
