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
  const v = req.query[k];
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return undefined;
};

const parse = (raw: string | undefined, t: FieldType) => {
  if (raw === undefined) return undefined;
  if (t === "number") {
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  }
  if (t === "boolean") return raw.toLowerCase() === "true";
  return raw;
};

export const mapQuery = <S extends Spec>(req: Request, spec: S): Out<S> => {
  const out = {} as Partial<Out<S>>;
  for (const k of Object.keys(spec)) {
    const key = k as keyof S;
    out[key] = parse(pickRaw(req, k), spec[key]) as Out<S>[keyof S];
  }
  return out as Out<S>;
};
