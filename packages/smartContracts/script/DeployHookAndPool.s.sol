// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/DinamicFeeByLevelHook.sol";
import {HookMiner} from "../src/HookMiner.sol";

import {PoolManager} from "@uniswap/v4-core/src/PoolManager.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
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
import {PoolModifyLiquidityTest} from "@uniswap/v4-core/src/test/PoolModifyLiquidityTest.sol";

contract DeployHookAndPool is Script {
    DinamicFeeByLevelHook public manager;
    IPoolManager public poolManager;

    address admin;
    address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C);
    address constant USDT_MOCK_ADDRESS = address(0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9); //mUNI deployed to GOERLI -- insert your own contract address here
    address constant USDC_MOCK_ADDRESS = address(0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f); //mUSDC deployed to GOERLI -- insert your own contract address here

    function setUp() public {}

    function run() public {
        vm.startBroadcast(0x4281b208a7C38d1FCD58EEeF77e3d7c6cB1dE9be);

        poolManager = IPoolManager(0xd962b16F4ec712D705106674E944B04614F077be);
       /*uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        (address hookAddress, bytes32 salt) = HookMiner.find(
            CREATE2_DEPLOYER, flags, type(DinamicFeeByLevelHook).creationCode, abi.encode(address(poolManager))
        );
        DinamicFeeByLevelHook hook = new DinamicFeeByLevelHook{salt: salt}(IPoolManager(address(poolManager)));
        require(address(hook) == hookAddress, "DynamicFeeHookTest: hook address mismatch");
        console.log("hook done!!!!", address(hook));
        */
        // sort the tokens!
        address token0 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDT_MOCK_ADDRESS : USDC_MOCK_ADDRESS;
        address token1 = uint160(USDT_MOCK_ADDRESS) < uint160(USDC_MOCK_ADDRESS) ? USDC_MOCK_ADDRESS : USDT_MOCK_ADDRESS;

        PoolKey memory pool = PoolKey(
            Currency.wrap(token0), Currency.wrap(token1), 3000, 60, IHooks(0x020e22422E7A60035EEB9F12499C1A348FeC0D5B)
        );

        
        PoolId id = PoolIdLibrary.toId(pool);
        bytes32 idBytes = PoolId.unwrap(id);

        console.log("Pool done!!!!");
        console.logBytes32(bytes32(idBytes));
        console.logAddress(msg.sender);
        IERC20(0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9).approve(0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16, 1000 ether);
        IERC20(0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f).approve(0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16, 1000 ether);
        IERC20(0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9).transfer(0x020e22422E7A60035EEB9F12499C1A348FeC0D5B, 1000 ether);
        IERC20(0x63ba29cAF4c40DaDA8a61D10AB5D2728c806b61f).transfer(0x020e22422E7A60035EEB9F12499C1A348FeC0D5B, 1000 ether);
        uint160 startingPrice = 79228162514264337593543950336;
        bytes memory hookData = new bytes(0);
        int24 tick = poolManager.initialize(pool, startingPrice, hookData);
        console.log("tick initialized!!!!");
        console.logInt(tick);
        PoolModifyLiquidityTest(payable(0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)).modifyLiquidity(pool, IPoolManager.ModifyLiquidityParams(-60, 60, 10000 ether), hookData);
        PoolModifyLiquidityTest(payable(0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)).modifyLiquidity(
            pool, IPoolManager.ModifyLiquidityParams(-120, 120, 1000 ether), hookData
        );

        //console.log("Liquidities done!!!!");

    }
}
