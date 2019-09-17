import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';

export default class JsonField extends GenericField {
  forPresenter(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forFormRules() {
    let yupChain = yup.mixed().label(this.label);
    return yupChain;
  }

  forFilter() {
    let yupChain = yup.mixed().label(this.label);
    return yupChain;
  }

  forExport() {
    let yupChain = yup
      .mixed()
      .label(this.label)
      .transform((value, originalValue) => {
        return JSON.stringify(originalValue, null, 2);
      });
    return yupChain;
  }

  forImport() {
    let yupChain = yup.mixed().label(this.label);
    return yupChain;
  }
}
