/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Clock, 
  CalendarDays, 
  CreditCard, 
  Heart, 
  CheckCircle2, 
  Volume2, 
  User, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { NavSection, Course, StudyTask, CalendarEvent, PaymentRecord, RoutineItem, PrayerInfo, AppNotification, StudentProfile } from './types';
import { initialCourses } from './data/coursesData';
import { initialStudyTasks, initialCalendarEvents } from './data/plannerData';
import { initialDailyRoutine, initialSelfCare, SelfCareState } from './data/routineData';
import { initialPrayerList } from './data/prayerData';
import { initialPaymentRecords } from './data/paymentData';
import { initialNotifications, initialStudentProfile } from './data/notificationsData';
import { getStorageItem, setStorageItem } from './utils/storage';

// Components
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HomeDashboard } from './components/HomeDashboard';
import { CoursesView } from './components/CoursesView';
import { ProgressTrackerView } from './components/ProgressTrackerView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { CalendarView } from './components/CalendarView';
import { PaymentTrackerView } from './components/PaymentTrackerView';
import { SelfCareRoutineView } from './components/SelfCareRoutineView';
import { PrayerTrackerView } from './components/PrayerTrackerView';
import { AdkaarView } from './components/AdkaarView';
import { QuranSectionView } from './components/QuranSectionView';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileView } from './components/ProfileView';

export default function App() {
  // Navigation state
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Audio status
  const [activeAudioTitle, setActiveAudioTitle] = useState<string | null>(null);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return getStorageItem('dark_mode', false);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStorageItem('dark_mode', isDarkMode);
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Persistent Domain States
  const [courses, setCourses] = useState<Course[]>(() => {
    return getStorageItem('courses', initialCourses);
  });

  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(() => {
    return getStorageItem('study_tasks', initialStudyTasks);
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    return getStorageItem('calendar_events', initialCalendarEvents);
  });

  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(() => {
    return getStorageItem('daily_routine', initialDailyRoutine);
  });

  const [selfCare, setSelfCare] = useState<SelfCareState>(() => {
    return getStorageItem('self_care', initialSelfCare);
  });

  const [prayers, setPrayers] = useState<PrayerInfo[]>(() => {
    return getStorageItem('prayer_times', initialPrayerList);
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    return getStorageItem('payments', initialPaymentRecords);
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    return getStorageItem('notifications', initialNotifications);
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    return getStorageItem('student_profile', initialStudentProfile);
  });

  // Save changes to storage
  useEffect(() => { setStorageItem('courses', courses); }, [courses]);
  useEffect(() => { setStorageItem('study_tasks', studyTasks); }, [studyTasks]);
  useEffect(() => { setStorageItem('calendar_events', calendarEvents); }, [calendarEvents]);
  useEffect(() => { setStorageItem('daily_routine', routineItems); }, [routineItems]);
  useEffect(() => { setStorageItem('self_care', selfCare); }, [selfCare]);
  useEffect(() => { setStorageItem('prayer_times', prayers); }, [prayers]);
  useEffect(() => { setStorageItem('payments', payments); }, [payments]);
  useEffect(() => { setStorageItem('notifications', notifications); }, [notifications]);
  useEffect(() => { setStorageItem('student_profile', profile); }, [profile]);

  // Handlers
  const handleToggleLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
        };
      }
      return course;
    }));
  };

  const handleUpdateCourseNotes = (courseId: string, notes: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return { ...course, notes };
      }
      return course;
    }));
  };

  const handleUpdateAssignmentStatus = (courseId: string, assignmentId: string, status: 'pending' | 'in_progress' | 'completed') => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          assignments: course.assignments.map(a => a.id === assignmentId ? { ...a, status } : a)
        };
      }
      return course;
    }));
  };

  const handleToggleTask = (taskId: string) => {
    setStudyTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleAddStudyTask = (taskData: Omit<StudyTask, 'id'>) => {
    const newTask: StudyTask = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    setStudyTasks(prev => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setStudyTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `ev-${Date.now()}`
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  const handleToggleCalendarEvent = (eventId: string) => {
    setCalendarEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return { ...ev, completed: !ev.completed };
      }
      return ev;
    }));
  };

  const handleRecordPayment = (paymentData: Omit<PaymentRecord, 'id'>) => {
    const newPayment: PaymentRecord = {
      ...paymentData,
      id: `pay-${Date.now()}`
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const handleToggleRoutineItem = (id: string) => {
    setRoutineItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  const handleUpdateSelfCare = (updates: Partial<SelfCareState>) => {
    setSelfCare(prev => ({ ...prev, ...updates }));
  };

  const handleAddWater = () => {
    setSelfCare(prev => ({
      ...prev,
      waterGlasses: Math.min(prev.waterGoal + 4, prev.waterGlasses + 1)
    }));
  };

  const handleTogglePrayer = (name: PrayerInfo['name'], isSunnah: boolean = false) => {
    setPrayers(prev => prev.map(prayer => {
      if (prayer.name === name) {
        if (isSunnah) {
          return { ...prayer, sunnahCompleted: !prayer.sunnahCompleted };
        } else {
          return { ...prayer, completed: !prayer.completed };
        }
      }
      return prayer;
    }));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSelectNotification = (notif: AppNotification) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setIsNotificationsOpen(false);
    if (notif.link) {
      setCurrentSection(notif.link);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Sidebar for Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(section) => setCurrentSection(section)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main Content Area (offset by sidebar on desktop) */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0 pb-16 lg:pb-0">
        {/* Top Navbar */}
        <TopNavbar
          currentSection={currentSection}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onSelectSection={(section) => setCurrentSection(section)}
          activeAudioTitle={activeAudioTitle}
        />

        {/* View Router */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {currentSection === 'home' && (
            <HomeDashboard
              studentName={profile.name}
              courses={courses}
              dailyTasks={studyTasks}
              onToggleTask={handleToggleTask}
              onAddTask={(title, courseId) => handleAddStudyTask({
                title,
                courseId,
                courseTitle: 'General Study',
                date: new Date().toISOString().split('T')[0],
                durationMinutes: 45,
                priority: 'high',
                completed: false,
                type: 'lesson'
              })}
              calendarEvents={calendarEvents}
              routineItems={routineItems}
              payments={payments}
              notifications={notifications}
              onSelectSection={(section) => setCurrentSection(section)}
              onSelectCourse={(course) => {
                setCurrentSection('courses');
              }}
              waterGlasses={selfCare.waterGlasses}
              onAddWater={handleAddWater}
            />
          )}

          {currentSection === 'courses' && (
            <CoursesView
              courses={courses}
              onToggleLesson={handleToggleLesson}
              onUpdateNotes={handleUpdateCourseNotes}
              onUpdateAssignmentStatus={handleUpdateAssignmentStatus}
            />
          )}

          {currentSection === 'progress' && (
            <ProgressTrackerView
              courses={courses}
              onToggleLesson={handleToggleLesson}
              onUpdateNotes={handleUpdateCourseNotes}
              onUpdateAssignmentStatus={handleUpdateAssignmentStatus}
            />
          )}

          {currentSection === 'planner' && (
            <StudyPlannerView
              tasks={studyTasks}
              courses={courses}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddStudyTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {currentSection === 'calendar' && (
            <CalendarView
              events={calendarEvents}
              onAddEvent={handleAddCalendarEvent}
              onToggleEvent={handleToggleCalendarEvent}
            />
          )}

          {currentSection === 'payments' && (
            <PaymentTrackerView
              payments={payments}
              onRecordPayment={handleRecordPayment}
            />
          )}

          {currentSection === 'selfcare' && (
            <SelfCareRoutineView
              routineItems={routineItems}
              onToggleRoutineItem={handleToggleRoutineItem}
              selfCareState={selfCare}
              onUpdateSelfCare={handleUpdateSelfCare}
            />
          )}

          {currentSection === 'prayer' && (
            <PrayerTrackerView
              prayers={prayers}
              onTogglePrayer={handleTogglePrayer}
              onOpenAdkaar={() => setCurrentSection('adkaar')}
            />
          )}

          {currentSection === 'adkaar' && (
            <AdkaarView />
          )}

          {currentSection === 'quran' && (
            <QuranSectionView
              onAudioPlayStateChange={(title) => setActiveAudioTitle(title)}
            />
          )}

          {currentSection === 'notifications' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                All Notifications
              </h1>
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                      <span className="text-xs text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
                    {n.somaliMessage && (
                      <p className="text-xs text-emerald-600 font-medium mt-1">{n.somaliMessage}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'profile' && (
            <ProfileView
              profile={profile}
              onUpdateProfile={(updated) => setProfile(prev => ({ ...prev, ...updated }))}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2">
        <button
          onClick={() => setCurrentSection('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentSection('courses')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'courses' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Courses</span>
        </button>

        <button
          onClick={() => setCurrentSection('selfcare')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'selfcare' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Routine</span>
        </button>

        <button
          onClick={() => setCurrentSection('prayer')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'prayer' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Prayer</span>
        </button>

        <button
          onClick={() => setCurrentSection('quran')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'quran' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Qur’an</span>
        </button>

        <button
          onClick={() => setCurrentSection('payments')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            currentSection === 'payments' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>$300</span>
        </button>
      </div>

      {/* Notifications Modal */}
      {isNotificationsOpen && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onSelectNotification={handleSelectNotification}
        />
      )}
    </div>
  );
}
