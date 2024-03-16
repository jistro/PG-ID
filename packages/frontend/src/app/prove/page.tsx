'use client';
import React, { useEffect } from 'react';

import { useWalletClient } from 'wagmi';
import CounterABI from '@/constants/Counter.abi.json';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { counterAddress } from '@/constants';

import { useReadContract, useAccount } from 'wagmi';
import { makeGaslessTransaction } from '@/services/pimlico.service';

function Page() {
  const { data: walletClient } = useWalletClient();
  const result = useReadContract({
    abi: CounterABI,
    address: counterAddress,
    functionName: 'count',
  });
  useEffect(() => {
    console.debug(walletClient);
  }, [walletClient]);

  const handleGaslessTransaction = async () => {
    await makeGaslessTransaction(walletClient);
  };

  return (
    <div>
      {result.isLoading ? <p>Loading...</p> : <p>Current count: {Number(result.data)}</p>}
      <button className='bg-slate-300 rounded-md p-5 text-black font-bold' onClick={handleGaslessTransaction}>
        Make Gasless Transaction
      </button>
    </div>
  );
}

export default Page;
