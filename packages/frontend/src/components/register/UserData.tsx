'use client';
import { Select } from '@/components/register/Select';
import { useCreatePGID } from '@/hooks/useCreatePGID';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccount } from 'wagmi';

function UserData({ setStep }: { setStep: (step: number) => void }) {
  const [activeButton, setActiveButton] = useState<null | string>(null);
  const { address } = useAccount();

  const [selections, setSelections] = useState({
    1: null,
    2: null,
    3: null,
  });
  const [userName, setUserName] = useState('');

  const { push } = useRouter();
  const { createPGID } = useCreatePGID();

  const handleSelectionChange = (key: number, value: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  const toggleButton = (buttonId: string) => {
    if (activeButton === buttonId) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonId);
    }
  };

  const handleContinue = async () => {
    if (!userName || !address) return;
    await createPGID(userName);
    setStep(1);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center rounded-lg     h-screen'>
        <div className='w-1/2 gap-4 p-8 sombra bg-nouns-pastel h-fit max-h-[90vh]'>
          <h3 className='font-sans text-4xl text-[#594440] border-4 pb-4 border-dashed font-bold border-b-[#C0ABA7]'>
            Set-Up your PG ID
          </h3>
          <div className='gap-4 p-8 flex flex-col rounded-lg  bg-nouns-pastel'>
            <h3 className='text-[#594440] text-3xl '> Create your name</h3>
            <label className='flex p-4 w-full flex-grow gap-4  border-4 border-[#C0ABA7] '>
              <input
                className='flex-grow w-full font-light bg-transparent text-2xl outline-none text-[#C0ABA7] rounded-xl'
                placeholder='yourname.pg.id'
                inputMode='decimal'
                autoComplete='off'
                autoCorrect='off'
                spellCheck='false'
                type='text'
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <h3 className='text-[#594440] text-3xl'>Select your interests</h3>
            <Select
              isActive={activeButton === 'climate'}
              onToggle={() => toggleButton('climate')}
              placeholder='Climate'
              onSelectionChange={(value) => handleSelectionChange(1, value)}
            />
            <Select
              isActive={activeButton === 'innovation'}
              onToggle={() => toggleButton('innovation')}
              placeholder='Innovation'
              onSelectionChange={(value) => handleSelectionChange(2, value)}
            />
            <Select
              isActive={activeButton === 'art'}
              onToggle={() => toggleButton('art')}
              placeholder='Art'
              onSelectionChange={(value) => handleSelectionChange(3, value)}
            />
            <div className='flex flex-row gap-4 justify-between '>
              <button
                onClick={() => push('/')}
                className='border-4 border-[#C0ABA7] flex flex-row items-center  p-4'
              >
                <img src='/cancel.svg'></img>
                <h3 className=' w-full font-thin text-3xl flex flex-grow text-[#594440]'>
                  Cancel
                </h3>
              </button>
              <button
                onClick={handleContinue}
                className='border-4 border-[#C0ABA7] bg-[#C0ABA7] flex flex-row items-center  p-4'
              >
                <h3 className=' w-full  font-thin text-3xl flex flex-grow text-white'>
                  Continue
                </h3>
                <img src='/next.svg'></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { UserData };
