'use client';
import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReadUserData } from '@/hooks/useReadUserData';
import { Modal } from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { useGetAvatar } from '@/hooks/useGetAvatar';
import {
  DynamicContext,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core';

function Page() {
  const { data, isLoading: userDataIsLoading } = useReadUserData();
  const { handleLogOut } = useDynamicContext();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { push } = useRouter();

  // const { data: avatar, isLoading } = useGetAvatar();+
  const [avatar, setAvatar] = useState({
    body: 0,
    glasses: 0,
    background: 0,
    head: 50,
  });
  useEffect(() => {
    if (localStorage.getItem('avatar')) {
      setAvatar(JSON.parse(localStorage.getItem('avatar') as string));
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDisconnect = async () => {
    disconnect();
    await handleLogOut();
    push('/');
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' h-screen flex z-40 justify-center items-center'
    >
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='Log out'
      >
        <p className=' text-[#594440] py-8'>
          Are you sure you want to log out?
        </p>
        <div className='flex flex-row gap-3  text-[#594440]'>
          <button
            className='flex items-center justify-center border-2 border-[#594440] py-8 w-full h-[20px]'
            onClick={() => setIsModalVisible(false)}
          >
            No
          </button>
          <button
            className='flex items-center bg-[#594440] text-nouns-pastel justify-center border-2 border-[#594440] py-8 w-full h-[20px]'
            onClick={handleDisconnect}
          >
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
