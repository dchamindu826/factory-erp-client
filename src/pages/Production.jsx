import { Plus, Filter, Download } from 'lucide-react';

const Production = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Production Log</h1>
          <p className="text-slate-400">Track washing stages and styles</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
          <Plus size={20} /> New Job Card
        </button>
      </div>

      <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium">All Styles</button>
                <button className="px-4 py-2 text-slate-400 text-sm font-medium hover:bg-slate-800 rounded-lg">In Washing</button>
                <button className="px-4 py-2 text-slate-400 text-sm font-medium hover:bg-slate-800 rounded-lg">Finished</button>
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-400 border border-slate-800 px-3 py-2 rounded-lg hover:bg-slate-800">
                <Download size={16} /> Export CSV
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-slate-500 text-sm uppercase bg-slate-900/50">
              <tr>
                <th className="p-5 font-semibold">Style No</th>
                <th className="p-5 font-semibold">Buyer</th>
                <th className="p-5 font-semibold">Qty In</th>
                <th className="p-5 font-semibold">Process Stage</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-blue-500/5 transition-colors group">
                <td className="p-5 font-mono text-blue-400">#ST-9920</td>
                <td className="p-5 font-medium">Levi's Global</td>
                <td className="p-5">2,500 pcs</td>
                <td className="p-5">
                   <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs border border-purple-500/20">Enzyme Wash</span>
                </td>
                <td className="p-5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Processing</span>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Production;