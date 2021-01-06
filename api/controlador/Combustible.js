"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCombustibleByIdOrdenTrabajo = exports.posCombustible = exports.getCombustible = void 0;
const Sequelize_1 = require("../configuracion/Sequelize");
const Sequelize = require('sequelize');
exports.getCombustible = (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Sequelize_1.Combustible.findAll({
        include: [{
                model: Sequelize_1.OrdenTrabajo,
                attributes: ['ordt_id', 'ordt_nser']
            }],
        offset: desde,
        limit: 5
    }).then((objetoCombustible) => {
        const amount = Sequelize_1.Combustible.count()
            .then((conteo) => {
            res.status(200).json({
                mensaje: 'OK',
                contenido: objetoCombustible,
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
exports.posCombustible = (req, res) => {
    let objCombustible = Sequelize_1.Combustible.build(req.body);
    objCombustible.save().then((objCombustibleCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objCombustibleCreado,
            mensaje: "Combustible Creada correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
// export let updateCombustible = (req: Request, res: Response) => {
//     Combustible.update(
//         {
//             Combustible_nom: req.body.Combustible.Combustible_nom,
//         },
//         {
//             where:{
//                 Combustible_id:req.body.Combustible.Combustible_id
//             }
//         }).then((Actualizado:any)=>{
//             Combustible.findByPk(Actualizado[0]).then((objCombustible:any)=>{
//                 res.status(200).json({
//                     mensaje:'ok',
//                     contenido:Actualizado
//                 })
//             })
//         }).catch((error:any)=>{
//             res.status(501).json({
//                 mensaje:'error',
//                 contenido:error
//             })
//         })
// }
// export let deleteCombustible = (req: Request, res: Response) => {
//     let {id} = req.params;
//     Combustible.destroy({
//         where:{
//             Combustible_id:id
//         }
//     }).then((cantidad:any)=>{
//         if(cantidad>0){
//             let rpta = {
//                 success:true,
//                 mensaje:"Combustible Eliminado",
//                 id:id
//             }
//             res.status(200).send(rpta);
//         }else{
//             let rpta = {
//                 success:false,
//                 mensaje:'No se ha Eliminado',
//                 id:''
//             }
//             res.status(500).send(rpta);
//         }
//     })
// }
exports.getCombustibleByIdOrdenTrabajo = (req, res) => {
    Sequelize_1.Combustible.findAll({
        where: {
            ordt_id: req.params.id
        }
    }).then((objetoCombustible) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objetoCombustible,
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            mensaje: 'Error Cargando Documentos',
            errors: err
        });
    });
};
