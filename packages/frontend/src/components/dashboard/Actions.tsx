"use client";
import React from "react";
import { Pay } from "./Pay";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Perk } from "./Perk";

function Actions() {
	const { push } = useRouter();
	const { disconnect } = useDisconnect();
	const handleDisconnect = () => {
		disconnect();
		push('/');
	  };
  return (
    <div className="h-full max-h-[400px] actions w-full text-xl flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <button className="border-t-[3.4px] w-[110px] bg-[#C0ABA7] h-[72px] border-[#C0ABA7] border-x-[1.5px] text-[#594440]">
            <h3 className="text-white">Trade</h3>
          </button>
          <button className="border-t-[3.4px] w-[110px] h-[72px] border-[#C0ABA7] border-x-[1.5px] text-[#594440]">
            <h3>Sent</h3>
          </button>
          <button className="border-t-[3.4px] w-[110px] h-[72px] border-[#C0ABA7] border-x-[2.5px] text-[#594440]">
            <h3>Top Up</h3>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button  onClick={handleDisconnect}  className="border-t-[3.4px] flex items-center justify-center w-[110px] h-[72px] border-[#C0ABA7] border-x-[2.5px] text-[#594440]">
            <img src="/power.svg" alt="Power Button" />
          </button>
        </div>
      </div>
      <div className="h-full w-full border-[#C0ABA7] gap-2 border-[3.5px] p-4 flex flex-row ">
        <Pay />
        <Perk />
      </div>
    </div>
  );
}

export { Actions };
