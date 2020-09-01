/* eslint-disable @typescript-eslint/no-explicit-any */
// テスト対象の関数
import { foo } from '@/library/foo';
declare let mockVeeValidate: any;

// foo 関数のテスト
describe('foo', () => {
  // テスト実行前にモック化を解除
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  // foo 関数が true を返したときの挙動を確認するテスト
  it('function foo (validate) return true', async () => {
    // validate が必ず true を返すようにモック化
    mockVeeValidate(true);
    // テスト対象関数を実行
    const result = await foo('123');
    // 戻り値が true であることを検証
    expect(result).toBeTruthy();
    // 戻り値が true であるときの挙動を検証
  });
  // foo 関数が false を返したときの挙動を確認するテスト
  it('function foo (validate) return false', async () => {
    // validate が必ず false を返すようにモック化
    mockVeeValidate(false);
    // テスト対象関数を実行
    const result = await foo('123');
    // 戻り値が false であることを検証
    expect(result).toBeFalsy();
    // 戻り値が false であるときの挙動を検証
  });
});
