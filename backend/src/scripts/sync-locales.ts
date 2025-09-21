// src/scripts/sync-locales.ts
import fs from "fs";
import path from "path";

type Dict = Record<string, any>;

const LOCALES_ROOT = path.resolve("src/locales");
const LANGS = ["es", "en"];

const readJSON = (p: string): Dict => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {});
const writeJSON = (p: string, obj: Dict) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
};

const deepSync = (from: Dict, to: Dict) => {
  for (const k of Object.keys(from)) {
    const v = from[k];
    if (!(k in to)) to[k] = typeof v === "object" && v !== null ? {} : "";
    if (typeof v === "object" && v !== null) deepSync(v, to[k]);
  }
};

(() => {
  const namespaces = new Set<string>();
  for (const L of LANGS) {
    const dir = path.join(LOCALES_ROOT, L);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) if (f.endsWith(".json")) namespaces.add(path.basename(f, ".json"));
  }

  let updated = 0;
  for (const ns of namespaces) {
    const perLang: Record<string, Dict> = {};
    for (const L of LANGS) perLang[L] = readJSON(path.join(LOCALES_ROOT, L, `${ns}.json`));

    // usa el primero como base, sincroniza ida y vuelta
    if (!LANGS[0]) continue;
    const base = perLang[LANGS[0]];
    if (!base) continue;
    for (const L of LANGS.slice(1)) {
      if (!perLang[L]) perLang[L] = {};
      deepSync(base, perLang[L]);
    }
    for (const L of LANGS.slice(1)) {
      if (!perLang[L]) perLang[L] = {};
      deepSync(perLang[L], base);
    }

    for (const L of LANGS) {
      if (!perLang[L]) perLang[L] = {};
      writeJSON(path.join(LOCALES_ROOT, L, `${ns}.json`), perLang[L]);
      updated++;
    }
  }
  console.log(`i18n-sync: ${updated} archivos sincronizados en ${namespaces.size} namespaces.`);
})();
