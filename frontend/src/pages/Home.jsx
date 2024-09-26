import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Spacer,
  HStack,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SVGAnimation from "../components/SVGAnimation";

function Home() {
  return (
    <>
      <Box
        px={8}
        py={3}
        // textAlign="center"
        position="relative"
        // width="100%"
        // height="300px" // Adjust height to your needs
        // display="flex"
        // alignItems="center"
        // justifyContent="center"
        // color="white"
        sx={{
          background: `repeating-linear-gradient(
            to right, 
            rgba(0,0,0,0.1) 0px, 
            rgba(0,0,0,0.1) 1px, 
            transparent 1px, 
            transparent 73px
          ), repeating-linear-gradient(
            to bottom, 
            rgba(0,0,0,0.1) 0px, 
            rgba(0,0,0,0.1) 1px, 
            transparent 1px, 
            transparent 73px
          )`,
          // backgroundColor: "gray.800", // Dark background
        }}
      >
        <Box
          position="absolute"
          left="calc(50% + 288px)" // Shift x-axis origin to the right
          bottom="0"
          width="3px"
          height="100%"
          backgroundColor="black" // Y-axis line
        />
        <Box
          position="absolute"
          top="583" // Adjust the position for x-axis
          right="0"
          width="50%"
          height="3px"
          backgroundColor="black" // X-axis line
        />
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          <VStack
            align="start"
            spacing={6}
            backgroundColor={useColorModeValue("white", "gray.800")}
            p={8}
            maxW={{
              base: "100%",
              md: "500px",
              lg: "900px",
              xl: "1200px",
              "2xl": "2000px",
              "3xl": "2000px",
              "4xl": "1800px",
              "5xl": "2000px",
            }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              WhaleSwap: Unlocking Fair Bulk Trades in DeFi
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              A Time-Weighted AMM built for efficient, large transactions with
              reduced slippage and gas fees.
            </Text>
            <RouterLink to="/how-it-works">
              <Button colorScheme="blue" size="lg">
                Learn More
              </Button>
            </RouterLink>
          </VStack>
          <Spacer />
          <Box textAlign={"center"}>
            <SVGAnimation />
            <Text>
              WhaleSwap is a decentralized AMM designed to handle large trades
              without the heavy penalties imposed by traditional constant
              product (CP) AMMs. Our Time-Weighted AMM makes large-scale
              transactions seamless, fair, and gas-efficient.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box py={20} px={8} bg={useColorModeValue("gray.100", "gray.800")}>
        <VStack spacing={8} align="start" maxW="7xl" mx="auto" textAlign="left">
          <Heading
            as="h2"
            size="xl"
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
          >
            Problem
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            Current Automated Market Makers (AMMs) are primarily based on the
            constant product formula, making it difficult for users who want to
            execute large trades. For instance, if someone attempts to purchase
            $5 million worth of a token on a traditional AMM, the price slippage
            can become extreme. Additionally, front-running bots exploit large
            trades by causing extra slippage through malicious strategies.
          </Text>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            Furthermore, the mempool visibility of large trades attracts market
            manipulation and biases pricing behavior, making the process
            inefficient for large, legitimate traders. The burden of gas fees
            adds even more cost to these types of transactions when traders are
            forced to manually split large orders into smaller chunks.
          </Text>

          <Heading
            as="h2"
            size="xl"
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
          >
            Solution
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            WhaleSwap offers a unique Time-Weighted Automated Market Maker
            (TWAMM) solution, which spreads large trades over time, reducing
            slippage significantly. By using WhaleSwap, users can place large
            orders, which will be broken into smaller trades that execute over a
            longer duration. This ensures fair pricing without triggering sudden
            price fluctuations.
          </Text>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            Additionally, WhaleSwap encourages arbitrageurs to correct prices by
            providing arbitrage opportunities between WhaleSwap and centralized
            exchanges, ensuring continuous price adjustment. This means large
            traders don&apos;t have to worry about front-running or
            manipulation, while also avoiding the hassle of manually splitting
            their orders.
          </Text>
          <Table variant="simple" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Traditional AMMs</Th>
                <Th>WhaleSwap</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <VStack spacing={4} align="start">
                    <Image src={"../../public/CPAMM.png"} alt="CPAMM" />
                    <Text
                      fontSize="lg"
                      color={useColorModeValue("gray.700", "gray.300")}
                    >
                      Traditional AMM with Constant Product Formula. Large
                      trades face high slippage and very bad pricing.
                    </Text>
                    <Image
                      src={"../../public/10SplitCPAMM.png"}
                      alt="10SplitCPAMM"
                    />
                    <Text
                      fontSize="lg"
                      color={useColorModeValue("gray.700", "gray.300")}
                    >
                      Traditional AMM with 10 Split Orders. Apart from 10x gas,
                      their capital suffers from sudden price changes.
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <Image src={"../../public/TWAMM.png"} alt="TWAMM" />
                  <Text
                    fontSize="lg"
                    color={useColorModeValue("gray.700", "gray.300")}
                  >
                    WhaleSwap&apos;s Time-Weighted AMM. Large trades are spread
                    over time, reducing slippage and ensuring fair pricing
                    executing infinite number of trande
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <RouterLink to="/how-it-works">
            <Button colorScheme="blue" size="lg">
              Explore the Trustless and permissionless Solution
            </Button>
          </RouterLink>
        </VStack>
      </Box>
    </>
  );
}

export default Home;
