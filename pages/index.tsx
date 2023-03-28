import type {NextPage} from "next";
import {Badge, Button, Card, CardBody, Container, Heading, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

const ListPage: NextPage = () => {
  return (
    <>
      <Container maxWidth="container.lg">
        <HStack w="fill" justifyContent="space-between" mt={8} mb={4}>
          <Heading as="h1" size="lg">back4app-graphql</Heading>
          <Link href="/add">
            <Button size="sm" colorScheme="blue">
              Add task
            </Button>
          </Link>
        </HStack>
        <VStack spacing={4}>
          <Card>
            <CardBody>
              <Stack direction="column">
                <Heading as="h2" size="md">
                  ✔️
                  ❌
                  Take out the trash
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Text>
                <Stack direction="row">
                  <Badge>Category1</Badge>
                  <Badge>Category2</Badge>
                  <Badge>Category3</Badge>
                </Stack>
                <Stack direction="row" pt={2}>
                  <Button size="sm" colorScheme="blue">View</Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </>
  );
};

export default ListPage;