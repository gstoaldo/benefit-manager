import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createEmployee, getBenefits, getClient } from 'server/api';
import useFetchHandler from 'hooks/useFetchHandler';
import PageHeader from 'components/PageHeader';
import PageSection from 'components/PageSection';
import Button from 'components/Button';

const ClientPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const [client, setClient] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const fetchHandler = useFetchHandler();

  useEffect(() => {
    if (clientId !== undefined) {
      fetchHandler(async () => {
        const data = await getClient(clientId);
        setClient(data);
      }, 'Erro ao carregar dados do cliente.');

      fetchHandler(async () => {
        const data = await getBenefits(clientId);
        setBenefits(data);
      }, 'Erro ao carregar benefícios.');
    }
  }, [fetchHandler, clientId]);

  const addEmployee = async () => {
    fetchHandler(async () => {
      const data = await createEmployee(clientId);
      setClient(data);
    }, 'Erro ao adicionar colaborador.');
  };

  if (client === null) {
    return null;
  }

  return (
    <>
      <PageHeader
        title={client.name}
        link
        href="/"
        linkTitle="Voltar para clientes"
      />
      <main>
        {benefits && (
          <PageSection
            title="Benefícios"
            action={
              <Button onClick={() => console.log('click')}>
                Adicionar benefício
              </Button>
            }
          >
            <h2>Benefícios</h2>
            <ul>
              {benefits.map((benefit) => (
                <li key={benefit.id}>
                  <article>
                    <h1>{benefit.name}</h1>
                    <h2>{benefit.type}</h2>
                  </article>
                </li>
              ))}
            </ul>
          </PageSection>
        )}
        <section>
          <h2>Funcionários</h2>
          <button onClick={addEmployee}>Adicionar colaborador</button>
          {client.employees.map((employee) => (
            <Link
              key={employee.id}
              href={`/client/${clientId}/employee/${employee.id}`}
            >
              <pre>{JSON.stringify(employee, '', 2)}</pre>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default ClientPage;
