Todo
- ~~Test WXFI functionality for deposity and withdrawal and transfer~~
cast send --value 1ether --rpc-url RPC_URL --private-key RAW_KEY 0x28cC5eDd54B1E4565317C3e0Cfab551926A4CD2a deposit()
May be also check balance before trying to transfer
transfer(other address, 1 ether)
withdraw(1 ether)

- Deploy contracts

We need
- A normal AMM as in uniswap(or xswap) and it's liquidity will be available for execution of long term orders too.
- Apart from constant product formula pool for every pair, there will be two more pools for both tokens of pair where any or both of those can be empty just for LTOs. (total 3 pools for each pair)
- No actual transaction or movement will be occurring between pools, only prices of assets being traded will be changing on constant product pool using a **new formula** which will adjust prices like a large number of small trades are continuously occurring but without any actual gas fee or transaction involving(i.e., they are called virtual trades).
- Continuous change in price will take it upwards or downwards. Arbitrageurs will continously make use of that opportunity and keep supplying assets required to complete that large order running in long term order pool.
- Long term orders will have lower slippage even for large swaps.
- At some point, cp pool would have collected enough of tokens user wanted because of arbitrageur's trades. 

Stats(or numbers)
- Each AMM pair contract have 3 tokens : token0, token1 and ERC20 liquidity token(i.e. $WHALE).

Thoughts(not for current implementation)
- What if long term order is cancelled? then it will probably have to wait for same duration of time for which the current order was sitting in pool to be filled. So that all reverse virtual trades can be made to revert back the prices.

Doubts
- How come this expression?
>For initial LP-amount, Uniswap V2 ended up using geometric mean of deposited amounts:  
$Liquidity_{minted}=\sqrt{Amount0∗Amount1}$  
​ The main benefit of this decision is that such formula ensures that the initial liquidity ratio doesn’t affect the value of a pool share.

- WhaleSwapPair.swap  
Instead of just straight constant product formula, in which if someone supplies tokenX equal to what reserves are already holding, pair will give away all of the tokenY, we use expression which behaves like hyperbola. This makes our pair reserves infinite. Trades of size relative to pair reserves are punished by exchanging with less tokens (because of price slippage). On the other hand, small sized trades get the best values through swap.
>So let say a pair contract is initiated with 2000 token X and 1000 token Y.
On providing 2 token X, you would get 0.999 token Y (and not exact 1 token Y)  
This helps in maintaining $k_{new} > k_{old}$ i.e., infinite reserves. $(2002*999.0001 > 2000*1000)$

- ~~ How does price0CumulativeLast += $\frac{reserve1}{reserve0} * timeElapsed$ and similarly price1CumulativeLast?~~  
**Explanation:** It will mainly be useful for creating decentralised oracles. For how long a price was sustained, that weightage is taken into consideration by multiplying with `timeElapsed`. To calculate current price using `priceXCumulative`, we can do following 
```math
price0Average = \frac{price0Cumulative - price0CumulativeLast}{timeStamp - timeStampLast}    
```
```math
price1Average = \frac{price1Cumulative - price1CumulativeLast}{timeStamp - timeStampLast}
```

- In `WhaleSwapPair::burn()`, 
    ```
    liquidity = balanceOf[address(this)]
    ```
    Used for calculation of pool tokens(A or B) to be transferred back on burning LP tokens($Whale). Shouldn't be it burning msg.sender tokens instead of WhaleSwapPair contract tokens?

<details>
<summary><h2>Foundry Commands</h2></summary>
<p>


**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
</p>
</details>