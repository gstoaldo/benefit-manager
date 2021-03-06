import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createEmployee, getBenefits, getClient } from 'server/api';
import useFetchHandler from 'hooks/useFetchHandler';
import PageSection from 'components/PageSection';
import Button from 'components/Button';
import BenefitCard from 'components/BenefitCard';
import EmployeeCard from 'components/EmployeeCard';
import Layout from 'components/Layout';
import { NoEmployeeMessage } from 'components/Messages';

const ClientPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const [client, setClient] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const fetchHandler = useFetchHandler();

  useEffect(() => {
    if (clientId !== undefined) {
      fetchHandler(
        async () => {
          const clientData = await getClient(clientId);
          const benefitData = await getBenefits(clientId);
          setClient(clientData);
          setBenefits(benefitData);
        },
        'Erro ao carregar dados.',
        '/'
      );
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

  return (
    <Layout title={client.name} link href="/" linkText={'\u{25C2} Voltar'}>
      <PageSection
        title="Benefícios"
        action={<Button disabled>+ Benefício</Button>}
      >
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit.id}>
              <BenefitCard benefit={benefit}></BenefitCard>
            </li>
          ))}
        </ul>
      </PageSection>
      <PageSection
        title="Colaboradores"
        action={<Button onClick={addEmployee}>+ Colaborador</Button>}
      >
        {client.employees.length > 0 ? (
          <ul>
            {client.employees.map((employee) => (
              <li key={employee.id}>
                <EmployeeCard
                  employee={employee}
                  benefits={benefits.filter((benefit) =>
                    employee.benefitIds.includes(benefit.id)
                  )}
                  href={`/client/${clientId}/employee/${employee.id}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <NoEmployeeMessage />
        )}
      </PageSection>
    </Layout>
  );
};

export default ClientPage;
