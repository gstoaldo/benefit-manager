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

      this.get('/api/clients', (schema) => {
        return schema.db.clients;
      });

      this.get('/api/clients/:clientId', (schema, request) => {
        const { clientId } = request.params;
        return schema.db.clients.find(clientId);
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
    },
  });

  return server;
}
