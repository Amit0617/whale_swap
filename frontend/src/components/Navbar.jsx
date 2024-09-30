import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <Box
      // position={"relative"}
      // top={0}
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
    >
      <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <RouterLink to="/">
            <HStack left={0}>
              <Image
                h={"fit-content"}
                w={"fit-content"}
                src="/whaleSwapLogoSmall.png"
              />
              <Box fontWeight="bold" fontSize="xl">
                WhaleSwap
              </Box>
            </HStack>
          </RouterLink>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <RouterLink to="/how-it-works">
              <Link>How It Works</Link>
            </RouterLink>
            <RouterLink to="/benefits">
              <Link>Benefits</Link>
            </RouterLink>
            <RouterLink to="/comparison">
              <Link>Comparison</Link>
            </RouterLink>
            <RouterLink to="/use-cases">
              <Link>Use Cases</Link>
            </RouterLink>
            <RouterLink to="/roadmap">
              <Link>Roadmap</Link>
            </RouterLink>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button colorScheme={"blue"}>Join the Community(Soon!)</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
