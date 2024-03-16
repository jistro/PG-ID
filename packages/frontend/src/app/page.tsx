'use client';
import {
  DynamicConnectButton,
  useDynamicModals,
} from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

export default function Login() {
  const { isConnected } = useAccount();
  const { push } = useRouter();
  if (isConnected) {
    push('/dashboard');
  }
  return (
    <main className='h-screen'>
      <div className='flex flex-col items-center  mx-auto rounded-lg h-full sm:px-16  bg-transparent'>
        <div className='w-1/2 gap-4 h-full relative  bg-nouns-pastel'>
          <div className='rounded-lg  flex flex-col gap-4 p-6 bg-nouns-pastel'>
            <h2 className='font-sans text-start w-full  pb-4 mb-4 text-4xl text-[#594440] border-4 border-transparent border-dashed font-bold  border-b-[#C0ABA7]'>
              Log-In or Sign-Up
            </h2>
            <button className='flex  w-full flex-grow gap-4  p-4  border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] '>
              <img src='/email.svg'></img>
              <h3 className='font-thin text-3xl flex flex-grow text-[#594440]'>
                Email
              </h3>
            </button>
            <button className='flex  w-full flex-grow gap-4  p-4  border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] '>
              <img src='/phone.svg'></img>
              <h3 className='font-thin text-3xl flex flex-grow text-[#594440]'>
                Phone Number
              </h3>
            </button>
            <div
              suppressHydrationWarning
              className='flex  w-full flex-grow gap-4  p-4  border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] '
            >
              <DynamicConnectButton>
                <div className='flex flex-row gap-4'>
                  <img src='/wallet.svg'></img>
                  <h3 className='font-thin text-3xl flex flex-grow text-[#594440]'>
                    Connect Wallet
                  </h3>
                </div>
              </DynamicConnectButton>
            </div>
          </div>
          <div className='absolute bottom-6 left-6 grid grid-cols-2'>
            <div>
              <h1 className='text-2xl text-[#594440]'>Powered by</h1>
              <img src='/powered.svg'></img>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
