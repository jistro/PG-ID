'use client';
import React, { useState } from 'react';

function Pay() {
  const [value, setValue] = useState(0);
  return (
    <>
      <div className='grid flex-col-2 gap-2  w-full'>
        <div className='border-2 p-8 border-[#C0ABA7] border-[3.5px] h-[130px] flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-[#C0ABA7] py-4 text-2xl'>You pay</h2>
            <input
              className='flex-grow w-full font-light bg-transparent text-3xl outline-none text-[#594440] rounded-xl'
              placeholder='0'
              inputMode='decimal'
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              type='text'
            />
          </div>
          <div className=''>
            <div className='flex flex-row items-center justify-center gap-2'>
              <h2 className='   text-[#594440]'>USDT</h2>
              <img src='/teter.png'></img>
            </div>
            <p className='text-[#C0ABA7]'>Balance: </p>
          </div>
        </div>
        <button className='flex items-center justify-center'>
          <img
            className='absolute flex items-center justify-center'
            src='/swap.svg'
          ></img>
        </button>
        <div className='border-2 p-8 border-[#C0ABA7] h-[130px] border-[3.5px] flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-[#C0ABA7] py-4 text-2xl'>You receive</h2>
            <input
              className='flex-grow w-full font-light bg-transparent text-3xl outline-none text-[#594440] rounded-xl'
              placeholder='0'
              inputMode='decimal'
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              type='text'
            />
          </div>
          <div className=''>
            <div className='flex flex-row items-center justify-center gap-2'>
              <h2 className='   text-[#594440]'>USDC</h2>
              <img src='/usdc.png'></img>
            </div>
            <p className='text-[#C0ABA7]'>Balance: </p>
          </div>
        </div>
        <button className='bg-[#C0ABA7] h-[72px]'>hola</button>
      </div>
    </>
  );
}

export { Pay };
