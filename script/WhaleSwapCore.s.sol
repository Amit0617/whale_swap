// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {WhaleSwapFactory} from "../src/WhaleSwapFactory.sol";
import {WhaleSwapERC20} from "../src/WhaleSwapERC20.sol";

contract WhaleSwapCore is Script {
    WhaleSwapERC20 public whaleToken;
    WhaleSwapFactory public factory;

    function run() public {
        vm.startBroadcast();

        whaleToken = new WhaleSwapERC20();
        factory = new WhaleSwapFactory(address(msg.sender));

        vm.stopBroadcast();
    }
}
