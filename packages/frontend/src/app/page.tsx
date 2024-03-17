'use client';
import {
  DynamicConnectButton,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Notification } from '@/components/Notification';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const { push } = useRouter();
  const { handleLogOut, isAuthenticated } = useDynamicContext();
  useEffect(() => {
    handleLogOut();
  }, []);
  if (isAuthenticated) push('/dashboard');
  return (
    <main className='h-screen'>
      <div className='flex flex-col items-center  mx-auto rounded-lg h-full sm:px-16  bg-transparent'>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-1/2 gap-4 h-[750px] relative  mt-8  px-8	 bg-nouns-pastel sombra '
        >
          <h2 className='font-sans text-start w-full  py-8 mb-4 text-4xl text-[#594440] border-4 border-transparent border-dashed font-bold  border-b-[#C0ABA7]'>
            Welcome to PD ID
          </h2>
          <div className='py-8'>
            <span className='text-[#C0ABA7] text-3xl'>
              PG ID is a personalized Smart Account Wallet that tracks
              contributions to Digital Public Goods and rewards unique users
              based on their progress.
            </span>
          </div>
          <div className='flex flex-row gap-4 justify-center '>
            <div className='border-4 flex items-center py-8   flex-col justify-center w-full h-full border-[#C0ABA7]'>
              <Link href='/user-steps' className='hover:animate-pulse'>
                <img src='/new.svg'></img>
                <div className='flex items-center py-8 text-xl justify-center flex-col'>
                  <span className='text-[#C0ABA7]'>I{"'"}m new here</span>
                  <span className='text-[#594440]'>Show me around ={')'}</span>
                </div>
              </Link>
            </div>
            <div className='border-4 w-full py-8 flex items-center flex-col h-full border-[#C0ABA7]'>
              <DynamicConnectButton>
                <img src='/expert.svg'></img>
                <div className='flex items-center py-8 text-xl justify-center flex-col'>
                  <span className='text-[#C0ABA7]'>
                    I know what I{"'"}m doing
                  </span>
                  <span className='text-[#594440]'>Launch the Dapp!</span>
                </div>
              </DynamicConnectButton>
            </div>
          </div>
        </motion.div>
      </div>
      <Notification title='Helloo!'>
        <p className='text-[#594440]'>Select an option to start the journey!</p>
      </Notification>
    </main>
  );
}
