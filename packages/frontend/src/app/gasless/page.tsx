'use client';
import React from 'react';
import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from 'permissionless';
import {
  createPimlicoPaymasterClient,
  createPimlicoBundlerClient,
} from 'permissionless/clients/pimlico';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import { useWalletClient } from 'wagmi';
import { celo } from 'viem/chains';
import { createPublicClient, http, getContract, formatEther } from 'viem';
import CounterABI from '@/constants/Counter.abi.json';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { counterAddress } from '@/constants';

const apiKey = '28246380-bc85-403c-b738-9b690ba3703f';
const paymasterUrl = `https://api.pimlico.io/v2/celo/rpc?apikey=${apiKey}`;
const paymasterClient = createPimlicoPaymasterClient({
  transport: http(paymasterUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});
const bundlerUrl = `https://api.pimlico.io/v1/celo/rpc?apikey=${apiKey}`;
const pimlicoBundlerClient = createPimlicoBundlerClient({
  transport: http(bundlerUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

import { useReadContract, useAccount } from 'wagmi';

function Page() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected, chain } = useAccount();
  const publicClient = createPublicClient({
    transport: http('https://rpc.ankr.com/celo'),
  });
  const result = useReadContract({
    abi: CounterABI,
    address: counterAddress,
    functionName: 'count',
  });
  const handleGaslessTransaction = async () => {
    if (!walletClient) return;
    const customSigner = walletClientToSmartAccountSigner(walletClient);
    const simpleSmartAccountClient = await signerToSafeSmartAccount(
      publicClient,
      {
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        signer: customSigner,
        safeVersion: '1.4.1', 
      }
    );
    // console.debug(customSigner)
    
    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccountClient,
      chain: celo, // or whatever chain you are using
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      bundlerTransport: http(
        `https://api.pimlico.io/v1/celo/rpc?apikey=${apiKey}`
      ),
      middleware: {
        gasPrice: async () =>
          (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
        sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
      },
    });

    const counterContract = getContract({
      address: counterAddress,
      abi: CounterABI,
      client: {
        public: publicClient,
        wallet: smartAccountClient,
      },
    });
    const tx = await counterContract.write.increment();
    console.debug(tx);
  };
  console.debug('result', result.data);
  console.debug(chain);

  return (
    <div>
      <DynamicWidget />

      {result.isLoading ? <p>Loading...</p> : <p>{Number(result.data)}</p>}
      <button onClick={handleGaslessTransaction}>ClickMEEE</button>
    </div>
  );
}

export default Page;
