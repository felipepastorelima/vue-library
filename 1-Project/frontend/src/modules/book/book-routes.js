import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const BookListPage = () =>
  import('@/modules/book/components/book-list-page.vue');
const BookFormPage = () =>
  import('@/modules/book/components/book-form-page.vue');
const BookViewPage = () =>
  import('@/modules/book/components/book-view-page.vue');
const BookImporterPage = () =>
  import('@/modules/book/components/book-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'book',
        path: '/book',
        component: BookListPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookView,
        },
      },
      {
        name: 'bookNew',
        path: '/book/new',
        component: BookFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookCreate,
        },
      },
      {
        name: 'bookImporter',
        path: '/book/import',
        component: BookImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookImport,
        },
      },
      {
        name: 'bookEdit',
        path: '/book/:id/edit',
        component: BookFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookEdit,
        },
        props: true,
      },
      {
        name: 'bookView',
        path: '/book/:id',
        component: BookViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.bookView,
        },
        props: true,
      },
    ],
  },
];
