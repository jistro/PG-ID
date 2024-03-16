'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Nouns from '@/assets/images/Nouns.svg';
import { useReadUserData } from '@/hooks/useReadUserData';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

function User() {
  const { address } = useAccount();
  const { data } = useReadUserData(
    '0x1726cf86DA996BC4B2F393E713f6F8ef83f2e4f6'
  );
  useEffect(() => {
    console.debug(data);
  }, [data]);

  return (
    <div className='max-h-full overflow-hidden text-xl text-[#594440] user flex flex-row gap-4 w-full'>
      <Image className='h-full w-fit' src={Nouns} alt='nouns' />
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4 items-center'>
          <span>Verified</span>
          <img className='w-8' src='/verified.svg'></img>
        </div>
        <p className=' '>
          <span className='text-[#594440]'>Luuk</span>
          <span className='text-[#C0ABA7]'>.pg.id</span>
        </p>
        <div className='bg-[#C0ABA7] text-white my-2 w-[83px] h-[52px] items-center flex justify-center'>
          <p>
            <span>Level:</span>2
          </p>
        </div>
        <p className='text-[#C0ABA7]'>
          PG Points: <span className='text-[#594440]'>35</span>
        </p>
        <p className='text-[#C0ABA7]'>
          Points till next level: <span className='text-[#594440]'>40</span>
        </p>
      </div>
    </div>
  );
}

export { User };
