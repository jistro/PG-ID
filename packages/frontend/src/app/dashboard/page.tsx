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
      if (
        JSON.parse(localStorage.getItem('avatar') as string).address === address
      ) {
        setAvatar(JSON.parse(localStorage.getItem('avatar') as string));
      } else {
        push('/create-id');
      }
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (userDataIsLoading) return;
    if (!data.username) {
      push('/create-id');
    }
  }, [data, avatar]);

  const handleDisconnect = async () => {
    disconnect();
    await handleLogOut();
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
