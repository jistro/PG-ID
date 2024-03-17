'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Pay } from '@/components/dashboard/Pay';
import { motion } from 'framer-motion';

function StepThree() {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/step-four');
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
        <div className='relative z-20 border-2 bg-white border-white text-center h-[280px] overflow-hidden'>
          <Pay level={0} />
        </div>
        <span className='z-10 text-white text-3xl animate-pulse absolute top-10 w-full right-0 text-center'>
          {'~'} Click anywhere for next step {'~'}{' '}
        </span>
        <div className='absolute center z-40 gap-16 '>
          <span className='  text-white text-3xl    w-full text-center'>
            3. Based on your PG Level, you receive perks and discounts in our
            solutions.
            <br />
            <br />
          </span>
          <span className='  text-white text-3xl    w-full  text-center'>
            Benefit from reduced trading swap fees on Token Swaps.
          </span>
        </div>

        <Actions level={0} />
      </div>
    </motion.main>
  );
}

export default StepThree;
