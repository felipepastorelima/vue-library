import { storeAsync } from '@/app-module';

export default {
  async beforeRouteEnter(to, from, next) {
    if (!to.meta || !to.meta.emailAlreadyVerified) {
      next();
      return;
    }

    const store = storeAsync();

    await store.dispatch('auth/doWaitUntilInit');

    if (
      store.getters['auth/signedIn'] &&
      store.getters['auth/currentUser'].emailVerified
    ) {
      next('/');
    } else {
      next();
    }
  },
};
