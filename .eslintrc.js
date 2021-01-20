// eslint-disable-next-line filename-rules/match
const path = require("path");

const jsConfig = require("./jsconfig.json");

const { baseUrl, paths } = jsConfig.compilerOptions;

const aliasPaths = Object.keys(paths);

const aliasMap = aliasPaths.map((aliasPath) => {
  return [
    aliasPath.replace("/*", ""),
    path.join(
      __dirname,
      `${baseUrl}/${paths[aliasPath][0].replace("./", "").replace("/*", "")}`
    ),
  ];
});

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    "plugin:sonarjs/recommended",
    "eslint:recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  ignorePatterns: ["node_modules/", ".next/"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "prettier",
    "sonarjs",
    "no-secrets",
    "filename-rules",
    "sort-keys-fix",
    "sort-destructure-keys",
  ],
  rules: {
    "filename-rules/match": [
      2,
      {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        ".js": "kebab-case",
        ".jsx": /^index|^([A-Z][a-z]*)+\.jsx$/,
        ".scss": "kebab-case",
      },
    ],
    "import/no-named-as-default": 0,
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["invalidHref", "preferButton"],
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
      },
    ],
    "no-secrets/no-secrets": "error",
    "no-unused-vars": "error",
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": "off",
    "sort-destructure-keys/sort-destructure-keys": [
      2,
      { caseSensitive: false },
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
  },
  settings: {
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx"],
        map: aliasMap,
      },
    },
  },
};
