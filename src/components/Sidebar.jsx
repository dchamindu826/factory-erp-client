import { NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, Factory, Wallet, ScanQrCode, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { name: 'Attendance', icon: <CalendarCheck size={20} />, path: '/attendance' },
    { name: 'Production', icon: <Factory size={20} />, path: '/production' },
    { name: 'Accounts', icon: <Wallet size={20} />, path: '/accounts' },
    { name: 'QR Scanner', icon: <ScanQrCode size={20} />, path: '/scanner' },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0f172a] p-4 flex justify-between items-center z-50 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-400 font-mono">CODES AURA</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-blue-600 rounded-lg">Menu</button>
      </div>
      <aside className={`fixed top-0 left-0 h-full bg-[#0f172a]/80 backdrop-blur-xl border-r border-slate-800 w-64 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8"><h1 className="text-2xl font-black text-blue-400">CODES AURA</h1></div>
        <nav className="mt-4 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
              {item.icon} <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;