import Vue from 'vue';
import { AxiosError } from 'axios';
import router from '@/router';
import { profileStore } from '@/store/profile/profile';

export class UnauthorizedHandler {
  public static onRejected() {
    return (error: AxiosError) => {
      if (error?.response?.status === 401) {
        profileStore.signOutAsync();

        Vue.prototype.$toast(
          'サインインの有効期限が切れました。もう一度サインインを行ってください。',
        );
        router.push('sign-in');
      }

      return Promise.reject(error);
    };
  }
}
