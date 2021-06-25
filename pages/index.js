import { useState, useEffect } from 'react';
import Link from 'next/link';
import useFetchHandler from 'hooks/useFetchHandler';
import { getClients } from 'server/api';
import styled from 'styled-components';
import PageHeader from 'components/PageHeader';

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
    <>
      <PageHeader title="Clientes" />
      <List>
        {clients.map((client) => (
          <Item key={client.id}>
            <Link href={`/client/${client.id}`} passHref>
              <ClientLink>{client.name}</ClientLink>
            </Link>
          </Item>
        ))}
      </List>
    </>
  );
};

const List = styled.ul`
  padding: 32px;
`;

const Item = styled.li`
  margin: 16px 0;
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
