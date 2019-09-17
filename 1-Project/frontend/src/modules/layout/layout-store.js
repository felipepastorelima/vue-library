export default {
  namespaced: true,

  state: {
    menuCollapsed: false,
    isMobile: false,
  },

  getters: {
    menuCollapsed: (state) => state.menuCollapsed,
    isMobile: (state) => !!state.isMobile,
    paginationLayout: (state) =>
      state.isMobile
        ? 'total, prev, pager, next'
        : 'total, sizes, prev, pager, next',
    labelPosition: (state) =>
      state.isMobile ? 'top' : undefined,
    labelWidthForm: (state) =>
      state.isMobile ? undefined : '180px',
    labelWidthFilter: (state) =>
      state.isMobile ? undefined : '120px',
  },

  mutations: {
    COLLAPSE_MENU(state) {
      state.menuCollapsed = true;
    },

    TOGGLE_MENU(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },

    RESIZE(state, payload) {
      state.isMobile = payload.width < 576;
    },
  },

  actions: {
    resize({ commit }, payload) {
      commit('RESIZE', payload);
    },

    toggleMenu({ commit }) {
      commit('TOGGLE_MENU');
    },

    collapseMenu({ commit }) {
      commit('COLLAPSE_MENU');
    },
  },
};
