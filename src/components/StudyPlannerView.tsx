import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter, 
  Trash2, 
  Sparkles,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { StudyTask, Course } from '../types';
import { soundFeedback } from '../utils/audioService';

interface StudyPlannerViewProps {
  tasks: StudyTask[];
  courses: Course[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<StudyTask, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  tasks,
  courses,
  onToggleTask,
  onAddTask,
  onDeleteTask
}) => {
  const [plannerTab, setPlannerTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-ebay');
  const [taskDate, setTaskDate] = useState('2026-09-27');
  const [taskDuration, setTaskDuration] = useState(45);
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [taskType, setTaskType] = useState<'lesson' | 'assignment' | 'review' | 'research'>('lesson');

  // Focus Timer state (25 min default or 45 min deep work)
  const [timerDuration, setTimerDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      soundFeedback.playChime('complete');
      setIsTimerRunning(false);
      if (timerMode === 'focus') {
        alert("Masha'Allah! Deep work session completed. Take a 5-minute break.");
        setTimerMode('break');
        setTimeLeft(5 * 60);
      } else {
        alert("Break ended! Ready for another focused digital marketing sprint.");
        setTimerMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, timerMode]);

  const handleStartTimer = () => {
    soundFeedback.playChime('tap');
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = (minutes: number) => {
    setIsTimerRunning(false);
    setTimerDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setTimerMode('focus');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const course = courses.find(c => c.id === selectedCourseId);
    onAddTask({
      title: taskTitle.trim(),
      courseId: selectedCourseId,
      courseTitle: course ? course.title : 'General Study',
      date: taskDate,
      durationMinutes: Number(taskDuration),
      priority: taskPriority,
      completed: false,
      type: taskType
    });
    setTaskTitle('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (selectedPriority === 'all') return true;
    return t.priority === selectedPriority;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Study Planner & Timetable
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize daily study times, manage course deadlines, and stay focused.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Plan</span>
        </button>
      </div>

      {/* Focus Timer & Routine Sync Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-900/60 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>Halimo’s Study Focus Sprint (7:30 PM - 9:30 PM)</span>
            </div>
            <h2 className="text-xl font-bold">
              {timerMode === 'focus' ? 'Deep Work Focus Timer' : 'Mindful Rest Break'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use uninterrupted 25-minute or 45-minute sprints to study Somali Wealth Academy modules, test product listings, and master paid ads without distractions.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleResetTimer(25)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  timerDuration === 25 * 60 ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                25 Min Sprint
              </button>
              <button
                onClick={() => handleResetTimer(45)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  timerDuration === 45 * 60 ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                45 Min Deep Work
              </button>
              <button
                onClick={() => handleResetTimer(5)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200"
              >
                5 Min Break
              </button>
            </div>
          </div>

          {/* Digital Timer Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 shrink-0">
            <div className="text-5xl font-extrabold font-mono tracking-wider tabular-nums text-white">
              {formatTimer(timeLeft)}
            </div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
              {timerMode === 'focus' ? 'Focus Session' : 'Break Time'}
            </span>

            <div className="mt-4 flex items-center gap-3">
              {isTimerRunning ? (
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Sprint</span>
                </button>
              )}

              <button
                onClick={() => handleResetTimer(25)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Planner Views: Daily / Weekly / Monthly Switcher */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setPlannerTab('daily')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              plannerTab === 'daily'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Daily Plan
          </button>
          <button
            onClick={() => setPlannerTab('weekly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              plannerTab === 'weekly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Weekly Schedule
          </button>
          <button
            onClick={() => setPlannerTab('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              plannerTab === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Monthly Goals
          </button>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Tab 1: Daily Plan */}
      {plannerTab === 'daily' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Today’s Scheduled Tasks ({filteredTasks.filter(t => t.completed).length}/{filteredTasks.length} Completed)</span>
            <span>Focus Target: 2 Hours Daily</span>
          </div>

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                task.completed
                  ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs text-slate-800 dark:text-slate-200'
              }`}
            >
              <div 
                onClick={() => onToggleTask(task.id)}
                className="flex items-start gap-3 flex-1 cursor-pointer"
              >
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                  task.completed 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                }`}>
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <h4 className="text-sm font-bold leading-snug">
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {task.courseTitle}
                    </span>
                    <span>·</span>
                    <span className="tabular-nums font-mono">{task.durationMinutes} mins</span>
                    <span>·</span>
                    <span>Date: {task.date}</span>
                    <span>·</span>
                    <span className={`capitalize font-semibold ${
                      task.priority === 'high' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Weekly Schedule */}
      {plannerTab === 'weekly' && (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {day}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Sept {28 + i > 30 ? (28 + i - 30) : 28 + i}
                </div>
              </div>

              <div className="my-2 space-y-1.5 text-[11px]">
                {i === 0 && <span className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 block font-medium">eBay Cassinis SEO</span>}
                {i === 1 && <span className="p-1.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 block font-medium">TikTok Organic 8pm</span>}
                {i === 2 && <span className="p-1.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 block font-medium">AI Ad Scripts</span>}
                {i === 3 && <span className="p-1.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 block font-medium">KDP Keyword Audit</span>}
                {i === 4 && <span className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 block font-medium">Jum’ah & Review</span>}
                {i === 5 && <span className="p-1.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 block font-medium">Shopify Store Build</span>}
                {i === 6 && <span className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 block font-medium">Weekly Planning</span>}
              </div>

              <span className="text-[10px] text-slate-400 font-medium">
                2h Target
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Monthly Goals */}
      {plannerTab === 'monthly' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              E-Commerce Milestones
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Launch 10 live eBay Dropshipping listings
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Finalize branded Shopify store landing page
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                Generate first $1,000 in gross sales
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Amazon KDP & Digital Products
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Publish 3 low-content gratitude journals
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                Upload 5 Canva digital planner templates to Etsy
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                Set up Amazon Sponsored Ads for journals
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Spiritual & Routine Consistency
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Fajr prayer on time at 5:00 AM daily
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Recite Surah Al-Mulk every evening before sleep
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Complete Morning & Evening Adkaar daily
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add New Study Task / Plan
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Study Lesson 03: TikTok Ad Creatives..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Course Module
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    step="5"
                    value={taskDuration}
                    onChange={(e) => setTaskDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
