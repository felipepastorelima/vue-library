import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const IamListPage = () =>
  import('@/modules/iam/components/iam-list-page.vue');
const IamNewPage = () =>
  import('@/modules/iam/components/iam-new-page.vue');
const IamEditPage = () =>
  import('@/modules/iam/components/iam-edit-page.vue');
const IamViewPage = () =>
  import('@/modules/iam/components/iam-view-page.vue');
const IamImporterPage = () =>
  import('@/modules/iam/components/iam-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'iam',
        path: '/iam',
        component: IamListPage,
        meta: {
          auth: true,
          permission: Permissions.values.iamRead,
        },
      },
      {
        name: 'iamNew',
        path: '/iam/new',
        component: IamNewPage,
        meta: {
          auth: true,
          permission: Permissions.values.iamCreate,
        },
      },
      {
        name: 'iamImporter',
        path: '/iam/import',
        component: IamImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.iamImport,
        },
      },
      {
        name: 'iamEdit',
        path: '/iam/:id/edit',
        component: IamEditPage,
        meta: {
          auth: true,
          permission: Permissions.values.iamEdit,
        },
        props: true,
      },
      {
        name: 'iamView',
        path: '/iam/:id',
        component: IamViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.iamRead,
        },
        props: true,
      },
    ],
  },
];
