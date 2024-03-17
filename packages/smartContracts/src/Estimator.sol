// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.21;
import "./RegisterSystem.sol";
contract Estimator {
    address rs;
    constructor(address registerSystem) {
        rs =  registerSystem;
    }

    function swapInPool(
        uint256 amountIn
    ) public returns (uint256 amountOut) {
        
    }
}