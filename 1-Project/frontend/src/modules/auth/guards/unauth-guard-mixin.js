import { storeAsync } from '@/app-module';

export default {
  async beforeRouteEnter(to, from, next) {
    if (!to.meta || !to.meta.unauth) {
      next();
      return;
    }

    await storeAsync().dispatch('auth/doWaitUntilInit');

    if (storeAsync().getters['auth/signedIn']) {
      next('/');
    } else {
      next();
    }
  },
};
