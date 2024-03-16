import Image from 'next/image';
import React from 'react';
import Nouns from '@/assets/images/Nouns.svg';

function User() {
  return (
    <div className='max-h-full overflow-hidden user flex flex-row gap-4 w-full'>
      <Image className='h-full w-fit' src={Nouns} alt='nouns' />
      <div className='flex flex-col gap-4'>
        <span>Verified</span>
        <p>
          <span>Luuk</span>.pg.id
        </p>
        <div>
          <p>
            <span>Level:</span>2
          </p>
        </div>
        <p>
          PG Points: <span>35</span>
        </p>
        <p>
          Points till next level:: <span>40</span>
        </p>
      </div>
    </div>
  );
}

export { User };
