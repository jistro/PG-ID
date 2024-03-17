-include .env

.PHONY: all help install format anvil compile

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Makefile for Smart-Contract"
	@echo "Usage:"
	@echo "  make install    install dependencies"
	@echo "  make format     format code"
	@echo "  make anvil      run anvil"
	@echo "  make compile    compile contracts"
	@echo "  make deployTest deploy test contracts"
	@echo "  make deployAlbitrumTestnet deploy test contracts in Albitrum Sepolia testnet"

all: clean remove install update build

install:
	@echo "Not implemented yet"

format :; forge fmt

anvil :
	@echo "Starting Anvil, remember use another terminal to run tests"
	@anvil -m 'test test test test test test test test test test test junk' --steps-tracing

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

TESTNET_ARGS := --rpc-url $(RPC_URL) --private-key $(PRIVATE) --broadcast --verify --etherscan-api-key $(API_KEY) -vvvvvvv
ALBITRUM_TESTNET_ARGS := --rpc-url $(RPC_URL) --private-key $(PRIVATE) --broadcast -vvvvvvv
ARB_ARGS := --rpc-url $(RPC_URL_ARB) --private-key $(PRIVATE) --broadcast --verify --etherscan-api-key $(API_KEY_ARB) -vvvvvvv

compile:
	forge compile
deployTest:
	@echo "--==Deploying test contracts in anvil local testnet==--"
	@forge script script/DeployTest.s.sol:DeployTest $(NETWORK_ARGS)

deployRegisterEth:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployRegister.s.sol:DeployRegister $(TESTNET_ARGS)

deployRegister:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployRegister.s.sol:DeployRegister $(ARB_ARGS)

deployManager:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployManager.s.sol:DeployManager $(ARB_ARGS)

deployCoins:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployCoins.s.sol:DeployCoins $(ARB_ARGS)

deployHook:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployHook.s.sol:DeployHook $(ARB_ARGS)

createPool:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/CreatePool.s.sol:CreatePool $(ARB_ARGS)

deloyHookAndPool:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeployHookAndPool.s.sol:DeployHookAndPool $(ARB_ARGS)

deploySwap:
	@echo "--==Deploying test contracts in Ethereum sepolia testnet==--"
	@forge script script/DeploySwap.s.sol:DeploySwap $(ARB_ARGS)