import { Box, Button, Container, Heading, Input, List, ListItem, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaHeart, FaPray, FaSmile, FaQuestion, FaGrinBeam } from "react-icons/fa";

const Index = () => {
  const [gratefulText, setGratefulText] = useState("");
  const [gratefulList, setGratefulList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const savedGratefulList = localStorage.getItem("gratefulList");
    if (savedGratefulList) {
      setGratefulList(JSON.parse(savedGratefulList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gratefulList", JSON.stringify(gratefulList));
  }, [gratefulList]);

  const handleAddGrateful = () => {
    if (gratefulText.trim() === "") {
      toast({
        title: "Please enter something to be grateful for.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newGratefulEntry = {
      text: gratefulText,
      time: new Date().toLocaleTimeString(),
      id: Date.now(),
    };

    setGratefulList([...gratefulList, newGratefulEntry]);
    setGratefulText("");
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" textAlign="center">
          What I'm Grateful For Today
        </Heading>
        <Input placeholder="Write what you're grateful for..." value={gratefulText} onChange={(e) => setGratefulText(e.target.value)} />
        <Button colorScheme="pink" onClick={handleAddGrateful} leftIcon={<FaHeart />}>
          Add Grateful Note
        </Button>
        <Box w="100%">
          {gratefulList.length > 0 && (
            <List spacing={3}>
              {gratefulList.map((item) => (
                <ListItem key={item.id} p={4} shadow="md" borderRadius="md">
                  <Stack direction="row" align="center" justify="space-between">
                    <Text as="span">{item.text}</Text>
                    <Box as="span">
                      <FaHeart color="red" />
                      <FaPray color="blue" />
                      <FaSmile color="yellow" />
                      <FaQuestion color="green" />
                      <FaGrinBeam color="orange" />
                    </Box>
                    <Text as="span" fontSize="sm" color="gray.500">
                      {item.time}
                    </Text>
                  </Stack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
