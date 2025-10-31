"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("../lib/nats");
const feature_extractor_1 = require("../services/feature-extractor");
const nats_2 = require("nats");
(async () => {
    await (0, nats_1.connectNats)();
    const sc = (0, nats_2.StringCodec)();
    const sub = (0, nats_1.getNats)().subscribe("eve.suricata");
    console.log("features.worker listening on eve.suricata");
    for await (const m of sub) {
        const payload = JSON.parse(sc.decode(m.data));
        const feats = await (0, feature_extractor_1.buildFeaturesFromEveBatch)(payload);
        // opcional: publicar features a otro subject
        (0, nats_1.getNats)().publish("features.flow", sc.encode(JSON.stringify(feats)));
    }
})();
