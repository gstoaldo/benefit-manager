import {
  filterEmployeeData,
  validateEmployeeData,
} from 'utils/inputValidation';
import { fakePartnerAPI } from './fakePartnerAPI';

export async function getClients() {
  const url = `/api/clients`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getClient(clientId) {
  const url = `/api/clients/${clientId}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getEmployee(clientId, employeeId) {
  const url = `/api/clients/${clientId}/employees/${employeeId}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createEmployee(clientId) {
  const url = `/api/clients/${clientId}/employees`;
  const res = await fetch(url, {
    method: 'POST',
  });
  return handleResponse(res);
}

export async function updateEmployee(clientId, employeeId, data) {
  const url = `/api/clients/${clientId}/employees/${employeeId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function getBenefits(clientId) {
  const url = `/api/clients/${clientId}/benefits`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getBenefit(benefitId) {
  const url = `/api/benefits/${benefitId}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function sendBenefitData(clientId, employeeId, benefitId) {
  const employee = await getEmployee(clientId, employeeId);
  const benefit = await getBenefit(benefitId);

  const isValid = validateEmployeeData(employee, benefit.requiredFields);

  if (!isValid) {
    throw new Error('Invalid data');
  }

  await fakePartnerAPI(filterEmployeeData(employee, benefit.requiredFields));

  return updateEmployee(clientId, employeeId, {
    ...employee,
    benefitIds: [...employee.benefitIds, benefitId],
  });
}

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
