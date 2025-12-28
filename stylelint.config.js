/**
 * @see https://stylelint.io/user-guide/configure
 * @type {import('stylelint').Config}
 */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order'],
  rules: {
    'no-empty-source': null, // 空のソースを許可
    'order/properties-alphabetical-order': true, // CSSプロパティをアルファベット順でソート
    'import-notation': 'string', // @importの表記を文字列に統一
    'at-rule-no-unknown': [
      // Tailwind CSS用
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'layer', 'screen']
      }
    ]
  }
};

module.exports = config;
