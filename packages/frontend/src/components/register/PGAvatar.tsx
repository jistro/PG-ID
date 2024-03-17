'use client';

import React, { useState, useEffect, useRef } from 'react';
import cn from 'clsx';

const background: string[] = ['bg1.svg', 'bg2.svg'];
const body: string[] = ['body1.svg', 'body2.svg', 'body3.svg', 'body4.svg'];
const glasses: string[] = [
  'glasses1.svg',
  'glasses2.svg',
  'glasses3.svg',
  'glasses4.svg',
];
const lvl: string[] = ['lvl1.svg', 'lvl2.svg', 'lvl3.svg', 'lvl4.svg'];

function PGAvatar({ username }: { username: string }) {
  const [selectedBackground, setBackground] = useState<string>(background[0]);
  const [selectedBody, setBody] = useState<string>(body[0]);
  const [selectedGlasses, setGlasses] = useState<string>(glasses[0]);
  const [selectedLvl, setLvl] = useState<string>('0');
  const [isNFTminting, setNFTminting] = useState<boolean>(false);

  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  const [bodyIndex, setBodyIndex] = useState<number>(0);
  const [glassesIndex, setGlassesIndex] = useState<number>(0);
  const [lvlIndex, setLvlIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 300 });
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (container && canvas) {
      // Inicializa el ResizeObserver
      const observer = new ResizeObserver((entries) => {
        const { width } = entries[0].contentRect;
        setCanvasSize({ width, height: 300 }); // Ajusta la altura según necesites
      });
      observer.observe(container);

      // Limpieza al desmontar el componente
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx) {
      const backgroundImage: HTMLImageElement = new Image();
      backgroundImage.onload = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        const bodyImage: HTMLImageElement = new Image();
        bodyImage.onload = () => {
          if (!ctx) return;
          ctx.drawImage(bodyImage, 0, 0, canvas.width, canvas.height);
        };
        bodyImage.src = selectedBody;

        const lvlImage: HTMLImageElement = new Image();
        lvlImage.onload = () => {
          if (!ctx) return;
          ctx.drawImage(lvlImage, 0, 0, canvas.width, canvas.height);
        };
        lvlImage.src = selectedLvl;

        const glassesImage: HTMLImageElement = new Image();
        glassesImage.onload = () => {
          if (!ctx) return;
          ctx.drawImage(glassesImage, 0, 0, canvas.width, canvas.height);
        };
        glassesImage.src = selectedGlasses;
      };
      backgroundImage.src = selectedBackground;
    }
  }, [selectedBackground, selectedBody, selectedGlasses, selectedLvl]);

  const prevImage = (
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    array: string[]
  ): string => {
    const newIndex: number = index === 0 ? array.length - 1 : index - 1;
    setIndex(newIndex);
    return array[newIndex];
  };

  const nextImage = (
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    array: string[]
  ): string => {
    const newIndex: number = index === array.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    return array[newIndex];
  };

  return (
    <>
      <div className='flex flex-col items-center  h-screen  rounded-lg  bg-transparent'>
        <div className='flex flex-col gap-3 p-4 h-full   bg-nouns-pastel'>
          <div className='flex flex-col gap-1 w-full border-transparent border-b-[#C0ABA7]  pb-4 border-4 border-dashed'>
            <h2 className='font-sans text-start text-4xl text-[#594440] font-bold '>
              Create your PG ID Avatar
            </h2>
            <p className='text-xl text-[#C0ABA7]'>{username}</p>
          </div>
          <div className='grid gap-4 w-full sm:grid-rows-2 '>
            <div
              ref={containerRef} // Ajusta este ref al contenedor del canvas
              className={`w-full flex items-center justify-center`}
            >
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
              />
            </div>
            <div className='w-full flex flex-col gap-3 rounded-lg text-3xl bg-nouns-pastel '>
              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setBackground(
                      prevImage(backgroundIndex, setBackgroundIndex, background)
                    )
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>
                  Background
                </h3>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setBackground(
                      nextImage(backgroundIndex, setBackgroundIndex, background)
                    )
                  }
                >
                  {'>'}
                </button>
              </div>

              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setGlasses(
                      prevImage(glassesIndex, setGlassesIndex, glasses)
                    )
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>Glasses</h3>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setGlasses(
                      nextImage(glassesIndex, setGlassesIndex, glasses)
                    )
                  }
                >
                  {'>'}
                </button>
              </div>
              <div className='flex items-center w-full justify-between gap-32  p-4  border-4 border-[#C0ABA7] '>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setBody(prevImage(bodyIndex, setBodyIndex, body))
                  }
                >
                  {'<'}
                </button>
                <h3 className='w-[100px] font-thin text-[#594440]'>Body</h3>
                <button
                  className='text-[#594440]'
                  onClick={() =>
                    setBody(nextImage(bodyIndex, setBodyIndex, body))
                  }
                >
                  {'>'}
                </button>
              </div>
              <div className='grid grid-cols-2 pt-5'>
                <div>
                  <h1 className='text-[#594440]'>Powered by</h1>
                  <img src='/powered.svg' alt='powered' />
                </div>
                <button
                  disabled={isNFTminting}
                  className={cn(
                    'w-full p-4 cursor-pointer flex flex-grow flex-row gap-4 items-center justify-center text-[#594440] border-4 border-[#C0ABA7]',
                    selectedBackground && selectedBody && selectedGlasses
                      ? ''
                      : 'opacity-0 pointer-events-none'
                  )}
                >
                  {isNFTminting ? 'Saving..' : 'Save'}
                  <img src='save.svg' alt='save' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { PGAvatar };
