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
  headers: {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
    "X-Parse-Master-Key": process.env.NEXT_PUBLIC_PARSE_MASTER_KEY,
    "X-Parse-Client-Key": process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY,
  },
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
