'use client'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <DynamicWidget />
    </main>
  );
}
