import type {NextPage} from "next";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";

const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $description: String, $isDone: Boolean!) {
    createTask(
      input: {
        fields: {
          name: $name
          description: $description
          isDone: $isDone
        }
      }
    ) {
      task {
        id
      }
    }
  }
`;

const CreatePage: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  const [formError, setFormError] = useState("");
  const [createTask] = useMutation(CREATE_TASK);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !description) {
      setFormError("Please enter the title and the description.");
      return;
    }

    createTask({
      variables: {name: name, description: description, isDone: isDone}
    }).then(response => {
      router.push("/" + response.data.createTask.task.id);
    });
  };

  return (
    <>
      <Container maxWidth="container.lg">
        <HStack w="fill" justifyContent="space-between" mt={8} mb={4}>
          <Heading as="h1" size="lg">back4app-graphql</Heading>
          <Link href="/">
            <Button size="sm" colorScheme="blue">
              View list
            </Button>
          </Link>
        </HStack>
        <Card>
          <CardHeader>
            <Stack direction="column">
              <Heading as="h2" size="md">Create task</Heading>
              <Text>
                Fill out the form and press &quot;Create&quot; to create a new task.
              </Text>
            </Stack>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack direction="column">
                {formError && <Text color="red.500" fontWeight="bold">{formError}</Text>}
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Is done?
                  </FormLabel>
                  <Switch isChecked={isDone} onChange={() => setIsDone(!isDone)}/>
                </FormControl>
                <Button size="sm" colorScheme="blue" type="submit">Create task</Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CreatePage;