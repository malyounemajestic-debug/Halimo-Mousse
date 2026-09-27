import React from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  CalendarDays, 
  CreditCard, 
  Heart, 
  Clock, 
  BookMarked, 
  Volume2, 
  Bell, 
  User, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isOpen: boolean;
  onClose: () => void;
  unreadNotificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpen,
  onClose,
  unreadNotificationsCount
}) => {
  const navItems = [
    { id: 'home' as NavSection, label: 'Home Dashboard', somali: 'Bogga Hore', icon: Home },
    { id: 'courses' as NavSection, label: 'Academy Courses', somali: 'Koorasyada SWA', icon: BookOpen },
    { id: 'progress' as NavSection, label: 'Course Progress', somali: 'Horumarka Waxbarashada', icon: BarChart3 },
    { id: 'planner' as NavSection, label: 'Study Planner', somali: 'Qorsheeyaha Barashada', icon: Clock },
    { id: 'calendar' as NavSection, label: 'Calendar & Reminders', somali: 'Jadwalka & Xusuusinta', icon: CalendarDays },
    { id: 'payments' as NavSection, label: 'Payment Tracker', somali: 'Xisaabta Waxbarashada', icon: CreditCard, badge: '$300/mo' },
    { id: 'selfcare' as NavSection, label: 'Self-Care & Routine', somali: 'Daryeelka & Jadwalka Maalinta', icon: Heart },
    { id: 'prayer' as NavSection, label: 'Prayer Times', somali: 'Jadwalka Salaadda', icon: CheckCircle2 },
    { id: 'adkaar' as NavSection, label: 'Adkaar Section', somali: 'Adkaarta Subax & Galab', icon: Sparkles },
    { id: 'quran' as NavSection, label: 'Qur’an & Audio', somali: 'Qur’aanka Kariimka', icon: Volume2 },
    { id: 'notifications' as NavSection, label: 'Notifications', somali: 'Ogeysiisyada', icon: Bell, badgeCount: unreadNotificationsCount },
    { id: 'profile' as NavSection, label: 'Student Profile', somali: 'Xogta Halimo', icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {/* Elegant Emblem */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md shadow-emerald-900/20 font-bold text-lg tracking-wider">
              SW
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                Somali Wealth
              </div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Academy Portal
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Card */}
        <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-500 text-white font-semibold text-sm shadow-xs">
              HM
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Halimo Mousse
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Digital Marketing Student
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Cohort 2026</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">ID: HM92</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                  <div className="text-left truncate">
                    <div className="truncate">{item.label}</div>
                    <div className={`text-[11px] leading-tight truncate ${isActive ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.somali}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {typeof item.badgeCount === 'number' && item.badgeCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-rose-500 rounded-full">
                      {item.badgeCount}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-slate-400/50'}`} />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer Support / SWA Motto */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Somali Wealth Academy
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Dhis Ganacsi · Baro Xirfad · Gaar Xorriyad
          </div>
        </div>
      </aside>
    </>
  );
};
