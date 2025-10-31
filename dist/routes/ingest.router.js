"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const nats_1 = require("../lib/nats");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const EveSchema = zod_1.z.object({
    host_id: zod_1.z.string(),
    events: zod_1.z.array(zod_1.z.record(zod_1.z.string(), zod_1.z.unknown())),
});
router.post("/eve", async (req, res, next) => {
    try {
        const data = EveSchema.parse(req.body);
        const hostId = data.host_id;
        // 🟩 Aquí insertas el bloque con upsert
        await prisma.host.upsert({
            where: { id: hostId },
            update: {},
            create: { id: hostId, name: hostId },
        });
        // 🟦 Luego publicas al bus
        await (0, nats_1.getNats)().publish("eve.suricata", nats_1.sc.encode(JSON.stringify(data)));
        // 🟨 Finalmente, guardas los eventos
        await prisma.$transaction(data.events.map((ev) => prisma.event.create({
            data: {
                hostId,
                kind: typeof ev.event_type === "string" ? ev.event_type : "eve",
                payload: ev,
            },
        })));
        res.json({ ok: true, n: data.events.length });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
