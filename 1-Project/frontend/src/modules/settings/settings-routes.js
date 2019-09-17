import Layout from '@/modules/layout/components/layout';
import Permissions from '@/security/permissions';

const SettingsPage = () =>
  import('@/modules/settings/components/settings-page.vue');

export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'settings',
        path: '/settings',
        component: SettingsPage,
        exact: true,
        meta: {
          auth: true,
          permission: Permissions.values.settingsEdit,
        },
      },
    ],
  },
];
