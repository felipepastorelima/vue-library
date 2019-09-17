import routes from '@/modules/auth/auth-routes';
import store from '@/modules/auth/auth-store';
import authGuardMixin from '@/modules/auth/guards/auth-guard-mixin';
import unauthGuardMixin from '@/modules/auth/guards/unauth-guard-mixin';
import emailAlreadyVerifiedGuardMixin from '@/modules/auth/guards/email-already-verified-guard-mixin';
import notEmptyPermissionsGuardMixin from '@/modules/auth/guards/not-empty-permissions-guard-mixin';
import permissionGuardMixin from '@/modules/auth/guards/permission-guard-mixin';

const mixins = [
  authGuardMixin,
  unauthGuardMixin,
  emailAlreadyVerifiedGuardMixin,
  notEmptyPermissionsGuardMixin,
  permissionGuardMixin,
];

export default {
  routes,
  store,
  mixins,
};
