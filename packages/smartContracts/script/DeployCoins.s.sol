// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/TetherUSD.sol";

contract DeployCoins is Script {
    TetherUSD public system;

    address admin;
    function setUp() public {}

    function run() public {
        vm.broadcast(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        system = new TetherUSD(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        console.log("system", address(system));
    }
}
