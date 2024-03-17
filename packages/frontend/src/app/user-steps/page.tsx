'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useReadUserData } from '@/hooks/useReadUserData';
function StepOne() {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/step-two');
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='h-screen flex justify-center items-center relative'
      onClick={handleNextStep}
      style={{ cursor: 'pointer' }}
    >
      <div className='dashboard p-6 gap-4 w-[970px]  h-[870px] bg-nouns-pastel relative'>
        <div className='absolute z-10 inset-0 bg-black opacity-70 backdrop-filter backdrop-blur-3xl'></div>
        <div className='relative z-20 border-2 bg-white border-white text-center'>
          <User
            data={{
              username: 'Luuk.id',
              level: 0,
              points: 0,
            }}
          />
          <span className='text-white text-3xl absolute -bottom-32 left-24 right-0 text-center'>
            1. View your PG ID progress in the Profile Section.
          </span>
          <span className='text-white text-3xl absolute -bottom-56 left-32 right-0 text-center'>
            Level up by earning more{' '}
            <strong className='text-[#C0ABA7]'>PG Points </strong>and unlock
            additional perks.
          </span>
        </div>
        <span className='z-40 text-white text-3xl animate-pulse absolute bottom-5 w-full right-0 text-center'>
          {'~'} Click anywhere for next step {'~'}{' '}
        </span>

        <Stats />
        <Actions  level={0} />
      </div>
    </motion.main>
  );
}

export default StepOne;
