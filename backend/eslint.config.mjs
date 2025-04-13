import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPromise from "eslint-plugin-promise";

export default [
  // Base rules for all files
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser, // Explicitly set TypeScript parser
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: process.cwd(), // Fix Windows path issues
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: eslintPluginImport,
      promise: eslintPluginPromise,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": ["warn"], // Warn on console.log (matches your index.ts)
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "import/order": ["error", { alphabetize: { order: "asc" } }],
      "import/extensions": ["off"],
      "promise/always-return": ["error"],
      "promise/no-native": ["off"],
    },
  },
  // TypeScript-specific rules
  {
    files: ["**/*.ts"],
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["warn"],
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/await-thenable": ["error"],
      "@typescript-eslint/no-unsafe-assignment": ["warn"],
    },
  },
];
