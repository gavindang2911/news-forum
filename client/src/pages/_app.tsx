import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, createHttpLink,  InMemoryCache } from '@apollo/client';

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
