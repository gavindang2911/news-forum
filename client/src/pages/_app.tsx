import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useApollo } from '../lib/apolloClient';
import theme from '../theme';




// const apolloClient = new ApolloClient({
//   link: createHttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'include',
//   }),
//   cache: new InMemoryCache(),
// });

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
