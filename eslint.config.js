// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const vitest = require('@vitest/eslint-plugin');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.jsの組込モジュール
            'external', // 外部モジュール
            'internal', // 自作モジュール
            'parent', // 親階層のファイル
            'sibling', // 同階層のファイル
            'index' // 同階層のindexファイル
          ],
          'newlines-between': 'always', // グループ間に空行を挿入する
          // インポートをアルファベット順にソートする
          alphabetize: {
            order: 'asc', // 昇順でソート
            caseInsensitive: true // 大文字小文字を区別しない
          },
          // 特定のパターンのインポートに対してグループを指定
          pathGroups: [
            {
              pattern: '@angular**', // @angular で始まるモジュール
              group: 'external', // external グループに分類
              position: 'before' // グループの最前に配置
            }
          ]
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off' // 二重にエラーが表示されるのでOFFにする
    }
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {}
  },
  {
    files: ['**/*.html'],
    plugins: { prettier: eslintPluginPrettier }, // Prettierプラグインを使用
    rules: { 'prettier/prettier': ['error', { parser: 'angular' }] } // PrettierでHTMLテンプレートを整形
  },
  {
    files: ['**/*.spec.ts'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules, // Vitestの推奨ルールを適用
      'vitest/consistent-test-it': ['error', { fn: 'test' }], // 'it'を'test'に統一
      'vitest/require-top-level-describe': ['error'] // describeブロックを必須にする
    }
  }
]);
