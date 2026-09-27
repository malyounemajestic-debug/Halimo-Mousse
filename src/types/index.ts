export type NavSection = 
  | 'home'
  | 'courses'
  | 'progress'
  | 'planner'
  | 'calendar'
  | 'payments'
  | 'selfcare'
  | 'prayer'
  | 'adkaar'
  | 'quran'
  | 'notifications'
  | 'profile';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  instructions: string;
  score?: string;
}

export interface Course {
  id: string;
  title: string;
  somaliTitle: string;
  category: string;
  description: string;
  somaliDescription: string;
  instructor: string;
  thumbnailColor: string;
  accentColor: string;
  iconName: string;
  lessons: Lesson[];
  assignments: Assignment[];
  notes: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface StudyTask {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  date: string;
  durationMinutes: number;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  type: 'lesson' | 'assignment' | 'review' | 'research';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'study' | 'masterclass' | 'deadline' | 'payment' | 'mentor' | 'routine';
  description?: string;
  completed?: boolean;
}

export interface PaymentRecord {
  id: string;
  month: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'upcoming' | 'pending';
  method: string;
  notes?: string;
}

export interface RoutineItem {
  id: string;
  timeRange: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  title: string;
  somaliTitle: string;
  description: string;
  category: 'worship' | 'work' | 'prep' | 'study' | 'rest' | 'family';
  icon: string;
  completed: boolean;
}

export interface PrayerInfo {
  name: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  arabic: string;
  time: string;
  completed: boolean;
  sunnahCompleted?: boolean;
}

export interface DhikrItem {
  id: string;
  arabic: string;
  somaliTranslation: string;
  englishMeaning: string;
  transliteration: string;
  repeatCount: number;
  currentCount: number;
  benefit: string;
  somaliBenefit: string;
  audioClip?: string;
}

export interface QuranSurah {
  id: number;
  name: string;
  arabicName: string;
  englishMeaning: string;
  somaliMeaning: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  audioUrl: string;
  verses: {
    number: number;
    arabic: string;
    somali: string;
    english: string;
  }[];
  completed: boolean;
  lastReadVerse?: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  academyId: string;
  cohort: string;
  program: string;
  enrollmentDate: string;
  bio: string;
  goals: string[];
  theme: 'light' | 'dark';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  somaliMessage?: string;
  timestamp: string;
  type: 'academic' | 'payment' | 'worship' | 'routine' | 'general';
  read: boolean;
  link?: NavSection;
}
