/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@e_commerce_package/config-eslint/express.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  }
};
