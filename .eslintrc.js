module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
    },
    rules: {
        semi: 'error',
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': ['error', { code: 80, ignoreComments: true }],
        'linebreak-style': 0,
        'keyword-spacing': ['error', { before: true, after: true }],
        'eol-last': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
        'object-curly-spacing': ['error', 'always'],
    },
    env: {
        browser: false,
        node: true,
    },
};
