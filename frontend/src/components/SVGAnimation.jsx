import { useState, useEffect } from "react";
import { Box, keyframes } from "@chakra-ui/react";
import SVG1 from "../assets/desmos-graph.svg";
import SVG2 from "../assets/desmos-graph1.svg";
import SVG3 from "../assets/desmos-graph2.svg";
import SVG4 from "../assets/desmos-graph3.svg";
import SVG5 from "../assets/desmos-graph4.svg";
import SVG6 from "../assets/desmos-graph5.svg";
import SVG7 from "../assets/desmos-graph6.svg";
import SVG8 from "../assets/desmos-graph7.svg";
import SVG9 from "../assets/desmos-graph8.svg";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SVGAnimation = () => {
  const [svg, setSvg] = useState(SVG1);
  const [count, setCount] = useState(1);
  const [fade, setFade] = useState("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("out");
      setCount((count) => count + 1);
      switch (count) {
        case 1:
          setSvg(SVG1);
          setFade("in");
          break;
        case 2:
          setSvg(SVG2);
          setFade("in");
          break;
        case 3:
          setSvg(SVG3);
          setFade("in");
          break;
        case 4:
          setSvg(SVG4);
          setFade("in");
          break;
        case 5:
          setSvg(SVG5);
          setFade("in");
          break;
        case 6:
          setSvg(SVG6);
          setFade("in");
          break;
        case 7:
          setSvg(SVG7);
          setFade("in");
          break;
        case 8:
          setSvg(SVG8);
          setFade("in");
          break;
        case 9:
          setSvg(SVG9);
          setFade("in");
          break;
        default:
          setSvg(SVG1);
          setCount(1);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <Box height="90vh">
      <Box
        // align to right side for large screens
        right={{ xl: "0" }}
        // border={"solid 1px"}
        boxSize={{ base: "500px", md: "600px", lg: "800px", xl: "864px" }}
        // animation={`${fade === "in" ? fadeIn : fadeOut} 1s ease-in-out`}
        position="absolute"
      >
        <img src={svg} alt="Desmos Graph" />
      </Box>
    </Box>
  );
};

export default SVGAnimation;
