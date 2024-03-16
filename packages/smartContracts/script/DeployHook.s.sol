// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/DinamicFeeByLevelHook.sol";
import {HookMiner} from "../src/HookMiner.sol";

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";


contract DeployHook is Script {
    DinamicFeeByLevelHook public manager;
    IPoolManager public poolManager;

    address admin;
    address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C);
    function setUp() public {}

    function run() public {
        vm.broadcast(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        poolManager = IPoolManager(0xd962b16F4ec712D705106674E944B04614F077be);
        (address hookAddress, bytes32 salt) =
        HookMiner.find(CREATE2_DEPLOYER, flags, type(DinamicFeeByLevelHook).creationCode, abi.encode(address(poolManager)));
        DinamicFeeByLevelHook hook = new DinamicFeeByLevelHook{salt: salt}(IPoolManager(address(poolManager)));
        require(address(hook) == hookAddress, "DynamicFeeHookTest: hook address mismatch");

        
        console.log("manager", address(hook));
    }
}
