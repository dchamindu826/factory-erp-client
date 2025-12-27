import { Receipt, Wrench, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Accounts = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold">Financial Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <ArrowDownLeft className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">RECEIVABLES</span>
                  </div>
                  <h2 className="text-2xl font-bold">Rs. 840,000</h2>
                  <p className="text-slate-400 text-xs mt-1">Pending payments from customers</p>
              </div>
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <ArrowUpRight className="text-rose-400" />
                    <span className="text-xs font-bold text-rose-400">PAYABLES</span>
                  </div>
                  <h2 className="text-2xl font-bold">Rs. 312,500</h2>
                  <p className="text-slate-400 text-xs mt-1">Owed to chemical suppliers</p>
              </div>
           </div>

           {/* Machine Maintenance */}
           <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold flex items-center gap-2"><Wrench size={18}/> Machine Maintenance</h3>
                 <button className="text-xs text-blue-400 hover:underline">New Job Card</button>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <div>
                        <p className="font-medium text-sm">Industrial Washer #04</p>
                        <p className="text-xs text-slate-500">Motor Overheating - Technical Dept.</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded-md">Pending Quotation</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Recent Petty Cash */}
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6">
           <h3 className="font-bold mb-6 flex items-center gap-2"><Receipt size={18}/> Petty Cash & Bills</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 transition-colors">
                        <CreditCard size={18} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Stationary Purchase</p>
                        <p className="text-[10px] text-slate-500">Dec 20, 2025</p>
                    </div>
                    <span className="text-sm font-mono text-rose-400">-540.00</span>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all text-sm">
             + Upload Receipt (PDF/JPG)
           </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;