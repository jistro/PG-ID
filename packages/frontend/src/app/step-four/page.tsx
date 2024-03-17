'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Perk } from '@/components/dashboard/Perk';
import { motion } from 'framer-motion';

function StepFour() {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/step-five');
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='h-screen flex justify-center items-center relative'
      onClick={handleNextStep}
      style={{ cursor: 'pointer' }}
    >
      {' '}
      <div className='dashboard p-6 gap-4 w-[970px]  h-[870px] bg-nouns-pastel relative'>
        <div className='absolute z-10 inset-0 bg-black opacity-70 backdrop-filter backdrop-blur-3xl' />
        <User
          data={{
            username: 'Luuk.id',
            level: 0,
            points: 0,
          }}
        />
        <Stats />
        <div className='relative z-20  border-2 bg-white border-white overflow-hidden w-[405px] right-0 bottom-48 left-[525px]'>
          <Perk />
        </div>
        <div className='absolute z-10 m-40 gap-16 '>
          <span className='  text-white text-3xl w-full text-center'>
            4. View your total lifetime savings in the benefits section.
            <br />
            <br />
          </span>
          <span className='  text-white text-3xl    w-full  text-center'>
            As you contribute more to Public Goods, you will gain better perks
            and save more.
          </span>
        </div>
        <span className='z-40 text-white text-3xl animate-pulse absolute bottom-5 w-full right-0 text-center'>
          {'~'} Click anywhere for next step {'~'}{' '}
        </span>
        <Actions level={0} />

      </div>
    </motion.main>
  );
}

export default StepFour;
