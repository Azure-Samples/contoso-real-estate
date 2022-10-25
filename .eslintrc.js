module.exports = {
    extends: [
        "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
    },
};