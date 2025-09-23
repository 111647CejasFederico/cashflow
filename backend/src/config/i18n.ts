// config/i18n.ts
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { handle, LanguageDetector } from "i18next-http-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const localesPath = join(__dirname, "..", "locales", "{{lng}}", "{{ns}}.json");

export async function initI18n() {
  await i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      backend: { loadPath: localesPath },
      initImmediate: false,
      preload: ["es", "en"],
      supportedLngs: ["es", "en"],
      fallbackLng: "es",
      ns: ["common", "errors", "validation"],
      defaultNS: "common",
      detection: {
        order: ["header", "querystring", "cookie"],
        lookupQuerystring: "lang",
        caches: false,
      },
      debug: false, //process.env.NODE_ENV !== "production",
    });
}

export const i18nMiddleware = handle(i18next);
