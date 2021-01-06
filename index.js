"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./api/clases/server");
let miServidor = new server_1.Server();
miServidor.start();
