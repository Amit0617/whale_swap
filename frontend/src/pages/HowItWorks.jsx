import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function HowItWorks() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          How WhaleSwap Works
        </Heading>
        <Text fontSize="lg">
          WhaleSwap’s Time-Weighted AMM adjusts prices gradually, spreading
          large trades across time to minimize slippage. Arbitrageurs step in to
          maintain price balance across decentralized and centralized exchanges,
          ensuring fair trading.
        </Text>
        {/* You can add more details, images, and flowcharts here */}
      </VStack>
    </Box>
  );
}

export default HowItWorks;
