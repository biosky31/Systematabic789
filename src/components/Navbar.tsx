import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Image as ImageIcon,
  BookA,
  Search,
  Download,
  School,
  Layers,
  PenTool,
  ChevronDown,
  Compass,
  Calendar,
  Lock,
} from 'lucide-react';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';

export type ActiveGrade = 'grade7' | 'grade8' | 'grade9';

interface NavbarProps {
  currentGrade: ActiveGrade;
  setCurrentGrade: (grade: ActiveGrade) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedUnit: number;
  setSelectedUnit: (unit: number) => void;
  selectedPartFilter: 'all' | 1 | 2;
  setSelectedPartFilter: (filter: 'all' | 1 | 2) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  setCurrentGrade,
  activeTab,
  setActiveTab,
  selectedUnit,
  setSelectedUnit,
  selectedPartFilter,
  setSelectedPartFilter,
}) => {
  // Tabs dynamically labeled to reflect the selected grade's context
  const tabs = [
    {
      id: 'overview',
      label: 'خريطة المنهاج والفهرس',
      icon: Compass,
      description: 'فهرس الوحدات والأهداف العامة',
    },
    {
      id: 'units',
      label:
        currentGrade === 'grade7'
          ? 'مستكشف الوحدات (12 وحدة)'
          : currentGrade === 'grade8'
          ? 'مستكشف الوحدات (12 وحدة)'
          : 'مستكشف الوحدات (24 وحدة)',
      icon: Layers,
      description: 'نصوص القراءة والشروح والتحليل',
    },
    {
      id: 'grammar',
      label: 'النحو والصرف',
      icon: GraduationCap,
      description: 'القواعد والأوزان والشواهد',
    },
    {
      id: 'spelling',
      label: 'الإملاء والرسم الإملائي',
      icon: PenTool,
      description: 'رسم الهمزات والتنبيهات',
    },
    {
      id: 'vocabulary',
      label: 'المعجم والمفردات',
      icon: BookA,
      description: 'المعاني السياقية والأضداد',
    },
    {
      id: 'quiz',
      label: 'بنك الاختبارات والمحاكي',
      icon: HelpCircle,
      description: 'محاكي الامتحانات والتقويم الذاتي',
    },
    {
      id: 'discovered',
      label: 'الأسئلة الامتحانية المكتشفة',
      icon: Search,
      description: 'أسئلة هامة خارج الخلاصة',
    },
    {
      id: 'exports',
      label: 'مركز التحميل والطباعة',
      icon: Download,
      description: 'ملازم Word و PDF جاهزة',
    },
    {
      id: 'visuals',
      label: 'الوسائل البصرية (AI)',
      icon: ImageIcon,
      description: 'خرائط ذهنية وتوليد بطاقات',
    },
    {
      id: 'quality',
      label: 'سجل التدقيق والجودة',
      icon: FileCheck2,
      description: 'توثيق المطابقة المنهجية',
    },
  ];

  // Stealth Trigger: 3 clicks on flag logo within 3 seconds using ref to avoid setState in render
  const stealthClicksRef = React.useRef<number>(0);
  const stealthTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    stealthClicksRef.current += 1;
    if (stealthTimerRef.current) {
      clearTimeout(stealthTimerRef.current);
    }

    if (stealthClicksRef.current >= 3) {
      stealthClicksRef.current = 0;
      setActiveTab('plans');
    } else {
      stealthTimerRef.current = setTimeout(() => {
        stealthClicksRef.current = 0;
      }, 3000);
    }
  };

  React.useEffect(() => {
    return () => {
      if (stealthTimerRef.current) {
        clearTimeout(stealthTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-amber-900/30 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tier 1: Platform Brand Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-3.5 gap-4 border-b border-slate-800/80">
          {/* Logo & Identity with Stealth 5-Click Trigger */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleLogoClick}
              title="جمهورية اليمن"
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-emerald-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/20 text-slate-950 font-black text-2xl shrink-0 ring-2 ring-amber-400/30 cursor-pointer active:scale-95 select-none"
            >
              🇾🇪
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  منهاج الجمهورية اليمنية
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  مرحلة التعليم الأساسي
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-black text-white tracking-tight mt-1">
                منصة «لُغَتِي الْعَرَبِيَّة» للمرحلة الأساسية • الصفوف (السابع • الثامن • التاسع)
              </h1>
            </div>
          </div>

          {/* Quick Actions (Direct Download & Quiz & Stealth Admin Status) */}
          <div className="flex items-center gap-2">
            {activeTab === 'plans' && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>الوضع الإداري السري</span>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('admin_authenticated');
                    setActiveTab('overview');
                  }}
                  className="mr-1 px-2 py-0.5 rounded bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 text-[10px] cursor-pointer"
                >
                  قفل وخروج
                </button>
              </div>
            )}
            <button
              onClick={() => setActiveTab('exports')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-md transition-all cursor-pointer border border-emerald-400/30"
              title="تحميل الملازم والمذكرات المطبوعة"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل الملازم (PDF)</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer border border-amber-400/30"
              title="بدء الاختبار التفاعلي الذكي"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>بدء الاختبار</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Master Grade Selector Bar (3 Prominent Cards) */}
        <div className="py-2.5 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <School className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-slate-300">اختر الصف الدراسي:</span>
            </div>

            {/* 3 Grade Navigation Cards */}
            <div className="grid grid-cols-3 gap-2 flex-1 max-w-2xl">
              {/* Grade 7 Card */}
              <button
                onClick={() => {
                  setCurrentGrade('grade7');
                  setSelectedUnit(1);
                  setSelectedPartFilter(1);
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                  currentGrade === 'grade7'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/60'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">📘</span>
                <div className="text-center sm:text-right">
                  <div className="font-black">الصف السابع</div>
                  <div className={`text-[10px] ${currentGrade === 'grade7' ? 'text-emerald-100 font-bold' : 'text-slate-400'}`}>
                    24 وحدة • مكتمل (ج1 و ج2)
                  </div>
                </div>
              </button>

              {/* Grade 8 Card */}
              <button
                onClick={() => {
                  setCurrentGrade('grade8');
                  setSelectedUnit(1);
                  setSelectedPartFilter('all');
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                  currentGrade === 'grade8'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/60'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">📗</span>
                <div className="text-center sm:text-right">
                  <div className="font-black">الصف الثامن</div>
                  <div className={`text-[10px] ${currentGrade === 'grade8' ? 'text-purple-100 font-bold' : 'text-slate-400'}`}>
                    24 وحدة • مكتمل
                  </div>
                </div>
              </button>

              {/* Grade 9 Card */}
              <button
                onClick={() => {
                  setCurrentGrade('grade9');
                  setSelectedUnit(1);
                  setSelectedPartFilter('all');
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                  currentGrade === 'grade9'
                    ? 'bg-amber-600 text-slate-950 border-amber-300 shadow-lg shadow-amber-600/30 ring-2 ring-amber-300/60'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">🎓</span>
                <div className="text-center sm:text-right">
                  <div className="font-black">الصف التاسع</div>
                  <div className={`text-[10px] ${currentGrade === 'grade9' ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                    24 وحدة • مكتمل
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tier 3: Active Grade Status & Unit Quick-Jump */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 gap-2 text-xs border-b border-slate-800/60 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">الصف المعروض حالياً:</span>
            <span className="font-black text-white px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700">
              {currentGrade === 'grade7'
                ? '📘 الصف السابع الأساسي (الجزأين 1 و 2: 24 وحدة • 334 صفحة)'
                : currentGrade === 'grade8'
                ? '📗 الصف الثامن الأساسي (الجزأين 1 و 2: 24 وحدة • 373 صفحة)'
                : '🎓 الصف التاسع الأساسي (الجزأين 1 و 2: 24 وحدة • 354 صفحة)'}
            </span>
          </div>

          {/* Quick Selector based on grade */}
          {currentGrade === 'grade7' && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">الانتقال السريع للوحدة:</span>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
                <select
                  aria-label="اختر وحدة الصف السابع"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(Number(e.target.value))}
                  className="bg-transparent font-bold text-emerald-400 focus:outline-none cursor-pointer max-w-[220px] text-xs"
                >
                  {GRADE_7_UNITS.map((u) => (
                    <option key={u.number} value={u.number} className="bg-slate-900 text-white">
                      الوحدة {u.number}: {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentGrade === 'grade8' && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">الانتقال السريع للوحدة:</span>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
                <select
                  aria-label="اختر وحدة الصف الثامن"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(Number(e.target.value))}
                  className="bg-transparent font-bold text-purple-400 focus:outline-none cursor-pointer max-w-[220px] text-xs"
                >
                  {GRADE_8_UNITS.map((u) => (
                    <option key={u.number} value={u.number} className="bg-slate-900 text-white">
                      الوحدة {u.number}: {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentGrade === 'grade9' && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">تصفية الجزأين:</span>
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setSelectedPartFilter('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedPartFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  الكل (24)
                </button>
                <button
                  onClick={() => {
                    setSelectedPartFilter(1);
                    if (selectedUnit > 12) setSelectedUnit(1);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedPartFilter === 1
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  الجزء 1
                </button>
                <button
                  onClick={() => {
                    setSelectedPartFilter(2);
                    if (selectedUnit <= 12) setSelectedUnit(13);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedPartFilter === 2
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  الجزء 2
                </button>
              </div>

              {/* Unit Dropdown for Grade 9 */}
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
                <span className="text-slate-400">الوحدة:</span>
                <select
                  aria-label="اختر الوحدة الدراسية"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(Number(e.target.value))}
                  className="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer max-w-[170px] text-xs"
                >
                  {ALL_UNITS.map((u) => (
                    <option key={u.number} value={u.number} className="bg-slate-900 text-white">
                      {u.number}. {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tier 4: Subject Sections Navigation Tabs */}
        <nav className="flex items-center space-x-reverse space-x-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? currentGrade === 'grade7'
                      ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/30'
                      : currentGrade === 'grade8'
                      ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/30'
                      : 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
