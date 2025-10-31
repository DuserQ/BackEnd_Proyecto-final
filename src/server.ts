import app from "./app";
import { PORT } from "./config";
import { connectNats } from "./lib/nats";

(async () => {
  await connectNats();
  app.listen(PORT, () => console.log(`API on :${PORT}`));
})();
