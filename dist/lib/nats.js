"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sc = void 0;
exports.connectNats = connectNats;
exports.getNats = getNats;
const nats_1 = require("nats");
const config_1 = require("../config");
let nc;
exports.sc = (0, nats_1.StringCodec)();
async function connectNats() {
    nc = await (0, nats_1.connect)({ servers: config_1.NATS_URL });
    console.log("NATS connected");
}
function getNats() { return nc; }
