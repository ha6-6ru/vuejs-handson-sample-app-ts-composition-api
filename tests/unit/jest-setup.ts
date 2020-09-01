/* eslint-disable @typescript-eslint/no-explicit-any */
// モック化対象のオブジェクト
import * as veeValidate from 'vee-validate';
// モック化対象のオブジェクト
import axios from 'axios';
declare let global: any;

global.mockVeeValidate = (valid: boolean) => {
  // vee-validate をモック化
  jest
    .spyOn(veeValidate, 'validate')
    .mockResolvedValue({ valid: valid } as any);
};

global.mockAxiosGet = (value: any) => {
  // axios.get をモック化
  jest.spyOn(axios, 'get').mockResolvedValue(value);
};

global.mockAxiosPatch = (value: any) => {
  // axios.patch をモック化
  jest.spyOn(axios, 'patch').mockResolvedValue(value);
};

import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

import Vuetify from 'vuetify';
Vue.use(Vuetify);
