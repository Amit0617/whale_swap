// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "solidity-lib/libraries/TransferHelper.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";
import "./interfaces/IWhaleSwapFactory.sol";
import "./interfaces/IWXFI.sol";
import "./libraries/WhaleSwapLibrary.sol";
import "./WhaleSwapPair.sol";

contract WhaleSwapRouter {
    address public immutable factory;
    address public immutable WXFI;

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "WhaleSwap: EXPIRED");
        _;
    }

    constructor(address _factory, address _WXFI) {
        factory = _factory;
        WXFI = _WXFI;
    }

    receive() external payable {
        assert(msg.sender == WXFI); // only accept XFI via fallback from the WXFI contract
    }

    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) private returns (uint256 amountA, uint256 amountB) {
        // create the pair if it doesn't exist yet
        if (IWhaleSwapFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            IWhaleSwapFactory(factory).createPair(tokenA, tokenB);
        }
        (uint256 reserveA, uint256 reserveB) = WhaleSwapLibrary.getReserves(factory, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint256 amountBOptimal = WhaleSwapLibrary.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "WhaleSwap: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint256 amountAOptimal = WhaleSwapLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, "WhaleSwap: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = WhaleSwapLibrary.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = WhaleSwapPair(pair).mint(to);
    }

    // **** ADD LIQUIDITY FOR NATIVE TOKEN (XFI) ****
    function addLiquidityXFI(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountXFIMin,
        address to,
        uint256 deadline
    ) external payable ensure(deadline) returns (uint256 amountToken, uint256 amountXFI, uint256 liquidity) {
        (amountToken, amountXFI) = _addLiquidity(token, WXFI, amountTokenDesired, msg.value, amountTokenMin, amountXFIMin);
        address pair = WhaleSwapLibrary.pairFor(factory, token, WXFI);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWXFI(WXFI).deposit{value: amountXFI}();
        assert(IWXFI(WXFI).transfer(pair, amountXFI));
        liquidity = WhaleSwapPair(pair).mint(to);
        // refund dust XFI, if any
        if (msg.value > amountXFI) TransferHelper.safeTransferETH(msg.sender, msg.value - amountXFI);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) public ensure(deadline) returns (uint256 amountA, uint256 amountB) {
        address pair = WhaleSwapLibrary.pairFor(factory, tokenA, tokenB);
        WhaleSwapPair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint256 amount0, uint256 amount1) = WhaleSwapPair(pair).burn(to);
        (address token0,) = WhaleSwapLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, "WhaleSwap: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "WhaleSwap: INSUFFICIENT_B_AMOUNT");
    }

    function removeLiquidityXFI(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountXFIMin,
        address to,
        uint256 deadline
    ) public ensure(deadline) returns (uint256 amountToken, uint256 amountXFI) {
        (amountToken, amountXFI) = removeLiquidity(token, WXFI, liquidity, amountTokenMin, amountXFIMin, address(this), deadline);
        TransferHelper.safeTransfer(token, to, amountToken);
        IWXFI(WXFI).withdraw(amountXFI);
        TransferHelper.safeTransferETH(to, amountXFI);
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external ensure(deadline) returns (uint256 amountA, uint256 amountB) {
        address pair = WhaleSwapLibrary.pairFor(factory, tokenA, tokenB);
        uint256 value = approveMax ? type(uint256).max : liquidity;
        WhaleSwapPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB ) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }

    function removeLiquidityXFIWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountXFIMin,
        address to,
        uint256 deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external ensure(deadline) returns (uint256 amountToken, uint256 amountXFI) {
        address pair = WhaleSwapLibrary.pairFor(factory, token, WXFI);
        uint256 value = approveMax ? type(uint256).max : liquidity;
        WhaleSwapPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountXFI) = removeLiquidityXFI(token, liquidity, amountTokenMin, amountXFIMin, to, deadline);
    }

    function _swap(
        uint256[] memory amounts,
        address[] memory path,
        address _to
    ) private {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = WhaleSwapLibrary.sortTokens(input, output);
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out) = input == token0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
            address to = i < path.length - 2 ? WhaleSwapLibrary.pairFor(factory, output, path[i + 2]) : _to;
            WhaleSwapPair(WhaleSwapLibrary.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256[] memory amounts) {
        amounts = WhaleSwapLibrary.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, to);
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256[] memory amounts) {
        amounts = WhaleSwapLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, "WhaleSwapRouter: EXCESSIVE_INPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, to);
    }

    function swapExactXFIForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable ensure(deadline) returns (uint256[] memory amounts) {
        require(path[0] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        amounts = WhaleSwapLibrary.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        IWXFI(WXFI).deposit{value: amounts[0]}();
        assert(IWXFI(WXFI).transfer(WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }

    function swapTokensForExactXFI(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256[] memory amounts) {
        require(path[path.length - 1] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        amounts = WhaleSwapLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, "WhaleSwapRouter: EXCESSIVE_INPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, address(this));
        IWXFI(WXFI).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }

    function swapExactTokensForXFI(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256[] memory amounts) {
        require(path[path.length - 1] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        amounts = WhaleSwapLibrary.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]);
        _swap(amounts, path, address(this));
        IWXFI(WXFI).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }

    function swapXFIForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable ensure(deadline) returns (uint256[] memory amounts) {
        require(path[0] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        amounts = WhaleSwapLibrary.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, "WhaleSwapRouter: EXCESSIVE_INPUT_AMOUNT");
        IWXFI(WXFI).deposit{value: amounts[0]}();
        assert(IWXFI(WXFI).transfer(WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust XFI, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }

    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = WhaleSwapLibrary.sortTokens(input, output);
            WhaleSwapPair pair = WhaleSwapPair(WhaleSwapLibrary.pairFor(factory, input, output));
            uint256 amountInput;
            uint256 amountOutput;
            { // scope to avoid stack too deep errors
                (uint256 reserve0, uint256 reserve1,) = pair.getReserves();
                (uint256 reserveInput, uint256 reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
                amountInput = IERC20(input).balanceOf(address(pair)) - reserveInput;
                amountOutput = WhaleSwapLibrary.getAmountOut(amountInput, reserveInput, reserveOutput);
            }
            (uint256 amount0Out, uint256 amount1Out) = input == token0 ? (uint256(0), amountOutput) : (amountOutput, uint256(0));
            address to = i < path.length - 2 ? WhaleSwapLibrary.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) {
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amountIn);
        uint256 balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) - balanceBefore >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactXFIForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable ensure(deadline) {
        require(path[0] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        uint256 amountIn = msg.value;
        IWXFI(WXFI).deposit{value: amountIn}();
        assert(IWXFI(WXFI).transfer(WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amountIn));
        uint256 balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) - balanceBefore >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactTokensForXFISupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) {
        require(path[path.length - 1] == WXFI, "WhaleSwapRouter: INVALID_PATH");
        TransferHelper.safeTransferFrom(path[0], msg.sender, WhaleSwapLibrary.pairFor(factory, path[0], path[1]), amountIn);
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint256 amountOut = IERC20(WXFI).balanceOf(address(this));
        require(amountOut >= amountOutMin, "WhaleSwapRouter: INSUFFICIENT_OUTPUT_AMOUNT");
        IWXFI(WXFI).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }

    function quote(uint256 amountA, uint256 reserveA, uint256 reserveB) public pure returns (uint256 amountB) {
        return WhaleSwapLibrary.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256 amountOut) {
        return WhaleSwapLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256 amountIn) {
        return WhaleSwapLibrary.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint256 amountIn, address[] memory path) public view returns (uint256[] memory amounts) {
        return WhaleSwapLibrary.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint256 amountOut, address[] memory path) public view returns (uint256[] memory amounts) {
        return WhaleSwapLibrary.getAmountsIn(factory, amountOut, path);
    }
}
