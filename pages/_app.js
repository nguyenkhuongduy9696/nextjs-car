import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import './../src/plugins/fontawesome';
import {QueryClient, QueryClientProvider, Hydrate} from 'react-query';
import {useState} from 'react';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return(
    <QueryClientProvider client={ queryClient }>
      <Hydrate state={ pageProps.dehydratedState }>
        <div className='layout px-3'>
          <Component { ...pageProps } />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
