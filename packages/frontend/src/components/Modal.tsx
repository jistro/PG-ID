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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-white p-6 rounded-lg shadow-lg relative'
      >
        <div className='flex flex-row justify-between items-center'>
          <h2>{title}</h2>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-lg font-semibold'
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
