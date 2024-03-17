'use client';
import { PGAvatar } from '@/components/register/PGAvatar';
import { UserData } from '@/components/register/UserData';
import { useState } from 'react';

function Page() {
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 0 && <UserData setStep={setStep} />}
      {step === 1 && <PGAvatar />}
    </>
  );
}

export default Page;
