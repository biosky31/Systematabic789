import React, { useState, useRef, useEffect } from 'react';
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
  ChevronUp,
  Compass,
  Calendar,
  Lock,
  Menu,
  X,
  Eye,
  Type,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  Bookmark,
  Check,
} from 'lucide-react';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';

export type ActiveGrade = 'grade7' | 'grade8' | 'grade9';

export interface NavbarProps {
  currentGrade: ActiveGrade;
  setCurrentGrade: (grade: ActiveGrade) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedUnit: number;
  setSelectedUnit: (unit: number) => void;
  selectedPartFilter: 'all' | 1 | 2;
  setSelectedPartFilter: (filter: 'all' | 1 | 2) => void;
  readingMode?: boolean;
  setReadingMode?: (mode: boolean) => void;
  readingFontSize?: 'normal' | 'large' | 'xlarge';
  setReadingFontSize?: (size: 'normal' | 'large' | 'xlarge') => void;
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
  readingMode = false,
  setReadingMode,
  readingFontSize = 'normal',
  setReadingFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownUnitsExpanded, setDropdownUnitsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Stealth Trigger: 3 clicks on flag logo within 3 seconds using ref to avoid setState in render
  const stealthClicksRef = useRef<number>(0);
  const stealthTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    stealthClicksRef.current += 1;
    if (stealthTimerRef.current) {
      clearTimeout(stealthTimerRef.current);
    }

    if (stealthClicksRef.current >= 3) {
      stealthClicksRef.current = 0;
      setActiveTab('plans');
      setMobileMenuOpen(false);
    } else {
      stealthTimerRef.current = setTimeout(() => {
        stealthClicksRef.current = 0;
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (stealthTimerRef.current) {
        clearTimeout(stealthTimerRef.current);
      }
    };
  }, []);

  // Grade metadata helpers
  const currentGradeMeta = {
    grade7: {
      label: 'الصف السابع',
      fullLabel: 'الصف السابع الأساسي',
      shortLabel: 'السابع',
      badge: '24 وحدة • الجزأين 1 و 2',
      color: 'emerald',
      icon: '📘',
      units: GRADE_7_UNITS,
    },
    grade8: {
      label: 'الصف الثامن',
      fullLabel: 'الصف الثامن الأساسي',
      shortLabel: 'الثامن',
      badge: '24 وحدة • الجزأين 1 و 2',
      color: 'purple',
      icon: '📗',
      units: GRADE_8_UNITS,
    },
    grade9: {
      label: 'الصف التاسع',
      fullLabel: 'الصف التاسع الأساسي',
      shortLabel: 'التاسع (الشهادة)',
      badge: '24 وحدة • الجزأين 1 و 2',
      color: 'amber',
      icon: '🎓',
      units: ALL_UNITS,
    },
  }[currentGrade];

  // Active tab details
  const allTabs = [
    {
      id: 'overview',
      label: 'خريطة المنهاج والفهرس',
      shortLabel: 'الفهرس',
      icon: Compass,
      category: 'content',
      description: 'فهرس الوحدات والأهداف العامة للمقرر',
    },
    {
      id: 'units',
      label: 'مستكشف الوحدات والنصوص',
      shortLabel: `الوحدة ${selectedUnit}`,
      icon: Layers,
      category: 'content',
      description: 'نصوص القراءة الكاملة والشروح والتحليل المعمق',
    },
    {
      id: 'vocabulary',
      label: 'المعجم والمفردات والتراكيب',
      shortLabel: 'المعجم',
      icon: BookA,
      category: 'content',
      description: 'المعاني السياقية والأضداد والشواهد',
    },
    {
      id: 'grammar',
      label: 'النحو والصرف والقواعد',
      shortLabel: 'النحو والصرف',
      icon: GraduationCap,
      category: 'linguistics',
      description: 'القواعد والأوزان الصرفية والشواهد الإعرابية',
    },
    {
      id: 'spelling',
      label: 'الإملاء والرسم وضبط الهمزات',
      shortLabel: 'الإملاء',
      icon: PenTool,
      category: 'linguistics',
      description: 'همزات الوصل والقطع والمتوسطة وتنبيهات الرسم',
    },
    {
      id: 'quiz',
      label: 'بنك الاختبارات والمحاكي الذكي',
      shortLabel: 'الاختبارات',
      icon: HelpCircle,
      category: 'assessment',
      description: 'محاكي الامتحانات والتقويم الذاتي الوزاري',
    },
    {
      id: 'discovered',
      label: 'الأسئلة الامتحانية المكتشفة',
      shortLabel: 'أسئلة هامة',
      icon: Search,
      category: 'assessment',
      description: 'أسئلة متوقعة وهامة مستخرجة من ثنايا الشرح',
    },
    {
      id: 'exports',
      label: 'مركز التحميل والطباعة',
      shortLabel: 'التحميل',
      icon: Download,
      category: 'tools',
      description: 'ملازم ومذكرات Word و PDF للطباعة المباشرة',
    },
    {
      id: 'visuals',
      label: 'الوسائل والبطاقات البصرية (AI)',
      shortLabel: 'الوسائل',
      icon: ImageIcon,
      category: 'tools',
      description: 'خرائط ذهنية وتوليد بطاقات وبوسترات تعليمية',
    },
    {
      id: 'quality',
      label: 'سجل التدقيق وضبط الجودة',
      shortLabel: 'التدقيق',
      icon: FileCheck2,
      category: 'tools',
      description: 'توثيق المطابقة المنهجية والأمانة العلمية',
    },
    {
      id: 'plans',
      label: 'الخطط الفصلية والأسبوعية (خاص)',
      shortLabel: 'الخطط الرسمية',
      icon: Calendar,
      category: 'admin',
      description: 'الخطط المعتمدة لوزارة التربية والتعليم (محمية بـ PIN)',
    },
  ];

  const currentTabObj = allTabs.find((t) => t.id === activeTab) || allTabs[0];
  const CurrentIcon = currentTabObj.icon;

  // Toggle font size
  const cycleFontSize = () => {
    if (!setReadingFontSize) return;
    if (readingFontSize === 'normal') setReadingFontSize('large');
    else if (readingFontSize === 'large') setReadingFontSize('xlarge');
    else setReadingFontSize('normal');
  };

  // Nav categories for the dropdown menu
  const menuCategories = [
    {
      id: 'content',
      title: 'المحتوى المنهجي ومستكشف الدروس',
      badge: 'النصوص والشروح والمعجم',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      items: [
        {
          id: 'overview',
          label: 'خريطة المنهاج والفهرس الشامل',
          desc: 'الأهداف وتوزيع الوحدات والدروس لجميع الفصول',
          icon: Compass,
        },
        {
          id: 'units',
          label: 'مستكشف الوحدات والنصوص الكاملة',
          desc: 'قراءة النصوص مشكولة، الشروح، المعاني، والتحليل الأدبي',
          icon: Layers,
          hasUnitPicker: true,
        },
        {
          id: 'vocabulary',
          label: 'المعجم والمفردات والتراكيب اللغوية',
          desc: 'جدول المعاني السياقية، المرادفات، الأضداد، والشواهد',
          icon: BookA,
        },
      ],
    },
    {
      id: 'linguistics',
      title: 'العلوم اللغوية المتخصصة',
      badge: 'القواعد والأوزان والإملاء',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      items: [
        {
          id: 'grammar',
          label: 'موسوعة النحو والصرف والقواعد',
          desc: 'القواعد، الشواهد القرآنية، الأوزان، والإعراب النموذجي',
          icon: GraduationCap,
        },
        {
          id: 'spelling',
          label: 'موسوعة الإملاء والرسم وضبط الهمزات',
          desc: 'همزات الوصل والقطع، الهمزة المتوسطة والمتطرفة، والتنبيهات',
          icon: PenTool,
        },
      ],
    },
    {
      id: 'assessment',
      title: 'التقويم وبنك الاختبارات',
      badge: 'محاكاة وزارية وتقويم ذاتي',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      items: [
        {
          id: 'quiz',
          label: 'محاكي الاختبارات والتقويم الذاتي',
          desc: 'اختبارات تفاعلية متعددة الخيارات مع تصحيح فوري وتبرير',
          icon: HelpCircle,
        },
        {
          id: 'discovered',
          label: 'الأسئلة الامتحانية المكتشفة خارج الخلاصة',
          desc: 'أسئلة ذكية مستنبطة من شروحات الدروس لم ترد في التلخيص',
          icon: Search,
        },
      ],
    },
    {
      id: 'tools',
      title: 'المطبوعات والوسائط التعليمية',
      badge: 'PDF / Word والوسائل',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      items: [
        {
          id: 'exports',
          label: 'مركز التحميل والطباعة (PDF & Word)',
          desc: 'تحميل الملازم والمذكرات المنسقة القابلة للطباعة المباشرة',
          icon: Download,
        },
        {
          id: 'visuals',
          label: 'الوسائل والخرائط الذهنية (AI Studio)',
          desc: 'توليد بطاقات وبوسترات وملخصات بصرية للدروس',
          icon: ImageIcon,
        },
        {
          id: 'quality',
          label: 'سجل التدقيق والمطابقة المنهجية',
          desc: 'توثيق نسبة الإنجاز والصفحات المحققة بدقة علمية',
          icon: FileCheck2,
        },
      ],
    },
    {
      id: 'admin',
      title: 'ركن المعلم والتخطيط (سري ومحمي)',
      badge: 'رمز PIN',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      items: [
        {
          id: 'plans',
          label: 'الخطط الفصلية والأسبوعية الرسمية',
          desc: 'توزيع الحصص الأسبوعية (6 حصص) وتصدير Word و Excel',
          icon: Calendar,
        },
      ],
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrade = (grade: ActiveGrade) => {
    setCurrentGrade(grade);
    setSelectedUnit(1);
    setSelectedPartFilter('all');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentUnitTitle =
    currentGradeMeta.units.find((u) => u.number === selectedUnit)?.title ||
    `الوحدة ${selectedUnit}`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-amber-900/30 text-white shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        {/* ========================================================= */}
        {/* MOBILE HEADER BAR (Compact, sleek, highly functional on phones) */}
        {/* ========================================================= */}
        <div className="lg:hidden flex items-center justify-between py-2 gap-1.5">
          {/* Right: Flag Logo (Stealth 3-click trigger) + App / Grade Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLogoClick}
              title="جمهورية اليمن (انقر 3 مرات للخطط السرية)"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-emerald-600 to-amber-700 flex items-center justify-center shadow-md text-slate-950 font-black text-lg shrink-0 cursor-pointer active:scale-90 select-none border border-amber-400/30"
            >
              🇾🇪
            </button>

            {/* Grade Switcher Pill (Quick Dropdown) */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-amber-400/90 leading-tight">
                لُغَتِي الْعَرَبِيَّة
              </span>
              <div className="flex items-center gap-1">
                <span
                  className={`text-[11px] font-black px-1.5 py-0.5 rounded-md border ${
                    currentGrade === 'grade7'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : currentGrade === 'grade8'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {currentGradeMeta.icon} {currentGradeMeta.shortLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Center: The Main Categorized Dropdown Trigger (Compact & informative) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border shadow-sm max-w-[165px] sm:max-w-[200px] truncate ${
              mobileMenuOpen
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/60'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400/60'
            }`}
            title="فتح قائمة الأقسام والتنقل"
          >
            <CurrentIcon className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span className="truncate">{currentTabObj.shortLabel}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                mobileMenuOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'
              }`}
            />
          </button>

          {/* Left: Reading Mode Toggle + Font Size + Menu Icon */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Reading Mode Button */}
            {setReadingMode && (
              <button
                type="button"
                onClick={() => setReadingMode(!readingMode)}
                className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  readingMode
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                }`}
                title={readingMode ? 'الخروج من وضع القراءة' : 'تفعيل وضع القراءة المريح'}
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            {/* Font Size Button */}
            {setReadingFontSize && (
              <button
                type="button"
                onClick={cycleFontSize}
                className="px-1.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-black cursor-pointer"
                title="تغيير حجم خط القراءة"
              >
                A
                <span className="text-[9px] text-amber-400 font-bold">
                  {readingFontSize === 'xlarge' ? '++' : readingFontSize === 'large' ? '+' : ''}
                </span>
              </button>
            )}

            {/* Menu Open/Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-900 text-slate-200 border-slate-800'
              }`}
              aria-label="تبديل القائمة"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP HEADER VIEW (Retained for large screens) */}
        {/* ========================================================= */}
        <div className="hidden lg:block">
          {/* Tier 1: Brand & Actions */}
          <div className="flex items-center justify-between py-3 border-b border-slate-800/80 gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogoClick}
                title="جمهورية اليمن"
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-emerald-600 to-amber-700 flex items-center justify-center shadow-lg text-slate-950 font-black text-2xl shrink-0 ring-2 ring-amber-400/30 cursor-pointer active:scale-95 select-none"
              >
                🇾🇪
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    منهاج الجمهورية اليمنية
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    مرحلة التعليم الأساسي
                  </span>
                </div>
                <h1 className="text-base font-black text-white tracking-tight mt-0.5">
                  منصة «لُغَتِي الْعَرَبِيَّة» • الصفوف (السابع • الثامن • التاسع)
                </h1>
              </div>
            </div>

            {/* Quick Actions & Menu Launcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  mobileMenuOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/60'
                    : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400/60'
                }`}
              >
                <Menu className="w-3.5 h-3.5 text-amber-400" />
                <span>دليل الأقسام المقسم</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {activeTab === 'plans' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>الوضع الإداري السري</span>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem('admin_authenticated');
                      setActiveTab('overview');
                    }}
                    className="mr-1 px-2 py-0.5 rounded bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 text-[10px] cursor-pointer"
                  >
                    خروج
                  </button>
                </div>
              )}

              <button
                onClick={() => setActiveTab('exports')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-md transition-all cursor-pointer border border-emerald-400/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل الملازم (PDF)</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer border border-amber-400/30"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>بدء الاختبار</span>
              </button>
            </div>
          </div>

          {/* Tier 2: Desktop Grade Selector & Active Unit Quick-Jump */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/80 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400">الصف الدراسي:</span>
              <div className="flex items-center gap-1.5">
                {(['grade7', 'grade8', 'grade9'] as ActiveGrade[]).map((gradeKey) => {
                  const meta = {
                    grade7: { label: 'الصف السابع (24 و)', color: 'emerald', icon: '📘' },
                    grade8: { label: 'الصف الثامن (24 و)', color: 'purple', icon: '📗' },
                    grade9: { label: 'الصف التاسع (24 و)', color: 'amber', icon: '🎓' },
                  }[gradeKey];
                  const isSelected = currentGrade === gradeKey;
                  return (
                    <button
                      key={gradeKey}
                      onClick={() => {
                        setCurrentGrade(gradeKey);
                        setSelectedUnit(1);
                        setSelectedPartFilter('all');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        isSelected
                          ? gradeKey === 'grade7'
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/50'
                            : gradeKey === 'grade8'
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-400/50'
                            : 'bg-amber-600 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/50'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick unit dropdown on desktop */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">الانتقال السريع للوحدة:</span>
              <div className="flex items-center bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                <select
                  aria-label="اختر الوحدة الدراسية"
                  value={selectedUnit}
                  onChange={(e) => {
                    setSelectedUnit(Number(e.target.value));
                    if (activeTab !== 'units') setActiveTab('units');
                  }}
                  className="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer max-w-[220px] text-xs"
                >
                  {currentGradeMeta.units.map((u) => (
                    <option key={u.number} value={u.number} className="bg-slate-900 text-white">
                      الوحدة {u.number}: {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tier 3: Desktop Tabs */}
          <nav className="flex items-center space-x-reverse space-x-1.5 overflow-x-auto py-2 no-scrollbar">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? currentGrade === 'grade7'
                        ? 'bg-emerald-600 text-white font-black shadow-md'
                        : currentGrade === 'grade8'
                        ? 'bg-purple-600 text-white font-black shadow-md'
                        : 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* CATEGORIZED DROPDOWN MENU (The core requested feature) */}
        {/* Smooth, divided into clear sections, optimized for phones */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="fixed inset-x-0 top-[52px] lg:top-[128px] bottom-0 z-50 bg-slate-950/98 backdrop-blur-xl border-t border-amber-900/40 text-white overflow-y-auto animate-fadeIn shadow-2xl pb-24"
          >
            <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
              {/* Menu Header with Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-400" />
                    خريطة الأقسام والتنقل المنهجي السريع
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    اختر الصف الدراسي أو القسم المطلوب للانتقال الفوري إليه
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
                  title="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Master Grade Switcher Category */}
              <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                    <School className="w-4 h-4 text-amber-400" />
                    ١. اختر الصف الدراسي الحالي:
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    الحالي: {currentGradeMeta.fullLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Grade 7 */}
                  <button
                    type="button"
                    onClick={() => handleSelectGrade('grade7')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      currentGrade === 'grade7'
                        ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">📘</span>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-white">الصف السابع الأساسي</div>
                        <div className="text-[10px] text-emerald-400 font-bold">
                          24 وحدة • الجزأين 1 و 2 (334 ص)
                        </div>
                      </div>
                    </div>
                    {currentGrade === 'grade7' && (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>

                  {/* Grade 8 */}
                  <button
                    type="button"
                    onClick={() => handleSelectGrade('grade8')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      currentGrade === 'grade8'
                        ? 'bg-purple-600/30 border-purple-400 text-purple-200 ring-2 ring-purple-400/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">📗</span>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-white">الصف الثامن الأساسي</div>
                        <div className="text-[10px] text-purple-400 font-bold">
                          24 وحدة • الجزأين 1 و 2 (373 ص)
                        </div>
                      </div>
                    </div>
                    {currentGrade === 'grade8' && (
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    )}
                  </button>

                  {/* Grade 9 */}
                  <button
                    type="button"
                    onClick={() => handleSelectGrade('grade9')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      currentGrade === 'grade9'
                        ? 'bg-amber-600/30 border-amber-400 text-amber-200 ring-2 ring-amber-400/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🎓</span>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-white">الصف التاسع الأساسي</div>
                        <div className="text-[10px] text-amber-400 font-bold">
                          24 وحدة • الشهادة الأساسية (354 ص)
                        </div>
                      </div>
                    </div>
                    {currentGrade === 'grade9' && (
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Categorized Sections: Loop through groups */}
              {menuCategories.map((cat, catIdx) => (
                <div
                  key={cat.id}
                  className="bg-slate-900/60 rounded-2xl p-3.5 border border-slate-800/80 space-y-2.5"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black text-slate-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {catIdx + 2}. {cat.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.badgeColor}`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Category Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.items.map((item) => {
                      const Icon = item.icon;
                      const isItemActive = activeTab === item.id;
                      return (
                        <div key={item.id} className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectTab(item.id)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                              isItemActive
                                ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400/50 shadow-md'
                                : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-700'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                isItemActive
                                  ? 'bg-amber-500 text-slate-950 font-black'
                                  : 'bg-slate-800 text-amber-400'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-black text-xs sm:text-sm text-white truncate">
                                  {item.label}
                                </span>
                                {isItemActive && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                                    نشط
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            </div>
                          </button>

                          {/* If this is the Unit Explorer item, show instant quick-jump buttons! */}
                          {item.hasUnitPicker && (
                            <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 space-y-1.5 mr-2">
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                                <span>انتقال مباشر للوحدة ({currentGradeMeta.shortLabel}):</span>
                                <span className="text-amber-400">الوحدة الحالية: {selectedUnit}</span>
                              </div>

                              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
                                {currentGradeMeta.units.map((u) => (
                                  <button
                                    key={u.number}
                                    type="button"
                                    onClick={() => {
                                      setSelectedUnit(u.number);
                                      handleSelectTab('units');
                                    }}
                                    className={`py-1 rounded text-[11px] font-black transition-all cursor-pointer ${
                                      selectedUnit === u.number && activeTab === 'units'
                                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                    }`}
                                    title={`الوحدة ${u.number}: ${u.title}`}
                                  >
                                    {u.number}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Bottom Quick Action Bar inside Drawer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  {setReadingMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setReadingMode(!readingMode);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-800"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{readingMode ? 'إلغاء وضع القراءة' : 'تفعيل وضع القراءة المريح'}</span>
                    </button>
                  )}
                  {setReadingFontSize && (
                    <button
                      type="button"
                      onClick={cycleFontSize}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-800"
                    >
                      <Type className="w-3.5 h-3.5 text-amber-400" />
                      <span>حجم الخط: {readingFontSize === 'xlarge' ? 'كبير جداً' : readingFontSize === 'large' ? 'كبير' : 'عادي'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  تم والعودة للمحتوى ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
