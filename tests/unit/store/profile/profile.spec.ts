/* eslint-disable @typescript-eslint/no-explicit-any */
// テスト対象のストア
import { profileStore } from '@/store/profile/profile.ts';
import store from '@/store';
// モック化対象のオブジェクト
import axios from 'axios';
declare let mockAxiosGet: any;
declare let mockAxiosPatch: any;

// プロフィールのストアのテスト
describe('profile store', () => {
  // テスト実行前にモック化を解除し、プロフィールを初期化
  beforeEach(() => {
    jest.restoreAllMocks();
    profileStore.clearProfile();
  });

  // プロフィール情報のモックデータ
  const userId = '66006b29-727e-4ed8-a3c8-95d4438f66d4';
  const userName = 'naminami';
  const mockData = {
    data: {
      userId: userId,
      userName: userName,
    },
  };

  // サインインに成功したときの挙動を確認するテスト
  it('signInAsync success', async () => {
    // axios.get をモック化
    mockAxiosGet(mockData);
    // テスト対象の action を実行
    await profileStore.signInAsync();
    // getter を呼び出してプロフィール情報を取得
    const result = profileStore.getProfile;
    // GET で取得したレスポンスがプロフィール情報に反映されていることを検証
    expect(result?.userId).toBe(userId);
    expect(result?.userName).toBe(userName);
  });
  // ユーザー名の更新に成功したときの挙動を確認するテスト
  it('updateUserNameAsync success', async () => {
    // サインインしている状態がテストの前提条件（sessionStorage はテスト対象外）
    (store as any).state.profile.profile = { ...mockData.data };
    // axios.patch が HTTP ステータスコード 200 を返却するようにモック化
    mockAxiosPatch({ status: 200 });
    // 更新後のユーザー名
    const userName = 'naminami2';
    // テスト対象の action を実行
    await profileStore.updateUserNameAsync(userName);
    // getter を呼び出してプロフィール情報を取得
    const result = profileStore.getProfile;
    // ユーザー名の変更が反映されていることを検証
    expect(result?.userName).toBe(userName);
  });
  // ユーザー名の更新に失敗したときの挙動を確認するテスト
  it('updateUserNameAsync fail', async () => {
    // サインインしている状態がテストの前提条件（sessionStorage はテスト対象外）
    (store as any).state.profile.profile = { ...mockData.data };
    // axios.patch が例外をスローするようにモック化
    jest.spyOn(axios, 'patch').mockImplementation(() => {
      throw new Error();
    });
    // テスト対象の action を実行し、例外がスローされることを確認
    await expect(profileStore.updateUserNameAsync('fune')).rejects.toThrow();
    // getter を呼び出してプロフィール情報を取得
    const result = profileStore.getProfile;
    // ユーザー名の変更が反映されていないことを検証
    expect(result?.userName).toBe(userName);
  });
});
