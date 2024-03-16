// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/DinamicFeeByLevelHook.sol";

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";

contract DeployHook is Script {
    DinamicFeeByLevelHook public manager;
    IPoolManager public poolManager;

    address admin;
    function setUp() public {}

    function run() public {
        vm.broadcast(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        poolManager = IPoolManager(0xd962b16F4ec712D705106674E944B04614F077be);
        manager = new DinamicFeeByLevelHook(poolManager);
        console.log("manager", address(manager));
    }
}
