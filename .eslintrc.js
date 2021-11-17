module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "import"],
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
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": "error",
    },
    settings: {
        "import/resolver": {
            typescript: {},
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                paths: ["./app"],
            },
        },
    },
};
