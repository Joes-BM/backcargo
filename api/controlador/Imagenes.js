"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagenes = void 0;
const path = require('path');
const fs = require('fs');
exports.getImagenes = (req, res) => {
    var tabla = req.params.tabla;
    var img = req.params.img;
    var pathImg = path.resolve(__dirname, `../../../api/upload/${tabla}/${img}`);
    // console.log("tabla",pathImg);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        var pathNoImg = path.resolve(__dirname, '../../../api/assets/no-img.jpg');
        res.sendFile(pathNoImg);
    }
};
