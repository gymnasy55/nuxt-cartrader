module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
  },
  globals: {
    _: true,
  },
};
