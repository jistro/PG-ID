// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/Swap.sol";

contract DeploySwap is Script {
    Swap public swap;

    address admin;
    function setUp() public {}

    function run() public {
        vm.startBroadcast(0x4281b208a7C38d1FCD58EEeF77e3d7c6cB1dE9be);
        swap = new Swap();
        console.log("manager", address(swap));
    }
}
