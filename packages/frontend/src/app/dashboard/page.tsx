import { Stats, User } from '@/components';
import { Actions } from '@/components/dashboard/Actions';
import React from 'react';

function Page() {
  return (
    <main className=' flex justify-center items-center'>
      <div className='dashboard p-6 gap-4 w-[970px] h-[870px] bg-nouns-pastel'>
        <User />
        <Stats />
        <Actions />
      </div>
    </main>
  );
}

export default Page;