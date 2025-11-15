import React, { useState, useEffect } from 'react';
import { HealthRecord, LipidProfile } from '../types.ts';
import { CloseIcon } from './Icons.tsx';

interface RecordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<HealthRecord, 'id'> | HealthRecord) => void;
  recordToEdit: HealthRecord | null;
}

const getInitialFormData = (): Omit<HealthRecord, 'id'> => ({
    date: new Date().toISOString().split('T')[0],
    fbs: 0,
    ppbs: 0,
    lipidProfile: { total: 0, ldl: 0, hdl: 0, triglycerides: 0 },
    hba1c: 0,
    creatinine: 0,
    psa: 0,
    weight: 0,
    height: 0,
});


const RecordFormModal: React.FC<RecordFormModalProps> = ({ isOpen, onClose, onSave, recordToEdit }) => {
  const [formData, setFormData] = useState<Omit<HealthRecord, 'id'> | HealthRecord>(getInitialFormData());

  useEffect(() => {
    if (isOpen) {
        setFormData(recordToEdit ? { ...recordToEdit } : getInitialFormData());
    }
  }, [recordToEdit, isOpen]);
  
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const numericValue = type === 'number' ? parseFloat(value) || 0 : value;

    if (name.startsWith('lipidProfile.')) {
        const key = name.split('.')[1] as keyof LipidProfile;
        setFormData(prev => ({
            ...prev,
            lipidProfile: { ...prev.lipidProfile, [key]: numericValue as number }
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const FormInput: React.FC<{name: string, label: string, type?: string, step?: string, value: string | number}> = ({name, label, type="number", step="0.1", value}) => (
      <div>
          <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
          <input id={name} type={type} step={step} name={name} value={value} onChange={handleChange} required className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 no-print" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">{recordToEdit ? 'Edit Health Record' : 'Add New Health Record'}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <CloseIcon />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <fieldset className="border border-slate-600 p-4 rounded-md">
                <legend className="px-2 text-slate-400 text-sm">General</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput name="date" label="Date" type="date" value={formData.date} />
                    <FormInput name="weight" label="Weight (kg)" value={formData.weight} />
                    <FormInput name="height" label="Height (cm)" step="1" value={formData.height} />
                </div>
            </fieldset>
            
            <fieldset className="border border-slate-600 p-4 rounded-md">
                <legend className="px-2 text-slate-400 text-sm">Blood Sugar</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput name="fbs" label="FBS (mg/dL)" value={formData.fbs} />
                    <FormInput name="ppbs" label="PPBS (mg/dL)" value={formData.ppbs} />
                    <FormInput name="hba1c" label="HbA1c (%)" value={formData.hba1c} />
                </div>
            </fieldset>

            <fieldset className="border border-slate-600 p-4 rounded-md">
                <legend className="px-2 text-slate-400 text-sm">Lipid Profile (mg/dL)</legend>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormInput name="lipidProfile.total" label="Total" value={formData.lipidProfile.total} />
                    <FormInput name="lipidProfile.ldl" label="LDL" value={formData.lipidProfile.ldl} />
                    <FormInput name="lipidProfile.hdl" label="HDL" value={formData.lipidProfile.hdl} />
                    <FormInput name="lipidProfile.triglycerides" label="Triglycerides" value={formData.lipidProfile.triglycerides} />
                </div>
            </fieldset>

            <fieldset className="border border-slate-600 p-4 rounded-md">
                <legend className="px-2 text-slate-400 text-sm">Other Markers</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput name="creatinine" label="Creatinine (mg/dL)" value={formData.creatinine} />
                    <FormInput name="psa" label="PSA (ng/mL)" value={formData.psa} />
                </div>
            </fieldset>
            
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">Cancel</button>
              <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">Save Record</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecordFormModal;