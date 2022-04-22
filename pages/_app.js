import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import './../src/plugins/fontawesome';
import Navbar from '../src/components/layouts/Navbar';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Navbar />
      <Component { ...pageProps } />
    </>
  );
}

export default MyApp;
