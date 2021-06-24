import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EmployeePage = () => {
  const router = useRouter();
  const { clientId, employeeId } = router.query;
  const [employee, setEmployee] = useState(null);

  const setLoading = () => null;

  useEffect(() => {
    const getEmployee = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/clients/${clientId}/employees/${employeeId}`
      );
      if (res.ok) {
        const data = await res.json();
        setEmployee(data);
      }
      setLoading(false);
    };

    getEmployee();
  }, [clientId, employeeId, setLoading]);

  if (employee === null) return null;

  return (
    <main>
      <Link href={`/client/${clientId}`}>Voltar para painel</Link>
      <h1>{employee.name}</h1>
    </main>
  );
};

export default EmployeePage;
