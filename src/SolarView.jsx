import React from 'react';

const SolarView = () => {
  // Google Doc URLs for Hybrid Object approach
  const docId = "e/2PACX-1vRogj5nMWy-PbVvlYumcUoKmitJfTYb8DOhiYsec1532GbyYjAJNM4AXT6DghE7tEDKIpC14sMck6BC";
  const previewUrl = `https://docs.google.com/document/d/${docId}/preview`;
  const pubUrl = `https://docs.google.com/document/d/${docId}/pub?embedded=true`;

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 md:pt-8 bg-[#0B4550]">
      <div className="w-full md:w-[80%] max-w-6xl mx-auto border-2 border-[#0B4550] bg-white p-2 shadow-2xl">
        <div className="w-full h-[800px] bg-white">
          <object 
            data={previewUrl} 
            type="text/html" 
            width="100%" 
            height="100%"
            title="SOLAR SYSTEM DOCUMENTATION"
          >
            <iframe 
              src={pubUrl} 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="SOLAR SYSTEM DOCUMENTATION FALLBACK"
            ></iframe>
          </object>
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
