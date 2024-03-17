'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function StepFive() {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/');
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
        <div className='relative z-20  border-2 bg-white/10 border-white overflow-hidden w-[200px] right-0 bottom-80 left-[400px]'>
          <div className='bg-[#94716B] p-4  flex flex-wrap text-xl items-center '>
            {' '}
            Launch Dapp
            <img src='/next.svg'></img>
          </div>
        </div>
        <div className='absolute z-10 m-64 gap-16 '>
          <span className='  text-white text-3xl w-full text-center'>
            Now your ready to enjoy all that PG ID has to offer.
            <br />
            <br />
          </span>
          <span className='  text-white text-3xl    w-full  text-center'>
            Good Luck!
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

export default StepFive;
