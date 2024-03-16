'use client';
import { getUserData } from '@/services/alchemy.service';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Address } from 'viem';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';

function Stats() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [stats, setStats] = useState({ RPGF: 0, Donations: 0 });
  const { push } = useRouter();
  useEffect(() => {
    async function getData() {
      if (!address) return;
      const { Donations, RPGF } = await getUserData(address as Address);
      setStats({
        RPGF: RPGF.transfers.length,
        Donations: Donations.transfers.length,
      });
    }
    getData();
  }, [address]);
  const handleDisconnect = () => {
    disconnect();
    push('/');
  };
  return (
    <div className='stats w-full flex flex-col gap-4 h-full py-8 text-xl justify-center'>
      <div className=' flex h-full  text-[#94716B] flex-col p-4 border-[#C0ABA7] border-[3.5px]'>
        <div className='flex flex-row items-center justify-between '>
          <span>RPGF rewards</span>
          <img className='w-8' src='/rgp.svg'></img>
        </div>
        <p className='text-[#594440] pb-5'>{stats.RPGF}</p>
        <span className=' text-[#94716B]'>Donation rewards</span>
        <p className='text-[#594440]'>{stats.Donations}</p>
      </div>
      <button className='border-2 p-4 border-[#C0ABA7] border-[3.5px] text-[#594440] w-full'>
        Update impact
      </button>
      <button
        onClick={handleDisconnect}
        className='border-2 p-4 py-2 bg-red-400 border-[#C0ABA7] border-[3.5px] text-[#594440] w-full'
      >
        Log out
      </button>
    </div>
  );
}

export { Stats };
