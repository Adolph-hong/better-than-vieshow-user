// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier", // 關閉 ESLint 中與 Prettier 衝突的規則
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
    // ✅ 加上這段讓 import 自動辨識 .ts / .tsx
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    quotes: ["off"],
    // --- react 基礎 ---
    "react/react-in-jsx-scope": "off", // React 17+ 不需要 import React
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "react/require-default-props": "off",

    // --- typescript & import ---
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-router-dom",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // --- 其他細項可選 ---
    "react/function-component-definition": "off", // 允許箭頭函式元件
    "no-alert": "off", // 允許使用 alert
    "arrow-body-style": "off", // 允許使用 return 語句
  },
}
