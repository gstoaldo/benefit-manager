import React, { useState, useCallback } from 'react';
import Loading from './Loading';
import Error from './Error';
import PageContainer from './PageContainer';

export const FetchContext = React.createContext();

const App = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: null });

  const fetchHandler = useCallback(async (callback, message) => {
    setLoading(true);
    try {
      await callback();
      setError({ error: false, message: null });
    } catch (error) {
      console.error(error);
      setError({ error: true, message: message });
    }
    setLoading(false);
  }, []);

  return (
    <FetchContext.Provider value={{ fetchHandler }}>
      <PageContainer>{children}</PageContainer>
      {loading && <Loading />}
      <Error open={error.error && !loading}>{error.message}</Error>
    </FetchContext.Provider>
  );
};

export default App;
