import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Image,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SVGAnimation from "../components/SVGAnimation";
import HowItWorks from "./HowItWorks";
import Benefits from "./Benefits";
import Comparison from "./Comparison";
import UseCases from "./UseCases";
import Roadmap from "./Roadmap";

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
        <HowItWorks />
        <Benefits />
        <Comparison />
        <UseCases />
        <Roadmap />
      </Box>
    </>
  );
}

export default Home;
