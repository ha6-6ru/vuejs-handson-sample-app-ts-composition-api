export class ValidationItems {
  static nickname = {
    max: 15,
  };
  static userName = {
    userNameAllowedCharacters: true,
    max: 15,
  };
  static avatar = {
    ext: ['png', 'jpeg', 'bmp'],
    size: 300,
  };
}
