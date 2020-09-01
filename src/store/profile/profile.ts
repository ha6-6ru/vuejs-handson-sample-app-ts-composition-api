import store from '@/store';
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import { Profile } from '@/store/profile.model';
import { update } from '@/store/shared-user';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * sessionStorage にプロフィール情報を保存します。
 */
const setStorage = (profile: Profile) => {
  sessionStorage.setItem('profile', JSON.stringify(profile));
};

@Module({ dynamic: true, store, name: 'profile', namespaced: true })
class ProfileModule extends VuexModule {
  public profile: Profile | null = null;

  /**
   * プロフィールを取得します。
   */
  public get getProfile() {
    if (this.profile) {
      return this.profile;
    }

    const profile = sessionStorage.getItem('profile');
    if (profile) {
      return JSON.parse(profile) as Profile;
    }

    return null;
  }

  /**
   * 新しいユーザー名を State に保存します。
   * @param userName ユーザー名
   */
  @Mutation
  private updateUserName(userName: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.userName = userName;
    setStorage(profile);
  }

  /**
   * 新しいニックネームを State に保存します。
   * @param nickname ニックネーム
   */
  @Mutation
  private updateNickname(nickname: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.nickname = nickname;
    setStorage(profile);
  }

  /**
   * 新しいテーマカラーを State に保存します。
   * @param userName テーマカラー
   */
  @Mutation
  private updateThemeColor(themeColor: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const profile = this.profile!;
    profile.themeColor = themeColor;
    setStorage(profile);
  }

  /**
   * プロフィールを State に保存します。
   */
  @Mutation
  private saveProfile(profile: Profile) {
    this.profile = profile;
    setStorage(profile);
  }

  /**
   * State からプロフィールをクリアします。
   */
  @Mutation
  public clearProfile() {
    this.profile = null;
    sessionStorage.removeItem('profile');
  }

  /**
   * ユーザー名を更新します。
   * @param userName ユーザー名
   */
  @Action
  public async updateUserNameAsync(userName: string) {
    const data = { userName: userName };

    // eslint-disable-next-line no-useless-catch
    try {
      await axios.patch('profile', data, {
        retryable: true,
      } as AxiosRequestConfig);
      this.updateUserName(userName);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      update(this.profile!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * ニックネームを更新します。
   * @param nickname ニックネーム
   */
  @Action
  public async updateNicknameAsync(nickname: string) {
    this.updateNickname(nickname);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    update(this.profile!);
  }

  /**
   * テーマカラーを更新します。
   * @param themeColor テーマカラー
   */
  @Action
  public async updateThemeColorAsync(themeColor: string) {
    this.updateThemeColor(themeColor);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    update(this.profile!);
  }

  /**
   * サインインします。
   */
  @Action
  public async signInAsync() {
    // ここに外部認証に関連した実装が必要

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get<Profile>('profile');
      this.saveProfile(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * サインアウトします。
   */
  @Action
  public async signOutAsync() {
    // eslint-disable-next-line no-useless-catch
    try {
      // ここにサインアウトに関連した実装が必要
      this.clearProfile();
    } catch (error) {
      throw error;
    }
  }
}

export const profileStore = getModule(ProfileModule);
