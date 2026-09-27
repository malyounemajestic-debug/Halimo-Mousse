import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Bookmark,
  Share2
} from 'lucide-react';
import { QuranSurah } from '../types';
import { initialSurahs } from '../data/quranData';

interface QuranSectionViewProps {
  onAudioPlayStateChange?: (playingTitle: string | null) => void;
}

export const QuranSectionView: React.FC<QuranSectionViewProps> = ({
  onAudioPlayStateChange
}) => {
  const [surahs, setSurahs] = useState<QuranSurah[]>(initialSurahs);
  const [currentSurahId, setCurrentSurahId] = useState<number>(67); // Surah Al-Mulk default for night routine!
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'md' | 'lg' | 'xl'>('lg');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSurah = surahs.find(s => s.id === currentSurahId) || surahs[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, playbackSpeed]);

  useEffect(() => {
    // When surah changes, reset audio or play if was playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentSurahId]);

  useEffect(() => {
    if (onAudioPlayStateChange) {
      onAudioPlayStateChange(isPlaying ? `Surah ${currentSurah.name}` : null);
    }
  }, [isPlaying, currentSurah, onAudioPlayStateChange]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handlePrevSurah = () => {
    const currentIndex = surahs.findIndex(s => s.id === currentSurahId);
    if (currentIndex > 0) {
      setCurrentSurahId(surahs[currentIndex - 1].id);
    }
  };

  const handleNextSurah = () => {
    const currentIndex = surahs.findIndex(s => s.id === currentSurahId);
    if (currentIndex < surahs.length - 1) {
      setCurrentSurahId(surahs[currentIndex + 1].id);
    }
  };

  const handleToggleCompleted = (surahId: number) => {
    setSurahs(prev => prev.map(s => s.id === surahId ? { ...s, completed: !s.completed } : s));
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'md': return 'text-xl sm:text-2xl leading-[2.2]';
      case 'xl': return 'text-3xl sm:text-4xl leading-[2.6]';
      default: return 'text-2xl sm:text-3xl leading-[2.4]';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSurah.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          handleNextSurah();
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Qur’an Recitation & Reading
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Listen to Mishary Rashid Alafasy and read with Somali verse-by-verse translation.
          </p>
        </div>

        {/* Font size adjuster */}
        <div className="flex items-center gap-2 self-start">
          <span className="text-xs text-slate-500 font-medium">Arabic Font Size:</span>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setFontSizeLevel('md')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${
                fontSizeLevel === 'md' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel('lg')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${
                fontSizeLevel === 'lg' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel('xl')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${
                fontSizeLevel === 'xl' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Global Quran Audio Player Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Surah #{currentSurah.id} · {currentSurah.revelationType} · {currentSurah.versesCount} Ayahs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Surah {currentSurah.name} ({currentSurah.arabicName})
            </h2>
            <p className="text-xs text-emerald-200 mt-0.5">
              Somali: <strong>{currentSurah.somaliMeaning}</strong> · Meaning: {currentSurah.englishMeaning}
            </p>
          </div>

          {/* Quick Mark Completed Toggle */}
          <button
            onClick={() => handleToggleCompleted(currentSurah.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors self-start md:self-auto ${
              currentSurah.completed
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{currentSurah.completed ? 'Completed Today' : 'Mark as Read'}</span>
          </button>
        </div>

        {/* Audio Controls & Progress */}
        <div className="mt-4 space-y-3">
          {/* Progress bar */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {/* Speed & Volume */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1.5 bg-slate-700 rounded-lg accent-emerald-500 cursor-pointer hidden sm:block"
              />

              {/* Speed selector */}
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-slate-200"
              >
                <option value={0.75} className="bg-slate-900">0.75x</option>
                <option value={1.0} className="bg-slate-900">1.0x (Normal)</option>
                <option value={1.25} className="bg-slate-900">1.25x</option>
                <option value={1.5} className="bg-slate-900">1.5x</option>
              </select>
            </div>

            {/* Core Play Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevSurah}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Previous Surah"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNextSurah}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Next Surah"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Reciter Info */}
            <div className="text-right text-xs text-slate-400 hidden sm:block">
              <span>Reciter: <strong>Mishary Rashid Alafasy</strong></span>
              <span className="block text-[11px] text-emerald-400">High Quality Audio Stream</span>
            </div>
          </div>
        </div>
      </div>

      {/* Surahs Quick Carousel / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {surahs.map((surah) => {
          const isSelected = surah.id === currentSurahId;
          return (
            <button
              key={surah.id}
              onClick={() => setCurrentSurahId(surah.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px] tabular-nums">
                {surah.id}
              </span>
              <span>{surah.name}</span>
              <span className="font-arabic font-normal text-sm">{surah.arabicName}</span>
              {surah.completed && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Verses Reading Interface */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
        {/* Bismillah Header */}
        {currentSurah.id !== 9 && (
          <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="font-arabic text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-widest">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              "In the name of Allah, the Entirely Merciful, the Especially Merciful"
            </p>
          </div>
        )}

        {/* Verses list */}
        <div className="space-y-6">
          {currentSurah.verses.map((verse) => (
            <div
              key={verse.number}
              className="p-5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/30 space-y-3"
            >
              {/* Arabic verse text */}
              <div className="flex items-start justify-between gap-4">
                <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center tabular-nums shrink-0 mt-1">
                  {verse.number}
                </span>

                <div className={`flex-1 text-right font-arabic font-bold text-slate-900 dark:text-white ${getFontSizeClass()} dir-rtl`} dir="rtl">
                  {verse.arabic}
                </div>
              </div>

              {/* Somali Translation Box */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  Af-Soomaali ({verse.number}):
                </span>
                {verse.somali}
              </div>

              {/* English Translation */}
              <div className="text-xs text-slate-600 dark:text-slate-400 italic">
                {verse.english}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
