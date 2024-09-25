import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function Roadmap() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          WhaleSwap Roadmap
        </Heading>
        <Text fontSize="lg">
          Q4 2024: Launch Beta Version on CrossFi Testnet
        </Text>
        <Text fontSize="lg">
          Q1 2025: Test and Analyze performance and risks
        </Text>
        <Text fontSize="lg">
          Q2 2025: Work with CrossFi team for Mainnet Launch
        </Text>
        {/* Add more roadmap details */}
      </VStack>
    </Box>
  );
}

export default Roadmap;
