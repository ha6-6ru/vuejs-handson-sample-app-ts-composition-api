import Vue from 'vue';
import axios, { AxiosError } from 'axios';

export class RetryHandler {
  private static maxRetryCount = 1;

  public static onRejected() {
    return (error: AxiosError) => {
      // キャンセルされた場合は何もしない
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      // HTTP ステータスコード 401 と 422 を除外
      if (error?.response?.status === 401 || error?.response?.status === 422) {
        return Promise.reject(error);
      }

      const axiosError = error as AxiosError;
      let retryCount = 1;

      // config に retryable が指定されていなければリトライしない
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!('retryable' in (axiosError.config as any))) {
        return Promise.reject(error);
      }

      // config に retryCount が追加されている場合（リトライ済みの場合）は加算
      if ('retryCount' in axiosError.config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        retryCount = (axiosError.config as any).retryCount + 1;
      }

      // 最大リトライ回数に到達
      if (retryCount > this.maxRetryCount) {
        // エラーメッセージを表示
        return this.handleError(error);
      }

      // config に retryCount を追加して、リクエストをリトライ。
      return axios.request({
        ...axiosError.config,
        ...{ retryCount: retryCount },
      });
    };
  }

  private static handleError(error: AxiosError) {
    Vue.prototype.$dialog.error({
      text: '問題が発生しました。時間をおいてもう一度お試しください。',
      title: 'Error',
      persistent: true,
      retainFocus: false,
    });
    return Promise.reject(error);
  }
}
