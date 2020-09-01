import Vue from 'vue';
import { AxiosError } from 'axios';

Vue.config.errorHandler = (err, vm, info) => {
  console.log('Vue.config.errorHandler:', info, err);
  if (
    'isAxiosError' in err &&
    (((err as AxiosError)?.config?.method === 'POST' &&
      (err as AxiosError)?.config?.url === 'log') ||
      (err as AxiosError)?.response?.status === 401 ||
      (err as AxiosError)?.response?.status === 422)
  ) {
    // ログ収集用のWebAPIとユーザーが対処するエラーを、ログ出力の対象から除外
    return;
  }
  // ログ収集を行う処理を実装
};
Vue.config.warnHandler = (msg, vm, trace) => {
  console.log('Vue.config.warnHandler:', msg, trace);
};
window.addEventListener('error', event => {
  console.log('error EventListener:', event.error);
});
window.addEventListener('unhandledrejection', event => {
  console.log('unhandledrejection EventListener:', event.reason);
});
