import React from 'react';

const Scanner = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center select-none">
      <h1 className="text-xl font-bold mb-10 mt-4 tracking-widest text-blue-400 uppercase">
        Attendance Scanner
      </h1>
      
      {/* Scanner Window */}
      <div className="relative w-full aspect-square max-w-sm border-2 border-blue-500/50 rounded-[3rem] overflow-hidden bg-slate-900 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        <div className="absolute inset-0 border-[20px] border-black/40 z-10"></div>
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_rgba(56,189,248,1)] animate-scan z-20"></div>
        
        <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
           <div className="w-20 h-20 border-2 border-dashed border-slate-700 rounded-2xl animate-pulse"></div>
           <p className="text-xs font-medium tracking-tighter">Align QR Code within the frame</p>
        </div>
      </div>

      {/* Last Scanned Info Card */}
      <div className="mt-10 w-full max-w-sm bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">Last Scanned Details</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            JS
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg leading-tight">Jayantha Silva</h4>
            <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-slate-500 font-mono">ID: EMP-042</p>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold">
                    IN: 08:02 AM
                </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-auto pb-4 text-slate-700 text-[10px] uppercase tracking-[0.3em] font-medium">
        Powered by Codes Aura
      </p>
    </div>
  );
};

export default Scanner; // මෙතන තමයි වැදගත්ම දේ