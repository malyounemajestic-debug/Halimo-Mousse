import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  FileText, 
  BookOpen, 
  Clock, 
  Calendar, 
  Award, 
  Save, 
  Check, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Course, Lesson, Assignment } from '../types';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onUpdateNotes: (courseId: string, notes: string) => void;
  onUpdateAssignmentStatus: (courseId: string, assignmentId: string, status: 'pending' | 'in_progress' | 'completed') => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onToggleLesson,
  onUpdateNotes,
  onUpdateAssignmentStatus
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'notes'>('lessons');
  const [notesText, setNotesText] = useState(course.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const completedCount = course.lessons.filter(l => l.completed).length;
  const totalCount = course.lessons.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSaveNotes = () => {
    onUpdateNotes(course.id, notesText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${course.thumbnailColor} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <span>{course.category}</span>
            <span>·</span>
            <span>Somali Wealth Academy</span>
          </div>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            {course.title}
          </h2>
          <p className="text-emerald-100 text-sm mt-0.5 font-medium">
            {course.somaliTitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/90">
            <span>Instructor: <strong>{course.instructor}</strong></span>
            <span>·</span>
            <span>Status: <strong className="capitalize">{course.status}</strong></span>
            <span>·</span>
            <span className="tabular-nums font-semibold">{completedCount}/{totalCount} Completed ({progressPct}%)</span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons ({completedCount}/{totalCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'assignments'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Assignments ({course.assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'notes'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Halimo’s Study Notes</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {activeTab === 'lessons' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Click any lesson checkbox to mark it as completed or review:
              </div>

              {course.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => onToggleLesson(course.id, lesson.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    lesson.completed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <button
                    className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-md border shrink-0 transition-colors ${
                      lesson.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-transparent" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-bold ${
                        lesson.completed 
                          ? 'text-emerald-900 dark:text-emerald-200' 
                          : 'text-slate-900 dark:text-white'
                      }`}>
                        {lesson.title}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 tabular-nums">
                        {lesson.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Practical exercises and real-world submissions evaluated by SWA mentors:
              </div>

              {course.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {assignment.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {assignment.score && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Score: {assignment.score}
                        </span>
                      )}
                      <select
                        value={assignment.status}
                        onChange={(e) => onUpdateAssignmentStatus(course.id, assignment.id, e.target.value as 'pending' | 'in_progress' | 'completed')}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {assignment.instructions}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Due Date: {assignment.dueDate}
                    </span>
                    <span className={`capitalize font-semibold ${
                      assignment.status === 'completed' 
                        ? 'text-emerald-600' 
                        : assignment.status === 'in_progress'
                        ? 'text-blue-600'
                        : 'text-amber-600'
                    }`}>
                      Status: {assignment.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Write study summaries, supplier links, ad copy notes, and formulas:
                </span>
                {isSaved && (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Saved!
                  </span>
                )}
              </div>

              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                rows={8}
                placeholder="Write your study notes, supplier contacts, strategy ideas..."
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Somali Wealth Academy Student Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
