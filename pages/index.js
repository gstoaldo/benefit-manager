import { useState, useEffect } from 'react';
import Link from 'next/link';
import useFetchHandler from 'hooks/useFetchHandler';
import { getClients } from 'server/api';
import styled from 'styled-components';

const Home = () => {
  const [clients, setClients] = useState([]);
  const fetchHandler = useFetchHandler();

  useEffect(() => {
    fetchHandler(async () => {
      const data = await getClients();
      setClients(data);
    }, 'Erro ao carregar clientes.');
  }, [fetchHandler]);

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

// const List = styled.ul`
//   lis
// `

export default Home;
