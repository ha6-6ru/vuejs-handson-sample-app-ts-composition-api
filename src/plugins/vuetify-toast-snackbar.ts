import Vue from 'vue';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(VuetifyToast, {
  x: 'center',
  y: 'top',
  color: 'warning',
  icon: 'warning',
  queueable: true,
});
