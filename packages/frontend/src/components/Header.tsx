'use client'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import React from 'react';

function Header() {
  return (
    <nav className='flex justify-between items-center gap-5 p-5 bg-gray-300 border-b-2 border-gray-600'>
      <p className='text-black text-bold'>PG-ID</p>
      <DynamicWidget />
    </nav>
  );
}

export { Header };
