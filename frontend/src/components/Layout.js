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
    <div className="flex h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 text-slate-900 dark:text-slate-100 transition-all">
      <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-xl`}>
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-slate-200 dark:border-slate-700">
          <div className="animate-spin-slow">
            <FileText className="h-8 w-8 text-slate-700" />
          </div>
          {sidebarOpen && (
            <span className="text-2xl font-extrabold tracking-wide text-slate-800 dark:text-slate-300">DocIntel</span>
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
                  ${isActive ? 'bg-slate-700 text-white shadow-md' : 'text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}
                `}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            aria-label={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8 max-w-full bg-white dark:bg-slate-900 transition-all duration-500 ease-in-out">
        {children}
      </main>
    </div>
  );
};

export default Layout;