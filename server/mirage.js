import { createServer } from 'miragejs';
import { BENEFITS, CLIENTS, EMPLOYEES } from './data';

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
    },
  });

  return server;
}
