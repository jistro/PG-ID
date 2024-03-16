import React from 'react';

function Stats() {
  return (
    <div className='stats w-full flex flex-col gap-4 h-full'>
      <div className=' flex h-full  flex-col p-4 border-2 border-[#594440]'>
        <span>RPGF rewards</span>
        <p>10</p>
        <span>Donation rewards</span>
        <p>25</p>
      </div>
      <button className='border-2 p-4 border-[#594440] w-full'>
        Update impact
      </button>
    </div>
  );
}

export { Stats };
