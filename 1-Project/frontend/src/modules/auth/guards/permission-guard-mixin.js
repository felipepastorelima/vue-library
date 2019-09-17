import { storeAsync } from '@/app-module';
import PermissionChecker from '@/modules/iam/permission-checker';

export default {
  async beforeRouteEnter(to, from, next) {
    if (!to.meta || !to.meta.permission) {
      next();
      return;
    }

    await storeAsync().dispatch('auth/doWaitUntilInit');

    if (
      new PermissionChecker(
        storeAsync().getters['auth/currentUser'],
      ).match(to.meta.permission)
    ) {
      next();
    } else {
      next('/403');
    }
  },
};
