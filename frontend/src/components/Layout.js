import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, FileText, Moon, Sun, Files } from 'lucide-react';
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
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-indigo-50 dark:bg-gray-800 border-r border-indigo-200 dark:border-gray-700 flex flex-col shadow-xl">
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-indigo-200 dark:border-gray-700">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          >
            <FileText className="h-8 w-8 text-indigo-600" />
          </motion.div>
          <span className="text-2xl font-extrabold tracking-wide text-indigo-700 dark:text-indigo-400">DocIntel</span>
        </Link>
        <nav className="flex flex-col mt-8 px-4 space-y-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-all
                    ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-900 hover:bg-indigo-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <div className="p-6 border-t border-indigo-200 dark:border-gray-700 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-indigo-200 dark:bg-gray-700 text-indigo-900 dark:text-gray-200 hover:bg-indigo-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8 max-w-full bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out">
        {children}
      </main>
    </div>
  );
};

export default Layout;
