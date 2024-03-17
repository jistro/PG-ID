'use client';
import { useSwap } from '@/hooks/useSwap';
import React, { useMemo, useState } from 'react';

function Pay({ level }: { level: number }) {
  const [value, setValue] = useState(0);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setValue(0);
    setValue(parseFloat(e.target.value));
  };
  const { swap } = useSwap();
  const operator = useMemo(() => {
    if (!level) return 0.9;
    if (Number(level) === 1) return 0.9;
    if (Number(level) === 2) return 0.95;
    if (Number(level) === 3) return 0.98;
    return 0.9
  }, [level]);
  const handleSwap = async () => {
    await swap(value.toString());
  };
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
              onChange={handleChangeValue}
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
              disabled
              value={value * (operator as number)}
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
        <button onClick={handleSwap} className='bg-[#C0ABA7] h-[72px]'>
          Swap
        </button>
      </div>
    </>
  );
}

export { Pay };
