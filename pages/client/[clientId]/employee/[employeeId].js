import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useFetchHandler from 'hooks/useFetchHandler';
import { getEmployee } from 'server/api';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);
  const fetchHandler = useFetchHandler();

  useEffect(() => {
    if (clientId !== undefined && employeeId !== undefined) {
      fetchHandler(async () => {
        const data = await getEmployee(clientId, employeeId);
        setEmployee(data);
      }, 'Erro ao carregar dados do colaborador');
    }
  }, [clientId, employeeId, fetchHandler]);

  if (employee === null) return null;

  return (
    <main>
      <Link href={`/client/${clientId}`}>Voltar para painel</Link>
      <h1>{employee.name}</h1>
    </main>
  );
};

export default EmployeePage;
