import formatDateFilter from '@/shared/filters/format-date-filter';
import formatDatetimeFilter from '@/shared/filters/format-datetime-filter';
import autofocusMixin from '@/shared/mixins/autofocus-mixin';
import I18n from '@/shared/i18n/i18n.vue';
import I18nFlags from '@/shared/i18n/i18n-flags.vue';
import I18nSelect from '@/shared/i18n/i18n-select.vue';
import ImageUpload from '@/shared/form/image-upload.vue';
import FileUpload from '@/shared/form/file-upload.vue';
import ImageCarousel from '@/shared/view/image-carousel.vue';
import ViewItemText from '@/shared/view/view-item-text.vue';
import ViewItemImage from '@/shared/view/view-item-image.vue';
import ViewItemFile from '@/shared/view/view-item-file.vue';
import ViewItemCustom from '@/shared/view/view-item-custom.vue';
import ListItemImage from '@/shared/list/list-item-image.vue';
import ListItemFile from '@/shared/list/list-item-file.vue';
import Importer from '@/shared/importer/components/importer.vue';
import NumberRangeInput from '@/shared/form/number-range-input.vue';
import AutocompleteOneInput from '@/shared/form/autocomplete-one-input.vue';
import AutocompleteManyInput from '@/shared/form/autocomplete-many-input.vue';
import ViewItemRelationToOne from '@/shared/view/view-item-relation-to-one.vue';
import ViewItemRelationToMany from '@/shared/view/view-item-relation-to-many.vue';
import ListItemRelationToOne from '@/shared/list/list-item-relation-to-one.vue';
import ListItemRelationToMany from '@/shared/list/list-item-relation-to-many.vue';

export default {
  components: [
    I18n,
    I18nFlags,
    I18nSelect,
    ImageUpload,
    FileUpload,
    ImageCarousel,
    ViewItemText,
    ViewItemImage,
    ViewItemFile,
    ViewItemCustom,
    Importer,
    ListItemImage,
    ListItemFile,
    NumberRangeInput,
    AutocompleteOneInput,
    AutocompleteManyInput,
    ViewItemRelationToOne,
    ViewItemRelationToMany,
    ListItemRelationToOne,
    ListItemRelationToMany,
  ],

  filters: [formatDateFilter, formatDatetimeFilter],

  mixins: [autofocusMixin],
};
