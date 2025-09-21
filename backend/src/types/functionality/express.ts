import type { TFunction, i18n as I18nInstance } from "i18next";

declare global {
  namespace Express {
    interface Request {
      validSchema?: unknown;
      t: TFunction;
      i18n: I18nInstance;
      language: string;
    }
  }
}

export {};
