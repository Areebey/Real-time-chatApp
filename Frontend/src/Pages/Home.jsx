import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Container,
} from "@chakra-ui/react";
import Signup from "../Components/Signup";
import Login from "../Components/Login";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        alignItems={"center"}
        p={4}
        bg="white"
        w={"100%"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="2px"
      >
        <Text fontSize="4xl" color="black">
          Chat Application
        </Text>
      </Box>
      <Box p={4} bg="white" w={"100%"} borderRadius="lg" borderWidth="2px">
        <Tabs variant="soft-rounded">
        <TabList>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Login/></TabPanel>
          <TabPanel><Signup/></TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
