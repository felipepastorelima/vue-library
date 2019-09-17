import '@/shared/plugins/element';
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import {
  setupComponentsFiltersDirectivesAndMixins,
  storeAsync,
  routerAsync,
} from '@/app-module';
import app from '@/app.vue';
import { SettingsService } from '@/modules/settings/settings-service';
import ProgressBar from '@/shared/progress-bar/progress-bar';
import { i18n } from '@/i18n';

(async function() {
  document.title = i18n('app.title');
  ProgressBar.start();
  await SettingsService.fetchAndApply();

  Vue.use(Router);
  Vue.config.productionTip =
    process.env.NODE_ENV === 'production';
  Vue.use(Vuex);
  setupComponentsFiltersDirectivesAndMixins();

  // eslint-disable-next-line
  new Vue({
    store: storeAsync(),
    router: routerAsync(),
    render: (h) => h(app),
  }).$mount('#app');
})();
