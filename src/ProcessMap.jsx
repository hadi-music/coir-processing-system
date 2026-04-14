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
      <header className="sticky top-0 bg-[#F9F7F2] text-[#0B4550] border-b-[2px] border-[#1A1A1A] px-4 md:px-6 py-4 flex items-center justify-between z-50">
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 font-black font-mono text-sm md:text-base uppercase tracking-widest hover:text-[#1A1A1A]/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Back</span>
        </button>
        <div className="font-mono font-black text-xs md:text-base uppercase tracking-widest">
          For Mr. H. Caballero
        </div>
      </header>

      {/* Main Validation Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-12 font-sans flex flex-col">
        <div className="bg-[#F9F7F2] border-[2px] border-[#1A1A1A] p-4 md:p-12 mb-4 relative flex-1 flex flex-col">
          
          {/* Header Section with Stacked Badges to prevent overlap */}
          <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-4 mb-6 md:mb-10 w-full">
            <div className="inline-flex items-center space-x-3 bg-[#E6FF2B] px-3 md:px-4 py-2 border-[2px] border-[#1A1A1A] self-start">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#1A1A1A] animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-[0.1em] uppercase text-[#1A1A1A]">
                Live Telemetry
              </span>
            </div>
            
            <div className="bg-[#1A1A1A] text-[#E6FF2B] py-2 px-3 md:px-4 border-[2px] border-[#1A1A1A] self-start font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              Data Ref: {machine.id.substring(0,6).toUpperCase()}
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-none mb-8 break-words">
            {machine.name} <br/> <span className="text-[#898A8D] text-lg md:text-3xl lg:text-4xl">Technical Validation</span>
          </h2>

          {/* 2-Column Clinical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10 w-full">
            {/* Image Placeholder */}
            <div className="border-[2px] border-[#1A1A1A] bg-[#F4F4F4] aspect-video relative flex items-center justify-center overflow-hidden w-full group mb-4 md:mb-0">
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
                className="bg-[#F9F7F2] border-[2px] border-[#1A1A1A] px-4 md:px-6 py-4 inline-block z-10 text-center mx-4"
                style={{ display: (machineData?.image && machineData.image.startsWith('http')) ? 'none' : 'block' }}
              >
                <Fingerprint className="w-6 h-6 md:w-8 md:h-8 text-[#1A1A1A] mx-auto mb-2" />
                <p className="text-[#1A1A1A] font-mono text-xs md:text-sm font-bold uppercase tracking-widest">Image Placeholder</p>
              </div>
            </div>

            {/* Video Player */}
            <div className="border-[2px] border-[#1A1A1A] bg-[#1A1A1A] aspect-video relative flex items-center justify-center overflow-hidden w-full mb-4 md:mb-0">
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
                  <Activity className="w-8 h-8 md:w-12 md:h-12 text-[#E6FF2B] mx-auto mb-4 animate-pulse" />
                  <p className="text-[#E6FF2B] font-mono text-xs md:text-sm uppercase tracking-widest">Video Placeholder</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t-[2px] border-[#1A1A1A] pt-6 md:pt-8 mt-auto w-full">
            <h3 className="text-[#1A1A1A] font-black uppercase text-lg md:text-2xl mb-4 flex items-center gap-3">
              <Box className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" /> Field Implementation Notes
            </h3>
            {machineData?.paragraph ? (
              <p className="text-[#1A1A1A] font-mono text-sm md:text-base lg:text-lg leading-relaxed tracking-tight max-w-5xl">
                {machineData.paragraph}
              </p>
            ) : (
              <p className="text-[#898A8D] font-mono text-xs md:text-sm leading-relaxed tracking-tight animate-pulse">
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
  const [isLoading, setIsLoading] = useState(true);
  const activeMachine = machines[activeIndex];

  useEffect(() => {
    // 1. Vite Environment Var check & explicit target conversion
    let url = import.meta.env.VITE_SHEET_URL || 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv';
    
    if (url.includes('/edit')) {
      url = url.split('/edit')[0] + '/export?format=csv';
    } else if (!url.includes('format=csv') && !url.includes('tqx=out:csv')) {
      url = 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv';
    }

    fetch(url)
      .then(res => res.text())
      .then(text => {
        console.log("Raw CSV Data fetched:", text); // 4. Debug output
        
        // Split with actual newline token (not escaped)
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
          // 2. Strict ID matching logic
          const id = unquote(parts[0]).toLowerCase().trim();
          const image = unquote(parts[1]);
          const video = unquote(parts[2]);
          let paragraph = unquote(parts.slice(3).join(','));
          dataMap[id] = { image, video, paragraph };
        });
        setSheetData(dataMap);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not fetch sheet data:", err);
        setIsLoading(false);
      });
  }, []);

  // 3. Conditional Syncing Archive view
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B4550] flex flex-col items-center justify-center font-sans">
        <div className="inline-flex items-center space-x-4 bg-[#E6FF2B] px-6 py-4 border-[2px] border-[#1A1A1A]">
          <span className="w-3 h-3 bg-[#1A1A1A] animate-pulse"></span>
          <span className="text-lg md:text-xl font-bold font-mono tracking-[0.2em] uppercase text-[#1A1A1A]">
            SYNCING ARCHIVE...
          </span>
        </div>
      </div>
    );
  }

  if (isAcknowledged) {
    return <ValidationView 
      machine={activeMachine} 
      machineData={sheetData[activeMachine.id.toLowerCase().trim()]} 
      onBack={() => setIsAcknowledged(false)} 
    />;
  }

  return (
    <div className="w-full flex items-center justify-center font-sans">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch lg:min-h-[80vh] p-2 md:p-6 lg:p-12">
        
        {/* STEPPER TIMELINE: Horizontal on Mobile, Vertical on Desktop */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto custom-scrollbar snap-x snap-mandatory lg:border-l-[2px] border-[#898A8D] mb-2 lg:mb-0 relative lg:pr-4 py-2 lg:py-0">
          
          <div className="hidden lg:block mb-6 pl-6 py-2 sticky top-0 bg-[#0B4550] z-10 border-b-[2px] border-[#898A8D]">
            <h1 className="text-xl font-black uppercase text-[#F4F4F4] tracking-tighter flex items-center gap-2">
              <Activity className="text-[#E6FF2B]" /> Process Map
            </h1>
          </div>

          <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 lg:pb-8 w-max lg:w-full px-2 lg:px-0">
            {machines.map((machine, index) => {
              const isActive = index === activeIndex;
              const Icon = machine.icon;
              
              return (
                <div 
                  key={machine.id}
                  onClick={() => setActiveIndex(index)}
                  className={`snap-center flex-shrink-0 w-[240px] lg:w-full group relative flex items-center lg:pl-6 py-2 md:py-4 cursor-pointer transition-all duration-300 ${
                    isActive ? 'lg:bg-[#1A1A1A] lg:w-[105%]' : 'hover:lg:bg-[#0B4550]/80'
                  }`}
                >
                  <div 
                    className={`hidden lg:block absolute left-[-9px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] border-[2px] transition-colors duration-300 shadow-none ${
                      isActive 
                        ? 'bg-[#E6FF2B] border-[#1A1A1A] scale-125' 
                        : 'bg-[#0B4550] border-[#898A8D] group-hover:border-[#E6FF2B]'
                    }`}
                  />
                  
                  <div 
                    className={`flex-1 border-[2px] p-3 md:p-4 transition-all duration-300 w-full ${
                      isActive ? 'border-[#E6FF2B] bg-[#1A1A1A]' : 'border-[#898A8D] lg:border-transparent lg:group-hover:border-[#898A8D] bg-[#0B4550]'
                    }`}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="pr-2 md:pr-4">
                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 font-mono" style={{ color: isActive ? '#F4F4F4' : '#898A8D' }}>
                          Node {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className={`text-base md:text-lg font-bold uppercase tracking-tight leading-tight truncate ${
                          isActive ? 'text-[#E6FF2B]' : 'text-[#F4F4F4]'
                        }`}>
                          {machine.name}
                        </h3>
                      </div>
                      <div className={`p-1.5 md:p-2 border-[2px] flex-shrink-0 ${isActive ? 'bg-[#E6FF2B] border-[#1A1A1A]' : 'bg-transparent border-[#898A8D] group-hover:border-[#F4F4F4]'}`}>
                        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-[#1A1A1A]' : 'text-[#898A8D] group-hover:text-[#F4F4F4]'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL PANEL: Full width on mobile */}
        <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col font-sans px-2 lg:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMachine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }} 
              className="w-full shadow-none flex flex-col h-full bg-[#F9F7F2] border-[2px] border-[#1A1A1A] overflow-hidden"
            >
                {/* Tech Stamp Top Right - adjusted for mobile scaling */}
                <div className="hidden sm:flex absolute top-0 right-0 p-2 md:p-3 border-b-[2px] border-l-[2px] border-[#1A1A1A] bg-[#0000FF] z-10 items-center justify-center mix-blend-multiply">
                  <Fingerprint className="text-[#F9F7F2] w-4 h-4 md:w-5 md:h-5 mr-2 opacity-50" />
                  <span className="text-[#F9F7F2] font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                    DATA.REF.{activeMachine.id.substring(0,6).toUpperCase()}
                  </span>
                </div>

                {/* Header Section */}
                <div className="p-6 md:p-10 pb-6 border-b-[2px] border-[#1A1A1A] relative bg-[#F4F4F4] w-full">
                  <div className="inline-flex items-center space-x-2 bg-[#E6FF2B] px-3 py-1.5 border-[2px] border-[#1A1A1A] mb-4">
                    <span className="w-2 h-2 bg-[#1A1A1A] animate-pulse"></span>
                    <span className="text-[10px] md:text-xs font-bold font-mono tracking-[0.1em] uppercase text-[#1A1A1A]">
                      Live Telemetry
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-[0.9] break-words pr-4 w-full">
                    {activeMachine.name}
                  </h2>
                </div>

                {/* Tech Specs: Vertical List on Mobile, Grid on Desktop */}
                <div className="flex flex-col md:grid md:grid-cols-2 bg-[#1A1A1A] gap-[2px] flex-1">
                  
                  {/* Block 1 & 2 Grouped list on Mobile */}
                  <div className="bg-[#F9F7F2] flex flex-col w-full h-full">
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-end border-b-[2px] border-[#1A1A1A]">
                      <p className="text-[10px] md:text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" /> Technical/Power
                      </p>
                      <p className="text-xl md:text-3xl font-black text-[#1A1A1A] uppercase tracking-tight break-words">
                        {activeMachine.power}
                      </p>
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-end">
                      <p className="text-[10px] md:text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
                        <Settings className="w-3 h-3 md:w-4 md:h-4" /> Output/Capacity
                      </p>
                      <p className="text-xl md:text-3xl font-black text-[#1A1A1A] uppercase tracking-tight break-words">
                        {activeMachine.capacity}
                      </p>
                    </div>
                  </div>

                  {/* Block 3 & 4 */}
                  <div className="flex flex-col bg-[#1A1A1A] gap-[2px] w-full h-full">
                    <div className="bg-[#0000FF] p-6 md:p-8 flex-1 flex flex-col justify-end">
                      <p className="text-[10px] md:text-xs font-bold text-[#F4F4F4]/70 uppercase tracking-widest mb-2 font-mono">
                        Primary Function
                      </p>
                      <p className="text-xl md:text-3xl font-black text-[#F4F4F4] uppercase tracking-tight break-words">
                        {activeMachine.function}
                      </p>
                    </div>
                    <div className="bg-[#F9F7F2] p-6 md:p-8 flex-1 flex flex-col justify-end hover:bg-[#E6FF2B]/20 transition-colors">
                      <p className="text-[10px] md:text-xs font-bold text-[#898A8D] uppercase tracking-widest mb-2 font-mono">
                        Market Estimate
                      </p>
                      <p className="text-xl md:text-3xl font-black text-[#1A1A1A] uppercase tracking-tight break-words">
                        {activeMachine.price}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer/CTA */}
                <button 
                  onClick={() => setIsAcknowledged(true)}
                  className="w-full block group cursor-pointer bg-[#E6FF2B] border-t-[2px] border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors duration-300 text-left outline-none mt-auto"
                >
                  <div className="px-6 py-5 md:px-10 md:py-6 flex justify-between items-center w-full">
                    <div>
                      <span className="block text-xl md:text-3xl font-black uppercase text-[#1A1A1A] group-hover:text-[#E6FF2B] tracking-tighter transition-colors">
                        Acknowledge
                      </span>
                      <span className="text-[#1A1A1A] group-hover:text-[#F4F4F4] font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1 block transition-colors">
                        To Validation View
                      </span>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 border-[2px] border-[#1A1A1A] group-hover:border-[#E6FF2B] flex items-center justify-center transition-colors flex-shrink-0 ml-4">
                      <Zap className="text-[#1A1A1A] group-hover:text-[#E6FF2B] w-6 h-6 md:w-8 md:h-8 transition-colors" />
                    </div>
                  </div>
                </button>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </div>
  );
}
