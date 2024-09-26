import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function UseCases() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          WhaleSwap in Action
        </Heading>
        <Text fontSize="lg">Use Case 1: Whale Trader</Text>
        <Text>
          A large investor wants to buy $5 million worth of XFI tokens. With
          WhaleSwap, the trade is spread over time, minimizing slippage.
        </Text>
        <Text fontSize="lg">Use Case 2: Arbitrageur</Text>
        <Text>
          Arbitrageurs can take advantage of small price differences between
          exchanges, helping to balance the market and profit from price
          changes.
        </Text>
      </VStack>
    </Box>
  );
}

export default UseCases;
