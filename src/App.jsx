import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance'; // New Page
import Production from './pages/Production';
import Accounts from './pages/Accounts';
import Scanner from './pages/Scanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/scanner" element={<Scanner />} />
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen bg-[#020617] text-slate-200">
              <Sidebar />
              <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-24 lg:pt-8 transition-all duration-300">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/production" element={<Production />} />
                  <Route path="/accounts" element={<Accounts />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;