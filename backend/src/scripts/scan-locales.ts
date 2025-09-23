// src/scripts/scan-locales.ts
import fg from "fast-glob";
import fs from "fs";
import path from "path";

type Dict = Record<string, unknown>;

const LOCALES_ROOT = path.resolve("src/locales");
const LANGS = ["es", "en"];
const SRC_GLOB = ["src/**/*.{ts}", "!src/locales/**", "!src/scripts/**"];

const readJSON = (p: string): Dict =>
  fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as Dict) : {};
const writeJSON = (p: string, obj: Dict) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
};

const ensurePath = (root: Dict, dotted: string) => {
  if (!dotted) return;
  const parts = dotted.split(".");
  let cur = root;
  for (let i = 0; i < parts.length; i++) {
    const k = parts[i];
    const last = i === parts.length - 1;
    if (!k) continue;
    if (!(k in cur)) cur[k] = last ? "" : {};
    cur = cur[k] as Dict;
  }
};

(async () => {
  const files = await fg(SRC_GLOB, { dot: false });
  const re = /\b(?:t|i18n\.t|req\.t)\(\s*['"`]([^'"`]+)['"`]\s*[,)]/g;

  let hits = 0;
  const staged: Record<string, Dict> = {}; // key: `${lang}/${ns}`

  for (const f of files) {
    const code = fs.readFileSync(f, "utf8");
    let m: RegExpExecArray | null;
    while ((m = re.exec(code))) {
      if (!m[1]) continue;
      const full = m[1].trim(); // ej: "errors:notFound.text"
      const [ns, keyPath] = full.split(":");
      if (!ns || !keyPath) continue; // ignorar sin namespace
      for (const L of LANGS) {
        const nsPath = path.join(LOCALES_ROOT, L, `${ns}.json`);
        const cacheKey = `${L}/${ns}`;
        if (!staged[cacheKey]) staged[cacheKey] = readJSON(nsPath);
        ensurePath(staged[cacheKey], keyPath); // crea árbol con "" en hojas
      }
      hits++;
    }
  }

  // persistir
  for (const key of Object.keys(staged)) {
    const [L, ns] = key.split("/");
    if (!L || !ns || !staged[key]) continue;
    writeJSON(path.join(LOCALES_ROOT, L, `${ns}.json`), staged[key]);
  }

  console.log(
    `i18n-scan: ${hits} ocurrencias procesadas, ${Object.keys(staged).length} archivos actualizados.`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
