import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Calendar, FileUp, User, Clock, ChevronRight, TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const Attendance = () => {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/attendance`);
      processAndGroupData(res.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const processAndGroupData = (data) => {
    const groups = data.reduce((acc, curr) => {
      const month = curr.date.substring(0, 7); // Result: "2023-12"
      if (!acc[month]) acc[month] = { records: [], otSummary: {} };
      
      acc[month].records.push(curr);
      
      if (!acc[month].otSummary[curr.fullName]) {
        acc[month].otSummary[curr.fullName] = { totalOt: 0, employeeId: curr.employeeId };
      }
      acc[month].otSummary[curr.fullName].totalOt += curr.otHours || 0;
      
      return acc;
    }, {});
    setGroupedData(groups);
  };

  useEffect(() => { fetchAttendance(); }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      setLoading(true);
      try {
        await axios.post(`${API_URL}/api/attendance/bulk`, jsonData);
        Swal.fire('Success', 'Attendance imported with OT calculations!', 'success');
        fetchAttendance();
      } catch (err) { Swal.fire('Error', 'Import failed!', 'error'); }
      setLoading(false);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Attendance Analytics</h1>
          <p className="text-slate-500">Monthly breakdown and OT summaries</p>
        </div>
        <label className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-blue-600/20">
          <FileUp size={20} /> {loading ? 'Importing...' : 'Bulk Import Excel'}
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".xlsx, .xls" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {Object.keys(groupedData).sort().reverse().map((month) => (
          <div key={month} className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Header with Month Name */}
            <div className="p-8 bg-slate-800/30 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/20 p-4 rounded-2xl text-blue-500">
                  <Calendar size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h2>
                  <p className="text-slate-500 text-sm">Summary of hours and attendance logs</p>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Month OT</p>
                 <p className="text-3xl font-black text-emerald-400">
                   {Object.values(groupedData[month].otSummary).reduce((a, b) => a + b.totalOt, 0).toFixed(1)}h
                 </p>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Employee OT Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-6">
                   <TrendingUp size={16} className="text-blue-500" /> MONTHLY OT SUMMARY
                </h3>
                <div className="grid gap-3">
                  {Object.entries(groupedData[month].otSummary).map(([name, data]) => (
                    <div key={name} className="flex items-center justify-between bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-blue-400">
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{data.employeeId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-black text-lg">{data.totalOt.toFixed(2)}h</p>
                        <p className="text-[9px] text-slate-600 uppercase font-bold">Extra Hours</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Daily Log Preview */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-6">
                   <Clock size={16} className="text-blue-500" /> DAILY ACTIVITY LOG
                </h3>
                <div className="bg-black/20 rounded-3xl p-4 border border-slate-800/50 max-h-[400px] overflow-y-auto no-scrollbar">
                  <table className="w-full text-left">
                    <thead className="text-[10px] text-slate-600 uppercase font-bold">
                      <tr>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Employee</th>
                        <th className="pb-4">Times</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {groupedData[month].records.slice(0, 20).map((rec, i) => (
                        <tr key={i} className="border-t border-slate-800/50">
                          <td className="py-3 font-mono text-slate-500">{rec.date.split('-')[2]}</td>
                          <td className="py-3 font-bold text-slate-300">{rec.fullName}</td>
                          <td className="py-3 text-slate-400">{rec.inTime}-{rec.outTime || '--'}</td>
                          <td className="py-3">
                            <div className={`w-2 h-2 rounded-full ${rec.status === 'Present' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {groupedData[month].records.length > 20 && (
                    <p className="text-center text-slate-700 mt-4 text-[10px]">Showing most recent logs</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;