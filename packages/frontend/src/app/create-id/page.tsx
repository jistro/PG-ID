'use client'
import ArtButton from "@/components/Ar"
import ClimateButton from "@/components/Climate"
import InnovationButton from "@/components/Innovation"

export default function CreateIdPage() {

  return (
    <>
      <div className="flex flex-col items-center pt-8 mx-auto rounded-lg py-24 h-[900px] sm:px-16 bg-white">
        <div className="w-1/2 gap-4 py-24 bg-nouns-pastel">
          <h1 className="font-sans mx-12 text-4xl text-[#594440] border-4 pb-4 border-dashed font-bold border-b-[#C0ABA7]">
            Set-Up your PG ID
          </h1>
          <div className="gap-8 p-8 rounded-lg min-w-6xl bg-nouns-pastel">
            <h1 className='text-[#594440] text-3xl px-4'> Create your name</h1>
            <label className="flex p-4 w-full flex-grow gap-4 mt-2 mx-4 border-4 border-[#C0ABA7] mb-4 ">
              <input
                className="flex-grow w-full font-light bg-transparent text-2xl outline-none text-[#C0ABA7] rounded-xl"
                placeholder="yourname.pg.id"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                type="text"
              />
            </label>
            <h1 className='text-[#594440] text-3xl px-4'> Select your interests</h1>
            <ClimateButton />
			<InnovationButton />
			<ArtButton />
              <div className='flex flex-row gap-4 justify-between mt-8 mx-4'  >
              <button className="border-4 border-[#C0ABA7] flex flex-row items-center h-[72px] w-[170px] px-4">
				<img src="/cancel.svg"></img>
				<h3 className="w-[100px] w-full font-thin text-3xl flex flex-grow text-[#594440]">
                  Cancel
                </h3>
			  </button>
			  <button className="border-4 border-[#C0ABA7] bg-[#C0ABA7] flex flex-row items-center h-[72px] w-[170px] px-4">
				<h3 className="w-[100px] w-full  font-thin text-3xl flex flex-grow text-white">
                  Continue
                </h3>
				<img src="/next.svg"></img>
			  </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
