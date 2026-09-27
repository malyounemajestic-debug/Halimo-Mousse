import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Award, 
  Calendar, 
  ShieldCheck, 
  Save, 
  Check, 
  Download, 
  Sparkles, 
  BookOpen, 
  CreditCard,
  Plus,
  Trash2
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [bio, setBio] = useState(profile.bio);
  const [goals, setGoals] = useState<string[]>(profile.goals);
  const [newGoal, setNewGoal] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveBio = () => {
    onUpdateProfile({ bio, goals });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, newGoal.trim()]);
    setNewGoal('');
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Profile & Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official Somali Wealth Academy enrollment credentials and student portfolio.
          </p>
        </div>

        <button
          onClick={handlePrintSummary}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs self-start"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          <span>Export Student Summary</span>
        </button>
      </div>

      {/* Student ID Card Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 text-white text-2xl font-extrabold shadow-lg">
              HM
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Active Student</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                {profile.name}
              </h2>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  {profile.email}
                </span>
                <span>·</span>
                <span className="font-mono text-emerald-300 font-semibold">
                  ID: {profile.academyId}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-1.5 shrink-0">
            <div>Program: <strong className="text-white">Digital Marketing Mastery</strong></div>
            <div>Cohort: <strong className="text-white">{profile.cohort}</strong></div>
            <div>Tuition: <strong className="text-emerald-400">$300 / Month</strong></div>
            <div>Enrollment: <strong className="text-white">{profile.enrollmentDate}</strong></div>
          </div>
        </div>
      </div>

      {/* Profile Details & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Bio & Goals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Personal Statement & Entrepreneurial Vision
              </h3>
              {isSaved && (
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSaveBio}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

          {/* Entrepreneurial Milestones & Goals */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Halimo’s SWA Wealth Goals
            </h3>

            <div className="space-y-2">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="flex-1 font-medium">{goal}</span>
                  <button
                    onClick={() => handleRemoveGoal(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                    title="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddGoal} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add another entrepreneurial goal..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Academic Badges & Mentor Support */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Student Academic Standing
            </h3>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Modules Active:</span>
                <strong className="text-slate-900 dark:text-white">9 Programs</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Tuition Rate:</span>
                <strong className="text-emerald-600">$300.00 / mo</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Tuition Status:</span>
                <strong className="text-emerald-600">Settled to Date</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Certification Track:</span>
                <strong className="text-slate-900 dark:text-white">Graduation Dec 2026</strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-md space-y-3">
            <h3 className="text-sm font-bold text-emerald-200">
              Somali Wealth Academy Student Hotline
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Need assistance with your eBay store, Shopify checkout, or tuition billing? SWA faculty is available via WhatsApp & Zoom office hours.
            </p>
            <div className="pt-2 text-xs font-semibold text-amber-300">
              Mentor: Eng. Abdullahi & Ustaad Guled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
