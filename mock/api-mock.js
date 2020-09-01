/* eslint-disable @typescript-eslint/no-var-requires */
const delay = require('mocker-api/lib/delay');
const profile = require('./profile/profile-mock');

const proxy = {
  ...profile,
};

// 1秒遅延させる
module.exports = delay(proxy, 1000);
