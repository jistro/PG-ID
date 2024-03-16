'use client';
import React, { useState } from 'react';

const ArtButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <div
        className='flex p-4 w-full flex-grow gap-4  border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] cursor-pointer'
        onClick={toggleDropdown}
      >
        <h3 className='w-[100px] font-thin text-3xl flex flex-grow text-[#594440]'>
          Art
        </h3>
        <img src='/drop.svg' alt='Icono de clima'></img>
      </div>
      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-white border border-[#C0ABA7] shadow-lg'>
          <div className='p-4 bg-[#594440]'>
            <p
              className='cursor-pointer text-xl hover:bg-[#C0ABA7] py-2'
            >
              Emisiones
            </p>
            <p
              className='cursor-pointer text-xl hover:bg-[#C0ABA7] py-2'
            >
              Energía
            </p>
            <p
              className='cursor-pointer text-xl hover:bg-[#C0ABA7] py-2'
            >
              Reforestación
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtButton;
