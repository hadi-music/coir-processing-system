import React from 'react';

export default function HomeView({ setCurrentView }) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 space-y-6 max-w-4xl mx-auto min-h-[70vh]">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#F9F7F2] uppercase tracking-[0.3em] mb-12 text-center leading-tight">
        For <br /> Mr. H. Caballero
      </h1>
      <button 
        onClick={() => setCurrentView('MACHINES')}
        className="w-full bg-[#E6FF2B] text-[#1A1A1A] border-[2px] border-[#0B4550] py-8 px-6 text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest hover:bg-[#0B4550] hover:text-[#E6FF2B] transition-colors duration-300"
      >
        MACHINES
      </button>

      <button 
        onClick={() => setCurrentView('WAREHOUSE')}
        className="w-full bg-[#E6FF2B] text-[#1A1A1A] border-[2px] border-[#0B4550] py-8 px-6 text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest hover:bg-[#0B4550] hover:text-[#E6FF2B] transition-colors duration-300"
      >
        WAREHOUSE
      </button>

      <button 
        onClick={() => setCurrentView('LOCATION')}
        className="w-full bg-[#E6FF2B] text-[#1A1A1A] border-[2px] border-[#0B4550] py-8 px-6 text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest hover:bg-[#0B4550] hover:text-[#E6FF2B] transition-colors duration-300"
      >
        LOCATION
      </button>
    </div>
  );
}
