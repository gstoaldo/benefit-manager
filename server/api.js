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

export async function getBenefits(clientId) {
  const url = `/api/clients/${clientId}/benefits`;
  const res = await fetch(url);
  return handleResponse(res);
}

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
