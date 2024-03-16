'use client';
import { DynamicConnectButton, useDynamicModals } from '@dynamic-labs/sdk-react-core';

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center  pt-8 mx-auto rounded-lg py-32 h-[900px] sm:px-16  bg-white">
        <div className="w-1/2 gap-4 py-24 bg-nouns-pastel">
          <h1 className="font-sans mx-12  text-4xl text-[#594440] border-4 pb-4 border-dashed font-bold  border-b-[#C0ABA7]">
            Log-In or Sign-Up
          </h1>
          <div className="gap-8 p-8 rounded-lg min-w-6xl bg-nouns-pastel">
            <button className="flex   w-full flex-grow gap-4 my-4 p-4 mx-4 border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] ">
              <img src="/email.svg"></img>
			  <h3 className="w-[100px] font-thin text-3xl flex flex-grow text-[#594440]">Email</h3>
            </button>
            <button className="flex p-4  w-full flex-grow gap-4 mt-2  mx-4 border-4 border-[#C0ABA7]  hover:bg-[#C0ABA7] hover:border-[#594440] ">
              <img src="/phone.svg"></img>
              <h3 className="w-[100px] font-thin text-3xl flex flex-grow text-[#594440]">
                Phone Number
              </h3>
            </button>
			<div suppressHydrationWarning className="flex p-4 w-full flex-grow gap-4 my-4 mx-4 border-4 border-[#C0ABA7]  hover:bg-[#C0ABA7] hover:border-[#594440] ">
			<DynamicConnectButton >
				<div className='flex flex-row gap-4' >
				<img src="/wallet.svg"></img>
              <h3 className="w-[100px] w-full font-thin text-3xl flex flex-grow text-[#594440]">
                Connect Wallet
              </h3>
				</div>
            </DynamicConnectButton>
            </div>
            <div className="grid grid-cols-2 px-4 mt-16">
              <div>
                <h1 className="text-2xl text-[#594440]">Powered by</h1>
                <img src="/powered.svg"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
