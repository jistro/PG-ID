// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IHooks} from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {TickMath} from "@uniswap/v4-core/src/libraries/TickMath.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/src/types/PoolId.sol";
import {CurrencyLibrary, Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";
import {DinamicFeeByLevelHook} from "../src/DinamicFeeByLevelHook.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";
import {SwapFeeLibrary} from "@uniswap/v4-core/src/libraries/SwapFeeLibrary.sol";
import {RegisterSystem} from "../src/RegisterSystem.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";

import {Script, console} from "forge-std/Script.sol";

contract CreatePool is Script {
    using CurrencyLibrary for Currency;

    //addresses with contracts deployed
    address constant BASE_SEPOLIA_POOLMANAGER = address(0xE5dF461803a59292c6c03978c17857479c40bc46); //pool manager deployed to GOERLI
    address constant USDT_MOCK_ADDRESS = address(0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9); //mUNI deployed to GOERLI -- insert your own contract address here
    address constant USDC_MOCK_ADDRESS = address(0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f); //mUSDC deployed to GOERLI -- insert your own contract address here
    address constant HOOK_ADDRESS = address(0x0207c6D26577788dD3044652e62F1DE665403483); //address of the hook contract deployed to goerli -- you can use this hook address or deploy your own!

    IPoolManager manager = IPoolManager(BASE_SEPOLIA_POOLMANAGER);

    function run() external {
        vm.broadcast(0xF11f8301C76F46733d855ac767BE741FFA9243Bd);
        // sort the tokens!
        address token0 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDT_MOCK_ADDRESS : USDC_MOCK_ADDRESS;
        address token1 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDC_MOCK_ADDRESS : USDT_MOCK_ADDRESS;
        uint24 swapFee = 1000;
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 79228162514264337593543950336;

        bytes memory hookData = abi.encode(block.timestamp);

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(HOOK_ADDRESS)
        });

        // Turn the Pool into an ID so you can use it for modifying positions, swapping, etc.
        PoolId id = PoolIdLibrary.toId(pool);
        bytes32 idBytes = PoolId.unwrap(id);

        console.log("Pool ID Below");
        console.logBytes32(bytes32(idBytes));

        
        manager.initialize(pool, startingPrice, hookData);
    }
}
