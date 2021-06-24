export async function getClients() {
  const url = `/api/clients`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getEmployee(clientId, employeeId) {
  const url = `/api/clients/${clientId}/employees/${employeeId}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function getEmployees(clientId) {
  const url = `/api/clients/${clientId}/employees`;
  const res = await fetch(url);
  return handleResponse(res);
}

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
