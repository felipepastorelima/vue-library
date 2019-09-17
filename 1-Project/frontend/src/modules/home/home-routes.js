import Layout from '@/modules/layout/components/layout';

const HomePage = () =>
  import('@/modules/home/components/home-page.vue');

export default [
  {
    path: '',
    exact: true,
    component: Layout,
    children: [
      {
        name: 'home',
        path: '',
        component: HomePage,
        exact: true,
        meta: { auth: true },
      },
    ],
  },
];
