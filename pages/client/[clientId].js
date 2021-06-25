import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createEmployee, getBenefits, getClient } from 'server/api';
import useFetchHandler from 'hooks/useFetchHandler';
import PageHeader from 'components/PageHeader';
import PageSection from 'components/PageSection';
import Button from 'components/Button';
import BenefitCard from 'components/BenefitCard';
import EmployeeCard from 'components/EmployeeCard';

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

  if (client === null || benefits === null) {
    return null;
  }

  console.log(`client.employees`, client.employees);

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
            action={<Button disabled>Adicionar benefício</Button>}
          >
            <ul>
              {benefits.map((benefit) => (
                <li key={benefit.id}>
                  <BenefitCard benefit={benefit}></BenefitCard>
                </li>
              ))}
            </ul>
          </PageSection>
        )}
        <PageSection
          title="Colaboradores"
          action={<Button onClick={addEmployee}>Adicionar colaborador</Button>}
        >
          {client.employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              benefits={benefits.filter((benefit) =>
                employee.benefitIds.includes(benefit.id)
              )}
              href={`/client/${clientId}/employee/${employee.id}`}
            ></EmployeeCard>
          ))}
        </PageSection>
      </main>
    </>
  );
};

export default ClientPage;
