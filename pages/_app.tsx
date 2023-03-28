import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export const theme = extendTheme({
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Raleway', sans-serif",
  },
});

const client = new ApolloClient({
  uri: "https://parseapi.back4app.com/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
