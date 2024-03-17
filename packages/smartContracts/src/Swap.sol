// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.21;
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {PoolSwapTest} from "@uniswap/v4-core/src/test/PoolSwapTest.sol";
import {IHooks} from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import {BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {TickMath} from "@uniswap/v4-core/src/libraries/TickMath.sol";
import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";


address constant USDT_MOCK_ADDRESS = address(0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9); //mUNI deployed to GOERLI -- insert your own contract address here
address constant USDC_MOCK_ADDRESS = address(0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f); //mUSDC deployed to GOERLI -- insert your own contract address here

contract Swap is Deployers {
    bool zeroForOne = true;

    function swapInPool(
        int256 _amountSpecified
    ) public {
        address token0 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDT_MOCK_ADDRESS : USDC_MOCK_ADDRESS;
        address token1 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDC_MOCK_ADDRESS : USDT_MOCK_ADDRESS;
        PoolKey memory pool = PoolKey(
            Currency.wrap(token0), Currency.wrap(token1), 3000, 60, IHooks(0x020e22422E7A60035EEB9F12499C1A348FeC0D5B)
        );
        bytes memory data = abi.encode(msg.sender);
        Deployers.swap(pool, zeroForOne, _amountSpecified, data);
    }
}