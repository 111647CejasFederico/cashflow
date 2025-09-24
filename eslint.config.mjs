import js from "@eslint/js";
import imp from "eslint-plugin-import";
import n from "eslint-plugin-n";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import sis from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended, // no type-aware para rapidez

  // Reglas comunes a todo el monorepo
  {
    plugins: { import: imp, "simple-import-sort": sis },
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "no-console": "off",
      "import/order": "off", // usamos simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // Frontend (React)
  {
    files: ["frontend/**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": hooks },
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Backend (Node)
  {
    files: ["backend/**/*.ts"],
    plugins: { n },
    rules: {
      "n/no-unsupported-features/es-syntax": "off",
      "n/no-missing-import": "off",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    },
  },
];
