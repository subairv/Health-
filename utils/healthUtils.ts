import { HealthStatus, HealthRecord } from '../types.ts';
import { THRESHOLDS } from '../constants.ts';

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  if (heightCm === 0) return 0;
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
};

export const getStatus = (metric: string, value: number): HealthStatus => {
  switch (metric) {
    case 'fbs':
      if (value >= THRESHOLDS.fbs.high) return HealthStatus.High;
      if (value >= THRESHOLDS.fbs.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'ppbs':
      if (value >= THRESHOLDS.ppbs.high) return HealthStatus.High;
      if (value >= THRESHOLDS.ppbs.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'hba1c':
      if (value >= THRESHOLDS.hba1c.high) return HealthStatus.High;
      if (value >= THRESHOLDS.hba1c.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'creatinine':
        if (value >= THRESHOLDS.creatinine.high) return HealthStatus.High;
        if (value >= THRESHOLDS.creatinine.moderate) return HealthStatus.Moderate;
        return HealthStatus.Normal;
    case 'psa':
        if (value >= THRESHOLDS.psa.high) return HealthStatus.High;
        if (value >= THRESHOLDS.psa.moderate) return HealthStatus.Moderate;
        return HealthStatus.Normal;
    case 'lipid.total':
      if (value >= THRESHOLDS.lipid.total.high) return HealthStatus.High;
      if (value >= THRESHOLDS.lipid.total.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'lipid.ldl':
      if (value >= THRESHOLDS.lipid.ldl.high) return HealthStatus.High;
      if (value >= THRESHOLDS.lipid.ldl.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'lipid.hdl':
      if (value < THRESHOLDS.lipid.hdl.low) return HealthStatus.Low;
      if (value >= THRESHOLDS.lipid.hdl.ideal) return HealthStatus.Ideal;
      return HealthStatus.Normal;
    case 'lipid.triglycerides':
      if (value >= THRESHOLDS.lipid.triglycerides.high) return HealthStatus.High;
      if (value >= THRESHOLDS.lipid.triglycerides.moderate) return HealthStatus.Moderate;
      return HealthStatus.Normal;
    case 'bmi':
      if (value >= THRESHOLDS.bmi.overweight) return HealthStatus.High; // Obese
      if (value >= THRESHOLDS.bmi.normal) return HealthStatus.Moderate; // Overweight
      if (value < THRESHOLDS.bmi.underweight) return HealthStatus.Low; // Underweight
      return HealthStatus.Normal;
    default:
      return HealthStatus.Normal;
  }
};

export const getStatusColor = (status: HealthStatus): string => {
  switch (status) {
    case HealthStatus.High:
    case HealthStatus.Low: // Low HDL is bad
      return 'text-red-400';
    case HealthStatus.Moderate:
      return 'text-yellow-400';
    case HealthStatus.Normal:
      return 'text-sky-400';
    case HealthStatus.Ideal: // Ideal HDL
      return 'text-green-400';
    default:
      return 'text-slate-300';
  }
};

export const generateDummyData = (): HealthRecord[] => {
    const records: HealthRecord[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        records.push({
            id: date.getTime().toString(),
            date: date.toISOString().split('T')[0],
            fbs: parseFloat((Math.random() * (130 - 90) + 90).toFixed(2)),
            ppbs: parseFloat((Math.random() * (180 - 120) + 120).toFixed(2)),
            lipidProfile: {
                total: parseFloat((Math.random() * (250 - 180) + 180).toFixed(2)),
                ldl: parseFloat((Math.random() * (170 - 90) + 90).toFixed(2)),
                hdl: parseFloat((Math.random() * (70 - 35) + 35).toFixed(2)),
                triglycerides: parseFloat((Math.random() * (220 - 140) + 140).toFixed(2)),
            },
            hba1c: parseFloat((Math.random() * (6.8 - 5.5) + 5.5).toFixed(2)),
            creatinine: parseFloat((Math.random() * (1.5 - 0.8) + 0.8).toFixed(2)),
            psa: parseFloat((Math.random() * (5 - 1) + 1).toFixed(2)),
            weight: 80,
            height: 180,
        });
    }
    return records;
}