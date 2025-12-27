import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { FileDown, FileUp, Edit2, Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/attendance`);
      setRecords(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRecords(); }, []);

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
        fetchRecords();
      } catch (err) { Swal.fire('Error', 'Import failed!', 'error'); }
      setLoading(false);
    };
    reader.readAsBinaryString(file);
  };

  const editAttendance = async (row) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Attendance Record',
      background: '#0f172a',
      color: '#fff',
      html: `
        <label>In Time (HH:mm)</label><input id="swal-in" class="swal2-input" value="${row.inTime}">
        <label>Out Time (HH:mm)</label><input id="swal-out" class="swal2-input" value="${row.outTime || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => [document.getElementById('swal-in').value, document.getElementById('swal-out').value]
    });

    if (formValues) {
      try {
        await axios.put(`${API_URL}/api/attendance/${row._id}`, { ...row, inTime: formValues[0], outTime: formValues[1] });
        Swal.fire('Updated!', '', 'success');
        fetchRecords();
      } catch (err) { Swal.fire('Error', 'Update failed', 'error'); }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold">Attendance & OT Ledger</h1>
          <p className="text-slate-500 text-sm">Review real-time and manual records</p>
        </div>
        <label className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all">
          <FileUp size={20} /> {loading ? 'Importing...' : 'Upload Excel'}
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".xlsx, .xls" />
        </label>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-5">Employee</th>
              <th className="p-5">Date</th>
              <th className="p-5">In/Out Time</th>
              <th className="p-5">OT (Hrs)</th>
              <th className="p-5">Status</th>
              <th className="p-5">Method</th>
              <th className="p-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.map((row) => (
              <tr key={row._id} className="border-t border-slate-800 hover:bg-slate-800/30">
                <td className="p-5 font-bold">{row.fullName}</td>
                <td className="p-5 font-mono text-slate-400">{row.date}</td>
                <td className="p-5">{row.inTime} - {row.outTime || '--'}</td>
                <td className="p-5 text-blue-400 font-bold">{row.otHours?.toFixed(2)}</td>
                <td className="p-5">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === 'Present' ? 'bg-green-500/10 text-green-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {row.status}
                   </span>
                </td>
                <td className="p-5 text-xs text-slate-500">{row.method}</td>
                <td className="p-5 text-center">
                  <button onClick={() => editAttendance(row)} className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all">
                    <Edit2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;