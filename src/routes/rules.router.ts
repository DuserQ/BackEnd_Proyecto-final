import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();
const router = Router();

const RuleBody = z.object({
  vendor: z.enum(["suricata","snort"]),
  sid: z.number(),
  name: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
  enabled: z.boolean().default(true),
});

router.get("/", async (_req, res) => {
  const rules = await prisma.rule.findMany();
  res.json(rules);
});

router.post("/", async (req, res) => {
  const data = RuleBody.parse(req.body);
  const rule = await prisma.rule.create({ data });
  res.status(201).json(rule);
});

router.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const r = await prisma.rule.update({ where: { id }, data: { enabled: { set: true, } }});
  res.json(r);
});

export default router;
