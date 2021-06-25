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
      <Header>
        <h1>Clientes</h1>
      </Header>
      <List>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/client/${client.id}`} passHref>
              <ClientLink>{client.name}</ClientLink>
            </Link>
          </li>
        ))}
      </List>
    </div>
  );
};

const Header = styled.header`
  padding: 32px;
`;

const List = styled.ul`
  padding: 32px;
`;

const ClientLink = styled.a`
  color: var(--color-primary);
  font-size: var(--f3);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export default Home;
