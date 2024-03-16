import React from "react";

function Perk() {
  return (
	<div className="border-[3.4px]  w-[400px] h-[274px] text-2xl px-4 py-8 border-[#C0ABA7] text-[#594440]">
	 <h2 className=' text-[#94716B]'>Current Perk</h2>
	<span className="py-2">10%</span>
	<span  className="text-[#C0ABA7] "> Trading Fee Descount</span>
	<h2 className=' text-[#94716B] pt-8'>Lifetime Savings</h2>
	<span>$102.50</span>
	<div className="flex flex-row mt-8 gap-2 items-center" >
		<span className="text-xs">
			Powered by:
		</span>
		<img src="/uniswap.png"></img>
	</div>
  </div>
  );
}

export { Perk };
