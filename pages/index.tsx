import type {NextPage} from "next";
import {Container, Heading} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Container maxWidth={"container.lg"} mt={8}>
        <Heading as="h1" size="lg">back4app-graphql</Heading>
      </Container>
    </>
  );
};

export default Home;