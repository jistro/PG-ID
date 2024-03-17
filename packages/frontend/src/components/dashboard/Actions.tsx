import React from "react";
import { Pay } from "./Pay";
import { Perk } from "./Perk";

function Actions() {
  return (
    <div className="h-full max-h-[400px] actions w-full text-xl">
      <div>
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
	<div >
		<button >
			<img src="/power.svg">
			</img>
		</button>
	</div>
      <div className="h-full w-full border-[#C0ABA7] border-[3.5px] p-4 flex flex-row ">
		<Pay />
		
		<Perk />
	  </div>
    </div>
  );
}

export { Actions };
