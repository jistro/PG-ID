// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {BaseHook} from "@uniswap/v4-periphery/contracts/BaseHook.sol";

import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";

import {RegisterSystem} from "./RegisterSystem.sol";

contract DinamicFeeByLevelHook is BaseHook {

    address public registerUser = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}

    function getHookPermissions() public pure override returns (Hooks.Permissions memory ) {
        return Hooks.Permissions({
            beforeInitialize: false,
            afterInitialize: false, // you can use afterInitialize to set the initial swap fee too
            beforeAddLiquidity: false,
            afterAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterRemoveLiquidity: false,
            beforeSwap: true,
            afterSwap: false,
            beforeDonate: false,
            afterDonate: false
        });
    }

    /// @notice Sets the swap fee for a pool
    /// @dev Define your own custom logic here!
    function setDynamicFee(PoolKey calldata key, address user) public {
        uint256 level = RegisterSystem(registerUser).getLevelOfUser(user);
        if (level == 0) {
            poolManager.updateDynamicSwapFee(key, 10000); // 1%
        } else if (level == 1) {
            poolManager.updateDynamicSwapFee(key, 9500); // 0.95%
        } else if (level == 2) {
            poolManager.updateDynamicSwapFee(key, 9000); // 0.9%
        } else if (level == 3) {
            poolManager.updateDynamicSwapFee(key, 8500); // 0.85%
        } else if (level == 4) {
            poolManager.updateDynamicSwapFee(key, 8000); // 0.8%
        } else if (level == 5) {
            poolManager.updateDynamicSwapFee(key, 7500); // 0.75%
        } else {
            poolManager.updateDynamicSwapFee(key, 10000); // 1%
        }
    }

    function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata, bytes calldata hookData)
        external
        override
        returns (bytes4)
    {
         address user = abi.decode(hookData, (address));
        setDynamicFee(key, user); // set the swap fee on every swap
        // TODO: optimization -- only needs to be set top-of-block
        return BaseHook.beforeSwap.selector;
    }
}