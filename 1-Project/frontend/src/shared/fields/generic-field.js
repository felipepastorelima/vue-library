export default class GenericField {
  constructor(name, label) {
    this.name = name;
    this.label = label;
  }

  forPresenter() {
    throw new Error('Called superclass');
  }

  forFilterCast() {
    throw new Error('Called superclass');
  }

  forFilterRules() {
    throw new Error('Called superclass');
  }

  forFormCast() {
    throw new Error('Called superclass');
  }

  forFormRules() {
    throw new Error('Called superclass');
  }

  forFilterInitialValue() {
    throw new Error('Called superclass');
  }

  forFormInitialValue() {
    throw new Error('Called superclass');
  }

  forExport() {
    throw new Error('Called superclass');
  }

  forImport() {
    throw new Error('Called superclass');
  }
}
