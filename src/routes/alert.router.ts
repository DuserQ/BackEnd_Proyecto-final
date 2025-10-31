import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const { host_id, since } = req.query;
  const where:any = {};
  if (since) where.createdAt = { gte: new Date(String(since)) };
  if (host_id) where.Flow = { Host: { id: String(host_id) } };
  const alerts = await prisma.alert.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { Flow: true }
  });
  res.json(alerts);
});
export default router;
