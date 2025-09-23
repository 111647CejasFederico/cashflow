import fs from "fs";
import path from "path";

import fg from "fast-glob";

const localesDir = "src/locales";
const EN = path.join(localesDir, "en.json");
const ES = path.join(localesDir, "es.json");
const SRC_GLOB = ["src/**/*.{ts,tsx}", "!src/locales/**"] as const;

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

type Dict = { [k: string]: Json };

const readJson = (p: string): Dict =>
  fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as Dict) : {};

const writeJson = (p: string, obj: Dict) =>
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");

function ensure(obj: Dict, ns: string, pathStr: string): void {
  if (!Object.prototype.hasOwnProperty.call(obj, ns)) obj[ns] = {};
  const parts = pathStr.split(".");
  let cur = obj[ns] as Dict;
  for (let i = 0; i < parts.length; i++) {
    const k = parts[i]!;
    const last = i === parts.length - 1;
    if (typeof cur[k] !== "object" || cur[k] === null || Array.isArray(cur[k])) {
      cur[k] = last ? "" : {};
    }
    if (!last) cur = cur[k] as Dict;
  }
}

async function main(): Promise<void> {
  const files = (await fg(`${SRC_GLOB}`)) as string[];
  const en = readJson(EN);
  const es = readJson(ES);
  let count = 0;

  // t("ns.key") o i18n.t("ns.key")
  const regex = /\b(?:t|i18n\.t)\(\s*['"`]([^'"`]+)['"`]\s*\)/g;

  for (const f of files) {
    const code = fs.readFileSync(f, "utf8");
    let m: RegExpExecArray | null;
    while ((m = regex.exec(code))) {
      const full = m[1]!.trim();
      if (!full.includes(".")) continue;
      const [ns, ...rest] = full.split(".");
      if (!ns || rest.length === 0) continue;
      const keyPath = rest.join(".");
      ensure(en, ns, keyPath);
      ensure(es, ns, keyPath);
      count++;
    }
  }

  writeJson(EN, en);
  writeJson(ES, es);
  console.log(`i18n-scan: ${count} claves aseguradas`);
}

main().catch((e: unknown) => {
  console.error(e);
  console.error(e);
  process.exit(1);
});
