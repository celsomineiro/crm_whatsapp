import React, { useEffect, useState } from 'react';
import { CURRENT_USER } from '../constants';

export const Sidebar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const isDarkMode = 
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <div className="hidden md:flex w-16 flex-col items-center py-4 bg-secondary-light dark:bg-panel-dark border-r border-border-light dark:border-border-dark flex-shrink-0 z-20 h-full">
      <div className="space-y-6 flex flex-col items-center w-full">
        <button className="relative group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            chat
          </span>
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-secondary-light dark:border-panel-dark">
            5
          </span>
        </button>
        <button className="group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            motion_photos_on
          </span>
        </button>
        <button className="group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            groups
          </span>
        </button>
        <button className="group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            campaign
          </span>
        </button>
      </div>
      <div className="mt-auto space-y-6 flex flex-col items-center w-full">
        <button className="group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            settings
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="group p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
          title={isDark ? "Tema Claro" : "Tema Escuro"}
        >
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </div>
  );
};