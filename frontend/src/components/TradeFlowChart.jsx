import { Box } from "@chakra-ui/react";

function TradeFlowchart() {
  return (
    <Box my={8} mx="auto" maxW="700px" textAlign="center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        width="100%"
        height="auto"
      >
        {/* Initial Order */}
        <rect x="50" y="50" width="200" height="50" fill="#63b3ed" />
        <text x="150" y="80" fill="#ffffff" textAnchor="middle">
          Place an Order
        </text>

        {/* Arrow from Initial Order to Price Adjustment */}
        <line x1="250" y1="75" x2="400" y2="75" stroke="#000" strokeWidth="2" />
        <polygon points="400,70 410,75 400,80" fill="#000" />

        {/* Price Adjustment */}
        <rect x="410" y="50" width="200" height="50" fill="#48bb78" />
        <text x="510" y="80" fill="#ffffff" textAnchor="middle">
          Price Adjustment
        </text>

        {/* Arrow from Price Adjustment to Arbitrage */}
        <line
          x1="510"
          y1="100"
          x2="510"
          y2="175"
          stroke="#000"
          strokeWidth="2"
        />
        <polygon points="505,175 510,185 515,175" fill="#000" />

        {/* Arbitrage */}
        <rect x="410" y="175" width="200" height="50" fill="#ed8936" />
        <text x="510" y="205" fill="#ffffff" textAnchor="middle">
          Arbitrage Opportunities
        </text>

        {/* Arrow from Arbitrage to Final Trade */}
        <line
          x1="400"
          y1="200"
          x2="250"
          y2="200"
          stroke="#000"
          strokeWidth="2"
        />
        <polygon points="250,195 240,200 250,205" fill="#000" />

        {/* Final Trade */}
        <rect x="50" y="175" width="200" height="50" fill="#38a169" />
        <text x="150" y="205" fill="#ffffff" textAnchor="middle">
          Final Trade at Fair Price
        </text>
      </svg>
    </Box>
  );
}

export default TradeFlowchart;
