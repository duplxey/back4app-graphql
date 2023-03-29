import type {NextPage} from "next";
import {Button, Card, CardBody, Container, Heading, HStack, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      name
      description
      isDone
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $isDone: Boolean!) {
    updateTask(input: {
      id: $id,
      fields: {
        isDone: $isDone
      }
    }) {
      task {
        isDone
        updatedAt
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(input: {
      id: $id
    }) {
      task {
        id
      }
    }
  }
`;

const DetailPage: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const {loading, error, data, refetch} = useQuery(GET_TASK, {
    variables: {id: id},
  });

  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleMarkAsDone = () => {
    updateTask({
      variables: {
        id: id,
        isDone: !data.task.isDone
      }
    }).then(() => {
      refetch({
        id: id
      });
    }).catch((err) => console.error(err));
  };

  const handleDelete = () => {
    deleteTask({
      variables: {
        id: id
      },
    }).then(() => {
      router.push("/");
    }).catch((err) => console.error(err));
  };

  if (error) return <p>Oops, something went wrong.</p>;

  return (
    <>
      <Container maxWidth="container.lg">
        <HStack w="fill" justifyContent="space-between" mt={8} mb={4}>
          <Heading as="h1" size="lg">back4app-graphql</Heading>
          <Link href="/">
            <Button size="sm" colorScheme="blue">
              Task list
            </Button>
          </Link>
        </HStack>
        <VStack spacing={4}>
          {loading ? (
            <Spinner size="xl"/>
          ) : (
            <Card key={data.task.id} w="100%">
              <CardBody>
                <Stack direction="column">
                  <Heading as="h2" size="md">
                    {data.task.isDone ? "✔️" : "❌"}{" "}
                    {data.task.name}
                  </Heading>
                  <Text>
                    {data.task.description}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Created at {data.task.createdAt}, updated at {data.task.updatedAt}
                  </Text>
                  <Stack direction="row" pt={2}>
                    <Button size="sm" colorScheme="blue" onClick={handleMarkAsDone}>Mark as done</Button>
                    <Button size="sm" colorScheme="red" onClick={handleDelete}>Delete</Button>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default DetailPage;