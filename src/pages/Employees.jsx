import { useEffect, useState } from 'react';
import { Plus, Search, QrCode, Edit2, Trash2, Download } from 'lucide-react';
import axios from 'axios';
import AddEmployeeModal from '../components/AddEmployeeModal';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#1e293b',
      confirmButtonText: 'Yes, delete it!',
      background: '#0f172a', color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/employees/${id}`);
        setEmployees(employees.filter(emp => emp._id !== id));
        Swal.fire({ title: 'Deleted!', icon: 'success', background: '#0f172a', color: '#fff' });
      } catch (err) {
        Swal.fire({ title: 'Error!', icon: 'error', background: '#0f172a', color: '#fff' });
      }
    }
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setIsModalOpen(true);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Workforce Management</h1>
          <p className="text-slate-500">View and manage your factory employees</p>
        </div>
        <button 
          onClick={() => { setEditData(null); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-bold text-white flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus size={20} /> Add Employee
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.map((emp) => (
          <div key={emp._id} className="bg-[#0f172a] border border-slate-800 rounded-[2rem] p-6 hover:border-blue-500/50 transition-all group">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-3xl bg-slate-800 border-4 border-slate-900 overflow-hidden">
                   <img src={emp.image || `https://ui-avatars.com/api/?name=${emp.fullName}&background=random`} alt={emp.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg">
                  <QrCode size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white truncate w-full">{emp.fullName}</h3>
              <p className="text-blue-400 text-sm font-medium">{emp.position}</p>
              <p className="text-slate-500 font-mono text-xs mt-1">{emp.employeeId}</p>
              <div className="flex gap-2 mt-6 w-full">
                <a href={emp.qrCode} download={`${emp.fullName}_QR.png`} className="flex-1 bg-slate-900 hover:bg-slate-800 p-3 rounded-xl flex justify-center text-slate-400 hover:text-white transition-all"><Download size={18} /></a>
                <button onClick={() => handleEdit(emp)} className="flex-1 bg-slate-900 hover:bg-amber-600/20 p-3 rounded-xl flex justify-center text-slate-400 hover:text-amber-500 transition-all"><Edit2 size={18} /></button>
                <button onClick={() => deleteEmployee(emp._id)} className="flex-1 bg-slate-900 hover:bg-rose-600/20 p-3 rounded-xl flex justify-center text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddEmployeeModal isOpen={isModalOpen} editData={editData} onClose={() => { setIsModalOpen(false); setEditData(null); }} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default Employees;