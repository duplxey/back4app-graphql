import type {NextPage} from "next";
import {Button, Card, CardBody, Container, Heading, HStack, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";
import {gql, useMutation, useQuery} from "@apollo/client";

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

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $isDone: Boolean!) {
    updateTask(input: { id: $id, fields: { isDone: $isDone } }) {
      task {
        isDone
        updatedAt
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(input: { id: $id }) {
      task {
        id
      }
    }
  }
`;

const ListPage: NextPage = () => {

  const {loading, error, data, refetch} = useQuery(GET_TASKS, {
    fetchPolicy: "no-cache",
  });
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleMarkAsDone = async (id: string, isDone: boolean) => {
    try {
      const updateTaskResponse = await updateTask({
        variables: {
          id: id,
          isDone: !isDone,
        }
      });
      console.debug(updateTaskResponse);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deleteTaskResponse = await deleteTask({
        variables: {
          id: id
        },
      });
      console.debug(deleteTaskResponse);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

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
                          <Button size="sm" colorScheme="blue" onClick={() => handleMarkAsDone(task.id, task.isDone)}>
                            Toggle done
                          </Button>
                          <Button size="sm" colorScheme="red" onClick={() => handleDelete(task.id)}>
                            Delete
                          </Button>
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