
We need
- A normal AMM as in uniswap(or xswap) and it's liquidity will be available for execution of long term orders too.
- Apart from constant product formula pool for every pair, there will be two more pools for both tokens of pair where any or both of those can be empty just for LTOs. (total 3 pools for each pair)
- No actual transaction or movement will be occurring between pools, only prices of assets being traded will be changing on constant product pool using a **new formula** which will adjust prices like a large number of small trades are continuously occurring but without any actual gas fee or transaction involving(i.e., they are called virtual trades).
- Continuous change in price will take it upwards or downwards. Arbitrageurs will continously make use of that opportunity and keep supplying assets required to complete that large order running in long term order pool.
- At some point, cp pool would have collected enough of tokens user wanted because of arbitrageur's trades. 

Thoughts(not for current implementation)
- What if long term order is cancelled? then it will probably have to wait for same duration of time for which the current order was sitting in pool to be filled. So that all reverse virtual trades can be made to revert back the prices.