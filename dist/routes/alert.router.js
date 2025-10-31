"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const { host_id, since } = req.query;
    const where = {};
    if (since)
        where.createdAt = { gte: new Date(String(since)) };
    if (host_id)
        where.Flow = { Host: { id: String(host_id) } };
    const alerts = await prisma.alert.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
        include: { Flow: true }
    });
    res.json(alerts);
});
exports.default = router;
