import { useContext } from 'react';
import { LoadingContext } from 'components/App';

const useLoading = () => {
  return useContext(LoadingContext);
};

export default useLoading;
