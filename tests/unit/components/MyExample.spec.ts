/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
// テスト対象のコンポーネント
import MyExampleComponent from '@/components/MyExample.vue';

// 単体テストで使用する Vue インスタンスを生成
const localVue = createLocalVue();

describe('MyExample.vue', () => {
  let vuetify: any;
  // テスト実行前に Vuetify の状態を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  // テスト対象のコンポーネントをマウントするヘルパー関数
  const mountHelper = (options: any) => {
    return mount(MyExampleComponent, {
      localVue,
      vuetify,
      ...options,
    });
  };

  it('test', () => {
    // テスト対象のコンポーネントをマウント
    const wrapper = mountHelper({
      propsData: {
        value: {
          foo: '111',
          bar: '222',
        },
      },
      attrs: {
        'data-test': '',
      },
    });
    // v-text-field に値を設定
    wrapper.find('[data-test]').setValue('999');
    // 通知されたイベントデータの検証
    expect(wrapper.emitted().input).toStrictEqual([
      [{ foo: '999', bar: '222' }],
    ]);
    // ボタンのクリックイベントを発行
    wrapper.find('.v-btn').trigger('click');
    // 通知されたイベントデータの検証
    expect((wrapper.emitted()['custom-event'] as any)[0][0]).toBe(100);
  });
});
