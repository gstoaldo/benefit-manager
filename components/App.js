import React, { useState } from 'react';
import Loading from './Loading';

export const LoadingContext = React.createContext();

const App = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loading && <Loading />}
      <div>{children}</div>
    </LoadingContext.Provider>
  );
};

export default App;
