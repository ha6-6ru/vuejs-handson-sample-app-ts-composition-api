import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import ja from 'vuetify/src/locale/ja';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
  },
});

export default new Vuetify({
  lang: {
    locales: { ja },
    current: 'ja',
  },
  icons: {
    iconfont: 'md',
  },
});
