
import { useState, useEffect, useCallback } from 'react';
import { HealthRecord } from '../types';
import { generateDummyData } from '../utils/healthUtils';

const STORAGE_KEY = 'healthData';

export const useHealthData = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setRecords(JSON.parse(storedData));
      } else {
        // Load with dummy data if nothing is in storage
        const dummyData = generateDummyData();
        setRecords(dummyData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
      }
    } catch (error) {
      console.error("Failed to load health data from localStorage", error);
      setRecords([]);
    }
    setLoading(false);
  }, []);

  const saveData = useCallback((newRecords: HealthRecord[]) => {
    try {
        const sortedRecords = [...newRecords].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setRecords(sortedRecords);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedRecords));
    } catch (error) {
        console.error("Failed to save health data to localStorage", error);
    }
  }, []);

  const addRecord = useCallback((record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = { ...record, id: new Date().getTime().toString() };
    saveData([...records, newRecord]);
  }, [records, saveData]);

  const updateRecord = useCallback((updatedRecord: HealthRecord) => {
    const updatedRecords = records.map(rec => rec.id === updatedRecord.id ? updatedRecord : rec);
    saveData(updatedRecords);
  }, [records, saveData]);

  const deleteRecord = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        const filteredRecords = records.filter(rec => rec.id !== id);
        saveData(filteredRecords);
    }
  }, [records, saveData]);
  
  return { records, addRecord, updateRecord, deleteRecord, loading };
};
