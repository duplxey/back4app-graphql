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

const AddPage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(true);

  const [error, setError] = useState("");

  const onSubmit = () => {
    if (!title || !description) {
      setError("Please enter the title and the description.");
      return;
    }

    console.log(title);
    console.log(description);
    console.log(isDone);
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
                Fill out the form and press &quot;Add&quot; to add a new task.
              </Text>
            </Stack>
          </CardHeader>
          <CardBody>
            <Stack direction="column">
              {error && <Text color="red.500" fontWeight="bold">{error}</Text>}
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
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
              <Button size="sm" colorScheme="blue" onClick={onSubmit}>Add task</Button>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddPage;