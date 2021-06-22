import { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const res = await fetch('/api/clients');
      const data = await res.json();

      setClients(data);
    };

    getClients();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/client/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
