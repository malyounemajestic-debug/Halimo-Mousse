import { RoutineItem } from '../types';

export const initialDailyRoutine: RoutineItem[] = [
  {
    id: 'rt-1',
    timeRange: '5:00 AM - 5:30 AM',
    startHour: 5,
    startMinute: 0,
    endHour: 5,
    endMinute: 30,
    title: 'Wake up, Wudu & Fajr Prayer',
    somaliTitle: 'Toosidda Subaxdii, Weysada & Tukashada Salaadda Subax',
    description: 'Begin the blessed morning with Fajr prayer, morning Adkaar, and gratitude for another day.',
    category: 'worship',
    icon: 'Sun',
    completed: true
  },
  {
    id: 'rt-2',
    timeRange: '5:30 AM - 6:00 AM',
    startHour: 5,
    startMinute: 30,
    endHour: 6,
    endMinute: 0,
    title: 'Get Ready & Prepare Lunch',
    somaliTitle: 'Isu Diyaarinta Shaqada & Karinta Qadada',
    description: 'Morning skincare routine, dressing up, packing wholesome lunch, and filling water bottle.',
    category: 'prep',
    icon: 'Coffee',
    completed: true
  },
  {
    id: 'rt-3',
    timeRange: '6:00 AM - 7:00 AM',
    startHour: 6,
    startMinute: 0,
    endHour: 7,
    endMinute: 0,
    title: 'Leave Home & Commute to Work',
    somaliTitle: 'Ka Bixidda Guriga & Tagidda Goobta Shaqada',
    description: 'Listen to Quran recitation or marketing podcast during transit. Safe travel supplication.',
    category: 'prep',
    icon: 'Compass',
    completed: true
  },
  {
    id: 'rt-4',
    timeRange: '7:00 AM - 4:30 PM',
    startHour: 7,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    title: 'Work Hours & Professional Duties (with Dhuhr)',
    somaliTitle: 'Saacadaha Shaqada & Waajibaadka Xirfadeed',
    description: 'Fulfill work with excellence (Ihsan), take lunch break, pray Dhuhr, and stay hydrated.',
    category: 'work',
    icon: 'Briefcase',
    completed: false
  },
  {
    id: 'rt-5',
    timeRange: '4:30 PM - 5:00 PM',
    startHour: 16,
    startMinute: 30,
    endHour: 17,
    endMinute: 0,
    title: 'Finish Work & Return Home',
    somaliTitle: 'Dhameynta Shaqada & Ku Soo Laabashada Guriga',
    description: 'Wrap up daily work tasks, commute home safely, switch mindset to home and study.',
    category: 'prep',
    icon: 'Home',
    completed: false
  },
  {
    id: 'rt-6',
    timeRange: '5:00 PM - 5:30 PM',
    startHour: 17,
    startMinute: 0,
    endHour: 17,
    endMinute: 30,
    title: 'Arrive Home & Asr Prayer',
    somaliTitle: 'Soo Gaaridda Guriga & Tukashada Salaadda Casar',
    description: 'Arrive home peacefully, make fresh wudu, pray Asr, and recite evening protection Adkaar.',
    category: 'worship',
    icon: 'ShieldCheck',
    completed: false
  },
  {
    id: 'rt-7',
    timeRange: '5:30 PM - 6:30 PM',
    startHour: 17,
    startMinute: 30,
    endHour: 18,
    endMinute: 30,
    title: 'Rest & Decompression (Self-Care)',
    somaliTitle: 'Nasasho & Dib u Soo Kabashada Maskaxda',
    description: 'Unwind, drink herbal tea, 20-min mindful walking or stretching, and mental refresh.',
    category: 'rest',
    icon: 'Heart',
    completed: false
  },
  {
    id: 'rt-8',
    timeRange: '6:30 PM - 7:30 PM',
    startHour: 18,
    startMinute: 30,
    endHour: 19,
    endMinute: 30,
    title: 'Prepare Dinner, Eat & Maghrib Prayer',
    somaliTitle: 'Diyaarinta Cashada & Tukashada Salaadda Maghrib',
    description: 'Nourishing dinner preparation, mindful dining, and praying Maghrib on time.',
    category: 'prep',
    icon: 'Utensils',
    completed: false
  },
  {
    id: 'rt-9',
    timeRange: '7:30 PM - 9:30 PM',
    startHour: 19,
    startMinute: 30,
    endHour: 21,
    endMinute: 30,
    title: 'Study Digital Marketing (SWA Deep Focus)',
    somaliTitle: 'Waqtiga Waxbarashada: Somali Wealth Academy',
    description: 'Dedicated 2-hour learning block: watch module lessons, practice Shopify/eBay ads, take notes.',
    category: 'study',
    icon: 'Laptop',
    completed: false
  },
  {
    id: 'rt-10',
    timeRange: '9:30 PM - 10:15 PM',
    startHour: 21,
    startMinute: 30,
    endHour: 22,
    endMinute: 15,
    title: 'Pray Isha & Spend Time with Family',
    somaliTitle: 'Tukashada Cisha & Waqti Qoyska lala Qaato',
    description: 'Perform Isha prayer, bond with family members, share conversations and warmth.',
    category: 'family',
    icon: 'Users',
    completed: false
  },
  {
    id: 'rt-11',
    timeRange: '10:15 PM - 10:45 PM',
    startHour: 22,
    startMinute: 15,
    endHour: 22,
    endMinute: 45,
    title: 'Prepare for Tomorrow & Wind Down',
    somaliTitle: 'Isku Diyaarinta Maalinta Berri & Dajinta Maskaxda',
    description: 'Review study planner for tomorrow, iron clothes, evening skincare, Surah Al-Mulk recitation.',
    category: 'prep',
    icon: 'Sparkles',
    completed: false
  },
  {
    id: 'rt-12',
    timeRange: '11:00 PM',
    startHour: 23,
    startMinute: 0,
    endHour: 5,
    endMinute: 0,
    title: 'Sleep & Night Adkaar',
    somaliTitle: 'Hurdada Habeenkii & Ducooyinka Hurdda ka Hor',
    description: 'Sleeping Adkaar, turn off blue light, restful 6 hours sleep to wake energized at 5:00 AM.',
    category: 'rest',
    icon: 'Moon',
    completed: false
  }
];

export interface SelfCareState {
  waterGlasses: number; // 8 max goal
  waterGoal: number; // 8 glasses (2000ml)
  walkingSteps: number;
  walkingGoal: number; // 8,000 steps
  walkingMinutes: number;
  skincareMorning: boolean;
  skincareEvening: boolean;
  screenBreakCompleted: boolean;
  mentalRestMinutes: number;
  mood: 'peaceful' | 'energetic' | 'focused' | 'tired' | 'grateful';
  reflectionNote: string;
}

export const initialSelfCare: SelfCareState = {
  waterGlasses: 5,
  waterGoal: 8,
  walkingSteps: 5420,
  walkingGoal: 8000,
  walkingMinutes: 35,
  skincareMorning: true,
  skincareEvening: false,
  screenBreakCompleted: true,
  mentalRestMinutes: 25,
  mood: 'grateful',
  reflectionNote: 'Alhamdulillah, making steady progress on my digital marketing course while maintaining my daily prayers and work duties.'
};
