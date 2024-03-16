"use client";

import React, { useState, useEffect, useRef } from "react";
import cn from "clsx";

const background: string[] = ["bg1.svg", "bg2.svg"];
const body: string[] = ["body1.svg", "body2.svg", "body3.svg", "body4.svg"];
const glasses: string[] = [
  "glasses1.svg",
  "glasses2.svg",
  "glasses3.svg",
  "glasses4.svg",
];
const lvl: string[] = ["lvl1.svg", "lvl2.svg", "lvl3.svg", "lvl4.svg"];

const Mint: React.FC = () => {
  const [selectedBackground, setBackground] = useState<string>("");
  const [selectedBody, setBody] = useState<string>("");
  const [selectedGlasses, setGlasses] = useState<string>("");
  const [selectedLvl, setLvl] = useState<string>("");
  const [isNFTminting, setNFTminting] = useState<boolean>(false);

  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  const [bodyIndex, setBodyIndex] = useState<number>(0);
  const [glassesIndex, setGlassesIndex] = useState<number>(0);
  const [lvlIndex, setLvlIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (
      selectedBackground &&
      selectedBody &&
      selectedGlasses &&
      ctx
    ) {
      const backgroundImage: HTMLImageElement = new Image();
      backgroundImage.onload = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          backgroundImage,
          0,
          0,
          canvas.width,
          canvas.height
        );
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
      <div className="flex flex-col items-center   mx-auto rounded-lg sm:mx-[200px]    bg-transparent">
        <div className="flex flex-col py-8 bg-nouns-pastel w-[548px]  ">
		<h2 className="font-sans text-4xl text-[#594440] border-4 border-dashed font-bold text-center border-b-[#C0ABA7]">
            Create your PG ID Avatar
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-rows-2 h-[800px] bg-nouns-pastel">
          <div
            className={`w-full p-8 flex items-center justify-center  bg-white/50 ${
              selectedBackground &&
              selectedBody &&
              selectedGlasses &&
              selectedLvl &&
              "bg-white/50"
            }`}
          >
            <canvas ref={canvasRef} width={400} height={400} />
          </div>
          <div className="w-full gap-8 p-2 rounded-lg text-3xl bg-nouns-pastel ">
		  <div className="flex items-center w-[500px] h-[60px] flex-grow gap-32 my-4 justify-center p-1 mx-4 border-4 border-[#C0ABA7] ">
              <button
                className="text-[#594440]"
                onClick={() =>
                  setBackground(
                    prevImage(backgroundIndex, setBackgroundIndex, background)
                  )
                }
              >
                {"<"}
              </button>
              <h3 className="w-[100px] font-thin text-[#594440]">Background</h3>
              <button
                className="text-[#594440]"
                onClick={() =>
                  setBackground(
                    nextImage(backgroundIndex, setBackgroundIndex, background)
                  )
                }
              >
                {">"}
              </button>
            </div>
           
            <div className="flex items-center w-[500px] h-[60px] flex-grow gap-32 my-4 justify-center p-1 mx-4 border-4 border-[#C0ABA7] ">
              <button
                className="text-[#594440]"
                onClick={() =>
                  setGlasses(prevImage(glassesIndex, setGlassesIndex, glasses))
                }
              >
                {"<"}
              </button>
              <h3 className="w-[100px] font-thin text-[#594440]">Glasses</h3>
              <button
                className="text-[#594440]"
                onClick={() =>
                  setGlasses(nextImage(glassesIndex, setGlassesIndex, glasses))
                }
              >
                {">"}
              </button>
            </div>
            <div className="flex items-center w-[500px] h-[60px] flex-grow gap-32 my-4 justify-center p-1 mx-4 border-4 border-[#C0ABA7] ">
              <button
                className="text-[#594440]"
                onClick={() =>
                  setBody(prevImage(bodyIndex, setBodyIndex, body))
                }
              >
                {"<"}
              </button>
              <h3 className="w-[100px] font-thin text-[#594440]">Body</h3>
              <button
                className="text-[#594440]"
                onClick={() =>
                  setBody(nextImage(bodyIndex, setBodyIndex, body))
                }
              >
                {">"}
              </button>
            </div>
            <div className="grid grid-cols-2 px-8 mt-8">
              <div>
                <h1 className="text-[#594440]">Powered by</h1>
                <img src="/powered.svg" alt="powered" />
              </div>
              <button
                disabled={isNFTminting}
                className={cn(
                  "w-full py-2 mt-2 cursor-pointer flex flex-grow flex-row gap-4 items-center justify-center text-[#594440] border-4 border-[#C0ABA7]",
                  selectedBackground &&
                    selectedBody &&
                    selectedGlasses
                    ? ""
                    : "opacity-0 pointer-events-none"
                )}
              >
                {isNFTminting ? "Saving.." : "Save"}
                <img src="save.svg" alt="save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
