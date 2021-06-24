import App from 'components/App';
import { makeServer } from '../server/mirage';

makeServer();

const MyApp = ({ Component, pageProps }) => {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
};

export default MyApp;
