import { makeServer } from '../server/mirage';

makeServer();

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
