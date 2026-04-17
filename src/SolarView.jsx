import React from 'react';

const SolarView = () => {
  const solarData = {
    "project": "Cocopeat Processing - Solar Setup",
    "overview": {
      "description": "Coco peat processing is not light industrial and requires proper breakdown of energy needs and system design.",
      "operation_mode": "Daytime only (solar-dependent, minimal battery usage)"
    },
    "power_estimation": {
      "scale": "Mid-scale (~1 ton/hour)",
      "machines_table": [
        { "machine": "Defibering", "power_kW": "20–40" },
        { "machine": "Washing system (pumps)", "power_kW": "5–15" },
        { "machine": "Dewatering", "power_kW": "10–20" },
        { "machine": "Sieving", "power_kW": "5–10" },
        { "machine": "Block press", "power_kW": "10–20" },
        { "machine": "Baler", "power_kW": "10–20" },
        { "machine": "Conveyors + misc", "power_kW": "5–10" }
      ],
      "subtotal_without_dryer_kW": "65–135"
    },
    "dryer_analysis": {
      "critical_machine": "Rotary Dryer",
      "options": [
        {
          "type": "Electric Dryer",
          "power_kW": "80–150+"
        },
        {
          "type": "Thermal (diesel/biomass)",
          "power_kW": "Minimal electrical load"
        }
      ],
      "recommended_setup": "Solar + Biomass/Thermal Dryer"
    },
    "solar_system_design": {
      "electric_load_kW": "70–120 (without dryer)",
      "target_system_kW": "150–250",
      "panel_specs": {
        "type": "550W modern panels",
        "size_m2": "1.9–2.5 per panel"
      },
      "panel_calculation": {
        "formula": "Total system size ÷ panel wattage",
        "example": {
          "system_size_W": 200000,
          "panel_wattage_W": 550,
          "result_panels": 364
        },
        "final_estimate_panels": 400
      },
      "land_requirements": {
        "panel_area_m2": 1000,
        "with_spacing_m2": "1300–1600"
      }
    },
    "cost_estimation": {
      "solar_system_200kW_USD": "160K–240K",
      "inverters_USD": "30K–60K",
      "batteries_USD": "30K–60K",
      "generator_200kVA_USD": "15K–40K",
      "total_USD": "225K–380K"
    },
    "system_operation": {
      "daytime": [
        "Solar powers all machines",
        "Excess energy charges batteries"
      ],
      "low_sun_conditions": [
        "Solar output drops",
        "Battery stabilizes system",
        "Generator activates if needed"
      ],
      "night": [
        "Factory OFF"
      ]
    }
  };

  // Helper function to format keys into readable headers
  const formatHeader = (key) => {
    return key.replace(/_/g, ' ').toUpperCase();
  };

  // Helper function to format nested values into readable strings for the monospace block
  const formatValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    
    if (Array.isArray(value)) {
      if (value.length === 0) return "N/A";
      // If it's an array of objects (like machines_table)
      if (typeof value[0] === 'object') {
        return value.map(item => {
          return Object.entries(item)
            .map(([k, v]) => `${formatHeader(k)}: ${v}`)
            .join(' | ');
        }).join('\n');
      }
      // If it's an array of strings (like system_operation)
      return value.map(item => `• ${item}`).join('\n');
    }

    if (typeof value === 'object') {
      return Object.entries(value).map(([k, v]) => {
        if (typeof v === 'object') {
          return `[${formatHeader(k)}]\n${formatValue(v)}`;
        }
        return `${formatHeader(k)}: ${v}`;
      }).join('\n');
    }

    return JSON.stringify(value, null, 2);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#0B4550] min-h-screen pt-4 md:pt-8 px-4 pb-12">
      <div className="w-full max-w-4xl bg-[#F9F7F2] border-[2px] border-[#0B4550] shadow-2xl p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter mb-12 border-b-4 border-[#0B4550] pb-6">
          {solarData.project}
        </h1>

        <div className="space-y-12">
          {Object.entries(solarData).map(([key, value]) => {
            if (key === 'project') return null; // Already used as title
            
            return (
              <section key={key} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] uppercase tracking-widest bg-[#0B4550] text-[#F9F7F2] inline-block px-4 py-1">
                  {formatHeader(key)}
                </h2>
                <div className="bg-white/50 border-l-4 border-[#0B4550]">
                  {key === 'power_estimation' && value.machines_table ? (
                    <div className="p-4 space-y-4">
                      <p className="text-[#1A1A1A] font-mono text-sm md:text-base mb-4 font-bold italic">
                        SCALE: {value.scale}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border-2 border-[#0B4550] font-mono text-sm md:text-base mb-4">
                          <thead>
                            <tr className="bg-[#0B4550] text-[#F9F7F2]">
                              <th className="border border-[#F9F7F2]/20 p-2 text-left uppercase">Machine</th>
                              <th className="border border-[#F9F7F2]/20 p-2 text-left uppercase">Power (kW)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {value.machines_table.map((row, idx) => (
                              <tr key={idx} className="border-b border-[#0B4550]/10">
                                <td className="p-2 border-r border-[#0B4550]/20 text-[#1A1A1A]">{row.machine}</td>
                                <td className="p-2 text-[#1A1A1A]">{row.power_kW}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[#1A1A1A] font-mono text-sm md:text-base font-bold bg-[#E6FF2B] inline-block px-2">
                        SUBTOTAL: {value.subtotal_without_dryer_kW} kW
                      </p>
                    </div>
                  ) : (
                    <p className="p-4 text-[#1A1A1A] font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {formatValue(value)}
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t-2 border-[#0B4550]/20 font-mono text-[10px] text-[#0B4550]/60 uppercase tracking-[0.3em] text-center">
          SYSTEM DOCUMENTATION ARCHIVE // CLASSIFIED // H. CABALLERO
        </div>
      </div>
    </div>
  );
};

export default SolarView;
