'use client';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import Nouns from '@/assets/images/Nouns.svg';
import { useReadUserData } from '@/hooks/useReadUserData';
import { useGetAvatar } from '@/hooks/useGetAvatar';
import { Noun } from '../Nouns';

function User({ data }: { data: any }) {
  const { data: avatar } = useGetAvatar();
  const head = useMemo(() => {
    if (!data) return 50;
    if (Number(data.level) === 0) return 50;
    if (Number(data.level) === 1) return 51;
    if (Number(data.level) === 2) return 52;
    if (Number(data.level) === 3) return 53;
    return 50;
  }, [data]);
  return (
    <div className='max-h-full overflow-hidden text-xl text-[#594440] user flex flex-row gap-4 w-full'>
      <Noun
        data={{
          body: avatar.body,
          glasses: avatar.glasses,
          background: avatar.background,
          head: head as number,
        }}
        className='h-full w-fit'
      />
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4 items-center'>
          <span>Verified</span>
          <img className='w-8' src='/verified.svg'></img>
        </div>
        <p>
          <span className='text-[#594440]'>
            {((data.username as string) ?? 'Luuk.id').split('.')[0]}
          </span>
          <span className='text-[#C0ABA7]'>.pg.id</span>
        </p>
        <div className='bg-[#C0ABA7] text-white my-2 w-[83px] h-[52px] items-center flex justify-center'>
          <p>
            <span>Level:</span> {Number(data.level)}
          </p>
        </div>
        <p className='text-[#C0ABA7]'>
          PG Points:{' '}
          <span className='text-[#594440]'>{Number(data.points)}</span>
        </p>
        <p className='text-[#C0ABA7]'>
          Points till next level: <span className='text-[#594440]'>40</span>
        </p>
      </div>
    </div>
  );
}

export { User };
