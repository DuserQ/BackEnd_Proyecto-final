import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { getNats, sc } from "../lib/nats";

const prisma = new PrismaClient();
const router = Router();

const EveSchema = z.object({
  host_id: z.string(),
  events: z.array(z.record(z.string(), z.unknown())),
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
    await getNats().publish("eve.suricata", sc.encode(JSON.stringify(data)));

    // 🟨 Finalmente, guardas los eventos
    await prisma.$transaction(
      data.events.map((ev: any) =>
        prisma.event.create({
          data: {
            hostId,
            kind: typeof ev.event_type === "string" ? ev.event_type : "eve",
            payload: ev,
          },
        })
      )
    );

    res.json({ ok: true, n: data.events.length });
  } catch (e) {
    next(e);
  }
});

export default router;
