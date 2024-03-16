import React from 'react';

function Stats() {
  return (
    <div className='stats w-full flex flex-col gap-4 h-full py-8 text-xl justify-center'>
      <div className=' flex h-full  text-[#94716B] flex-col p-4 border-[#C0ABA7] border-[3.5px]'>
	  <div className='flex flex-row items-center justify-between '>
        <span >RPGF rewards</span>
		<img className='w-8' src="/rgp.svg"></img>
      </div>
        <p className='text-[#594440] pb-5'>10</p>
        <span className=' text-[#94716B]'>Donation rewards</span>
		<p className='text-[#594440]'>25</p>
      </div>
      <button className='border-2 p-4 border-[#C0ABA7] border-[3.5px] text-[#594440] w-full'>
        Update impact
      </button>
    </div>
  );
}

export { Stats };
