import fs from "fs";
import path from "path";

const localesDir = path.resolve("src/locales");
const enPath = path.join(localesDir, "en.json");
const esPath = path.join(localesDir, "es.json");

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

type Dict = { [k: string]: Json };

function isDict(v: unknown): v is Dict {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepSync(base: Json, target: Json): void {
  if (!isDict(base) || !isDict(target)) return;

  for (const key of Object.keys(base)) {
    const b = base[key];
    const t = (target as Dict)[key];

    if (isDict(b)) {
      if (!isDict(t)) (target as Dict)[key] = {};
      deepSync(b, (target as Dict)[key]!);
    } else {
      if (typeof t === "undefined") (target as Dict)[key] = typeof b === "string" ? "" : (b ?? "");
    }
  }
}

function run(): void {
  const en = JSON.parse(fs.readFileSync(enPath, "utf-8")) as Dict;
  const es = JSON.parse(fs.readFileSync(esPath, "utf-8")) as Dict;

  deepSync(en, es); // completar ES desde EN
  deepSync(es, en); // opcional: completar EN desde ES

  fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + "\n");
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n");

  console.log("Locales sincronizados. Claves faltantes agregadas.");
}

run();
