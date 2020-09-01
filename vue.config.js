/* eslint-disable @typescript-eslint/no-var-requires */
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('@/../mock/api-mock.js'), {
        proxy: {
          '/api/(.*)': 'http://localhost:8080/',
        },
        changeHost: true,
      });
    },
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [
      // ホットリロード時に stylelint を実行する
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
  },
};
