const prettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'semi': ['warn', 'always'],
          // Custom rule overrides or additions
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
      "react/prop-types": "off", // Example: Turn off prop-types checking if using TypeScript
      "no-irregular-whitespace": "error",
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "spaced-comment": ["error", "always"],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }]
    },
  },
];