import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Bell, 
  Sun, 
  Moon, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  Volume2
} from 'lucide-react';
import { NavSection, AppNotification } from '../types';

interface TopNavbarProps {
  currentSection: NavSection;
  onOpenSidebar: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onSelectSection: (section: NavSection) => void;
  activeAudioTitle?: string | null;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentSection,
  onOpenSidebar,
  isDarkMode,
  onToggleTheme,
  notifications,
  onOpenNotifications,
  onSelectSection,
  activeAudioTitle
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDateFormatted(now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const sectionTitles: Record<NavSection, { title: string; somali: string }> = {
    home: { title: 'Student Dashboard', somali: 'Bogga Guud' },
    courses: { title: 'SWA Courses & Curriculum', somali: 'Koorasyada' },
    progress: { title: 'Learning Progress & Notes', somali: 'Horumarka' },
    planner: { title: 'Study Planner & Timetable', somali: 'Qorsheeyaha' },
    calendar: { title: 'Calendar & Deadlines', somali: 'Jadwalka & Ballamaha' },
    payments: { title: 'Tuition & Payment Tracker ($300/mo)', somali: 'Xisaabta Waxbarashada' },
    selfcare: { title: 'Self-Care & Daily Routine', somali: 'Daryeelka & Nolosha Maalinta' },
    prayer: { title: 'Prayer Tracker (5 Salaadood)', somali: 'Waqtiyada Salaadda' },
    adkaar: { title: 'Adkaar Section (Subax & Galab)', somali: 'Adkaarta Maalinlaha ah' },
    quran: { title: 'Qur’an Recitation & Audio', somali: 'Qur’aanka Kariimka' },
    notifications: { title: 'Notifications & Alerts', somali: 'Ogeysiisyada' },
    profile: { title: 'Halimo Mousse Profile', somali: 'Xogta Ardayda' }
  };

  const activeTitle = sectionTitles[currentSection] || { title: 'Dashboard', somali: 'Bogga' };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Left Zone: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase hidden sm:inline">
              Somali Wealth Academy
            </span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">/</span>
            <h1 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
              {activeTitle.title}
            </h1>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-none truncate">
            {activeTitle.somali}
          </span>
        </div>
      </div>

      {/* Center Zone: Active Audio Pill or Clock */}
      <div className="hidden md:flex items-center gap-4">
        {activeAudioTitle ? (
          <button 
            onClick={() => onSelectSection('quran')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-100 transition-colors animate-pulse"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate max-w-xs">Playing: {activeAudioTitle}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{currentDateFormatted}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tabular-nums font-semibold">{currentTime}</span>
          </div>
        )}
      </div>

      {/* Right Zone: Controls (Theme, Notifications, Quick Student Profile) */}
      <div className="flex items-center gap-2">
        {/* Quick Prayer Alert button */}
        <button
          onClick={() => onSelectSection('prayer')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors"
          title="View Prayer Times"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Fajr & Dhuhr Done</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle color theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Student Profile Quick Button */}
        <button
          onClick={() => onSelectSection('profile')}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="View Profile - Halimo Mousse"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 text-white font-bold text-xs shadow-xs">
            HM
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden md:inline truncate max-w-[100px]">
            Halimo M.
          </span>
        </button>
      </div>
    </header>
  );
};
