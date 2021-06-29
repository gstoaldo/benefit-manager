import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Loading from './Loading';
import Error from './Error';
import PageContainer from './PageContainer';

export const FetchContext = React.createContext();

const App = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: null });

  const fetchHandler = useCallback(
    async (callback, message, redirectPath = null) => {
      setLoading(true);
      try {
        await callback();
        setError({ error: false, message: null, redirectPath: null });
      } catch (error) {
        console.error(error);
        setError({ error: true, message, redirectPath });
      }
      setLoading(false);
    },
    []
  );

  const onCloseError = () => {
    if (error.redirectPath !== null) {
      router.push(error.redirectPath);
    }
  };

  return (
    <FetchContext.Provider value={{ fetchHandler }}>
      <PageContainer>{children}</PageContainer>
      {loading && <Loading />}
      <Error open={error.error && !loading} onClose={onCloseError}>
        {error.message}
      </Error>
    </FetchContext.Provider>
  );
};

export default App;
