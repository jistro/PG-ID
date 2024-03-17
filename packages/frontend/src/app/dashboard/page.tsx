'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReadUserData } from '@/hooks/useReadUserData';
import { Modal } from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { useDisconnect } from 'wagmi';

function Page() {
  const { data } = useReadUserData();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { push } = useRouter();
  const { disconnect } = useDisconnect();
  const handleDisconnect = () => {
    disconnect();
    push('/');
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' h-screen flex justify-center items-center'
    >
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='Log out'
      >
        <p>Are you sure you want to log out?</p>
        <div>
          <button
            className='p-6 w-full h-full'
            onClick={() => setIsModalVisible(false)}
          >
            No
          </button>
          <button className='p-6 w-full h-full' onClick={handleDisconnect}>
            Yes
          </button>
        </div>
      </Modal>
      <div className='dashboard p-6 gap-4 w-[970px] h-[870px] bg-nouns-pastel'>
        <User data={data} />
        <Stats />
        <Actions
          setIsOpenModal={setIsModalVisible}
          level={data.level as number}
        />
      </div>
    </motion.main>
  );
}

export default Page;
