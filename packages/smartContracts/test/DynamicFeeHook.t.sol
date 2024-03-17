// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
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
import "./HookMiner.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";
import {SwapFeeLibrary} from "@uniswap/v4-core/src/libraries/SwapFeeLibrary.sol";
import {RegisterSystem} from "../src/RegisterSystem.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IQuoter} from "@uniswap/v4-periphery/contracts/interfaces/IQuoter.sol";
import {Quoter} from "@uniswap/v4-periphery/contracts/lens/Quoter.sol";

contract DynamicFeeHookTest is Test, Deployers {
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;
    using FixedPointMathLib for uint256;

    RegisterSystem public registerSystem;

    address userAdmin;
    address attester;
    address userA;
    address userB;

    DinamicFeeByLevelHook hook;

    Quoter quoter;

    function setUp() public {
        // creates the pool manager, utility routers, and test tokens
        Deployers.deployFreshManagerAndRouters();
        Deployers.deployMintAndApprove2Currencies();

        

        // Deploy the hook to an address with the correct flags
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);
        (address hookAddress, bytes32 salt) =
            HookMiner.find(address(this), flags, type(DinamicFeeByLevelHook).creationCode, abi.encode(address(manager)));
        hook = new DinamicFeeByLevelHook{salt: salt}(IPoolManager(address(manager)));
        require(address(hook) == hookAddress, "DynamicFeeHookTest: hook address mismatch");

        // Create the pool with dynamic fees enabled
        key = PoolKey(currency0, currency1, SwapFeeLibrary.DYNAMIC_FEE_FLAG, 60, IHooks(address(hook)));
        manager.initialize(key, SQRT_RATIO_1_1, ZERO_BYTES);

        // Provide liquidity to the pool
        modifyLiquidityRouter.modifyLiquidity(key, IPoolManager.ModifyLiquidityParams(-60, 60, 10000 ether), ZERO_BYTES);
        modifyLiquidityRouter.modifyLiquidity(
            key, IPoolManager.ModifyLiquidityParams(-120, 120, 1000 ether), ZERO_BYTES
        );
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams(TickMath.minUsableTick(60), TickMath.maxUsableTick(60), 10000 ether),
            ZERO_BYTES
        );
        userAdmin = makeAddr("userAdmin");
        attester = makeAddr("attester");
        userA = makeAddr("userA");
        userB = makeAddr("userB");

        currency0.transfer(userA, 1000 ether);
        currency1.transfer(userA, 1000 ether);
        currency0.transfer(userB, 1000 ether);
        currency1.transfer(userB, 1000 ether);

        vm.startPrank(userA);
        IERC20(Currency.unwrap(currency0)).approve(address(swapRouter), 1000 ether);
        IERC20(Currency.unwrap(currency1)).approve(address(swapRouter), 1000 ether);
        vm.stopPrank();

        vm.startPrank(userB);
        IERC20(Currency.unwrap(currency0)).approve(address(swapRouter), 1000 ether);
        IERC20(Currency.unwrap(currency1)).approve(address(swapRouter), 1000 ether);
        vm.stopPrank();


        registerSystem = new RegisterSystem(userAdmin);

        vm.startPrank(userA);
        registerSystem.safeMint(userA, "userA");
        vm.stopPrank();

        vm.startBroadcast(userB);
        registerSystem.safeMint(userB, "userB");
        vm.stopBroadcast();

        vm.startBroadcast(userAdmin);
        registerSystem.setAttester(attester);
        vm.stopBroadcast();

        vm.startBroadcast(attester);
        registerSystem.setPointsData(15, userA);
        registerSystem.setPointsData(800, userB);
        vm.stopBroadcast();

        console.log("address of registerSystem: ", address(registerSystem));
        console.log("userA level: ", registerSystem.getLevelOfUser(userA));
        console.log("userB level: ", registerSystem.getLevelOfUser(userB));

        // Set up the quoter
        quoter = new Quoter(address(manager));

    }

    function test_dynamic_fee_even_block_number() public {
        // set block number to 10 (even), making the dynamic fee 0.69%
        //vm.roll(10);
        //assertEq(block.number, 10);

        vm.startPrank(userA);
        uint256 balance1Before = currency1.balanceOfSelf();

        // Perform a test swap //
        bool zeroForOne = true;
        int256 amountSpecified = 1e18;
        bytes memory data = abi.encode(userA);
        BalanceDelta swapDelta = Deployers.swap(key, zeroForOne, amountSpecified, data);
        // ------------------- //

        uint256 token1Output = currency1.balanceOfSelf() - balance1Before;

        uint160 MAX_SLIPPAGE = zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT;
        (int128[] memory deltaAmounts, uint160 sqrtPriceX96After,) = quoter.quoteExactInputSingle(
            IQuoter.QuoteExactSingleParams(key, zeroForOne, address(this), 1e18, MAX_SLIPPAGE, data)
        );

        console.log("deltaAmounts: ", uint256(int256(deltaAmounts[0])));
        console.log("deltaAmounts: ", uint256(int256(deltaAmounts[1])));

        console.log("sqrtPriceX96After: ", sqrtPriceX96After);

        (int128[] memory deltaAmountsOut, uint160 sqrtPriceX96AfterOut,) = quoter.quoteExactOutputSingle(
            IQuoter.QuoteExactSingleParams(key, zeroForOne, address(this), 1e18, MAX_SLIPPAGE, data)
        );

        console.log("deltaAmountsOut: ", uint256(int256(deltaAmountsOut[0])));

        console.log("deltaAmountsOut: ", uint256(int256(deltaAmountsOut[1])));

        console.log("sqrtPriceX96AfterOut: ", sqrtPriceX96AfterOut);


        //assertEq(int256(swapDelta.amount0()), amountSpecified);
        //assertEq(int256(swapDelta.amount1()), -int256(token1Output));

        // tokens are trading 1:1, so 1e18 input should produce roughly 0.9931e18 output (0.69% fee)
        // (fee is taken from the input, which leads to a smaller output)
        // need to use approx-assertion because tokens are not trading exactly 1:1
        //assertApproxEqAbs(token1Output, uint256(amountSpecified).mulWadDown(0.9931e18), 0.00005e18);
    }


    function test_dynamic_fee_odd_block_number() public {
        // set block number to 11 (odd), making the dynamic fee 0.05%
        //|vm.roll(11);
        //assertEq(block.number, 11);
        vm.startPrank(userB);

        uint256 balance1Before = currency1.balanceOfSelf();

        // Perform a test swap //forge-std/TestTest.sol
        bool zeroForOne = true;
        int256 amountSpecified = 1e18;
        bytes memory data = abi.encode(userB);
        BalanceDelta swapDelta = Deployers.swap(key, zeroForOne, amountSpecified, data);
        // ------------------- //

        uint256 token1Output = currency1.balanceOfSelf() - balance1Before;

        //assertEq(int256(swapDelta.amount0()), amountSpecified);
        //assertEq(int256(swapDelta.amount1()), -int256(token1Output));

        // tokens are trading 1:1, so 1e18 input should produce roughly 0.9995e18 output (0.05% fee)
        // (fee is taken from the input, which leads to a smaller output)
        // need to use approx-assertion because tokens are not trading exactly 1:1
        //assertApproxEqAbs(token1Output, uint256(amountSpecified).mulWadDown(0.9995e18), 0.00005e18);
    }
}