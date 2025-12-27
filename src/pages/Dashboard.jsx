import { TrendingUp, Users, Package, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Monthly Revenue', value: 'Rs. 2.4M', icon: <TrendingUp className="text-emerald-400" />, trend: '+12.5%' },
    { label: 'Active Employees', value: '142', icon: <Users className="text-blue-400" />, trend: 'Stable' },
    { label: 'Garments Processed', value: '12,400', icon: <Package className="text-purple-400" />, trend: '+5.2%' },
    { label: 'Pending Repairs', value: '03', icon: <AlertCircle className="text-amber-400" />, trend: 'Urgent' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold">Good Morning, Admin</h1>
        <p className="text-slate-400">Here's what's happening in the plant today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0f172a]/50 backdrop-blur-md border border-slate-800 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-900 rounded-2xl">{s.icon}</div>
              <span className="text-xs font-medium px-2 py-1 bg-slate-900 rounded-full text-slate-400">{s.trend}</span>
            </div>
            <p className="text-slate-400 text-sm">{s.label}</p>
            <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Analytics Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6 flex items-center justify-center text-slate-500">
          Production Chart (Coming Soon)
        </div>
        <div className="h-80 bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6 flex items-center justify-center text-slate-500">
          Expense Breakdown (Coming Soon)
        </div>
      </div>
    </div>
  );
};

export default Dashboard;