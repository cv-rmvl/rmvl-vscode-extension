const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    ignores: [
      '.vscode-test/**',
      'dist/**',
      'node_modules/**',
      'out/**'
    ]
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        clearImmediate: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        exports: 'writable',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        setImmediate: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        suite: 'readonly',
        suiteSetup: 'readonly',
        suiteTeardown: 'readonly',
        test: 'readonly'
      }
    },
    rules: {
      'constructor-super': 'warn',
      'no-const-assign': 'warn',
      'no-this-before-super': 'warn',
      'no-undef': 'warn',
      'no-unreachable': 'warn',
      'no-unused-vars': 'warn',
      'valid-typeof': 'warn'
    }
  }
]);
