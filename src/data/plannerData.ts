import { StudyTask, CalendarEvent } from '../types';

export const initialStudyTasks: StudyTask[] = [
  {
    id: 'st-1',
    title: 'Watch Lesson 04: eBay Title SEO & Cassinis Algorithm',
    courseId: 'course-ebay',
    courseTitle: 'eBay Dropshipping',
    date: '2026-09-27',
    durationMinutes: 45,
    priority: 'high',
    completed: true,
    type: 'lesson'
  },
  {
    id: 'st-2',
    title: 'Review Shopify Dropshipping Assignment: TikTok Organic Hooks',
    courseId: 'course-shopify',
    courseTitle: 'Shopify Dropshipping',
    date: '2026-09-27',
    durationMinutes: 45,
    priority: 'high',
    completed: false,
    type: 'assignment'
  },
  {
    id: 'st-3',
    title: 'Generate 5 Midjourney ad concepts for winning beauty gadget',
    courseId: 'course-ai-marketing',
    courseTitle: 'AI for Digital Marketing',
    date: '2026-09-28',
    durationMinutes: 30,
    priority: 'medium',
    completed: false,
    type: 'research'
  },
  {
    id: 'st-4',
    title: 'Research Amazon KDP low-competition coloring book keywords',
    courseId: 'course-amazon-kdp',
    courseTitle: 'Amazon KDP',
    date: '2026-09-29',
    durationMinutes: 45,
    priority: 'medium',
    completed: false,
    type: 'research'
  },
  {
    id: 'st-5',
    title: 'Study DAT One load board negotiation simulation module',
    courseId: 'course-truck-dispatch',
    courseTitle: 'Truck Dispatching',
    date: '2026-09-30',
    durationMinutes: 60,
    priority: 'high',
    completed: false,
    type: 'lesson'
  },
  {
    id: 'st-6',
    title: 'Weekly Revision: Review notes on Meta Ads CBO campaigns',
    courseId: 'course-digital-marketing-core',
    courseTitle: 'SWA Digital Marketing Core',
    date: '2026-10-01',
    durationMinutes: 40,
    priority: 'medium',
    completed: false,
    type: 'review'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Digital Marketing Evening Focus Session (7:30 PM - 9:30 PM)',
    date: '2026-09-27',
    time: '19:30',
    category: 'study',
    description: 'Halimo’s core study block: eBay listing & product research.',
    completed: false
  },
  {
    id: 'ev-2',
    title: 'Live SWA Masterclass: TikTok Shop Scaling with Mentor Guled',
    date: '2026-09-29',
    time: '20:00',
    category: 'masterclass',
    description: 'Interactive Zoom masterclass with live Q&A for active students.',
    completed: false
  },
  {
    id: 'ev-3',
    title: 'Assignment Deadline: 5 Validated eBay Products',
    date: '2026-10-02',
    time: '23:59',
    category: 'deadline',
    description: 'Submit your supplier sheets and profit margin calculations in portal.',
    completed: false
  },
  {
    id: 'ev-4',
    title: 'Monthly Academy Tuition Fee Due ($300)',
    date: '2026-10-05',
    time: '12:00',
    category: 'payment',
    description: 'Month 4 tuition installment due date. Auto-pay or manual invoice transfer.',
    completed: false
  },
  {
    id: 'ev-5',
    title: '1-on-1 Mentor Office Hours with Eng. Abdullahi',
    date: '2026-10-07',
    time: '18:00',
    category: 'mentor',
    description: 'Review live Shopify store audit, conversion optimization, and ad copy review.',
    completed: false
  },
  {
    id: 'ev-6',
    title: 'Amazon KDP Paperback Interior & Cover Upload Deadline',
    date: '2026-10-12',
    time: '23:59',
    category: 'deadline',
    description: 'Publish your first low-content journal to Amazon marketplace.',
    completed: false
  },
  {
    id: 'ev-7',
    title: 'Logistics Simulation: Live Freight Broker Call Practice',
    date: '2026-10-20',
    time: '19:30',
    category: 'masterclass',
    description: 'Roleplay session booking freight on DAT board with senior dispatchers.',
    completed: false
  }
];
