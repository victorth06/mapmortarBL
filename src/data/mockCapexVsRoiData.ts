export const capexVsRoiData = [
  // --- OPTIMISE ---
  {
    id: "opt1",
    group: "Optimise",
    measure: "Thermostat setpoints",
    capex: 0,
    roi: 55,
    carbon_saved: 230, // tCO2
    payback: 0.0,
  },
  {
    id: "opt2",
    group: "Optimise",
    measure: "Operational tuning & energy management",
    capex: 140,
    roi: 45,
    carbon_saved: 170,
    payback: 0.6,
  },

  // --- LIGHT RETROFIT ---
  {
    id: "light1",
    group: "Light Retrofit",
    measure: "Demand control ventilation",
    capex: 421,
    roi: 15,
    carbon_saved: 100,
    payback: null,
  },
  {
    id: "light2",
    group: "Light Retrofit",
    measure: "Daylight control",
    capex: 210,
    roi: 25,
    carbon_saved: 56,
    payback: 2.7,
  },
  {
    id: "light3",
    group: "Light Retrofit",
    measure: "Lighting sensors & timers",
    capex: 210,
    roi: 30,
    carbon_saved: 117,
    payback: 1.2,
  },
  {
    id: "light4",
    group: "Light Retrofit",
    measure: "Low-energy lighting upgrade",
    capex: 1264,
    roi: 20,
    carbon_saved: 230,
    payback: 3.8,
  },
  {
    id: "light5",
    group: "Light Retrofit",
    measure: "Efficient equipment & operations",
    capex: 140,
    roi: 40,
    carbon_saved: 219,
    payback: 0.4,
  },
  {
    id: "light6",
    group: "Light Retrofit",
    measure: "Simple heat pump (DHW)",
    capex: 506,
    roi: 12,
    carbon_saved: 148,
    payback: null,
  },

  // --- DEEP RETROFIT ---
  {
    id: "deep1",
    group: "Deep Retrofit",
    measure: "Mechanical ventilation with heat recovery",
    capex: 4915,
    roi: 10,
    carbon_saved: 152,
    payback: 83,
  },
  {
    id: "deep2",
    group: "Deep Retrofit",
    measure: "Air source heat pump (space heating)",
    capex: 386,
    roi: 18,
    carbon_saved: 161,
    payback: 19.6,
  },

  // --- RENEWABLE ---
  {
    id: "renew1",
    group: "Renewable",
    measure: "Rooftop PV (74%)",
    capex: 1147,
    roi: 8,
    carbon_saved: 120,
    payback: 7.5,
  },
];
