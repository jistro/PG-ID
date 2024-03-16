// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/DinamicFeeByLevelHook.sol";

import "@uniswap/v4-core/src/PoolManager.sol";

contract DeployManager is Script {
    IPoolManager public manager;

    address admin;
    function setUp() public {}

    function run() public {
        vm.broadcast(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        manager = new PoolManager(500000);
        console.log("manager", address(manager));
    }
}
