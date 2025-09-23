import { dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

import { Router } from "express";
import { readdirSync } from "fs";

import notFound from "../middleware/not-found.ts";
import registerLog from "../utils/logger.ts";

const log = registerLog("rts/index.ts");

const __filename = fileURLToPath(import.meta.url);
const PATH_ROUTER = dirname(__filename);
const router = Router();

const cleanFileName = (f: string) => f.split(".").shift();

const incorporeRouters = async () => {
  for (const filename of readdirSync(PATH_ROUTER)) {
    const ext = extname(filename);
    if (![".ts", ".js"].includes(ext)) continue;

    const name = cleanFileName(filename);
    if (name === "index") continue;

    try {
      const mod = await import(`./${name}${ext}`);
      if (!mod?.default) {
        log("warn", `Route ${name} no exporta default`);
        continue;
      }
      router.use(`/${name}`, mod.default);
    } catch (err) {
      log("error", `Error importing route /${name}: ${String(err)}`);
    }
  }

  router.use(notFound);
};
void incorporeRouters();

export default router;
