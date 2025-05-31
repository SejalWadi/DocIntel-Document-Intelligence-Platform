import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, FileText, Moon, Sun, BookOpen, BrainCircuit, Files } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'Document Library', href: '/library', icon: Files },
    { name: 'DocIntel Intelligence', href: '/intelligence', icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          >
            <FileText className="h-8 w-8 text-blue-600" />
          </motion.div>
          <span className="text-2xl font-bold tracking-wide">DocIntel</span>
        </Link>
        <nav className="flex flex-col mt-8 px-4 space-y-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-colors
                    ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8 max-w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
