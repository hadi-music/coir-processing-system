import React, { useState, useEffect } from 'react';
import HomeView from './HomeView';
import MachinesView from './MachinesView';
import DossierView from './DossierView';
import SolarView from './SolarView';
import { fetchAndParseCSV } from './utils';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('HOME');
  const [systemData, setSystemData] = useState({
    machines: [],
    warehouse: null,
    location: null
  });
  const [isSynchronizing, setIsSynchronizing] = useState(true);

  // Transition helper to trigger the synchronization message
  const handleSetView = (view) => {
    setIsSynchronizing(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsSynchronizing(false);
    }, 800); // 800ms for a "technical" feel
  };

  useEffect(() => {
    async function loadAllData() {
      setIsSynchronizing(true);
      const urlMachines = 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv&gid=0';
      const urlWarehouse = 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv&gid=1257830880';
      const urlLocation = 'https://docs.google.com/spreadsheets/d/1IQJ4WW9H9UoJkRvpHYzphHDyUUSN3JpzfSB6hcL9j8k/export?format=csv&gid=544356906';

      try {
        const [machinesRes, warehouseRes, locationRes] = await Promise.all([
          fetchAndParseCSV(urlMachines, 'machines'),
          fetchAndParseCSV(urlWarehouse, 'dossier'),
          fetchAndParseCSV(urlLocation, 'dossier')
        ]);

        const warehouse = warehouseRes.length > 0 ? warehouseRes[0] : null;
        // Only use local fallback if the sheet cell is empty
        if (warehouse && !warehouse.image) warehouse.image = '/images/wh.jpg';

        const location = locationRes.length > 0 ? locationRes[0] : null;
        // Only use local fallback if the sheet cell is empty
        if (location && !location.image) location.image = '/images/map.webp';

        setSystemData({
          machines: machinesRes,
          warehouse,
          location
        });
      } catch (err) {
        console.error("Critical Failure Synchronizing Data:", err);
      } finally {
        setIsSynchronizing(false);
      }
    }

    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B4550] flex flex-col antialiased">
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2] text-[#0B4550] border-b-[4px] border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {currentView !== 'HOME' && (
            <button
              onClick={() => handleSetView('HOME')}
              className="font-mono font-black text-sm md:text-base uppercase tracking-widest hover:text-[#1A1A1A]/70 transition-colors mr-6 outline-none cursor-pointer"
            >
              ← RETURN TO MAIN MENU
            </button>
          )}
          <div className="font-mono font-black text-sm md:text-base uppercase tracking-widest hidden sm:block">
            For Mr. H. Caballero
          </div>
        </div>
        <div className="w-3 h-3 bg-[#E6FF2B] border-2 border-[#1A1A1A] shadow-none flex-shrink-0"></div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full pt-20 px-2 md:px-0 pb-8 flex flex-col">
        {isSynchronizing ? (
          <div className="flex-1 flex flex-col items-center justify-center font-sans">
            <div className="inline-flex flex-wrap items-center justify-center space-x-4 bg-[#E6FF2B] px-6 py-4 border-[2px] border-[#1A1A1A]">
              <span className="w-3 h-3 bg-[#1A1A1A] animate-pulse rounded-full flex-shrink-0"></span>
              <span className="text-sm md:text-xl font-bold font-mono tracking-[0.2em] uppercase text-[#1A1A1A] text-center">
                SYNCHRONIZING SYSTEM DATA...
              </span>
            </div>
          </div>
        ) : (
          <>
            {currentView === 'HOME' && <HomeView setCurrentView={handleSetView} />}
            {currentView === 'MACHINES' && <MachinesView machinesList={systemData.machines} />}
            {currentView === 'WAREHOUSE' && <DossierView data={systemData.warehouse} title="WAREHOUSE" />}
            {currentView === 'LOCATION' && <DossierView data={systemData.location} title="LOCATION" />}
            {currentView === 'SOLAR' && <SolarView />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
