import { createServer, Response } from 'miragejs';
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
      this.passthrough('/api/partner');
      this.namespace = '/api';
      this.timing = 1000;

      this.get('/clients', (schema) => {
        return schema.db.clients;
      });

      this.get('/clients/:clientId', (schema, request) => {
        const { clientId } = request.params;
        const client = schema.db.clients.find(clientId);
        return clientWithEmployees(client, schema.db.employees);
      });

      this.get('/clients/:clientId/benefits', (schema, request) => {
        const { clientId } = request.params;
        const { benefitIds } = schema.db.clients.find(clientId);
        return benefitIds.map((id) => schema.db.benefits.find(id));
      });

      this.get('/clients/:clientId/employees', (schema, request) => {
        const { clientId } = request.params;
        const client = schema.db.clients.find(clientId);
        return client.employeeIds.map((id) => schema.db.employees.find(id));
      });

      this.get('/benefits/:benefitId', (schema, request) => {
        const { benefitId } = request.params;
        return schema.db.benefits.find(benefitId);
      });

      this.get(
        '/clients/:clientId/employees/:employeeId',
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

      this.post('/clients/:clientId/employees', (schema, request) => {
        const { clientId } = request.params;
        const NEW_EMPLOYEE_FIELDS = { benefitIds: [] };
        const employee = schema.db.employees.insert(NEW_EMPLOYEE_FIELDS);
        const client = schema.db.clients.find(clientId);
        const updatedClient = schema.db.clients.update(clientId, {
          employeeIds: [...client.employeeIds, employee.id],
        });

        return clientWithEmployees(updatedClient, schema.db.employees);
      });

      this.put(
        '/clients/:clientId/employees/:employeeId',
        (schema, request) => {
          const { clientId, employeeId } = request.params;
          const attrs = JSON.parse(request.requestBody);

          const employee = schema.db.employees.find(employeeId);
          const client = schema.db.clients.find(clientId);

          if (client.employeeIds.includes(employee.id)) {
            return schema.db.employees.update(employeeId, attrs);
          }

          return new Response(404);
        }
      );

      this.passthrough();
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
