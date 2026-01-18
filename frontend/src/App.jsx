import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext.jsx';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-cyberpunk-dark text-cyberpunk-light' : 'bg-white text-gray-900'}`}>
      <div className="relative overflow-hidden">
        {/* Cyberpunk grid background */}
        {theme === 'dark' && (
          <div className="fixed inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-10 pointer-events-none"></div>
        )}
        
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <Chatbot />
        <Footer />
      </div>
    </div>
  );
}

export default App;