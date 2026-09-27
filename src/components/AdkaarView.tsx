import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Volume2, 
  Square, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Check, 
  Flame, 
  HelpCircle,
  Play
} from 'lucide-react';
import { DhikrItem } from '../types';
import { morningAdkaarList, eveningAdkaarList } from '../data/adkaarData';
import { soundFeedback } from '../utils/audioService';

export const AdkaarView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [morningList, setMorningList] = useState<DhikrItem[]>(morningAdkaarList);
  const [eveningList, setEveningList] = useState<DhikrItem[]>(eveningAdkaarList);
  const [activeAudioDhikrId, setActiveAudioDhikrId] = useState<string | null>(null);

  // Digital Tasbih counter state
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihPhrase, setTasbihPhrase] = useState('SubhanAllah wa bihamdihi');

  const currentList = activeTab === 'morning' ? morningList : eveningList;
  const setCurrentList = activeTab === 'morning' ? setMorningList : setEveningList;

  const handleIncrement = (id: string) => {
    soundFeedback.playChime('tap');
    setCurrentList(prev => prev.map(item => {
      if (item.id === id) {
        const next = Math.min(item.repeatCount, item.currentCount + 1);
        if (next === item.repeatCount && item.currentCount !== item.repeatCount) {
          soundFeedback.playChime('complete');
        }
        return { ...item, currentCount: next };
      }
      return item;
    }));
  };

  const handleResetItem = (id: string) => {
    setCurrentList(prev => prev.map(item => item.id === id ? { ...item, currentCount: 0 } : item));
  };

  const handlePlayAudio = (dhikr: DhikrItem) => {
    if (activeAudioDhikrId === dhikr.id) {
      soundFeedback.stopSpeech();
      setActiveAudioDhikrId(null);
    } else {
      setActiveAudioDhikrId(dhikr.id);
      soundFeedback.speakText(dhikr.arabic, 'ar');
    }
  };

  const completedCount = currentList.filter(d => d.currentCount >= d.repeatCount).length;
  const totalCount = currentList.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Morning & Evening Adkaar (Adkaarta Subax & Galab)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Authentic supplications with vocalized Arabic text, Somali translations, tap counters, and audio playback.
        </p>
      </div>

      {/* Tabs & Digital Tasbih Counter Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tab Selector & Stats (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Daily Dhikr Shield
              </span>
              <span className="text-xs text-amber-300 font-semibold">
                {completedCount} of {totalCount} Completed
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  soundFeedback.stopSpeech();
                  setActiveAudioDhikrId(null);
                  setActiveTab('morning');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'morning'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Adkaar Al-Sabaah (Subax)</span>
              </button>

              <button
                onClick={() => {
                  soundFeedback.stopSpeech();
                  setActiveAudioDhikrId(null);
                  setActiveTab('evening');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'evening'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Adkaar Al-Masaa (Galab)</span>
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed max-w-xl">
              {activeTab === 'morning' 
                ? 'Subax kasta ku bilow maalintaada adkaartan barakaysan markaad tukatid salaadda Subax (5:00 AM) si Eebbe kuugu ilaaliyo shaqadaada iyo noloshaada.'
                : 'Galab kasta aqri adkaartan laga bilaabo salaadda Casar ilaa hurdada (11:00 PM) si aad u heshid difaac, xasillooni iyo ajar baaxad weyn.'
              }
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Tap counter button to record each recitation</span>
            <span className="text-emerald-300 font-medium">Sound & Audio Supported ✓</span>
          </div>
        </div>

        {/* Digital Tasbih Widget */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Electronic Tasbih Counter
              </span>
              <button
                onClick={() => {
                  soundFeedback.playChime('tap');
                  setTasbihCount(0);
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
                title="Reset counter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-2 text-center">
              <select
                value={tasbihPhrase}
                onChange={(e) => setTasbihPhrase(e.target.value)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-transparent border-0 text-center w-full focus:outline-none"
              >
                <option value="SubhanAllah wa bihamdihi">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</option>
                <option value="Astaghfirullah wa atoobu ilayh">أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ</option>
                <option value="La hawla wa la quwwata illa billah">لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ</option>
                <option value="Allahumma salli ala Muhammad">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ</option>
              </select>

              <div className="my-3 text-4xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                {tasbihCount}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundFeedback.playChime('tap');
              setTasbihCount(prev => prev + 1);
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Tap to Count (+1)
          </button>
        </div>
      </div>

      {/* Adkaar List */}
      <div className="space-y-4">
        {currentList.map((dhikr, idx) => {
          const isDone = dhikr.currentCount >= dhikr.repeatCount;
          const isPlaying = activeAudioDhikrId === dhikr.id;

          return (
            <div
              key={dhikr.id}
              className={`p-6 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              {/* Top row: Dhikr index & audio controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Repeat: <strong className="text-slate-900 dark:text-white">{dhikr.repeatCount}x</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayAudio(dhikr)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isPlaying
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Stop Audio' : 'Listen Audio'}</span>
                  </button>

                  <button
                    onClick={() => handleResetItem(dhikr.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Reset this Dhikr counter"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Arabic text with beautiful Amiri calligraphic typography */}
              <div className="my-5 text-right font-arabic text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-[2.2] tracking-wide dir-rtl" dir="rtl">
                {dhikr.arabic}
              </div>

              {/* Transliteration */}
              <div className="text-xs text-slate-500 dark:text-slate-400 italic font-mono mb-3">
                "{dhikr.transliteration}"
              </div>

              {/* Somali Translation Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                <span className="font-bold block mb-1 text-emerald-800 dark:text-emerald-300">
                  Macnaha Af-Soomaali:
                </span>
                {dhikr.somaliTranslation}
              </div>

              {/* English Meaning & Benefit */}
              <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p><strong>English Meaning:</strong> {dhikr.englishMeaning}</p>
                <p className="text-amber-700 dark:text-amber-400"><strong>Virtue (Fadliga):</strong> {dhikr.somaliBenefit}</p>
              </div>

              {/* Bottom interactive count action */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Progress:</span>
                  <span className="text-base font-extrabold tabular-nums font-mono text-emerald-600 dark:text-emerald-400">
                    {dhikr.currentCount} / {dhikr.repeatCount}
                  </span>
                </div>

                <button
                  onClick={() => handleIncrement(dhikr.id)}
                  disabled={isDone}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs active:scale-95'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Goal Reached ({dhikr.repeatCount}x)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Count (+1)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
