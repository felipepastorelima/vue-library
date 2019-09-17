const string = ({ label, required, min, max }) => {
  const output = [];

  if (required) {
    output.push({
      required: !!required,
      message: `${label} is required`,
    });
  }

  if (min || min === 0) {
    output.push({
      min,
      message: `${label} length must be at least ${min}`,
    });
  }

  if (max || max === 0) {
    output.push({
      max,
      message: `${label} length must be a maximum of ${max}`,
    });
  }

  return output;
};

const decimal = ({ label, required, min, max }) => {
  const output = [
    {
      type: 'number',
      message: `${label} should be a number`,
    },
  ];

  if (required) {
    output.push({
      type: 'number',
      required: !!required,
      message: `${label} is required`,
    });
  }

  if (min || min === 0) {
    output.push({
      type: 'number',
      min,
      message: `${label} must be at least ${min}`,
    });
  }

  if (max || max === 0) {
    output.push({
      type: 'number',
      max,
      message: `${label} must be a maximum of ${max}`,
    });
  }

  return output;
};

const integer = ({ label, required, min, max }) => {
  const integerFn = (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }

    if (Number.isInteger(value)) {
      callback();
      return;
    }

    callback(new Error('Value should be an integer'));
  };

  return [
    {
      validator: integerFn,
      message: `${label} should be an integer`,
    },
    ...decimal({ label, required, min, max }),
  ];
};

const generic = ({ label, required }) => {
  const output = [];

  if (required) {
    output.push({
      required: true,
      message: `${label} is required`,
    });
  }

  return output;
};

const hasOne = ({ label, required }) => {
  const requiredFn = (rule, value, callback) => {
    if (!value) {
      callback(new Error('Value is required'));
      return;
    }

    callback();
  };

  if (!required) {
    return [];
  }

  return [
    {
      required: true,
      validator: requiredFn,
      message: `${label} is required`,
    },
  ];
};

const hasMany = ({ label, required, min, max }) => {
  const requiredFn = (rule, value, callback) => {
    if (!value || !value.length) {
      callback(new Error('Value is required'));
      return;
    }

    callback();
  };

  const minFn = (rule, value, callback) => {
    if (!value || !value.length) {
      callback();
      return;
    }

    if (value.length < min) {
      callback(
        new Error(`Value size must be at least ${min}`),
      );
    }

    callback();
  };

  const maxFn = (rule, value, callback) => {
    if (!value || !value.length) {
      callback();
      return;
    }

    if (value.length > max) {
      callback(
        new Error(`Value size must be a maximum of ${max}`),
      );
    }

    callback();
  };

  const output = [];

  if (required) {
    output.push({
      required: true,
      validator: requiredFn,
      message: `${label} is required`,
    });
  }

  if (min || min === 0) {
    output.push({
      validator: minFn,
      message: `${label} size must be at least ${min}`,
    });
  }

  if (max || max === 0) {
    output.push({
      validator: maxFn,
      message: `${label} size must be a maximum of ${max}`,
    });
  }

  return output;
};

export default {
  string,
  integer,
  decimal,
  generic,
  hasOne,
  hasMany,
};
