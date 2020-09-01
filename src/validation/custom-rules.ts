import { ValidationRule } from 'vee-validate/dist/types/types';

export const customRules: { [key: string]: ValidationRule } = {
  userNameAllowedCharacters: {
    message: '{_field_}は英字、数字、「_」のみ使用できます。',
    validate: value => {
      return /^[0-9A-Z_]*$/i.test(value);
    },
  },
};
