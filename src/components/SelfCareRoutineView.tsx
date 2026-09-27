import React, { useState } from 'react';
import { 
  Heart, 
  Sun, 
  Moon, 
  Coffee, 
  Briefcase, 
  Home, 
  ShieldCheck, 
  Utensils, 
  Laptop, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Minus, 
  Footprints, 
  Droplet, 
  Smile, 
  Save, 
  Check, 
  Compass, 
  Clock 
} from 'lucide-react';
import { RoutineItem } from '../types';
import { SelfCareState } from '../data/routineData';

interface SelfCareRoutineViewProps {
  routineItems: RoutineItem[];
  onToggleRoutineItem: (id: string) => void;
  selfCareState: SelfCareState;
  onUpdateSelfCare: (state: Partial<SelfCareState>) => void;
}

export const SelfCareRoutineView: React.FC<SelfCareRoutineViewProps> = ({
  routineItems,
  onToggleRoutineItem,
  selfCareState,
  onUpdateSelfCare
}) => {
  const [reflectionText, setReflectionText] = useState(selfCareState.reflectionNote);
  const [isSaved, setIsSaved] = useState(false);

  // Active routine block detection
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMinute;

  const activeRoutine = routineItems.find(item => {
    const startVal = item.startHour * 60 + item.startMinute;
    let endVal = item.endHour * 60 + item.endMinute;
    if (endVal < startVal) endVal += 24 * 60;
    return currentTimeVal >= startVal && currentTimeVal < endVal;
  }) || routineItems[0];

  const handleSaveReflection = () => {
    onUpdateSelfCare({ reflectionNote: reflectionText });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'worship': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'work': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'study': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'rest': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      case 'family': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const completedCount = routineItems.filter(r => r.completed).length;
  const progressPct = Math.round((completedCount / routineItems.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Halimo’s Daily Routine & Self-Care
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          A balanced daily rhythm: 5:00 AM Fajr, professional career, dedicated 7:30 PM study, and wholesome rest.
        </p>
      </div>

      {/* Routine Active Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Current Daily Routine Block</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {activeRoutine.title}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium">
              {activeRoutine.somaliTitle}
            </p>
            <p className="text-xs text-slate-300 max-w-xl">
              {activeRoutine.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 block uppercase font-semibold">
              Today's Routine Pace
            </span>
            <span className="text-3xl font-extrabold text-emerald-400 tabular-nums">
              {completedCount} / {routineItems.length}
            </span>
            <span className="text-xs text-slate-400 block">
              blocks completed ({progressPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Self-Care Quick Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Water Tracker */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Water Hydration
              </span>
              <Droplet className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {selfCareState.waterGlasses} / {selfCareState.waterGoal}
              </span>
              <span className="text-xs text-slate-500">
                glasses ({selfCareState.waterGlasses * 250} ml)
              </span>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: selfCareState.waterGoal }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2.5 rounded-sm transition-all ${
                    i < selfCareState.waterGlasses ? 'bg-cyan-500' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onUpdateSelfCare({ waterGlasses: Math.max(0, selfCareState.waterGlasses - 1) })}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
              Goal: 2,000 ml
            </span>
            <button
              onClick={() => onUpdateSelfCare({ waterGlasses: Math.min(12, selfCareState.waterGlasses + 1) })}
              className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Steps / Walking */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Daily Walking & Steps
              </span>
              <Footprints className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {selfCareState.walkingSteps.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">/ 8,000 steps</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-2.5 rounded-full"
                style={{ width: `${Math.min(100, Math.round((selfCareState.walkingSteps / selfCareState.walkingGoal) * 100))}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500">{selfCareState.walkingMinutes} mins active</span>
            <button
              onClick={() => onUpdateSelfCare({ walkingSteps: selfCareState.walkingSteps + 500, walkingMinutes: selfCareState.walkingMinutes + 5 })}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold text-[11px] hover:bg-emerald-100"
            >
              +500 Steps
            </button>
          </div>
        </div>

        {/* Skincare Routine */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Skincare & Glow
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="mt-3 space-y-2">
              <label 
                onClick={() => onUpdateSelfCare({ skincareMorning: !selfCareState.skincareMorning })}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  selfCareState.skincareMorning ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {selfCareState.skincareMorning && <Check className="w-3 h-3" />}
                </div>
                <span>Morning Routine (Cleanser + Sunscreen)</span>
              </label>

              <label 
                onClick={() => onUpdateSelfCare({ skincareEvening: !selfCareState.skincareEvening })}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  selfCareState.skincareEvening ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {selfCareState.skincareEvening && <Check className="w-3 h-3" />}
                </div>
                <span>Evening Routine (Hydrate + Night Cream)</span>
              </label>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            Self-care brings barakah to your mind
          </div>
        </div>

        {/* Mindful Rest & Mental Decompression */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Rest & Personal Time
              </span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>

            <div className="mt-2">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                5:30 PM - 6:30 PM Block
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Decompression after work, herbal tea, mindful breathing, prayer recharge.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
            <span>Essential for study stamina</span>
            <span>Priority ✓</span>
          </div>
        </div>
      </div>

      {/* Main Routine Timeline & Reflection Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Complete 24h Timeline (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Halimo’s Daily Schedule (5:00 AM – 11:00 PM)
              </h3>
              <p className="text-xs text-slate-500">
                Click each checkpoint as you complete it during your day
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">
              {completedCount} of {routineItems.length} Done
            </span>
          </div>

          <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {routineItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleRoutineItem(item.id)}
                className={`relative pl-10 pr-4 py-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  item.completed
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-500 text-slate-800 dark:text-slate-200'
                }`}
              >
                {/* Timeline node icon */}
                <div className={`absolute left-2.5 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.completed 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-white dark:bg-slate-900 border-slate-400'
                }`}>
                  {item.completed && <Check className="w-2.5 h-2.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                      {item.timeRange}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.2 rounded border capitalize ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold mt-1 ${item.completed ? 'line-through text-slate-400' : ''}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {item.somaliTitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 self-center">
                  <span className={`text-xs font-semibold ${
                    item.completed ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {item.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Daily Gratitude & Reflection Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-amber-500" />
                Daily Reflection & Gratitude
              </h3>
              {isSaved && (
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Take a moment during your rest or wind-down block to reflect on what went well today, blessings from Allah, and your business goals.
            </p>

            <textarea
              rows={8}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Alhamdulillah for today... Today I learned eBay supplier sourcing and stayed on schedule..."
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleSaveReflection}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Journal Entry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
