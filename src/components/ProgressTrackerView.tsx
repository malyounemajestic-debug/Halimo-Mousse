import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Edit3, 
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import { Course } from '../types';
import { CourseDetailModal } from './CourseDetailModal';

interface ProgressTrackerViewProps {
  courses: Course[];
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onUpdateNotes: (courseId: string, notes: string) => void;
  onUpdateAssignmentStatus: (courseId: string, assignmentId: string, status: 'pending' | 'in_progress' | 'completed') => void;
}

export const ProgressTrackerView: React.FC<ProgressTrackerViewProps> = ({
  courses,
  onToggleLesson,
  onUpdateNotes,
  onUpdateAssignmentStatus
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewFilter, setViewFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessons = courses.reduce((acc, c) => acc + c.lessons.filter(l => l.completed).length, 0);
  const remainingLessons = totalLessons - completedLessons;
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // All assignments across courses
  const allAssignments = courses.flatMap(c => 
    c.assignments.map(a => ({ ...a, courseTitle: c.title, courseId: c.id }))
  );
  const completedAssignmentsCount = allAssignments.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Course Progress Tracker
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics, lesson completion breakdown, assignments, and study notes.
        </p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Overall Completion
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500">of curriculum</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-2 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed Lessons
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {completedLessons}
            </span>
            <span className="text-xs text-slate-500">/ {totalLessons} total</span>
          </div>
          <p className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Steady pacing across 9 modules
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Remaining Lessons
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {remainingLessons}
            </span>
            <span className="text-xs text-slate-500">lessons left</span>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Est. 28 study hours to complete
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Assignments Finished
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {completedAssignmentsCount}
            </span>
            <span className="text-xs text-slate-500">/ {allAssignments.length} submitted</span>
          </div>
          <p className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Mentor reviews up to date
          </p>
        </div>
      </div>

      {/* Courses Progress Detailed Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Course Breakdown & Status
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any course to manage lessons, review notes, or update assignments
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Course Module</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Completed / Total</th>
                <th className="py-3 px-4">Remaining</th>
                <th className="py-3 px-4 min-w-[140px]">Progress</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {courses.map((course) => {
                const completed = course.lessons.filter(l => l.completed).length;
                const total = course.lessons.length;
                const remaining = total - completed;
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                  <tr 
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {course.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {course.somaliTitle}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        pct === 100 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : pct > 0 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {pct === 100 ? 'Completed' : pct > 0 ? 'Active Study' : 'Not Started'}
                      </span>
                    </td>

                    <td className="py-4 px-4 tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                      {completed} / {total} lessons
                    </td>

                    <td className="py-4 px-4 tabular-nums text-slate-500 dark:text-slate-400">
                      {remaining} lessons
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold tabular-nums text-slate-700 dark:text-slate-300 w-9 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignments & Notes Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignments Hub */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Course Assignments & Submissions
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {completedAssignmentsCount} of {allAssignments.length} done
            </span>
          </div>

          <div className="space-y-3">
            {allAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {assignment.title}
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    {assignment.courseTitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {assignment.instructions}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                    assignment.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : assignment.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {assignment.status.replace('_', ' ')}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Due: {assignment.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Halimo's Study Notes Repository */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Halimo’s Course Notes & Key Insights
            </h3>
            <span className="text-xs text-slate-500">Auto-saved</span>
          </div>

          <div className="space-y-3">
            {courses.filter(c => c.notes && c.notes.trim().length > 0).map((course) => (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-emerald-500 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 italic line-clamp-3 leading-relaxed">
                  "{course.notes}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onToggleLesson={(courseId, lessonId) => {
            onToggleLesson(courseId, lessonId);
            setSelectedCourse(prev => prev ? {
              ...prev,
              lessons: prev.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
            } : null);
          }}
          onUpdateNotes={(courseId, notes) => {
            onUpdateNotes(courseId, notes);
            setSelectedCourse(prev => prev ? { ...prev, notes } : null);
          }}
          onUpdateAssignmentStatus={(courseId, assignmentId, status) => {
            onUpdateAssignmentStatus(courseId, assignmentId, status);
            setSelectedCourse(prev => prev ? {
              ...prev,
              assignments: prev.assignments.map(a => a.id === assignmentId ? { ...a, status } : a)
            } : null);
          }}
        />
      )}
    </div>
  );
};
