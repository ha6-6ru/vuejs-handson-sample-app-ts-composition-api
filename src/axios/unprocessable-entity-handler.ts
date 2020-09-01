import Vue from 'vue';
import { AxiosError } from 'axios';

export class UnprocessableEntityHandler {
  public static onRejected() {
    return (error: AxiosError) => {
      if (error?.response?.status === 422) {
        Vue.prototype.$toast(error.response?.data?.title);
      }

      return Promise.reject(error);
    };
  }
}
