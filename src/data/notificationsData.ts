import { AppNotification, StudentProfile } from '../types';

export const initialStudentProfile: StudentProfile = {
  name: 'Halimo Mousse',
  email: 'moussehalimo36@gmail.com',
  phone: '+1 (612) 555-0198',
  academyId: 'SWA-2026-HM92',
  cohort: 'Fall 2026 Executive Cohort',
  program: 'Digital Marketing, E-Commerce & Wealth Mastery',
  enrollmentDate: 'July 1, 2026',
  bio: 'Driven professional, student, and aspiring Somali digital entrepreneur balancing career, family, daily worship, and mastering digital wealth creation through Somali Wealth Academy.',
  goals: [
    'Build a consistent $5,000/month recurring income through eBay & Shopify dropshipping',
    'Publish 10 evergreen low-content journals on Amazon KDP',
    'Master TikTok Organic and Meta Ad conversion funnels',
    'Maintain daily 5 prayers on time with Fajr routine, Adkaar, and Qur’an recitation',
    'Achieve financial freedom to support my family and community'
  ],
  theme: 'light'
};

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Live Masterclass Alert',
    somaliMessage: 'Casharka tooska ah ee Zoom-ka wuxuu bilaabanayaa Talaadada 8:00 PM.',
    message: 'Live Zoom Masterclass: "Scaling TikTok Organic & Shop Integration" with Mentor Guled this Tuesday at 8:00 PM.',
    timestamp: '2 hours ago',
    type: 'academic',
    read: false,
    link: 'calendar'
  },
  {
    id: 'notif-2',
    title: 'Upcoming Tuition Reminder ($300)',
    somaliMessage: 'Xusuusin: Lacag-bixinta bisha Oktoobar ($300) waxay ku egtahay 5-ta bisha.',
    message: 'Monthly school fee payment ($300.00) is scheduled for October 5, 2026. Auto-pay is active.',
    timestamp: '5 hours ago',
    type: 'payment',
    read: false,
    link: 'payments'
  },
  {
    id: 'notif-3',
    title: 'Assignment Feedback Available',
    somaliMessage: 'Macallinkaaga ayaa qiimeeyay shaqadaadii eBay Dropshipping (95/100).',
    message: 'Your assignment "5 Validated eBay Dropshipping Products" was reviewed by Eng. Abdullahi: Grade 95/100.',
    timestamp: '1 day ago',
    type: 'academic',
    read: true,
    link: 'progress'
  },
  {
    id: 'notif-4',
    title: 'Daily Study Block Reminder',
    somaliMessage: 'Waqtiga waxbarashada SWA wuxuu bilaabmayaa 7:30 PM.',
    message: 'Your dedicated 2-hour digital marketing study block starts at 7:30 PM today after dinner.',
    timestamp: '1 day ago',
    type: 'routine',
    read: true,
    link: 'selfcare'
  }
];
