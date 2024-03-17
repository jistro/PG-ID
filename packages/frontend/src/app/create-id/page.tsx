'use client';
import { PGAvatar } from '@/components/register/PGAvatar';
import { UserData } from '@/components/register/UserData';
import { useGetAvatar } from '@/hooks/useGetAvatar';
import { useReadUserData } from '@/hooks/useReadUserData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const { push } = useRouter();
  const [step, setStep] = useState(0);
  const { isLoading, data } = useReadUserData();
  const { data: avatar } = useGetAvatar();
  useEffect(() => {
    if (data.username) setStep(1);
  }, [data]);

  if (isLoading)
    return (
      <div className='min-h-screen w-full flex justify-center items-center'>
        Loading...
      </div>
    );

  return (
    <>
      {step === 0 && <UserData setStep={setStep} />}
      {step === 1 && <PGAvatar username={data.username as string} />}
    </>
  );
}

export default Page;
