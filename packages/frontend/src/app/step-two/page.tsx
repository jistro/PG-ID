"use client";
import { Stats, User } from "@/components";
import { Actions } from "@/components/dashboard/Actions";
import React from "react";
import { useRouter } from "next/navigation";

function StepTwo() {
  const router = useRouter();

  const handleNextStep = () => {
    router.push("/step-three");
  };
  return (
    <main
      className="h-screen flex justify-center items-center relative"
      onClick={handleNextStep}
      style={{ cursor: "pointer" }}
    >
      {" "}
      <div className="dashboard p-6 gap-4 w-[970px]  h-[870px] bg-nouns-pastel relative">
        <div className="absolute z-10 inset-0 bg-black opacity-70 backdrop-filter backdrop-blur-3xl" />
        <User />
        <div className="relative z-20 border-2 bg-white border-white text-center">
          <Stats />
        </div>
        <div className="absolute center z-40 gap-16 ">
          <span className="  text-white text-3xl    w-full text-center">
            2. Your contributions to{" "}
            <strong className="text-[#C0ABA7]">Digital Public </strong> are
            rewarded with PG Points.
			<br/>
			<br/>
          </span>
          <span className="  text-white text-3xl    w-full  text-center">
            Get rewarded by <strong className="text-[#C0ABA7]">RPGF </strong>
            programs or donate to increase your score. additional perks.
          </span>
        </div>
        <span className="z-40 text-white text-3xl animate-pulse absolute bottom-5 w-full right-0 text-center">
          {"~"} Click anywhere for next step {"~"}{" "}
        </span>

        <Actions />
      </div>
    </main>
  );
}

export default StepTwo;
