// SPDX-License-Identifier : MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/WhaleSwapFactory.sol";
import "../src/WhaleSwapPair.sol";
import "./mocks/ERC20Token.sol";
import "../src/WhaleSwapERC20.sol";
import "../src/WhaleSwapRouter.sol";
import "./mocks/WXFI.sol";

contract WhaleSwapRouterTest is Test {
    WhaleSwapFactory factory;
    WhaleSwapERC20 whaleToken;
    WhaleSwapRouter router;
    WXFI wXFI;
    address pair;
    ERC20Token tokenA;
    ERC20Token tokenB;

    function setUp() public {
        tokenA = new ERC20Token("TokenA", "TKNA");
        tokenB = new ERC20Token("TokenB", "TKNB");
        factory = new WhaleSwapFactory(address(this));
        whaleToken = new WhaleSwapERC20();
        pair = factory.createPair(address(tokenA), address(tokenB));
        wXFI = new WXFI();
        router = new WhaleSwapRouter(address(factory), address(wXFI));
        tokenA.mint(address(this), 10 ether);
        tokenB.mint(address(this), 10 ether);

        console.log("TokenA balance: %d", tokenA.balanceOf(address(this)));
        console.log("TokenB balance: %d", tokenB.balanceOf(address(this)));
    }
    function assertReservesGe(uint112 reserve0, uint112 reserve1) public view {
        (uint112 _reserve0, uint112 _reserve1, ) = WhaleSwapPair(pair)
            .getReserves();
        assertGe(_reserve0, reserve0);
        assertGe(_reserve1, reserve1);
    }
    function testSwapExactTokensForTokens() public {
        tokenA.transfer(address(pair), 2 ether);
        tokenB.transfer(address(pair), 2 ether);
        WhaleSwapPair(pair).mint(address(this));

        address[] memory path = new address[](2);
        path[0] = address(tokenA);
        path[1] = address(tokenB);
        tokenA.approve(address(router), 1 ether);
        WhaleSwapRouter(router).swapExactTokensForTokens(
            1 ether,
            0.6 ether,
            path,
            address(this),
            vm.getBlockTimestamp() + 100
        );
        assertReservesGe(1.3 ether, 2.9 ether);
    }
}
