import {
  Box,
  Heading,
  Text,
  VStack,
  OrderedList,
  ListItem,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import TradeFlowchart from "../components/TradeFlowChart";

function HowItWorks() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          How WhaleSwap Handles Bulk Trades?
        </Heading>
        <Text fontSize="lg">
          WhaleSwap’s Time-Weighted AMM adjusts prices gradually, spreading
          large trades across time to minimize slippage. Arbitrageurs step in to
          maintain price balance across decentralized and centralized exchanges,
          ensuring fair trading. A brief, step-by-step explanation of the
          mechanism:
        </Text>
        <OrderedList spacing={4}>
          <ListItem>
            <Tag borderRadius="sm" variant="outline" colorScheme="blue">
              <TagLabel>Placing an Order </TagLabel>
            </Tag>
            : Users specify the amount and duration.
          </ListItem>
          <ListItem>
            <Tag borderRadius="sm" variant="outline" colorScheme="blue">
              <TagLabel>Time-Weighted AMM </TagLabel>
            </Tag>
            : WhaleSwap spreads the transaction over time, allowing for smoother
            price adjustments.
          </ListItem>
          <ListItem>
            <Tag borderRadius="sm" variant="outline" colorScheme="blue">
              <TagLabel>Arbitrage Opportunities </TagLabel>
            </Tag>
            : Arbitrageurs help maintain market balance by trading between
            centralized exchanges and WhaleSwap.
          </ListItem>
          <ListItem>
            <Tag borderRadius="sm" variant="outline" colorScheme="blue">
              <TagLabel>Fair Pricing </TagLabel>
            </Tag>
            : The result is a large transaction executed at a fair market price
            with minimal slippage.
          </ListItem>
        </OrderedList>

        {/* <TradeFlowchart /> */}

        <Heading as="h2" size="xl">
          How WhaleSwap Reduces Gas Fees?
        </Heading>
        <Text fontSize="lg">
          WhaleSwap Long term trades are executed virtually in respect to
          embedded AMM. This helps in growing reserves because arbitrageurs will
          get profit for swapping for the assets which is getting deficit on AMM
          continuously by large trade. When time given by user is over, then
          only transaction is executed on chain. So, it simulates infinite
          trades occurring but only one trade is executed on chain.
        </Text>
      </VStack>
    </Box>
  );
}

export default HowItWorks;
