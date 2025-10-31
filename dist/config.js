"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATS_URL = exports.PORT = void 0;
exports.PORT = Number(process.env.PORT || 8080);
exports.NATS_URL = process.env.NATS_URL || "nats://localhost:4222";
