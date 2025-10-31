"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const RuleBody = zod_1.z.object({
    vendor: zod_1.z.enum(["suricata", "snort"]),
    sid: zod_1.z.number(),
    name: zod_1.z.string(),
    body: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    enabled: zod_1.z.boolean().default(true),
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
    const r = await prisma.rule.update({ where: { id }, data: { enabled: { set: true, } } });
    res.json(r);
});
exports.default = router;
