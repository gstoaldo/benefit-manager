import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useFetchHandler from 'hooks/useFetchHandler';
import {
  getEmployee,
  getBenefits,
  updateEmployee,
  sendBenefitData,
} from 'server/api';
import { getUniqueRequiredFields } from 'utils/form';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [requiredFields, setRequiredFields] = useState(null);
  const fetchHandler = useFetchHandler();

  useEffect(() => {
    if (clientId !== undefined && employeeId !== undefined) {
      fetchHandler(async () => {
        const data = await getEmployee(clientId, employeeId);
        setEmployee(data);
      }, 'Erro ao carregar dados do colaborador');

      fetchHandler(async () => {
        const data = await getBenefits(clientId);
        setBenefits(data);
        setRequiredFields(getUniqueRequiredFields(data));
      }, 'Erro ao carregar benefícios.');
    }
  }, [clientId, employeeId, fetchHandler]);

  const handleUpdateEmployee = () => {
    fetchHandler(async () => {
      const data = await updateEmployee(clientId, employeeId, employee);
      setEmployee(data);
    }, 'Erro ao salvar dados do colaborador.');
  };

  const handleSendBenefitData = async (benefitId) => {
    fetchHandler(async () => {
      const data = await sendBenefitData(clientId, employeeId, benefitId);
      setEmployee(data);
    }, 'Erro ao enviar dados');
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  if (employee === null) return null;

  return (
    <>
      <PageHeader
        title={'Colaborador'}
        link
        href="/"
        linkTitle="Voltar para painel"
      />
      <main>
        <h1>{employee.name}</h1>
        <h2>Dados</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEmployee();
          }}
        >
          {requiredFields && (
            <ul>
              {requiredFields.map((field) => {
                return (
                  <Input
                    key={field}
                    label={field}
                    name={field}
                    value={employee[field]}
                    onChange={handleInput}
                  />
                );
              })}
            </ul>
          )}

          <button type="submit">Salvar dados</button>
        </form>
        {benefits && (
          <ul>
            {benefits.map((benefit) => {
              return (
                <li key={benefit.id}>
                  <article>
                    <pre>{JSON.stringify(benefit, '', 2)}</pre>
                    <button
                      onClick={() => handleSendBenefitData(benefit.id)}
                      disabled={employee.benefitIds.includes(benefit.id)}
                    >
                      Enviar
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default EmployeePage;
