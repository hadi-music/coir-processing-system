import React from 'react';
import ProcessMap from './ProcessMap';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0B4550] flex flex-col antialiased">
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2] text-[#0B4550] border-b-[4px] border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <div className="font-mono font-black text-sm md:text-base uppercase tracking-widest">
          For Mr. H. Caballero
        </div>
        <div className="w-3 h-3 bg-[#E6FF2B] border-2 border-[#1A1A1A] shadow-none"></div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 mt-[60px]">
        <ProcessMap />
      </main>
    </div>
  );
}

export default App;
