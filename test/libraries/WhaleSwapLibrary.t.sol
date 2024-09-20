// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../src/libraries/WhaleSwapLibrary.sol";
import "../../src/WhaleSwapFactory.sol";
import "../mocks/ERC20Token.sol";

contract WhaleSwapLibraryTest is Test {
    ERC20Token tokenA;
    ERC20Token tokenB;
    WhaleSwapFactory factory;
    address pair;

    function setUp() public {
        tokenA = new ERC20Token("Token A", "TKNA");
        tokenB = new ERC20Token("Token B", "TKNB");
        factory = new WhaleSwapFactory(address(this));
        pair = factory.createPair(address(tokenA), address(tokenB));
    }

    function testQuote() public pure {
        assertEq(WhaleSwapLibrary.quote(100, 100, 100), 100);
        assertEq(WhaleSwapLibrary.quote(100, 100, 200), 200);
        assertEq(WhaleSwapLibrary.quote(100, 200, 100), 50);
    }

    function testPairFor() public view {
        assertEq(WhaleSwapLibrary.pairFor(address(factory), address(tokenA), address(tokenB)), pair);
    }
}