import { storeAsync } from '@/app-module';

export default {
  async beforeRouteEnter(to, from, next) {
    if (!to.meta || !to.meta.auth) {
      next();
      return;
    }

    const store = storeAsync();

    await store.dispatch('auth/doWaitUntilInit');

    if (!store.getters['auth/signedIn']) {
      next({ path: '/auth/signin' });
      return;
    }

    if (
      to.path !== '/auth/email-unverified' &&
      !store.getters['auth/currentUser'].emailVerified
    ) {
      next({ path: '/auth/email-unverified' });
      return;
    }

    if (
      to.path !== '/auth/empty-permissions' &&
      store.getters['auth/currentUser'].emailVerified &&
      !store.getters['auth/roles'].length
    ) {
      next({ path: '/auth/empty-permissions' });
      return;
    }

    next();
  },
};
