import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Heart, 
  Volume2, 
  Plus, 
  AlertCircle,
  Play,
  TrendingUp,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Course, RoutineItem, StudyTask, CalendarEvent, AppNotification, NavSection, PaymentRecord } from '../types';

interface HomeDashboardProps {
  studentName: string;
  courses: Course[];
  dailyTasks: StudyTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, courseId: string) => void;
  calendarEvents: CalendarEvent[];
  routineItems: RoutineItem[];
  payments: PaymentRecord[];
  notifications: AppNotification[];
  onSelectSection: (section: NavSection) => void;
  onSelectCourse: (course: Course) => void;
  waterGlasses: number;
  onAddWater: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  studentName,
  courses,
  dailyTasks,
  onToggleTask,
  onAddTask,
  calendarEvents,
  routineItems,
  payments,
  notifications,
  onSelectSection,
  onSelectCourse,
  waterGlasses,
  onAddWater
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Calculate learning progress metrics
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessons = courses.reduce((acc, c) => acc + c.lessons.filter(l => l.completed).length, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Active routine block detection
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMinute;

  const currentRoutine = routineItems.find(item => {
    const startVal = item.startHour * 60 + item.startMinute;
    let endVal = item.endHour * 60 + item.endMinute;
    if (endVal < startVal) endVal += 24 * 60; // Crosses midnight
    return currentTimeVal >= startVal && currentTimeVal < endVal;
  }) || routineItems[0];

  // Upcoming deadlines (next 7 days)
  const upcomingDeadlines = calendarEvents
    .filter(e => e.category === 'deadline' || e.category === 'masterclass' || e.category === 'payment')
    .slice(0, 4);

  // Next payment
  const nextPayment = payments.find(p => p.status === 'upcoming') || payments[3];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), courses[0]?.id || 'course-ebay');
    setNewTaskTitle('');
  };

  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 border border-emerald-900/60 shadow-lg">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Somali Wealth Academy · Digital Marketing & Wealth Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ku soo dhawoow, {studentName}!
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Welcome back to your executive learning dashboard. Your commitment to faith, daily routine, and mastering digital wealth is paving your path to financial freedom.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {todayDateStr}
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                14-Day Study Streak
              </span>
              <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Executive Cohort
              </span>
            </div>
          </div>

          {/* Quick Action Hub */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onSelectSection('courses')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md shadow-emerald-900/40"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectSection('quran')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-medium text-sm transition-all"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Listen to Qur’an</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Course Progress */}
        <div 
          onClick={() => onSelectSection('progress')}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Overall Progress
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({completedLessons}/{totalLessons} lessons)
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-between">
            <span>Active: eBay & Shopify</span>
            <span className="group-hover:translate-x-0.5 transition-transform">View &rarr;</span>
          </div>
        </div>

        {/* Metric 2: Today's Routine Block */}
        <div 
          onClick={() => onSelectSection('selfcare')}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Routine Block
            </span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
              {currentRoutine.title}
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium tabular-nums block mt-0.5">
              {currentRoutine.timeRange}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Next: SWA Study Focus</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Full Routine &rarr;</span>
          </div>
        </div>

        {/* Metric 3: Tuition & Fee Status */}
        <div 
          onClick={() => onSelectSection('payments')}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tuition Status
            </span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              $300<span className="text-sm font-normal text-slate-500">/mo</span>
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
              Paid (Sept)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Next Due: {nextPayment.dueDate}</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">Invoices &rarr;</span>
          </div>
        </div>

        {/* Metric 4: Daily Self-Care & Water */}
        <div 
          onClick={() => onSelectSection('selfcare')}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Hydration & Wellness
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddWater();
              }}
              className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
              title="Add 1 glass of water"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {waterGlasses} / 8
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              glasses ({waterGlasses * 250} ml)
            </span>
          </div>
          {/* Glass dots */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-2 rounded-sm transition-colors ${
                  i < waterGlasses ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-[11px] text-teal-600 dark:text-teal-400 font-medium flex items-center justify-between">
            <span>Tap + to log drink</span>
            <span>Self-Care &rarr;</span>
          </div>
        </div>
      </div>

      {/* 3. Main Content Split: Daily Tasks & Academy Curriculum Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols on lg): Daily Tasks & Study Focus */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Tasks Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Today’s Study & Practice Tasks
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tasks for Halimo’s evening study focus (7:30 PM - 9:30 PM)
                </p>
              </div>

              <button
                onClick={() => onSelectSection('planner')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 shrink-0"
              >
                <span>Open Full Planner</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Task list */}
            <div className="mt-4 space-y-2.5">
              {dailyTasks.slice(0, 5).map((task) => (
                <div 
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    task.completed 
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 line-through'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 text-slate-800 dark:text-slate-200 shadow-2xs'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                    task.completed 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {task.courseTitle}
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">{task.durationMinutes} mins</span>
                      <span>·</span>
                      <span className={`capitalize ${
                        task.priority === 'high' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add task quick form */}
            <form onSubmit={handleCreateTask} className="mt-4 flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new study task or review goal for today..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </form>
          </div>

          {/* Quick Course Grid Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Somali Wealth Academy Courses
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  High-income digital skills tailored for the global marketplace
                </p>
              </div>

              <button
                onClick={() => onSelectSection('courses')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View All 9 Courses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {courses.slice(0, 4).map((course) => {
                const completed = course.lessons.filter(l => l.completed).length;
                const total = course.lessons.length;
                const pct = Math.round((completed / total) * 100);

                return (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-600 bg-slate-50/50 dark:bg-slate-800/40 transition-all cursor-pointer hover:shadow-xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">
                        {course.category}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                        {pct}%
                      </span>
                    </div>

                    <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {course.somaliTitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{completed}/{total} Lessons</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400 group-hover:underline">
                        Open &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines, Reminders & Islamic Worship Quick Hub */}
        <div className="space-y-6">
          {/* Upcoming Deadlines & Reminders */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Deadlines & Reminders
              </h2>
              <button
                onClick={() => onSelectSection('calendar')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Calendar &rarr;
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {upcomingDeadlines.map((ev) => (
                <div 
                  key={ev.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/50 flex items-start gap-3"
                >
                  <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                    ev.category === 'payment' 
                      ? 'bg-amber-500' 
                      : ev.category === 'masterclass' 
                      ? 'bg-blue-500' 
                      : 'bg-rose-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {ev.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{ev.date}</span>
                      <span>·</span>
                      <span className="tabular-nums">{ev.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Worship & Adkaar Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-semibold tracking-wider text-emerald-200 uppercase">
                    Faith & Routine
                  </span>
                </div>
                <button
                  onClick={() => onSelectSection('prayer')}
                  className="text-xs text-amber-300 hover:text-white transition-colors"
                >
                  5 Prayers &rarr;
                </button>
              </div>

              <h3 className="mt-2 text-lg font-bold text-white">
                Daily Adkaar & Qur’an
              </h3>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed">
                "O you who believe, remember Allah with much remembrance." Protect your day with morning and evening dhikr and heartfelt Qur’an recitation.
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-800/60 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectSection('adkaar')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-center transition-colors"
                >
                  Morning Adkaar
                </button>
                <button
                  onClick={() => onSelectSection('adkaar')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-center transition-colors"
                >
                  Evening Adkaar
                </button>
              </div>
            </div>
          </div>

          {/* Important Academy Notification Banner */}
          {notifications.length > 0 && (
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">{notifications[0].title}</span>
                  <p className="mt-0.5 text-amber-800 dark:text-amber-300 line-clamp-2">
                    {notifications[0].message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
