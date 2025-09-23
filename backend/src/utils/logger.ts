import * as fs from "fs";
import path from "path";

type LogType = "error" | "warn" | "info" | "debug" | "ok" | "log";

const ColorsLog = {
  error: "\x1b[31m",
  warn: "\x1b[33m",
  info: "\x1b[34m",
  debug: "\x1b[36m",
  ok: "\x1b[32m",
  log: "\x1b[37m",
  reset: "\x1b[0m",
  underline: "\x1b[4m",
  bold: "\x1b[1m",
  link: "\x1b[36m",
};

const IconsLog = {
  error: "❌",
  warn: "⚠️ ", //? curiosamente este emoji se come un espacio del costado asi que se pone uno aqui
  info: "ℹ️",
  debug: "➡️",
  ok: "✅",
  log: "❔",
};

// expresion regular para ubicar URLs en strings
const URL_RE = /\b((https?:\/\/|www\.)[^\s)]+)\b/gi;

// expresion regular para ubicar lenguaje ANSI en strings (sin control char literal)
const ESC = String.fromCharCode(27);
const ANSI_RE = new RegExp(`${ESC}\\[[0-9;]*m`, "g");

const removeAnsi = (s: string) => s.replace(ANSI_RE, "");

const registerLog = (location: string) => {
  const logDir = path.resolve(process.cwd(), "log");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const filePath = path.join(logDir, "app.log");

  return (type: LogType = "log", message: string) => {
    const ts = new Date().toISOString();
    const icon = IconsLog[type] || IconsLog.log;
    const color = ColorsLog[type] || ColorsLog.log;

    // consola: reemplazo inline de URLs
    const coloredMsg = message.replace(
      URL_RE,
      (m) => `${ColorsLog.link}${ColorsLog.underline}${m}${ColorsLog.reset}${color}`
    );

    const toConsole = `${color}${icon} > [${location}] [${type}] ${coloredMsg}${ColorsLog.reset}`;
    const toFile = `[${ts}] [${location}] [${type}] ${message}\n`;

    console.log(toConsole);
    fs.appendFile(filePath, removeAnsi(toFile), (err) => {
      if (err)
        console.error(`${ColorsLog.error}[logger.ts] fallo al escribir log${ColorsLog.reset}`, err);
    });
  };
};

export default registerLog;
