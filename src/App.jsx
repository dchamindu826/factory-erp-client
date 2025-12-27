// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Production from './pages/Production';
import Accounts from './pages/Accounts';
import Scanner from './pages/Scanner';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Scanner Page - සයිඩ්බාර් එක නැතිව පේන එකම පේජ් එක */}
        <Route path="/scanner" element={<Scanner />} />

        {/* 2. Main System Layout - අනිත් හැම පේජ් එකකටම සයිඩ්බාර් එක සෙට් වෙනවා */}
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen bg-[#020617] text-slate-200">
              {/* මෙතනින් සයිඩ්බාර් එක හැමතැනටම ලින්ක් වෙනවා */}
              <Sidebar />
              
              {/* සයිඩ්බාර් එකට පස්සේ ඉතුරු වෙන ඉඩ ප්‍රමාණය (Main Content) */}
              <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-24 lg:pt-8 transition-all duration-300">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
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