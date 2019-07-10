import todoService from "./todoService";

export default {
  namespaced: true,

  state: {
    loading: false,
    list: []
  },

  getters: {
    list: state => state.list || [],
    loading: state => !!state.loading
  },

  mutations: {
    LIST_STARTED(state) {
      state.loading = true;
    },

    LIST_SUCCESS(state, payload) {
      state.list = payload;
      state.loading = false;
    },

    LIST_ERROR(state, payload) {
      // eslint-disable-next-line
      console.error(payload);
      state.loading = false;
    },

    CREATE_STARTED(state) {
      state.loading = true;
    },

    CREATE_SUCCESS(state) {
      state.loading = false;
    },

    CREATE_ERROR(state, payload) {
      // eslint-disable-next-line
      console.error(payload);
      state.loading = false;
    },

    DESTROY_STARTED(state) {
      state.loading = true;
    },

    DESTROY_SUCCESS(state) {
      state.loading = false;
    },

    DESTROY_ERROR(state, payload) {
      // eslint-disable-next-line
      console.error(payload);
      state.loading = false;
    }
  },

  actions: {
    async doList({ commit }) {
      try {
        commit("LIST_STARTED");
        const list = await todoService.list();
        commit("LIST_SUCCESS", list);
      } catch (error) {
        commit("LIST_ERROR", error);
      }
    },

    async doCreate({ commit, dispatch }, payload) {
      try {
        commit("CREATE_STARTED");
        await todoService.create(payload);
        await dispatch("doList");
        commit("CREATE_SUCCESS");
      } catch (error) {
        commit("CREATE_ERROR", error);
      }
    },

    async doDestroy({ commit, dispatch }, payload) {
      try {
        commit("DESTROY_STARTED");
        await todoService.destroy(payload);
        await dispatch("doList");
        commit("DESTROY_SUCCESS");
      } catch (error) {
        commit("DESTROY_ERROR", error);
      }
    }
  }
};
