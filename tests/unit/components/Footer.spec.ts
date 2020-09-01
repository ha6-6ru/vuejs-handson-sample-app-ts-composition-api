/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
// テスト対象のコンポーネント
import FooterComponent from '@/components/Footer.vue';
// モック化対象のモジュール
import { profileStore } from '@/store/profile/profile';

// 単体テストで使用する Vue インスタンスを生成
const localVue = createLocalVue();

// プロフィール情報のモックデータ
const nickname = '波平';
const mockData = {
  data: {
    nickname: nickname,
  },
};

// profile モジュールをモック化
jest.mock('@/store/profile/profile', () => ({
  profileStore: {
    getProfile: jest.fn(),
  },
}));

describe('Footer.vue', () => {
  let vuetify: any;
  // テスト実行前に Vuetify の状態、モック実装を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
    (profileStore.getProfile as any) = { ...mockData.data };
  });

  // テスト対象のコンポーネントをマウントするヘルパー関数
  const mountHelper = (options?: any) => {
    return mount(FooterComponent, {
      localVue,
      vuetify,
      ...options,
    });
  };

  it('test', () => {
    // getter のモックを実装
    (profileStore.getProfile as any) = { ...mockData.data };
    // テスト対象のコンポーネントをマウント
    const wrapper = mountHelper({
      mocks: {
        $router: {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          push: () => {},
        },
      },
    });
    // コンポーネントの描画テキストを検証
    expect(wrapper.text()).toMatch(nickname);
    // メソッドの呼び出し
    (wrapper.vm as any).profile();
  });
});
