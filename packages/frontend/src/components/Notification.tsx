import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Notification({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 300, y: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-2 min-w-80 min-h-14 bg-nouns-pastel border-2 border-[#BFAAA6] '
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <h2 className='border-2 border-transparent border-b-[#594440] text-xl border-dashed pb-2 text-[#594440]'>
            {title}
          </h2>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Notification };
