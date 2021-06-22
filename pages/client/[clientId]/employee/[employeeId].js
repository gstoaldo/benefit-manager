import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(
        `/api/clients/${clientId}/employees/${employeeId}`
      );
      if (res.ok) {
        const data = await res.json();
        setEmployee(data);
      }
    };

    getEmployee();
  }, [clientId, employeeId]);

  if (employee === null) return null;

  return (
    <main>
      <Link href={`/client/${clientId}`}>Voltar para painel</Link>
      <h1>{employee.name}</h1>
    </main>
  );
};

export default EmployeePage;
