import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    ts: true,
  },
  {
    rules: {
      'vue/html-indent': 'off',
      'vue/script-indent': 'off',
      'vue/attributes-order': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/order-in-components': 'off',
      'perfectionist/sort-imports': 'off',
      'unicorn/no-this-outside-of-class': 'off',
      'unicorn/prefer-includes-over-repeated-comparisons': 'off',
      '@stylistic/indent': 'off',
      'regexp/no-obscure-range': 'off',
    },
  },
)
