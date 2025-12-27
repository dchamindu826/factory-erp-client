import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserCheck, Clock, ShieldAlert } from 'lucide-react';

// Backend URL
const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const ScannerPage = () => {
  const [lastEmployee, setLastEmployee] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Scan එකක් හඳුනාගත් විට ක්‍රියාත්මක වන function එක
  const handleScan = async (result) => {
    // එක දිගට scan වීම වැලැක්වීමට සහ processing වෙලාවේදී block කිරීමට
    if (!result || isProcessing) return;
    
    setIsProcessing(true);
    const scannedId = result[0].rawValue;

    try {
      // Backend එකට දත්ත යැවීම
      const response = await axios.post(`${API_URL}/api/attendance`, {
        employeeId: scannedId
      });

      // සාර්ථක නම් දත්ත update කිරීම
      setLastEmployee({
        name: response.data.employeeName || "Employee Found", // Backend එකෙන් නම එවනවා නම්
        id: scannedId,
        time: new Date().toLocaleTimeString(),
        initials: "OK"
      });

      // සාර්ථක බව පෙන්වන ලස්සන Alert එකක්
      Swal.fire({
        title: 'Attendance Marked!',
        text: `ID: ${scannedId} - Success`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#0f172a',
        color: '#fff'
      });

    } catch (error) {
      console.error("Scan Error:", error);
      Swal.fire({
        title: 'Invalid QR Code',
        text: error.response?.data?.message || 'Employee not found in database',
        icon: 'error',
        background: '#0f172a',
        color: '#fff'
      });
    }

    // තත්පර 3කට පසු නැවත scan කිරීමට ඉඩ ලබා දීම
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center select-none">
      <h1 className="text-xl font-bold mb-10 mt-4 tracking-widest text-blue-400 uppercase">
        Live Attendance Scanner
      </h1>
      
      {/* Scanner Window - Real Camera Feed */}
      <div className="relative w-full aspect-square max-w-sm border-2 border-blue-500/50 rounded-[3rem] overflow-hidden bg-slate-900 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        
        {/* Real Scanner Component */}
        <Scanner
          onScan={handleScan}
          allowMultiple={true}
          scanDelay={3000}
          styles={{
            container: { width: '100%', height: '100%' }
          }}
          components={{
            audio: false, // Scan වෙද්දී එන සද්දය ඕනේ නැත්නම් false කරන්න
            torch: true   // Flashlight එක ඕනේ නම්
          }}
        />

        {/* Scanning Line Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_rgba(56,189,248,1)] animate-scan z-20 pointer-events-none"></div>
        
        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold animate-pulse text-sm">
              PROCESSING...
            </div>
          </div>
        )}
      </div>

      {/* Last Scanned Info Card - Real Data */}
      <div className="mt-10 w-full max-w-sm bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">
          Current Scan Status
        </p>
        
        {lastEmployee ? (
          <div className="flex items-center gap-4 animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
              {lastEmployee.initials}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg leading-tight text-white">{lastEmployee.name}</h4>
              <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500 font-mono">ID: {lastEmployee.id}</p>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold uppercase">
                      IN: {lastEmployee.time}
                  </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 text-slate-600 italic text-sm">
            Waiting for scan...
          </div>
        )}
      </div>

      <p className="mt-auto pb-4 text-slate-700 text-[10px] uppercase tracking-[0.3em] font-medium">
        Powered by Codes Aura
      </p>
    </div>
  );
};

export default ScannerPage;