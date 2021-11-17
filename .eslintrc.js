module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [".tsx"],
            },
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                ts: "never",
                tsx: "never",
            },
        ],
        "react/function-component-definition": [
            2,
            { namedComponents: "function-declaration" },
        ],
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": "error",
    },
};
