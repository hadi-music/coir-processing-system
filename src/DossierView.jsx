import React from 'react';

export default function DossierView({ data, title }) {
  if (!data) return null;

  const hasImage = data.image && data.image.startsWith('http');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 font-sans flex flex-col items-center">
      
      <div className="w-full bg-[#F9F7F2] border-[2px] border-[#0B4550] p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tighter leading-none mb-8 break-words text-left">
          {title} <br/> <span className="text-[#898A8D] text-2xl md:text-4xl">Technical Dossier</span>
        </h1>

        <div className="flex flex-col gap-8 w-full">
          {/* Top section: Full width image */}
          {hasImage && (
            <div className="w-full aspect-video border-[2px] border-[#0B4550] bg-[#F4F4F4] relative flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src={data.image} 
                alt={`${title} Technical Visualization`}
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Bottom section: Description block */}
          <div className="w-full border-t-[2px] border-[#0B4550] pt-8">
             <p className="text-[#1A1A1A] font-mono text-sm md:text-base lg:text-lg leading-relaxed tracking-tight break-words whitespace-pre-wrap">
               {data.description || "NO DATA AVAILABLE FOR THIS COMPONENT."}
             </p>
          </div>
        </div>
      </div>

    </div>
  );
}
