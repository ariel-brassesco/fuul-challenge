module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    createDefaultProgram: false,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "simple-import-sort",
    "sonarjs",
    "jest",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:jest/recommended",
  ],
  root: true,
  env: {
    node: true,
    "jest/globals": true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unsafe-argument":"off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    "unicorn/prefer-module": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prefer-node-protocol": "off",
  }
};