import React, { useState, useMemo } from 'react';
import { HealthRecord, HealthStatus } from '../types.ts';
import { useHealthData } from '../hooks/useHealthData.ts';
import { formatDate, calculateBMI, getStatus, getStatusColor } from '../utils/healthUtils.ts';
import { EditIcon, DeleteIcon, AddIcon, PrintIcon } from './Icons.tsx';

interface DashboardProps {
    onLogout: () => void;
}

const StatCard: React.FC<{ title: string; value: string; status?: HealthStatus }> = ({ title, value, status }) => (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md text-center">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <p className={`text-2xl font-bold ${status ? getStatusColor(status) : ''}`}>{value}</p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const { records, addRecord, updateRecord, deleteRecord, loading } = useHealthData();
    
    // Most recent record is used for BMI and stats cards
    const latestRecord = useMemo(() => records.length > 0 ? records[records.length - 1] : null, [records]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading health data...</p></div>;
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">VitalTrack AI</h1>
                    <button
                        onClick={onLogout}
                        className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {latestRecord && (
                        <>
                            <StatCard 
                                title="BMI" 
                                value={calculateBMI(latestRecord.weight, latestRecord.height).toString()}
                                status={getStatus('bmi', calculateBMI(latestRecord.weight, latestRecord.height))}
                            />
                            <StatCard title="Weight" value={`${latestRecord.weight} kg`} />
                            <StatCard title="FBS" value={latestRecord.fbs.toString()} status={getStatus('fbs', latestRecord.fbs)} />
                            <StatCard title="HbA1c" value={`${latestRecord.hba1c} %`} status={getStatus('hba1c', latestRecord.hba1c)} />
                        </>
                    )}
                </div>

                <div className="bg-slate-800 rounded-lg shadow-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 no-print">
                        <h2 className="text-2xl font-semibold text-white">Health Records</h2>
                        <div className="flex items-center gap-2">
                             <button
                                onClick={handlePrint}
                                className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                            >
                                <PrintIcon /> Print Report
                            </button>
                        </div>
                    </div>

                    <div id="print-area">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-400">
                                <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                        <th scope="col" className="px-6 py-3 text-center">FBS</th>
                                        <th scope="col" className="px-6 py-3 text-center">PPBS</th>
                                        <th scope="col" className="px-6 py-3 text-center">HbA1c</th>
                                        <th scope="col" className="px-6 py-3 text-center">Lipids (T/L/H/Tr)</th>
                                        <th scope="col" className="px-6 py-3 text-center">BMI</th>
                                        <th scope="col" className="px-6 py-3 text-center no-print">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.slice().reverse().map((rec) => {
                                        const bmi = calculateBMI(rec.weight, rec.height);
                                        const lp = rec.lipidProfile;
                                        return (
                                        <tr key={rec.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{formatDate(rec.date)}</td>
                                            <td className={`px-6 py-4 text-center ${getStatusColor(getStatus('fbs', rec.fbs))}`}>{rec.fbs}</td>
                                            <td className={`px-6 py-4 text-center ${getStatusColor(getStatus('ppbs', rec.ppbs))}`}>{rec.ppbs}</td>
                                            <td className={`px-6 py-4 text-center ${getStatusColor(getStatus('hba1c', rec.hba1c))}`}>{rec.hba1c}%</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={getStatusColor(getStatus('lipid.total', lp.total))}>{lp.total}</span>/
                                                <span className={getStatusColor(getStatus('lipid.ldl', lp.ldl))}>{lp.ldl}</span>/
                                                <span className={getStatusColor(getStatus('lipid.hdl', lp.hdl))}>{lp.hdl}</span>/
                                                <span className={getStatusColor(getStatus('lipid.triglycerides', lp.triglycerides))}>{lp.triglycerides}</span>
                                            </td>
                                            <td className={`px-6 py-4 text-center ${getStatusColor(getStatus('bmi', bmi))}`}>{bmi}</td>
                                            <td className="px-6 py-4 text-center no-print">
                                                <div className="flex justify-center gap-4">
                                                    <button onClick={() => alert("Edit functionality to be implemented.")} className="text-sky-400 hover:text-sky-300"><EditIcon /></button>
                                                    <button onClick={() => deleteRecord(rec.id)} className="text-red-400 hover:text-red-300"><DeleteIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                             {records.length === 0 && <p className="text-center py-8">No records found. Add a new record to get started.</p>}
                        </div>
                    </div>
                </div>
                 <footer className="text-center mt-8 text-slate-500 text-sm">
                    <p>VitalTrack AI - Your Personal Health Companion. Please add new entries to see statistics.</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;