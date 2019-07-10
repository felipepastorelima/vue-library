import Vue from 'vue';
import Vuex from 'vuex';
import ProgressBar from '@/shared/progress-bar/progress-bar';
import Router from 'vue-router';
import shared from '@/shared/shared-module';
import auth from '@/modules/auth/auth-module';
import layout from '@/modules/layout/layout-module';
import iam from '@/modules/iam/iam-module';
import settings from '@/modules/settings/settings-module';
import auditLog from '@/modules/audit-log/audit-log-module';
import loan from '@/modules/loan/loan-module';
import book from '@/modules/book/book-module';

const modules = {
  shared,
  settings,
  auth,
  iam,
  auditLog,
  layout,
  loan,
  book,
};

// start - boilerplate code

const exists = (el) => !!el;

function setupComponentsFiltersDirectivesAndMixins() {
  Object.keys(modules)
    .map((key) => modules[key].components)
    .filter(exists)
    .forEach((components) => {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].filters)
    .filter(exists)
    .forEach((components) => {
      components.forEach((filter) => {
        Vue.filter(filter.name, filter.implementation);
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].directives)
    .filter(exists)
    .forEach((directives) => {
      directives.forEach((directive) => {
        Vue.directive(
          directive.name,
          directive.implementation,
        );
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].mixins)
    .filter(exists)
    .forEach((mixins) => {
      mixins.forEach((mixin) => {
        Vue.mixin(mixin);
      });
    });
}

const routes = [
  { path: '/', redirect: '/loan' },
  ...Object.keys(modules)
    .filter((key) => !!modules[key].routes)
    .map((key) => modules[key].routes)
    .reduce((a, b) => a.concat(b), []),
  { path: '*', redirect: '/404' },
];

let router = null;

const routerAsync = () => {
  if (!router) {
    router = new Router({
      mode: 'history',
      routes,
      scrollBehavior() {
        return { x: 0, y: 0 };
      },
    });

    router.beforeEach((to, from, next) => {
      if (to.name) {
        ProgressBar.start();
      }

      next();
    });

    router.afterEach(() => {
      ProgressBar.done();
    });
  }

  return router;
};

const buildStores = () => {
  const output = {};

  Object.keys(modules)
    .filter((key) => !!modules[key].store)
    .forEach((key) => {
      output[key] = modules[key].store;
    });

  return output;
};

let store = null;

const storeAsync = () => {
  if (!store) {
    store = new Vuex.Store({ modules: buildStores() });
  }

  return store;
};

export {
  setupComponentsFiltersDirectivesAndMixins,
  routerAsync,
  storeAsync,
};

// end - boilerplate code
