import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      // externas primero, luego internas (@/...), luego relativas
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1) Node.js builtins
            [
              "^node:",
              `^(${[
                "assert",
                "buffer",
                "child_process",
                "crypto",
                "fs",
                "http",
                "https",
                "path",
                "os",
                "stream",
                "url",
                "util",
                "zlib",
              ].join("|")})(/|$)`,
            ],
            // 2) Paquetes externos (react primero)
            ["^react$", "^react", "^@?\\w"],
            // 3) Imports con alias internos
            ["^@/"],
            // 4) Imports absolutos del proyecto sin alias (si usás baseUrl: src)
            ["^(src/)", "^[A-Z].*"],
            // 5) Estilos
            ["^.+\\.(css|scss|sass)$"],
            // 6) Relativos (../ y ./), archivos locales
            ["^\\u0000", "^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
