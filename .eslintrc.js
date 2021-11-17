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
            1,
            {
                extensions: [".jsx", ".tsx", ".js", ".ts"],
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
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "app/"],
            },
            alias: {
                map: [["~/", "./app"]],
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            },
        },
    },
};
