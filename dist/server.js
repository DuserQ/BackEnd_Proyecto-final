"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const nats_1 = require("./lib/nats");
(async () => {
    await (0, nats_1.connectNats)();
    app_1.default.listen(config_1.PORT, () => console.log(`API on :${config_1.PORT}`));
})();
