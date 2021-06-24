import { createServer } from 'miragejs';
import { BENEFITS, EMPLOYEES, CLIENTS } from '../data';

export function makeServer() {
  const server = createServer({
    seeds(server) {
      server.db.loadData({
        clients: CLIENTS,
        employees: EMPLOYEES,
        benefits: BENEFITS,
      });
    },

    routes() {
      this.passthrough('/_next/static/development/_devPagesManifest.json');
      this.timing = 3000;

      this.get('/api/clients', (schema) => {
        return schema.db.clients;
      });

      this.get('/api/clients/:clientId', (schema, request) => {
        const { clientId } = request.params;
        const client = schema.db.clients.find(clientId);
        return clientWithEmployees(client, schema.db.employees);
      });

      this.get('/api/clients/:clientId/benefits', (schema, request) => {
        const { clientId } = request.params;
        const { benefitIds } = schema.db.clients.find(clientId);
        return benefitIds.map((id) => schema.db.benefits.find(id));
      });

      this.get('/api/clients/:clientId/employees', (schema, request) => {
        const { clientId } = request.params;
        const client = schema.db.clients.find(clientId);
        return client.employeeIds.map((id) => schema.db.employees.find(id));
      });

      this.get(
        '/api/clients/:clientId/employees/:employeeId',
        (schema, request) => {
          const { clientId, employeeId } = request.params;
          const client = schema.db.clients.find(clientId);
          const employee = schema.db.employees.find(employeeId);

          if (employee === null || !client.employeeIds.includes(employeeId)) {
            return new Response(404);
          }

          return employee;
        }
      );

      this.post('/api/clients/:clientId/employees', (schema, request) => {
        const { clientId } = request.params;
        const employee = schema.db.employees.insert({});
        const client = schema.db.clients.find(clientId);
        const updatedClient = schema.db.clients.update(clientId, {
          employeeIds: [...client.employeeIds, employee.id],
        });

        return clientWithEmployees(updatedClient, schema.db.employees);
      });
    },
  });

  return server;
}

function clientWithEmployees(client, employeesDB) {
  return {
    ...client,
    employees: client.employeeIds.map((id) => employeesDB.find(id)),
  };
}
