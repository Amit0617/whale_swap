import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
} from "@chakra-ui/react";

function Comparison() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="xl">
          WhaleSwap vs Traditional AMMs
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Feature</Th>
              <Th>Constant Product AMMs</Th>
              <Th>WhaleSwap</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Slippage</Td>
              <Td>High for large trades</Td>
              <Td>Low with gradual price changes</Td>
            </Tr>
            <Tr>
              <Td>Gas Fees</Td>
              <Td>Expensive for multiple orders</Td>
              <Td>Efficient because of only one on-chain transaction</Td>
            </Tr>
            <Tr>
              <Td>Manual Effort</Td>
              <Td>Splitting orders manually will be tiresome</Td>
              <Td>Automated order splitting</Td>
            </Tr>
            <Tr>
              <Td>Market Prices</Td>
              <Td>Highly biased due to hyperbolic nature of reserves</Td>
              <Td>
                Fair market prices with minimal slippage because of
                arbitrageur&apos;s trades
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}

export default Comparison;
