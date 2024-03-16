// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/RegisterSystem.sol";

contract DeployRegister is Script {
    RegisterSystem public system;

    address admin;
    function setUp() public {}

    function run() public {
        vm.broadcast(msg.sender);
        system = new RegisterSystem(msg.sender);
        console.log("system", address(system));
    }
}
