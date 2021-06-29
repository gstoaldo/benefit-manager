import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useFetchHandler from 'hooks/useFetchHandler';
import {
  getEmployee,
  getBenefits,
  updateEmployee,
  sendBenefitData,
} from 'server/api';
import { inputLabels, inputPlaceholders, inputTypes } from 'utils/inputs';
import {
  getFieldsValidation,
  getUniqueRequiredFields,
} from 'utils/inputValidation';
import Input from 'components/Input';
import PageSection from 'components/PageSection';
import Layout from 'components/Layout';
import Button from 'components/Button';
import BenefitApplicationCard from 'components/BenefitApplicationCard';
import { ShouldSaveMessage } from 'components/Messages';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [requiredFields, setRequiredFields] = useState(null);
  const fetchHandler = useFetchHandler();
  const fieldsValidation = useRef(getFieldsValidation(employee));
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (clientId !== undefined && employeeId !== undefined) {
      fetchHandler(
        async () => {
          const employeeData = await getEmployee(clientId, employeeId);
          const benefitsData = await getBenefits(clientId);
          setEmployee(employeeData);
          setBenefits(benefitsData);
          setRequiredFields(getUniqueRequiredFields(benefitsData));
          fieldsValidation.current = getFieldsValidation(employeeData);
        },
        'Erro ao carregar dados do colaborador.',
        `/client/${clientId}`
      );
    }
  }, [clientId, employeeId, fetchHandler]);

  const handleUpdateEmployee = () => {
    fetchHandler(async () => {
      const data = await updateEmployee(clientId, employeeId, employee);
      setEmployee(data);
      fieldsValidation.current = getFieldsValidation(data);
      setShouldSave(false);
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
    setShouldSave(true);
  };

  if (employee === null) return null;

  return (
    <Layout
      title={'Colaborador'}
      link
      href={`/client/${clientId}`}
      linkText={'\u{25C2} Painel'}
    >
      <PageSection
        title={'Dados'}
        action={
          <Button onClick={handleUpdateEmployee} disabled={!shouldSave}>
            Salvar
          </Button>
        }
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
                    placeholder={inputPlaceholders[field]}
                    type={inputTypes[field]}
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
                    disabled={shouldSave}
                    onClick={() => handleSendBenefitData(benefit.id)}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {shouldSave && <ShouldSaveMessage />}
      </PageSection>
    </Layout>
  );
};

export default EmployeePage;
