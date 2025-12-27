// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, Factory, Wallet, Settings, Menu, X, ScanQrCode } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { name: 'Production', icon: <Factory size={20} />, path: '/production' },
    { name: 'Accounts', icon: <Wallet size={20} />, path: '/accounts' },
    { name: 'QR Scanner', icon: <ScanQrCode size={20} />, path: '/scanner' }, // මොබයිල් එකෙන් යන එක ලේසි වෙන්න මෙතනටත් දැම්මා
  ];

  return (
    <>
      {/* Mobile Menu Button - ෆෝන් එකෙන් බලද්දී විතරක් පේනවා */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0f172a] p-4 flex justify-between items-center z-50 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-400 font-mono">CODES AURA</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-blue-600 rounded-lg">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full bg-[#0f172a]/80 backdrop-blur-xl border-r border-slate-800 w-64 transform transition-transform duration-300 z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-8">
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            CODES AURA
          </h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] mt-1">INDUSTRIAL ERP</p>
        </div>

        <nav className="mt-4 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Mobile එකේදී ක්ලික් කරපු ගමන් සයිඩ්බාර් එක වැහෙනවා
              className={({ isActive }) => `
                flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <span className="transition-transform group-hover:scale-110">{item.icon}</span>
              <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">System Status</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-emerald-500">Online</span>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;