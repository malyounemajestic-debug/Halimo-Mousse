import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Bell, 
  CheckCircle2, 
  CreditCard, 
  Video, 
  FileText,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onToggleEvent: (eventId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onAddEvent,
  onToggleEvent
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-27');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-09-27');
  const [time, setTime] = useState('19:30');
  const [category, setCategory] = useState<'study' | 'masterclass' | 'deadline' | 'payment' | 'mentor'>('study');
  const [description, setDescription] = useState('');

  // 35 days grid representing late Sept to early Oct 2026
  const calendarDays = [
    { day: 24, month: 'Aug', dateStr: '2026-08-24', isCurrentMonth: false },
    { day: 25, month: 'Aug', dateStr: '2026-08-25', isCurrentMonth: false },
    { day: 26, month: 'Aug', dateStr: '2026-08-26', isCurrentMonth: false },
    { day: 27, month: 'Aug', dateStr: '2026-08-27', isCurrentMonth: false },
    { day: 28, month: 'Aug', dateStr: '2026-08-28', isCurrentMonth: false },
    { day: 29, month: 'Aug', dateStr: '2026-08-29', isCurrentMonth: false },
    { day: 30, month: 'Aug', dateStr: '2026-08-30', isCurrentMonth: false },
    { day: 31, month: 'Aug', dateStr: '2026-08-31', isCurrentMonth: false },
    { day: 1, month: 'Sep', dateStr: '2026-09-01', isCurrentMonth: true },
    { day: 2, month: 'Sep', dateStr: '2026-09-02', isCurrentMonth: true },
    { day: 3, month: 'Sep', dateStr: '2026-09-03', isCurrentMonth: true },
    { day: 4, month: 'Sep', dateStr: '2026-09-04', isCurrentMonth: true },
    { day: 5, month: 'Sep', dateStr: '2026-09-05', isCurrentMonth: true },
    { day: 6, month: 'Sep', dateStr: '2026-09-06', isCurrentMonth: true },
    { day: 7, month: 'Sep', dateStr: '2026-09-07', isCurrentMonth: true },
    { day: 8, month: 'Sep', dateStr: '2026-09-08', isCurrentMonth: true },
    { day: 9, month: 'Sep', dateStr: '2026-09-09', isCurrentMonth: true },
    { day: 10, month: 'Sep', dateStr: '2026-09-10', isCurrentMonth: true },
    { day: 11, month: 'Sep', dateStr: '2026-09-11', isCurrentMonth: true },
    { day: 12, month: 'Sep', dateStr: '2026-09-12', isCurrentMonth: true },
    { day: 13, month: 'Sep', dateStr: '2026-09-13', isCurrentMonth: true },
    { day: 14, month: 'Sep', dateStr: '2026-09-14', isCurrentMonth: true },
    { day: 15, month: 'Sep', dateStr: '2026-09-15', isCurrentMonth: true },
    { day: 16, month: 'Sep', dateStr: '2026-09-16', isCurrentMonth: true },
    { day: 17, month: 'Sep', dateStr: '2026-09-17', isCurrentMonth: true },
    { day: 18, month: 'Sep', dateStr: '2026-09-18', isCurrentMonth: true },
    { day: 19, month: 'Sep', dateStr: '2026-09-19', isCurrentMonth: true },
    { day: 20, month: 'Sep', dateStr: '2026-09-20', isCurrentMonth: true },
    { day: 21, month: 'Sep', dateStr: '2026-09-21', isCurrentMonth: true },
    { day: 22, month: 'Sep', dateStr: '2026-09-22', isCurrentMonth: true },
    { day: 23, month: 'Sep', dateStr: '2026-09-23', isCurrentMonth: true },
    { day: 24, month: 'Sep', dateStr: '2026-09-24', isCurrentMonth: true },
    { day: 25, month: 'Sep', dateStr: '2026-09-25', isCurrentMonth: true },
    { day: 26, month: 'Sep', dateStr: '2026-09-26', isCurrentMonth: true },
    { day: 27, month: 'Sep', dateStr: '2026-09-27', isCurrentMonth: true, isToday: true },
    { day: 28, month: 'Sep', dateStr: '2026-09-28', isCurrentMonth: true },
    { day: 29, month: 'Sep', dateStr: '2026-09-29', isCurrentMonth: true },
    { day: 30, month: 'Sep', dateStr: '2026-09-30', isCurrentMonth: true },
    { day: 1, month: 'Oct', dateStr: '2026-10-01', isCurrentMonth: false },
    { day: 2, month: 'Oct', dateStr: '2026-10-02', isCurrentMonth: false },
    { day: 3, month: 'Oct', dateStr: '2026-10-03', isCurrentMonth: false },
    { day: 4, month: 'Oct', dateStr: '2026-10-04', isCurrentMonth: false },
    { day: 5, month: 'Oct', dateStr: '2026-10-05', isCurrentMonth: false },
    { day: 6, month: 'Oct', dateStr: '2026-10-06', isCurrentMonth: false },
    { day: 7, month: 'Oct', dateStr: '2026-10-07', isCurrentMonth: false }
  ];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddEvent({
      title: title.trim(),
      date,
      time,
      category,
      description: description.trim(),
      completed: false
    });
    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  const dayEvents = events.filter(e => e.date === selectedDate);
  const filteredEvents = events.filter(e => {
    if (categoryFilter === 'all') return true;
    return e.category === categoryFilter;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'payment': return 'bg-amber-500 text-white';
      case 'masterclass': return 'bg-blue-600 text-white';
      case 'deadline': return 'bg-rose-600 text-white';
      case 'mentor': return 'bg-purple-600 text-white';
      default: return 'bg-emerald-600 text-white';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Smart Calendar & Reminders
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Masterclasses, assignments deadlines, 1-on-1 mentor calls, and tuition dates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Reminder / Event</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Events' },
          { id: 'study', label: 'Study Sessions' },
          { id: 'masterclass', label: 'Live Masterclasses' },
          { id: 'deadline', label: 'Homework & Deadlines' },
          { id: 'payment', label: 'Tuition Dates ($300)' },
          { id: 'mentor', label: '1-on-1 Mentor Calls' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              categoryFilter === cat.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid + Day Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Monthly Grid (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-600" />
              September – October 2026
            </h2>

            <div className="text-xs text-slate-500 font-medium">
              Click day to view agenda
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mt-4 text-center text-xs font-semibold uppercase text-slate-400">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1.5 mt-2">
            {calendarDays.map((item) => {
              const dayEvs = events.filter(e => e.date === item.dateStr);
              const isSelected = selectedDate === item.dateStr;

              return (
                <div
                  key={item.dateStr}
                  onClick={() => setSelectedDate(item.dateStr)}
                  className={`min-h-[78px] p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : item.isToday
                      ? 'border-emerald-500 bg-slate-50 dark:bg-slate-800/80 font-bold'
                      : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  } ${!item.isCurrentMonth ? 'opacity-40' : ''}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold tabular-nums ${item.isToday ? 'text-emerald-600 font-extrabold' : ''}`}>
                      {item.day}
                    </span>
                    {item.isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </div>

                  {/* Day mini event chips */}
                  <div className="space-y-1 mt-1">
                    {dayEvs.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-semibold px-1 py-0.5 rounded truncate ${getCategoryColor(ev.category)}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvs.length > 2 && (
                      <div className="text-[9px] text-slate-500 font-bold">
                        +{dayEvs.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Agenda Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Selected Day Agenda
              </h3>
              <span className="text-xs text-emerald-600 font-semibold tabular-nums">
                {selectedDate}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {dayEvents.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No scheduled deadlines on this date.
                  <button
                    onClick={() => {
                      setDate(selectedDate);
                      setShowAddModal(true);
                    }}
                    className="block mx-auto mt-2 text-emerald-600 font-semibold hover:underline"
                  >
                    + Add a study reminder
                  </button>
                </div>
              ) : (
                dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getCategoryColor(ev.category)}`}>
                        {ev.category}
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                        {ev.time}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ev.title}
                    </h4>

                    {ev.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {ev.description}
                      </p>
                    )}

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <button
                        onClick={() => onToggleEvent(ev.id)}
                        className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{ev.completed ? 'Mark Pending' : 'Mark Completed'}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              Auto-Reminder Active:
            </span>
            Alarms are synced with your daily 7:30 PM Digital Marketing study routine block.
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add Calendar Event / Deadline
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Live Q&A Session with Eng. Abdullahi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="study">Study Focus Session</option>
                  <option value="masterclass">Live SWA Masterclass</option>
                  <option value="deadline">Homework / Assignment Deadline</option>
                  <option value="payment">Tuition Installment ($300)</option>
                  <option value="mentor">1-on-1 Mentor Office Hours</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes, Zoom link, preparation requirements..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
