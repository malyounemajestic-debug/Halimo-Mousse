import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sun, 
  Moon, 
  Compass, 
  Sparkles, 
  Flame, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { PrayerInfo } from '../types';

interface PrayerTrackerViewProps {
  prayers: PrayerInfo[];
  onTogglePrayer: (name: PrayerInfo['name'], isSunnah?: boolean) => void;
  onOpenAdkaar: () => void;
}

export const PrayerTrackerView: React.FC<PrayerTrackerViewProps> = ({
  prayers,
  onTogglePrayer,
  onOpenAdkaar
}) => {
  const completedCount = prayers.filter(p => p.completed).length;
  const progressPct = Math.round((completedCount / prayers.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Daily Prayer Tracker (5 Salaadood)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            "Verily, prayer is prescribed for the believers at specified times." (Surah An-Nisa 4:103)
          </p>
        </div>

        <button
          onClick={onOpenAdkaar}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>Morning & Evening Adkaar &rarr;</span>
        </button>
      </div>

      {/* Hero Prayer Status Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sun className="w-4 h-4" />
              <span>Today’s Worship Commitment</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {completedCount} of 5 Daily Prayers Completed
            </h2>
            <p className="text-xs text-slate-300 max-w-lg">
              Halimo Mousse, maintaining your prayers on time brings barakah, mental clarity, and divine guidance into your business decisions and academy studies.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-medium text-amber-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Flame className="w-4 h-4 text-amber-400" />
                18-Day Continuous Prayer Streak 🔥
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-3xl font-extrabold text-emerald-400 tabular-nums">
              {progressPct}%
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              Fulfillment Rate Today
            </span>
            {/* Progress bar */}
            <div className="w-36 mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5 Prayers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {prayers.map((prayer) => {
          return (
            <div
              key={prayer.name}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                prayer.completed
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs text-slate-900 dark:text-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {prayer.name}
                  </span>
                  <span className="font-arabic text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {prayer.arabic}
                  </span>
                </div>

                <div className="mt-2 text-2xl font-bold font-mono tabular-nums">
                  {prayer.time}
                </div>
              </div>

              {/* Checkboxes for Farz & Sunnah */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                <button
                  onClick={() => onTogglePrayer(prayer.name, false)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    prayer.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  <span>Farz Prayer</span>
                  {prayer.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <button
                  onClick={() => onTogglePrayer(prayer.name, true)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                    prayer.sunnahCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span>Sunnah / Rawatib</span>
                  {prayer.sunnahCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Integration & Dua Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            Prayer in Halimo’s Daily Schedule
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">5:00 AM:</span>
              <span>Fajr prayer right at awakening with morning Adkaar.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">01:05 PM:</span>
              <span>Dhuhr during workday lunch break (rest and recharge).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">05:00 PM:</span>
              <span>Asr prayer as soon as you arrive home safely from work.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">06:58 PM:</span>
              <span>Maghrib before dinner preparation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">08:20 PM:</span>
              <span>Isha prayer followed by warm family time and study wind-down.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Spiritual Virtues for the Entrepreneur
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The Messenger of Allah (ﷺ) said: <em>"Know that victory comes with patience, relief comes with distress, and with every hardship comes ease."</em> (Tirmidhi).
          </p>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            Whenever you feel overwhelmed between work, family, and e-commerce assignments, pause for 2 Rak'ahs of Salat al-Hajah (Prayer of Need) and ask Allah for barakah in your time and sustenance.
          </div>
        </div>
      </div>
    </div>
  );
};
