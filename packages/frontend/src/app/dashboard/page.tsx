import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';
import { motion } from 'framer-motion';

function Page() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' h-screen flex justify-center items-center'
    >
      <div className='dashboard p-6 gap-4 w-[970px] h-[870px] bg-nouns-pastel'>
        <User />
        <Stats />
        <Actions />
      </div>
    </motion.main>
  );
}

export default Page;
