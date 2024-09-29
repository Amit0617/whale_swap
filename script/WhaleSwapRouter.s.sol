// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {WhaleSwapRouter} from "../src/WhaleSwapRouter.sol";

contract WhaleSwapRouterScript is Script {
    WhaleSwapRouter public router;
    address public WhaleSwapFactory;
    address public WXFI = address(0x28cC5eDd54B1E4565317C3e0Cfab551926A4CD2a); // It can be unsafe because it's not verified on xfiscan but should be okay for the purpose of hackathon

    function setUp() public {
        WhaleSwapFactory = address(0);
    }

    function run() public {
        vm.startBroadcast();
        if (WhaleSwapFactory == address(0)) {
            console.log("WhaleSwapFactory is not set");
            return;
        }

        router = new WhaleSwapRouter(WhaleSwapFactory, WXFI);

        vm.stopBroadcast();
    }
}
