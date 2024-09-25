import { Box, Text } from "@chakra-ui/react";

const BannerSection = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height="300px" // Adjust height to your needs
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      sx={{
        background: `repeating-linear-gradient(
          to right, 
          rgba(0,0,0,0.1) 0px, 
          rgba(0,0,0,0.1) 1px, 
          transparent 1px, 
          transparent 20px
        ), repeating-linear-gradient(
          to bottom, 
          rgba(0,0,0,0.1) 0px, 
          rgba(0,0,0,0.1) 1px, 
          transparent 1px, 
          transparent 20px
        )`,
        // backgroundColor: "gray.800", // Dark background
      }}
    >
      <Box
        position="absolute"
        left="calc(50% + 100px)" // Shift x-axis origin to the right
        bottom="0"
        width="2px"
        height="100%"
        backgroundColor="black" // Y-axis line
      />
      <Box
        position="absolute"
        bottom="50px" // Adjust the position for x-axis
        left="0"
        width="100%"
        height="2px"
        backgroundColor="black" // X-axis line
      />
      <Text fontSize="3xl" fontWeight="bold">
        Your Banner Text
      </Text>
    </Box>
  );
};

export default BannerSection;
