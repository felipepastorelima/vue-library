import loanListStore from '@/modules/loan/loan-list-store';
import loanViewStore from '@/modules/loan/loan-view-store';
import loanImporterStore from '@/modules/loan/loan-importer-store';
import loanFormStore from '@/modules/loan/loan-form-store';
import loanDestroyStore from '@/modules/loan/loan-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: loanDestroyStore,
    form: loanFormStore,
    list: loanListStore,
    view: loanViewStore,
    importer: loanImporterStore,
  },
};
