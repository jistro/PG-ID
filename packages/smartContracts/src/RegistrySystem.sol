// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract RegistrySystem {

    string constant PGID = ".pjid";
    mapping (address account => string username) public usernameRegistry;

    function registerUsername(string memory _username) public {
        usernameRegistry[msg.sender] = _username;
    }

}
