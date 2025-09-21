// src/utils/query.ts
import type { Request } from "express";

type FieldType = "string" | "number" | "boolean" | undefined;
type Spec = Record<string, FieldType>;

type Out<S extends Spec> = {
  [K in keyof S]: S[K] extends "string"
    ? string | undefined
    : S[K] extends "number"
    ? number | undefined
    : S[K] extends "boolean"
    ? boolean | undefined
    : undefined;
};

const pickRaw = (req: Request, k: string): string | undefined => {
  const v = (req.query as any)[k];
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return undefined;
};

const parse = (raw: string | undefined, t: FieldType) => {
  if (raw === undefined) return undefined;

  if (t === "number") {
    const n = +raw;
    return isNaN(n) ? undefined : n;
  }

  if (t === "boolean") return raw.toLowerCase() === "true";

  return raw;
};

export const mapQuery = <S extends Spec>(req: Request, spec: S): Out<S> => {
  const out: any = {};
  for (const k of Object.keys(spec)) {
    out[k] = parse(pickRaw(req, k), spec[k]);
  }
  return out as Out<S>;
};
