import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ShoppingBag, 
  Store, 
  TrendingUp, 
  Truck, 
  Sparkles, 
  Cpu, 
  Youtube, 
  Shirt, 
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { Course } from '../types';
import { CourseDetailModal } from './CourseDetailModal';

interface CoursesViewProps {
  courses: Course[];
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onUpdateNotes: (courseId: string, notes: string) => void;
  onUpdateAssignmentStatus: (courseId: string, assignmentId: string, status: 'pending' | 'in_progress' | 'completed') => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onToggleLesson,
  onUpdateNotes,
  onUpdateAssignmentStatus
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: 'Marketing Core', label: 'Digital Marketing' },
    { id: 'Technology', label: 'AI & Automation' },
    { id: 'Self-Publishing', label: 'Amazon KDP' },
    { id: 'Logistics', label: 'Truck Dispatch' },
    { id: 'Media & Branding', label: 'YouTube' }
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.somaliTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return ShoppingBag;
      case 'Store': return Store;
      case 'BookOpen': return BookOpen;
      case 'Cpu': return Cpu;
      case 'Youtube': return Youtube;
      case 'Truck': return Truck;
      case 'Sparkles': return Sparkles;
      case 'Shirt': return Shirt;
      default: return TrendingUp;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Somali Wealth Academy Courses
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete curriculum tailored for high-ticket online wealth creation and digital marketing.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, skills, or topics..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              categoryFilter === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const Icon = getCourseIcon(course.iconName);
          const completedCount = course.lessons.filter(l => l.completed).length;
          const totalCount = course.lessons.length;
          const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const assignmentsCount = course.assignments.length;

          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all cursor-pointer shadow-xs hover:shadow-md group overflow-hidden"
            >
              {/* Card Color Accent Header */}
              <div className={`p-4 bg-gradient-to-r ${course.thumbnailColor} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/20 backdrop-blur-xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-100 block">
                      {course.category}
                    </span>
                    <span className="text-xs text-white/90">
                      {course.instructor}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold tabular-nums">
                    {progressPct}%
                  </span>
                  <span className="block text-[10px] text-white/80 uppercase">
                    Done
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {course.somaliTitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>{completedCount} of {totalCount} Lessons Complete</span>
                    <span className="tabular-nums font-semibold">{totalCount - completedCount} Left</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {assignmentsCount} Assignments
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Study Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onToggleLesson={(courseId, lessonId) => {
            onToggleLesson(courseId, lessonId);
            // Update local state in modal
            setSelectedCourse(prev => {
              if (!prev) return null;
              return {
                ...prev,
                lessons: prev.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
              };
            });
          }}
          onUpdateNotes={(courseId, notes) => {
            onUpdateNotes(courseId, notes);
            setSelectedCourse(prev => prev ? { ...prev, notes } : null);
          }}
          onUpdateAssignmentStatus={(courseId, assignmentId, status) => {
            onUpdateAssignmentStatus(courseId, assignmentId, status);
            setSelectedCourse(prev => {
              if (!prev) return null;
              return {
                ...prev,
                assignments: prev.assignments.map(a => a.id === assignmentId ? { ...a, status } : a)
              };
            });
          }}
        />
      )}
    </div>
  );
};
