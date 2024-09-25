import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function Benefits() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          Why Choose WhaleSwap?
        </Heading>
        <Text fontSize="lg">Here are the key benefits:</Text>
        <Text>- Reduced Slippage</Text>
        <Text>- Lower Gas Fees</Text>
        <Text>- Protection from MEV Front-running</Text>
        <Text>- Fair Market Adjustments</Text>
      </VStack>
    </Box>
  );
}

export default Benefits;
