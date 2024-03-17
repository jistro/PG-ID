import React, { useState } from 'react';

function Select({
  isActive,
  onToggle,
  placeholder,
  onSelectionChange,
}: {
  isActive: boolean;
  onToggle: () => void;
  placeholder: string;
  onSelectionChange: (value: string) => void;
}) {
  const [selectedLabel, setSelectedLabel] = useState<null | string>(null);
  const options = [
    { label: 'Climate', value: 'clima' },
    { label: 'Energy', value: 'energy' },
    { label: 'Art', value: 'art' },
  ];
  const handleSelect = (label: string, value: string) => {
    setSelectedLabel(label);
    onSelectionChange(value);
    onToggle();
  };
  return (
    <div className='relative'>
      <div
        className='flex p-4 w-full flex-grow gap-4  border-4 border-[#C0ABA7] hover:bg-[#C0ABA7] hover:border-[#594440] cursor-pointer'
        onClick={onToggle}
      >
        {selectedLabel ? (
          <h3 className=' font-thin text-3xl flex flex-grow text-[#594440]'>
            {selectedLabel}
          </h3>
        ) : (
          <h3 className=' font-thin text-3xl flex flex-grow text-[#5944403b]'>
            {placeholder}
          </h3>
        )}
        <img src='/drop.svg' alt='Icono de clima'></img>
      </div>
      {isActive && (
        <div className='absolute top-full z-10 left-0 w-full bg-white border border-[#C0ABA7] shadow-lg'>
          <div className='p-4 bg-[#594440]'>
            {options.map((option) => (
              <p
                key={option.value}
                className='cursor-pointer text-xl hover:bg-[#C0ABA7] py-2'
                onClick={() => handleSelect(option.label, option.value)}
              >
                {option.label}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { Select };
