import * as yup from 'yup';
import { i18n } from '@/i18n';
import GenericField from '@/shared/fields/generic-field';

export default class BooleanField extends GenericField {
  constructor(
    name,
    label,
    { yesLabel = undefined, noLabel = undefined } = {},
  ) {
    super(name, label);

    this.yesLabel = yesLabel || i18n('common.yes');
    this.noLabel = noLabel || i18n('common.no');
  }

  forPresenter(value) {
    return value ? this.yesLabel : this.noLabel;
  }

  forFilterInitialValue(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forFormRules() {
    return undefined;
  }

  forFormCast() {
    let yupChain = yup
      .bool()
      .default(false)
      .label(this.label);
    return yupChain;
  }

  forFilterRules() {
    return undefined;
  }

  forFilterCast() {
    let yupChain = yup.bool().label(this.label);
    return yupChain;
  }

  forExport() {
    return yup
      .bool()
      .nullable(true)
      .default(false)
      .label(this.label);
  }

  forImport() {
    let yupChain = yup
      .bool()
      .default(false)
      .label(this.label);
    return yupChain;
  }
}
