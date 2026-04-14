import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

function ValidationView({ machine, onBack }) {
  if (!machine) return null;
  const hasImage = machine.image && machine.image.startsWith('http');
  const hasVideo = machine.video && machine.video.startsWith('http');

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B4550] flex flex-col antialiased overflow-y-auto">
      {/* Validation Header */}
      <header className="sticky top-0 bg-[#F9F7F2] text-[#0B4550] border-b-[2px] border-[#1A1A1A] px-4 md:px-6 py-4 flex items-center justify-between z-50">
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 font-black font-mono text-sm md:text-base uppercase tracking-widest hover:text-[#1A1A1A]/70 transition-colors"
        >
          <span>← BACK</span>
        </button>
        <div className="font-mono font-black text-xs md:text-base uppercase tracking-widest">
          For Mr. H. Caballero
        </div>
      </header>

      {/* Main Validation Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-12 font-sans flex flex-col">
        <div className="bg-[#F9F7F2] border-[2px] border-[#1A1A1A] p-4 md:p-12 mb-4 relative flex-1 flex flex-col">
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-none mb-8 break-words">
            {machine.name} <br/> <span className="text-[#898A8D] text-lg md:text-3xl lg:text-4xl">Technical Validation</span>
          </h1>

          {/* 2-Column Clinical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10 w-full">
            {/* Image Block */}
            {hasImage && (
              <div className="border-[2px] border-[#1A1A1A] bg-[#F4F4F4] aspect-video relative flex items-center justify-center overflow-hidden w-full group mb-4 md:mb-0">
                <img 
                  src={machine.image} 
                  alt={`${machine.name} Technical Diagram`}
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            {/* Video Player */}
            {hasVideo && (
              <div className="border-[2px] border-[#1A1A1A] bg-[#1A1A1A] aspect-video relative flex items-center justify-center overflow-hidden w-full mb-4 md:mb-0">
                <iframe 
                  src={getEmbedUrl(machine.video)} 
                  className="w-full h-full grayscale brightness-75 contrast-125" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media; fullscreen" 
                  allowFullScreen
                  title={`${machine.name} Video`}
                />
              </div>
            )}
          </div>

          {/* Notes Section */}
          {machine.paragraph && (
            <div className="border-t-[2px] border-[#1A1A1A] pt-6 md:pt-8 mt-auto w-full">
              <p className="text-[#1A1A1A] font-mono text-sm md:text-base lg:text-lg leading-relaxed tracking-tight max-w-5xl">
                {machine.paragraph}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProcessMap() {
  const [machinesList, setMachinesList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = import.meta.env.VITE_SHEET_URL || 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv';
    
    if (url.includes('/edit')) {
      url = url.split('/edit')[0] + '/export?format=csv';
    } else if (!url.includes('format=csv') && !url.includes('tqx=out:csv')) {
      url = 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv';
    }

    fetch(url)
      .then(res => res.text())
      .then(text => {
        
        // 1. Parsing logic capable of handling internal quotes
        const lines = text.trim().split('\n').slice(1);
        
        function parseCSVLine(str) {
          let inQuotes = false;
          let items = [];
          let currentVal = "";
          for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === '"' && str[i+1] === '"') {
              currentVal += '"';
              i++;
            } else if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              items.push(currentVal.trim());
              currentVal = "";
            } else {
              currentVal += char;
            }
          }
          items.push(currentVal.trim());
          return items;
        }

        const parsedMachines = [];
        lines.forEach(line => {
          if (!line.trim()) return;
          const parts = parseCSVLine(line);
          // CSV Columns: Machine ID, Name, Capacity, Market Estimate, Field Notes, Technical Image URL, Technical Video URL
          parsedMachines.push({
            id: parts[0] || '',
            name: parts[1] || '',
            capacity: parts[2] || '',
            price: parts[3] || '',
            paragraph: parts[4] || '',
            image: parts[5] || '',
            video: parts[6] || ''
          });
        });
        
        setMachinesList(parsedMachines);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not fetch sheet data:", err);
        setIsLoading(false);
      });
  }, []);

  const activeMachine = machinesList[activeIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B4550] flex flex-col items-center justify-center font-sans">
        <div className="inline-flex items-center space-x-4 bg-[#E6FF2B] px-6 py-4 border-[2px] border-[#1A1A1A]">
          <span className="w-3 h-3 bg-[#1A1A1A] animate-pulse"></span>
          <span className="text-lg md:text-xl font-bold font-mono tracking-[0.2em] uppercase text-[#1A1A1A]">
            Connecting to Master Database...
          </span>
        </div>
      </div>
    );
  }

  if (machinesList.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B4550] flex flex-col items-center justify-center font-sans p-6 text-center">
        <div className="bg-[#F9F7F2] px-8 py-6 border-[2px] border-[#1A1A1A]">
          <span className="text-xl md:text-3xl font-black font-mono tracking-widest uppercase text-[#1A1A1A]">
            DATABASE EMPTY - PENDING INPUT.
          </span>
        </div>
      </div>
    );
  }

  if (isAcknowledged && activeMachine) {
    return <ValidationView 
      machine={activeMachine} 
      onBack={() => setIsAcknowledged(false)} 
    />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0B4550] flex flex-col items-center justify-start font-sans py-8 md:py-16">
      
      {/* Central Layout Wrapper */}
      <div className="w-full max-w-[1400px] px-4 md:px-8">
        
        {/* Dynamic Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          
          <AnimatePresence>
            {machinesList.map((machine, index) => (
              <motion.div
                key={machine.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }} 
                className="w-full shadow-none flex flex-col h-full bg-[#F9F7F2] border-[2px] border-[#0B4550] overflow-hidden"
              >
                  {/* Header Section */}
                  <div className="p-8 md:p-10 pb-8 border-b-[2px] border-[#0B4550] relative bg-[#F4F4F4] w-full">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A1A1A] text-left uppercase tracking-tighter leading-[0.9] break-words w-full">
                      {machine.name}
                    </h1>
                  </div>

                  {/* Simplified Tech Specs */}
                  <div className="flex flex-col flex-1 bg-[#F9F7F2]">
                    
                    {/* Block 1: Output / Capacity */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-end border-b-[2px] border-[#0B4550]">
                      <p className="text-xs md:text-sm font-bold text-[#898A8D] uppercase tracking-widest mb-3 font-mono">
                        Output / Capacity
                      </p>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight break-words">
                        {machine.capacity}
                      </p>
                    </div>

                    {/* Block 2: Market Estimate (Most Prominent) */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-end">
                      <p className="text-xs md:text-sm font-bold text-[#898A8D] uppercase tracking-widest mb-3 font-mono">
                        Market Estimate
                      </p>
                      <p className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter break-words">
                        {machine.price}
                      </p>
                    </div>

                  </div>

                  {/* Footer/CTA */}
                  <button 
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAcknowledged(true);
                    }}
                    className="w-full block group cursor-pointer bg-[#E6FF2B] border-t-[2px] border-[#0B4550] hover:bg-[#0B4550] transition-colors duration-300 text-left outline-none mt-auto"
                  >
                    <div className="px-6 py-6 flex justify-center items-center w-full text-center">
                      <span className="block text-lg md:text-xl font-black uppercase text-[#1A1A1A] group-hover:text-[#E6FF2B] tracking-tighter transition-colors w-full">
                        VIEW TECHNICAL DETAILS
                      </span>
                    </div>
                  </button>

              </motion.div>
            ))}
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
