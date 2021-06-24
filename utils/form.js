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
  return requiredFields.every((field) => employeeData[field] !== undefined);
}
