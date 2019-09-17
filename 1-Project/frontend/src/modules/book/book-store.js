import bookListStore from '@/modules/book/book-list-store';
import bookViewStore from '@/modules/book/book-view-store';
import bookImporterStore from '@/modules/book/book-importer-store';
import bookFormStore from '@/modules/book/book-form-store';
import bookDestroyStore from '@/modules/book/book-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: bookDestroyStore,
    form: bookFormStore,
    list: bookListStore,
    view: bookViewStore,
    importer: bookImporterStore,
  },
};
