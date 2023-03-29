import type {NextPage} from "next";
import {Button, Card, CardBody, Container, Heading, HStack, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";
import {gql, useQuery} from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      count
      edges {
        node {
          id
          name
          description
          isDone
        }
      }
    }
  }
`;

const ListPage: NextPage = () => {
  const {loading, error, data} = useQuery(GET_TASKS, {
    fetchPolicy: "no-cache",
  });

  if (error) return <p>Oops, something went wrong.</p>;

  return (
    <>
      <Container maxWidth="container.lg">
        <HStack w="fill" justifyContent="space-between" mt={8} mb={4}>
          <Heading as="h1" size="lg">back4app-graphql</Heading>
          <Link href="/create">
            <Button size="sm" colorScheme="blue">
              Create task
            </Button>
          </Link>
        </HStack>
        <VStack spacing={4}>
          {loading ? (
            <Spinner size="xl"/>
          ) : (
            <>
              {data.tasks.edges.map((edge) => {
                let task = edge.node;
                return (
                  <Card key={task.id} w="100%">
                    <CardBody>
                      <Stack direction="column">
                        <Heading as="h2" size="md">
                          {task.isDone ? "✔️" : "❌"}{" "}
                          {task.name}
                        </Heading>
                        <Text>
                          {task.description}
                        </Text>
                        <Stack direction="row" pt={2}>
                          <Link href={"/" + task.id}>
                            <Button size="sm" colorScheme="blue">View</Button>
                          </Link>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </Card>
                );
              })}
            </>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default ListPage;