import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, FileText, Moon, Sun, Files, ChevronLeft, ChevronRight } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-50 dark:bg-gray-800 border-r border-indigo-200 dark:border-gray-700 flex flex-col shadow-xl`}>
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-indigo-200 dark:border-gray-700">
          <div className="animate-spin-slow">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          {sidebarOpen && (
            <span className="text-2xl font-extrabold tracking-wide text-indigo-700 dark:text-indigo-400">DocIntel</span>
          )}
        </Link>

        <nav className="flex flex-col mt-8 px-4 space-y-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-all
                  ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-900 hover:bg-indigo-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                `}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 space-y-4 border-t border-indigo-200 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center p-2 rounded-full bg-indigo-200 dark:bg-gray-700 text-indigo-900 dark:text-gray-200 hover:bg-indigo-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-gray-300 hover:bg-indigo-200 dark:hover:bg-gray-600 transition"
            aria-label={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8 max-w-full bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out">
        {children}
      </main>
    </div>
  );
};

export default Layout;
