import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ClientPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const [client, setClient] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const getClient = async () => {
      const res = await fetch(`/api/clients/${clientId}`);
      const data = await res.json();
      setClient(data);
    };

    const getBenefits = async () => {
      const res = await fetch(`/api/clients/${clientId}/benefits`);
      if (res.ok) {
        const data = await res.json();
        setBenefits(data);
      }
    };

    getClient();
    getBenefits();
  }, [clientId]);

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch(`/api/clients/${clientId}/employees`);
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    };

    getEmployees();
  }, [clientId, client]);

  const addEmployee = async () => {
    const res = await fetch(`/api/clients/${clientId}/employees`, {
      method: 'POST',
    });
    if (res.ok) {
      const data = await res.json();
      setClient(data);
    }
  };

  if (client === null) {
    return null;
  }

  return (
    <main>
      <Link href="/">Voltar para clientes</Link>
      <h1>{client.name}</h1>
      {benefits && (
        <section>
          <h2>Benefícios</h2>
          {benefits.map((benefit) => (
            <article key={benefit.id}>
              <h1>{benefit.name}</h1>
              <h2>{benefit.type}</h2>
            </article>
          ))}
        </section>
      )}
      <section>
        <h2>Funcionários</h2>
        <button onClick={addEmployee}>Adicionar colaborador</button>
        {employees &&
          employees.map((employee) => (
            <Link
              key={employee.id}
              href={`/client/${clientId}/employee/${employee.id}`}
            >
              <pre>{JSON.stringify(employee, '', 2)}</pre>
            </Link>
          ))}
      </section>
    </main>
  );
};

export default ClientPage;
