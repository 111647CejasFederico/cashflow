type Level = "error" | "warn" | "info" | "debug" | "ok" | "log";

const ICON: Record<Level, string> = {
  error: "❌",
  warn: "⚠️",
  info: "ℹ️",
  debug: "➡️",
  ok: "✅",
  log: "❔",
};

type LogEntry = {
  ts: string;
  scope: string;
  lvl: Level;
  msg: unknown;
  rest: unknown[];
};

// opcional: buffer global
declare global {
  interface Window {
    __APP_LOGS__?: LogEntry[];
  }
}
window.__APP_LOGS__ = [];

const color = (hex: string) => `color:${hex};font-weight:600`;

export function logger(scope: string) {
  const base = (lvl: Level, ...args: unknown[]): void => {
    const [first, ...rest] = args;
    const ts = new Date().toISOString();
    const prefix = `%c${ICON[lvl]} [${scope}] [${lvl}]`;
    const style = {
      error: color("#dc2626"),
      warn: color("#d97706"),
      info: color("#2563eb"),
      debug: color("#0ea5e9"),
      ok: color("#16a34a"),
      log: color("#374151"),
      default: color("#374151"),
    }[lvl];
    const msg = first instanceof Error ? first.stack || first.message : first;

    switch (lvl) {
      case "error":
        console.error(prefix, style, msg, ...rest);
        break;
      case "warn":
        console.warn(prefix, style, msg, ...rest);
        break;
      case "info":
        console.info(prefix, style, msg, ...rest);
        break;
      case "debug":
        console.debug(prefix, style, msg, ...rest);
        break;
      case "ok":
      case "log":
      default:
        console.log(prefix, style, msg, ...rest);
        break;
    }
    window.__APP_LOGS__?.push?.({ ts, scope, lvl, msg, rest });
  };

  return {
    error: (...a: unknown[]) => base("error", ...a),
    warn: (...a: unknown[]) => base("warn", ...a),
    info: (...a: unknown[]) => base("info", ...a),
    debug: (...a: unknown[]) => base("debug", ...a),
    ok: (...a: unknown[]) => base("ok", ...a),
    log: (...a: unknown[]) => base("log", ...a),
  };
}

// capturar errores globales
window.addEventListener("error", (e) => logger("global").error(e.message, e.error));
window.addEventListener("unhandledrejection", (e) => logger("global").error("unhandled", e.reason));
