'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';	
import { Pay } from '@/components/dashboard/Pay';
import { motion } from 'framer-motion';

function Levels() {
 
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='h-screen flex justify-center items-center relative'

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
          <div >hola
			
			sdfdsfsdf
			sdfsdkjfsdklfjsdfsdkjfdsfjksdfksd
			sdfsdfsdfdsfsdf</div>
        </div>
      

        <Actions level={0} />
      </div>
    </motion.main>
  );
}

export default Levels;
