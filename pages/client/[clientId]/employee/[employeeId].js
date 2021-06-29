import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useFetchHandler from 'hooks/useFetchHandler';
import {
  getEmployee,
  getBenefits,
  updateEmployee,
  sendBenefitData,
} from 'server/api';
import { inputLabels } from 'utils/labels';
import { getFieldsValidation, getUniqueRequiredFields } from 'utils/form';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import PageSection from 'components/PageSection';
import Layout from 'components/Layout';
import Button from 'components/Button';
import BenefitApplicationCard from 'components/BenefitApplicationCard';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [requiredFields, setRequiredFields] = useState(null);
  const fetchHandler = useFetchHandler();
  const fieldsValidation = useRef(getFieldsValidation(employee));

  useEffect(() => {
    if (clientId !== undefined && employeeId !== undefined) {
      fetchHandler(async () => {
        const data = await getEmployee(clientId, employeeId);
        setEmployee(data);
        fieldsValidation.current = getFieldsValidation(data);
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
      fieldsValidation.current = getFieldsValidation(data);
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
        href={`/client/${clientId}`}
        linkTitle={'\u{25C2} Painel'}
      />
      <main>
        <Layout>
          <PageSection
            title={'Dados'}
            action={<Button onClick={handleUpdateEmployee}>Salvar</Button>}
          >
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
                        label={inputLabels[field]}
                        name={field}
                        value={employee[field]}
                        onChange={handleInput}
                      />
                    );
                  })}
                </ul>
              )}

              <input style={{ display: 'none' }} type="submit" />
            </form>
          </PageSection>
          <PageSection title={'Benefícios disponíveis'}>
            {benefits && (
              <ul>
                {benefits.map((benefit) => {
                  return (
                    <li key={benefit.id}>
                      <BenefitApplicationCard
                        fieldsValidation={fieldsValidation.current}
                        benefit={benefit}
                        active={employee.benefitIds.includes(benefit.id)}
                        onClick={() => handleSendBenefitData(benefit.id)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </PageSection>
        </Layout>
      </main>
    </>
  );
};

export default EmployeePage;
