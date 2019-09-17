import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const LoanListPage = () =>
  import('@/modules/loan/components/loan-list-page.vue');
const LoanFormPage = () =>
  import('@/modules/loan/components/loan-form-page.vue');
const LoanViewPage = () =>
  import('@/modules/loan/components/loan-view-page.vue');
const LoanImporterPage = () =>
  import('@/modules/loan/components/loan-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'loan',
        path: '/loan',
        component: LoanListPage,
        meta: {
          auth: true,
          permission: Permissions.values.loanView,
        },
      },
      {
        name: 'loanNew',
        path: '/loan/new',
        component: LoanFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.loanCreate,
        },
      },
      {
        name: 'loanImporter',
        path: '/loan/import',
        component: LoanImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.loanImport,
        },
      },
      {
        name: 'loanEdit',
        path: '/loan/:id/edit',
        component: LoanFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.loanEdit,
        },
        props: true,
      },
      {
        name: 'loanView',
        path: '/loan/:id',
        component: LoanViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.loanView,
        },
        props: true,
      },
    ],
  },
];
