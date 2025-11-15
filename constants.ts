
// All values are in mg/dL unless specified otherwise
export const THRESHOLDS = {
  fbs: { moderate: 100, high: 126 },
  ppbs: { moderate: 140, high: 200 },
  hba1c: { moderate: 5.7, high: 6.5 }, // in %
  creatinine: { moderate: 1.2, high: 1.4 }, // Varies greatly, using a general male value
  psa: { moderate: 4, high: 10 }, // in ng/mL
  lipid: {
    total: { moderate: 200, high: 240 },
    ldl: { moderate: 130, high: 160 },
    hdl: { low: 40, ideal: 60 }, // Lower is worse
    triglycerides: { moderate: 150, high: 200 },
  },
  bmi: {
    underweight: 18.5,
    normal: 25,
    overweight: 30,
  },
};
