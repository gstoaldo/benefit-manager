export function getUniqueRequiredFields(benefits) {
  let requiredFields = [];

  for (let benefit of benefits) {
    requiredFields.push(...benefit.requiredFields);
  }

  return [...new Set(requiredFields)];
}

export function filterEmployeeData(employeeData, requiredFields) {
  return requiredFields.reduce(
    (obj, key) => ({ ...obj, [key]: employeeData[key] }),
    {}
  );
}

export function validateEmployeeData(employeeData, requiredFields) {
  return requiredFields.every((field) =>
    fieldIsValid(field, employeeData[field])
  );
}

export function getFieldsValidation(employee) {
  const validation = {};

  for (let field in employee) {
    validation[field] = fieldIsValid(field, employee[field]);
  }

  return validation;
}

export function fieldIsValid(field, value) {
  const validationFunction =
    {
      height: heightIsValid,
      // we can add custom validation for each field. The height validation is
      // just a simple example.
    }[field] || defaultValidationFunction;

  return validationFunction(value);
}

function defaultValidationFunction(value) {
  return value !== undefined && value !== '';
}

function heightIsValid(value) {
  // height must be in cm, so if the value is less than 30, this should mean
  // that the user typed the value in meters.
  // This is just a very simple validation example.
  return value > 30;
}
