import React from 'react';

const SolarView = () => {
  // Google Doc URL - Published to Web version for embedding
  const googleDocUrl = "https://docs.google.com/document/d/e/2PACX-1vRogj5nMWy-PbVvlYumcUoKmitJfTYb8DOhiYsec1532GbyYjAJNM4AXT6DghE7tEDKIpC14sMck6BC/pub?embedded=true";

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 md:pt-8 bg-[#0B4550]">
      <div className="w-full md:w-[80%] max-w-6xl mx-auto border-[2px] border-[#0B4550] bg-white overflow-hidden shadow-2xl">
        <div className="w-full h-[80vh] bg-white">
          <iframe
            src={googleDocUrl}
            className="w-full h-full border-none"
            title="SOLAR SYSTEM DOCUMENTATION"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      
      {/* Mobile scroll hint / status bar if needed, but keeping it archival/clinical */}
      <div className="mt-4 font-mono text-[10px] text-[#F9F7F2]/50 tracking-widest uppercase pb-4">
        END OF DOCUMENTATION ARCHIVE // SOLAR SECTION
      </div>
    </div>
  );
};

export default SolarView;
