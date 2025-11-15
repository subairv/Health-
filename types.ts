
export enum HealthStatus {
  Normal = 'Normal',
  Moderate = 'Moderate',
  High = 'High',
  Low = 'Low', // Specifically for low HDL
  Ideal = 'Ideal' // Specifically for good HDL
}

export interface LipidProfile {
  total: number;
  ldl: number;
  hdl: number;
  triglycerides: number;
}

export interface HealthRecord {
  id: string;
  date: string; // Stored as YYYY-MM-DD for sorting
  fbs: number;
  ppbs: number;
  lipidProfile: LipidProfile;
  hba1c: number;
  creatinine: number;
  psa: number;
  weight: number;
  height: number;
}

export type HealthMetric = keyof Omit<HealthRecord, 'id' | 'date' | 'lipidProfile' | 'height'> | 'bmi' | 'lipid.total' | 'lipid.ldl' | 'lipid.hdl' | 'lipid.triglycerides';
