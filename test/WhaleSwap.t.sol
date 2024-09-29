// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/WhaleSwapFactory.sol";
import "../src/WhaleSwapPair.sol";
import "./mocks/ERC20Token.sol";
import "../src/WhaleSwapERC20.sol";

contract WhaleSwapTest is Test {
    WhaleSwapFactory factory;
    WhaleSwapERC20 whaleToken;
    address pair;
    address alice;
    ERC20Token token0;
    ERC20Token token1;

    function setUp() public {
        token0 = new ERC20Token("Token A", "TKNA");
        token1 = new ERC20Token("Token B", "TKNB");
        factory = new WhaleSwapFactory(address(this));
        whaleToken = new WhaleSwapERC20();
        pair = factory.createPair(address(token0), address(token1));
        token0.mint(address(this), 10 ether);
        token1.mint(address(this), 10 ether);

        alice = address(0x1);
        token0.mint(alice, 10 ether);
        token1.mint(alice, 10 ether);

        console.log("Token0 balance: %d", token0.balanceOf(address(this)));
        console.log("Token1 balance: %d", token1.balanceOf(address(this)));
    }

    function assertReserves(uint112 reserve0, uint112 reserve1) public view {
        (uint112 _reserve0, uint112 _reserve1, ) = WhaleSwapPair(pair)
            .getReserves();
        assertEq(_reserve0, reserve0);
        assertEq(_reserve1, reserve1);
    }

    function testMintBootstrap() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);

        WhaleSwapPair(pair).mint(address(this));
        assertEq(WhaleSwapPair(pair).balanceOf(address(this)), 1 ether - 1000);
        assertReserves(1 ether, 1 ether);
        assertEq(WhaleSwapPair(pair).totalSupply(), 1 ether);
    }

    function testBurn() public {
        token0.transfer(address(pair), 1 ether);
        token1.transfer(address(pair), 1 ether);

        uint256 liq = WhaleSwapPair(pair).mint(address(this));
        WhaleSwapPair(pair).transfer(address(pair), liq);
        WhaleSwapPair(pair).burn(address(this));

        assertEq(WhaleSwapPair(pair).balanceOf(address(pair)), 0);
        assertReserves(1000, 1000); // pair gonna hold 1000 tokens (i.e. MINIMUM_LIQUIDITY) even after burning all the liquidity
        assertEq(WhaleSwapPair(pair).totalSupply(), 1000);
        assertEq(token0.balanceOf(address(this)), 10 ether - 1000);
        assertEq(token1.balanceOf(address(this)), 10 ether - 1000);
    }

    function testSwap() public {
        token0.transfer(address(pair), 2 ether);
        token1.transfer(address(pair), 2 ether);

        WhaleSwapPair(pair).mint(address(this));
        token0.transfer(address(pair), 0.0001 ether);
        WhaleSwapPair(pair).swap(
            0.00009 ether, // 90% of 0.0001 ether
            0 ether,
            address(this),
            new bytes(0)
        );
        assertReserves(1.99991 ether, 2.0001 ether); // k > kLast

        token1.transfer(address(pair), 1 ether);
        WhaleSwapPair(pair).swap(
            0 ether,
            0.6 ether,
            address(this),
            new bytes(0)
        ); // 2 * 1 / (2 + 1) = 0.666666666666666666 ether (amountOut)
        assertReserves(2.99991 ether, 1.4001 ether); // k > kLast
    }
}
