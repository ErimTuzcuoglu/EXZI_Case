module.exports = {
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // for ESM 'module' option
    globals: {
      console: 'readonly',
      process: 'readonly',
      require: 'readonly',
      module: 'readonly',
      __dirname: 'readonly',
    },
  },
  rules: {
    // Project specific rules
    'no-console': 'off', // allow console usage
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}], // Show warning for non-used variables
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': false,
    }],
    'no-trailing-spaces': 'error',
    'space-infix-ops': 'error',
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'semi': ['error', 'always'], // semicolon mandatory
    'quotes': ['error', 'single'], // single quote mandatory
    'indent': ['error', 2], // 2 indent mandatory
    'comma-dangle': ['error', 'always-multiline'], // multiline comma mandatory
    'object-curly-spacing': ['error', 'never'],
    // 'sort-imports': ['warn'],
    'prefer-arrow-callback': 'off',
    'func-style': ['off', 'declaration', {allowArrowFunctions: true}],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
  },
};

