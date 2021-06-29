import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useFetchHandler from 'hooks/useFetchHandler';
import { getClients } from 'server/api';
import Layout from 'components/Layout';
import { QUERIES } from 'styles/constants';

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
    <Layout title="Clientes">
      <List>
        {clients.map((client) => (
          <Item key={client.id}>
            <Link href={`/client/${client.id}`} passHref>
              <ClientLink>{client.name}</ClientLink>
            </Link>
          </Item>
        ))}
      </List>
    </Layout>
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
  font-size: var(--f2);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  @media ${QUERIES.tabletAndDown} {
    font-size: var(--f1);
  }
`;

export default Home;
