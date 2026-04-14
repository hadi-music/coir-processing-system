import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Settings, 
  Droplets, 
  MenuSquare, 
  Wind, 
  GripHorizontal,
  Box,
  Fingerprint,
  Activity,
  ArrowLeft
} from 'lucide-react';

const machines = [
  { id: 'pre-crusher', name: 'Pre-Crusher', power: '5.5–11kW', capacity: '2–5 TPH', function: 'Prevents drum clogging', price: '$2,500 – $6,000', icon: Zap },
  { id: 'defiberer', name: 'Double Drum Defiberer', power: '22–37kW', capacity: '1,500 kg/h', function: 'Core Extraction', price: '$12,000 – $22,000', icon: Settings },
  { id: 'washing-system', name: 'Washing System', power: 'EC Management', capacity: '< 0.5 mS/cm', function: 'Salt Leaching', price: '$4,000 – $9,000', icon: Droplets },
  { id: 'dewatering-press', name: 'Dewatering Press', power: '7.5–15kW', capacity: '80% to 55% Moisture', function: 'Critical Pre-Dryer step', price: '$7,000 – $16,000', icon: MenuSquare },
  { id: 'rotary-dryer', name: 'Rotary Dryer', power: 'Triple-pass', capacity: '15% Export Grade', function: 'Thermal Equilibrium', price: '$25,000 – $85,000', icon: Wind },
  { id: 'rotary-sieve', name: 'Rotary Sieve', power: 'Variable Mesh', capacity: 'Texture Uniformity', function: 'Grading', price: '$3,500 – $8,000', icon: GripHorizontal },
  { id: 'block-press', name: 'Hydraulic Block Press', power: '100–150 Ton', capacity: '5kg Bricks', function: '5:1 Compression', price: '$12,000 – $32,000', icon: Box }
];

function getEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1';
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1`;
  }
  return url;
}

function ValidationView({ machine, machineData, onBack }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0B4550] flex flex-col antialiased overflow-y-auto">
      {/* Validation Header */}
      <header className="sticky top-0 bg-[#F9F7F2] text-[#0B4550] border-b-[2px] border-[#1A1A1A] px-6 py-4 flex items-center justify-between z-50">
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 font-black font-mono uppercase tracking-widest hover:text-[#1A1A1A]/70 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to System Map</span>
        </button>
        <div className="font-mono font-black text-sm md:text-base uppercase tracking-widest hidden md:block">
          For Mr. H. Caballero
        </div>
      </header>

      {/* Main Validation Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 font-sans flex flex-col">
        <div className="bg-[#F9F7F2] border-[2px] border-[#1A1A1A] p-8 md:p-12 relative flex-1 flex flex-col">
          <div className="absolute top-0 right-0 py-2 px-4 bg-[#1A1A1A] text-[#E6FF2B] font-mono text-xs font-bold uppercase tracking-[0.2em] z-10 border-b-[2px] border-l-[2px] border-[#1A1A1A]">
            Validation Protocol: Active
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-none mb-10 mr-12 break-words">
            {machine.name} <br/> <span className="text-[#898A8D] text-3xl md:text-4xl">Technical Validation</span>
          </h2>

          {/* 2-Column Clinical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Left Col: High-contrast Image */}
            <div className="border-[2px] border-[#1A1A1A] bg-[#F4F4F4] aspect-video relative flex items-center justify-center overflow-hidden group">
              {machineData?.image && machineData.image.startsWith('http') ? (
                <img 
                  src={machineData.image} 
                  alt={`${machine.name} Technical Diagram`}
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply" 
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }}
                />
              ) : null}
              {/* Fallback Display if image errors or is missing */}
              <div 
                className="bg-[#F9F7F2] border-[2px] border-[#1A1A1A] px-6 py-4 inline-block z-10 text-center"
                style={{ display: (machineData?.image && machineData.image.startsWith('http')) ? 'none' : 'block' }}
              >
                <Fingerprint className="w-8 h-8 text-[#1A1A1A] mx-auto mb-2" />
                <p className="text-[#1A1A1A] font-mono text-sm font-bold uppercase tracking-widest">Image Placeholder</p>
              </div>
            </div>

            {/* Right Col: Video Player */}
            <div className="border-[2px] border-[#1A1A1A] bg-[#1A1A1A] aspect-video relative flex items-center justify-center overflow-hidden">
              {machineData?.video && machineData.video.startsWith('http') ? (
                <iframe 
                  src={getEmbedUrl(machineData.video)} 
                  className="w-full h-full grayscale brightness-75 contrast-125" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media; fullscreen" 
                  allowFullScreen
                  title={`${machine.name} Video`}
                />
              ) : (
                <div className="text-center w-full px-4">
                  <Activity className="w-12 h-12 text-[#E6FF2B] mx-auto mb-4 animate-pulse" />
                  <p className="text-[#E6FF2B] font-mono text-sm uppercase tracking-widest">Video Placeholder</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section - Full width monospace paragraph */}
          <div className="border-t-[2px] border-[#1A1A1A] pt-8 mt-auto">
            <h3 className="text-[#1A1A1A] font-black uppercase text-xl md:text-2xl mb-4 flex items-center gap-3">
              <Box className="w-6 h-6 text-[#1A1A1A]" /> Field Implementation Notes
            </h3>
            {machineData?.paragraph ? (
              <p className="text-[#1A1A1A] font-mono text-base lg:text-lg leading-relaxed tracking-tight max-w-5xl">
                {machineData.paragraph}
              </p>
            ) : (
              <p className="text-[#898A8D] font-mono text-sm leading-relaxed tracking-tight animate-pulse">
                Fetching field technical data via spreadsheet stream...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [sheetData, setSheetData] = useState({});
  const activeMachine = machines[activeIndex];

  useEffect(() => {
    // Using gviz for bulletproof CORS handling on public google sheets
    fetch('https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/gviz/tq?tqx=out:csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n').slice(1);
        const dataMap = {};
        
        const unquote = (str) => {
          if (!str) return '';
          let s = str.trim();
          if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
          return s.replace(/^["“”]/, '').replace(/["“”]$/, '').trim();
        };

        lines.forEach(line => {
          if (!line.trim()) return;
          const parts = line.split(',');
          const id = unquote(parts[0]);
          const image = unquote(parts[1]);
          const video = unquote(parts[2]);
          
          let paragraph = unquote(parts.slice(3).join(','));
          
          dataMap[id] = { image, video, paragraph };
        });
        setSheetData(dataMap);
      })
      .catch(err => console.error("Could not fetch sheet data:", err));
  }, []);

  if (isAcknowledged) {
    return <ValidationView 
      machine={activeMachine} 
      machineData={sheetData[activeMachine.id]} 
      onBack={() => setIsAcknowledged(false)} 
    />;
  }

  return (
    <div 
      className="min-h-screen p-6 md:p-12 lg:p-16 flex items-center justify-center font-sans" 
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[80vh]">
        
        {/* LEFT SIDE: STEPPER TIMELINE */}
        <div className="lg:col-span-4 lg:col-start-2 xl:col-start-1 xl:col-span-4 flex flex-col space-y-0 border-l-4 border-[#898A8D] ml-4 md:ml-0 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 lg:pr-6 relative">
          
          {/* Header for the Stepper */}
          <div className="mb-8 pl-8 py-4 sticky top-0 bg-[#0B4550] z-10 border-b-4 border-[#898A8D]">
            <h1 className="text-2xl font-black uppercase text-[#F4F4F4] tracking-tighter flex items-center gap-2">
              <Activity className="text-[#E6FF2B]" /> Industrial Archive
            </h1>
            <p className="text-[#898A8D] font-mono text-xs uppercase mt-2">
              System Operations / Process Map
            </p>
          </div>

          <div className="pb-8">
            {machines.map((machine, index) => {
              const isActive = index === activeIndex;
              const Icon = machine.icon;
              
              return (
                <div 
                  key={machine.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex items-center pl-8 py-6 cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-[#1A1A1A] w-[105%]' : 'hover:bg-[#0B4550]/80 w-full'
                  }`}
                >
                  {/* Square Node Element on the border-line */}
                  <div 
                    className={`absolute left-[-11px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] border-[2px] transition-colors duration-300 shadow-none ${
                      isActive 
                        ? 'bg-[#E6FF2B] border-[#1A1A1A] scale-125' 
                        : 'bg-[#0B4550] border-[#898A8D] group-hover:border-[#E6FF2B]'
                    }`}
                  />
                  
                  {/* Item Content Box */}
                  <div 
                    className={`flex-1 border-[2px] border-transparent p-4 transition-all duration-300 ${
                      isActive ? '!border-[#E6FF2B]' : 'group-hover:border-[#898A8D]'
                    }`}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="pr-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-mono" style={{ color: isActive ? '#F4F4F4' : '#898A8D' }}>
                          Node {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className={`text-lg md:text-xl font-bold uppercase tracking-tight leading-tight ${
                          isActive ? 'text-[#E6FF2B]' : 'text-[#F4F4F4]'
                        }`}>
                          {machine.name}
                        </h3>
                      </div>
                      <div className={`p-2 border-2 ${isActive ? 'bg-[#E6FF2B] border-[#1A1A1A]' : 'bg-transparent border-[#898A8D] group-hover:border-[#F4F4F4]'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#1A1A1A]' : 'text-[#898A8D] group-hover:text-[#F4F4F4]'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: DETAIL PANEL */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-center min-h-[600px] lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMachine.id}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} 
              className="w-full relative shadow-none h-full"
            >
              {/* Main Dossier Card */}
              <div 
                className="border-[2px] border-[#1A1A1A] flex flex-col overflow-hidden relative h-full"
                style={{ backgroundColor: '#F9F7F2' }}
              >
                
                {/* Tech Stamp Top Right */}
                <div className="absolute top-0 right-0 p-3 md:p-4 border-b-[2px] border-l-[2px] border-[#1A1A1A] bg-[#0000FF] z-10 flex items-center justify-center mix-blend-multiply">
                  <Fingerprint className="text-[#F9F7F2] w-6 h-6 mr-2 opacity-50" />
                  <span className="text-[#F9F7F2] font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                    DATA.REF.{activeMachine.id.substring(0,6).toUpperCase()}
                  </span>
                </div>

                {/* Header Section */}
                <div className="p-8 md:p-12 pb-8 border-b-[2px] border-[#1A1A1A] relative bg-[#F4F4F4]">
                  <div className="inline-flex items-center space-x-3 bg-[#E6FF2B] px-4 py-2 border-[2px] border-[#1A1A1A] mb-6">
                    <span className="w-2.5 h-2.5 bg-[#1A1A1A] animate-pulse"></span>
                    <span className="text-xs font-bold font-mono tracking-[0.1em] uppercase text-[#1A1A1A]">
                      Live Telemetry
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-[0.9] break-words">
                    {activeMachine.name}
                  </h2>
                </div>

                {/* Grid Data Display - Brutalist Table Structure */}
                <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1A1A1A] gap-[2px] flex-1">
                  
                  {/* Block 1 */}
                  <div className="bg-[#F9F7F2] p-8 md:p-10 flex flex-col justify-end min-h-[160px] hover:bg-white transition-colors">
                    <p className="text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Technical/Power
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                      {activeMachine.power}
                    </p>
                  </div>
                  
                  {/* Block 2 */}
                  <div className="bg-[#F9F7F2] p-8 md:p-10 flex flex-col justify-end min-h-[160px] hover:bg-white transition-colors">
                    <p className="text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Output/Capacity
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                      {activeMachine.capacity}
                    </p>
                  </div>

                  {/* Block 3 - Accent Block */}
                  <div className="bg-[#0000FF] p-8 md:p-10 flex flex-col justify-end min-h-[160px]">
                    <p className="text-xs font-bold text-[#F4F4F4]/70 uppercase tracking-widest mb-2 font-mono">
                      Primary Function
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#F4F4F4] uppercase tracking-tight selection:bg-[#E6FF2B] selection:text-[#1A1A1A]">
                      {activeMachine.function}
                    </p>
                  </div>

                  {/* Block 4 */}
                  <div className="bg-[#F9F7F2] p-8 md:p-10 flex flex-col justify-end min-h-[160px] hover:bg-[#E6FF2B]/20 transition-colors">
                    <p className="text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono">
                      Market Estimate
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                      {activeMachine.price}
                    </p>
                  </div>

                </div>

                {/* Footer/CTA */}
                <button 
                  onClick={() => setIsAcknowledged(true)}
                  className="w-full group cursor-pointer bg-[#E6FF2B] border-t-[2px] border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors duration-300 text-left outline-none active:bg-black mt-auto"
                >
                  <div className="px-8 py-6 md:px-12 md:py-8 flex justify-between items-center w-full">
                    <div>
                      <span className="block text-2xl md:text-4xl font-black uppercase text-[#1A1A1A] group-hover:text-[#E6FF2B] tracking-tighter transition-colors">
                        Acknowledge Specs
                      </span>
                      <span className="text-[#1A1A1A] group-hover:text-[#F4F4F4] font-mono text-xs uppercase tracking-widest mt-2 block transition-colors">
                        Proceed to Deployment Protocol
                      </span>
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 border-[2px] border-[#1A1A1A] group-hover:border-[#E6FF2B] flex items-center justify-center transition-colors">
                      <Zap className="text-[#1A1A1A] group-hover:text-[#E6FF2B] w-8 h-8 md:w-10 md:h-10 transition-colors" />
                    </div>
                  </div>
                </button>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0B4550;
          border-left: 2px solid #898A8D;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #898A8D;
          border: 2px solid #0B4550;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #E6FF2B;
        }
      `}} />
    </div>
  );
}
