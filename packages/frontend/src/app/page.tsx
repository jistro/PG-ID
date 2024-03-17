'use client';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import {
	DynamicConnectButton,
	useDynamicModals,
  } from '@dynamic-labs/sdk-react-core';
import Link from 'next/link';

export default function Home() {
	const { isConnected } = useAccount();
	const { push } = useRouter();
	if (isConnected) {
	  push('/dashboard');
	}
  return (
    <main className="h-screen">
      <div className="flex flex-col items-center  mx-auto rounded-lg h-full sm:px-16  bg-transparent">
        <div className="w-1/2 gap-4 h-[750px] relative  mt-8  px-8	 bg-nouns-pastel sombra ">
          <h2 className="font-sans text-start w-full  py-8 mb-4 text-4xl text-[#594440] border-4 border-transparent border-dashed font-bold  border-b-[#C0ABA7]">
            Welcome to PD ID
          </h2>
		  <div className="py-8">

          <span className="text-[#C0ABA7] text-3xl">
            PG ID is a personalized Smart Account Wallet that tracks
            contributions to Digital Public Goods and rewards unique users based
            on their progress.
          </span>
		  </div>
          <div className="flex flex-row gap-4 justify-center ">

            <div className="border-4 flex items-center py-8   flex-col justify-center w-full h-full border-[#C0ABA7]">
			<Link href="/user-steps" className="hover:animate-pulse">
              <img src="/new.svg"></img>
              <div className="flex items-center py-8 text-xl justify-center flex-col">
                <span className="text-[#C0ABA7]">I{"'"}m new here</span>
                <span className="text-[#594440]">Show me around ={")"}</span>
              </div>
			  </Link>
            </div>
            <div className="border-4 w-full py-8 flex items-center flex-col h-full border-[#C0ABA7]">
			<Link href="/" className="hover:animate-pulse">
			<DynamicConnectButton>
              <img src="/expert.svg"></img>
              <div className="flex items-center py-8 text-xl justify-center flex-col">
                <span className="text-[#C0ABA7]">I know what I{"'"}m doing</span>
                <span className="text-[#594440]">Launch the Dapp!</span>
              </div>
				</DynamicConnectButton>
			</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
