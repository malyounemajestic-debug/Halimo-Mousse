import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  BookOpen, 
  Heart, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { AppNotification, NavSection } from '../types';

interface NotificationsModalProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notification: AppNotification) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return CreditCard;
      case 'academic': return BookOpen;
      case 'routine': return Heart;
      case 'worship': return Clock;
      default: return Bell;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Academy Notifications & Alerts
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3">
          {notifications.map((notif) => {
            const Icon = getIcon(notif.type);
            return (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  notif.read
                    ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-slate-900 dark:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  notif.type === 'payment'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-600'
                    : notif.type === 'academic'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                    : 'bg-blue-100 dark:bg-blue-950 text-blue-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>

                  <p className="text-xs mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.somaliMessage && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
                      {notif.somaliMessage}
                    </p>
                  )}

                  {notif.link && (
                    <div className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          Somali Wealth Academy Notification Center
        </div>
      </div>
    </div>
  );
};
