import { PrayerInfo } from '../types';

export const initialPrayerList: PrayerInfo[] = [
  {
    name: 'Fajr',
    arabic: 'الفجر',
    time: '05:15 AM',
    completed: true,
    sunnahCompleted: true
  },
  {
    name: 'Dhuhr',
    arabic: 'الظهر',
    time: '01:05 PM',
    completed: true,
    sunnahCompleted: true
  },
  {
    name: 'Asr',
    arabic: 'العصر',
    time: '04:35 PM',
    completed: false,
    sunnahCompleted: false
  },
  {
    name: 'Maghrib',
    arabic: 'المغرب',
    time: '06:58 PM',
    completed: false,
    sunnahCompleted: false
  },
  {
    name: 'Isha',
    arabic: 'العشاء',
    time: '08:20 PM',
    completed: false,
    sunnahCompleted: false
  }
];
