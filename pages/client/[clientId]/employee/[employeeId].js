import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useFetchHandler from 'hooks/useFetchHandler';
import { getEmployee, getBenefits, updateEmployee } from 'server/api';
import { getUniqueRequiredFields } from 'utils/form';
import Input from 'components/Input';

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

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  if (employee === null) return null;

  return (
    <main>
      <Link href={`/client/${clientId}`}>Voltar para painel</Link>
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
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default EmployeePage;
