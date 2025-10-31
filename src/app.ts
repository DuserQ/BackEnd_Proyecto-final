import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import ingestRouter from "./routes/ingest.router";
import rulesRouter from "./routes/rules.router";
import alertsRouter from "./routes/alert.router";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use("/ingest", ingestRouter);
app.use("/rulesets", rulesRouter);
app.use("/alerts", alertsRouter);

app.get("/healthz", (_req, res) => res.json({ ok: true }));
export default app;
