import { useState, useEffect } from 'react';

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

  console.log(`clients`, clients);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <p>{client.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
