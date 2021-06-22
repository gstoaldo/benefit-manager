import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ClientPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const [client, setClient] = useState(null);
  const [benefits, setBenefits] = useState(null);

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
        console.log(`data`, data);
        setBenefits(data);
      }
    };

    getClient();
    getBenefits();
  }, [clientId]);

  if (client === null) {
    return null;
  }

  console.log(`benefits`, benefits);

  return (
    <main>
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
    </main>
  );
};

export default ClientPage;
