import React from 'react';
import { motion } from 'framer-motion';

function Modal({
  isVisible,
  onClose,
  children,
  title,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center'>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-nouns-pastel w-[590px] p-6 rounded-lg shadow-lg relative'
      >
        <div className='flex flex-row justify-between items-center'>
          <h2 className='font-sans text-4xl text-[#594440] border-4 pb-4 border-dashed font-bold border-b-[#C0ABA7] border-t-transparent border-r-transparent border-l-transparent '>{title}</h2>
          <button
            onClick={onClose}
            className='  text-2xl text-[#594440] top-2 right-2 font-semibold'
          >
            X
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export { Modal };
