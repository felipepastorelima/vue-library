import iamListStore from '@/modules/iam/iam-list-store';
import iamFormStore from '@/modules/iam/iam-form-store';
import iamViewStore from '@/modules/iam/iam-view-store';
import iamImporterStore from '@/modules/iam/iam-importer-store';

export default {
  namespaced: true,

  modules: {
    list: iamListStore,
    form: iamFormStore,
    view: iamViewStore,
    importer: iamImporterStore,
  },
};
