import { useContext } from 'react';
import { FetchContext } from 'components/App';

const useFetchHandler = () => {
  const { fetchHandler } = useContext(FetchContext);
  return fetchHandler;
};

export default useFetchHandler;
