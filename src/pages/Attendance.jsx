import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserCheck, Clock, ShieldAlert } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const AttendanceScanner = () => {
  const [lastScanned, setLastScanned] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = async (result) => {
    if (!result || !isScanning) return;

    // එකම QR එක දිගටම scan වීම වැලැක්වීමට තත්පර 3ක විරාමයක් ගනිමු
    setIsScanning(false);
    
    const employeeId = result[0].rawValue;

    try {
      const res = await axios.post(`${API_URL}/api/attendance`, { employeeId });

      Swal.fire({
        title: 'Attendance Marked!',
        text: `${res.data.message}`,
        icon: 'success',
        background: '#0f172a',
        color: '#fff',
        timer: 3000,
        showConfirmButton: false
      });

      setLastScanned({
        id: employeeId,
        time: new Date().toLocaleTimeString(),
        status: 'Success'
      });

    } catch (err) {
      Swal.fire({
        title: 'Scan Failed',
        text: err.response?.data?.message || 'Invalid Employee QR',
        icon: 'error',
        background: '#0f172a',
        color: '#fff'
      });
    }

    // තත්පර 3කට පසු නැවත scan කිරීමට ඉඩ දෙමු
    setTimeout(() => setIsScanning(true), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Smart Attendance</h1>
          <p className="text-slate-400">Point your camera at the employee QR code</p>
        </div>

        {/* Scanner Window */}
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-blue-600/20 shadow-2xl shadow-blue-500/10 bg-slate-900 aspect-square">
          <Scanner 
            onScan={handleScan}
            enabled={isScanning}
            paused={!isScanning}
            styles={{ container: { width: '100%', height: '100%' } }}
          />
          
          {/* Scanning Overlay */}
          <div className="absolute inset-0 border-[2px] border-blue-500/30 pointer-events-none flex items-center justify-center">
             {!isScanning && (
               <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold animate-pulse">
                 Processing...
               </div>
             )}
          </div>
        </div>

        {/* Last Scanned Status */}
        {lastScanned && (
          <div className="mt-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-2xl text-green-500">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Last Scanned: <span className="text-white font-mono">{lastScanned.id}</span></p>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <Clock size={12} /> {lastScanned.time}
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-4">
           <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 text-center">
              <p className="text-blue-400 font-bold text-xl">Auto</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Mode</p>
           </div>
           <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 text-center">
              <p className="text-green-400 font-bold text-xl">Active</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Scanner</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceScanner;