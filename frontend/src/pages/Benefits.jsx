import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa6";
import { FaShieldAlt, FaMoneyBillAlt } from "react-icons/fa";
import { SiBetfair } from "react-icons/si";

function Benefits() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          Why Choose WhaleSwap?
        </Heading>
        <Text fontSize="lg">Here are the key benefits:</Text>
        <List>
          <ListItem>
            <ListIcon as={FaCoins} color="yellow.500" />
            Reduced Slippage compared to traditional AMMs
          </ListItem>
          <ListItem>
            <ListIcon as={FaMoneyBillAlt} color="green.500" />
            Nominal Gas fees compared to manual order splitting
          </ListItem>
          <ListItem>
            <ListIcon as={FaShieldAlt} color="green.500" />
            Benefits of decentralised trustless swaps
          </ListItem>
          <ListItem>
            <ListIcon as={SiBetfair} color="green.500" />
            Fair Market Prices without any brokerage firm intervention
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
}

export default Benefits;
