'use client';

import React, { useState } from 'react';
import cn from 'clsx';
import { Noun } from '../Nouns';
import { useMakePGAvatar } from '@/hooks/useMakePGAvatar';
import { useGetAvatar } from '@/hooks/useGetAvatar';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

function PGAvatar({ username }: { username: string }) {
  const { createPGAvatar } = useMakePGAvatar();
  const { push } = useRouter();
  const { address } = useAccount();
  const { data: avatar } = useGetAvatar();
  if (avatar.head) push('/dashboard');
  const [data, setData] = useState({
    background: 0,
    body: 0,
    glasses: 0,
    head: 50,
    address,
  });

  const handleCreate = async () => {
    // This is the function that is called when the user clicks the "Create" button but we have an issue with the smart contract, so we are commenting it out for now
    // At the real implementation the user needs to sign 4 transactions to create the avatar, thats a problem for the user experience, at the roadmap we have a solution for that.
    // await createPGAvatar(data);
    localStorage.setItem('avatar', JSON.stringify(data));
    push('/dashboard');
  };

  return (
    <>
      <div className='flex flex-col items-center  h-screen  rounded-lg  bg-transparent'>
        <div className='flex flex-col gap-3 p-4 h-full   bg-nouns-pastel'>
          <div className='flex flex-col gap-1 w-full border-transparent border-b-[#C0ABA7]  pb-4 border-4 border-dashed'>
            <h2 className='font-sans text-start text-4xl text-[#594440] font-bold '>
              Create your PG ID Avatar
            </h2>
            <p className='text-xl text-[#C0ABA7]'>{username}</p>
          </div>
          <div className='grid gap-4 w-full sm:grid-rows-2 '>
            <div className={`w-full flex items-center justify-center`}>
              <Noun data={data} className='h-[300px] w-auto' />
            </div>
            <div className='w-full flex flex-col gap-3 rounded-lg text-3xl bg-nouns-pastel '>
              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  disabled={data.background === 0}
                  className='text-[#594440]'
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      background: prev.background - 1,
                    }))
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>
                  Background
                </h3>
                <button
                  disabled={data.background === 1}
                  className='text-[#594440]'
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      background: prev.background + 1,
                    }))
                  }
                >
                  {'>'}
                </button>
              </div>

              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  className='text-[#594440]'
                  disabled={data.glasses === 0}
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      glasses: prev.glasses - 1,
                    }))
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>Glasses</h3>
                <button
                  disabled={data.glasses === 20}
                  className='text-[#594440]'
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      glasses: prev.glasses + 1,
                    }))
                  }
                >
                  {'>'}
                </button>
              </div>
              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  disabled={data.body === 0}
                  className='text-[#594440]'
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      body: prev.body - 1,
                    }))
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>Body</h3>
                <button
                  disabled={data.body === 20}
                  className='text-[#594440]'
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      body: prev.body + 1,
                    }))
                  }
                >
                  {'>'}
                </button>
              </div>
              <div className='grid grid-cols-2 pt-5'>
                <div>
                  <h1 className='text-[#594440]'>Powered by</h1>
                  <img src='/powered.svg' alt='powered' />
                </div>
                <button
                  className={cn(
                    'w-full p-4 cursor-pointer flex flex-grow flex-row gap-4 items-center justify-center text-[#594440] border-4 border-[#C0ABA7]'
                  )}
                  onClick={handleCreate}
                >
                  Create
                  <img src='save.svg' alt='save' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { PGAvatar };
