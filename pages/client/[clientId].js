import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ClientPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const [client, setClient] = useState(null);

  useEffect(() => {
    const getClient = async () => {
      const res = await fetch(`/api/clients/${clientId}`);
      const data = await res.json();

      setClient(data);
    };

    getClient();
  }, [clientId]);

  if (client === null) {
    return null;
  }

  return (
    <main>
      <h1>{client.name}</h1>
    </main>
  );
};

export default ClientPage;
