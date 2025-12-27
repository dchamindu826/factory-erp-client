import { useState, useEffect } from 'react';
import { X, Camera, Landmark, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

// Backend URL එක මෙතනින් ගන්නවා
const API_URL = import.meta.env.VITE_API_URL || 'https://factory-erp-server.vercel.app';

const AddEmployeeModal = ({ isOpen, onClose, editData, fetchEmployees }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', nic: '', employeeId: '', position: '',
    phone: '', email: '', address: '',
    accountName: '', accountNumber: '', bankName: '', branch: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        accountName: editData.bankDetails?.accountName || '',
        accountNumber: editData.bankDetails?.accountNumber || '',
        bankName: editData.bankDetails?.bank || '',
        branch: editData.bankDetails?.branch || ''
      });
      setImagePreview(editData.image);
    } else {
      setFormData({
        fullName: '', nic: '', employeeId: '', position: '',
        phone: '', email: '', address: '',
        accountName: '', accountNumber: '', bankName: '', branch: ''
      });
      setImagePreview(null);
    }
  }, [editData, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: editData ? 'Update Details?' : 'Confirm Registration?',
      text: "Do you want to save these changes?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#1e293b',
      confirmButtonText: 'Yes, Save it!',
      background: '#0f172a',
      color: '#fff'
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    const dataToSend = {
      ...formData,
      image: imagePreview,
      bankDetails: {
        accountName: formData.accountName,
        accountNumber: formData.accountNumber,
        bank: formData.bankName,
        branch: formData.branch
      }
    };

    try {
      if (editData) {
        await axios.put(`${API_URL}/api/employees/${editData._id}`, dataToSend);
      } else {
        await axios.post(`${API_URL}/api/employees`, dataToSend);
      }
      
      Swal.fire({ title: 'Success!', text: 'Saved successfully.', icon: 'success', background: '#0f172a', color: '#fff' });
      onClose();
      fetchEmployees();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong!', background: '#0f172a', color: '#fff' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#0f172a] border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[2.5rem] shadow-2xl"
        >
          <div className="sticky top-0 bg-[#0f172a]/90 backdrop-blur-md p-6 border-b border-slate-800 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold">{editData ? 'Edit Employee' : 'New Employee Registration'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-[2rem] bg-slate-800 border-2 border-dashed border-slate-700 overflow-hidden flex items-center justify-center group">
                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Camera className="text-slate-500" size={32} />}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Upload Photo</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              <input name="nic" value={formData.nic} onChange={handleInputChange} placeholder="NIC Number" required className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              <input name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="Employee ID" required className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              <input name="position" value={formData.position} onChange={handleInputChange} placeholder="Position" required className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/50">
              <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Residential Address" className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none no-scrollbar" rows="2"></textarea>
            </div>
            <div className="bg-slate-950/50 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2 text-blue-400"><Landmark size={16}/> Bank Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="accountName" value={formData.accountName} onChange={handleInputChange} placeholder="Account Holder Name" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
                <input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Account Number" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
                <input name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Bank Name" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
                <input name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Branch" className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white outline-none" />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={onClose} className="flex-1 p-4 rounded-2xl border border-slate-800 text-white font-bold hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={loading} className="flex-[2] p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : (editData ? 'Update Details' : 'Register & Generate QR')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddEmployeeModal;