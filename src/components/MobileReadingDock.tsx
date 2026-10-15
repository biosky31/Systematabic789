import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  Eye,
  Type,
  Layers,
  BookOpen,
  Menu,
} from 'lucide-react';
import { ActiveGrade } from './Navbar';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';

interface MobileReadingDockProps {
  currentGrade: ActiveGrade;
  activeTab: string;
  selectedUnit: number;
  onSelectUnit: (unit: number) => void;
  readingMode: boolean;
  setReadingMode: (mode: boolean) => void;
  readingFontSize: 'normal' | 'large' | 'xlarge';
  setReadingFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onOpenMenu?: () => void;
}

export const MobileReadingDock: React.FC<MobileReadingDockProps> = ({
  currentGrade,
  activeTab,
  selectedUnit,
  onSelectUnit,
  readingMode,
  setReadingMode,
  readingFontSize,
  setReadingFontSize,
  onOpenMenu,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unitsList =
    currentGrade === 'grade7'
      ? GRADE_7_UNITS
      : currentGrade === 'grade8'
      ? GRADE_8_UNITS
      : ALL_UNITS;

  const totalUnits = unitsList.length || 24;

  const handlePrevUnit = () => {
    if (selectedUnit > 1) {
      onSelectUnit(selectedUnit - 1);
      scrollToTop();
    }
  };

  const handleNextUnit = () => {
    if (selectedUnit < totalUnits) {
      onSelectUnit(selectedUnit + 1);
      scrollToTop();
    }
  };

  const cycleFontSize = () => {
    if (readingFontSize === 'normal') setReadingFontSize('large');
    else if (readingFontSize === 'large') setReadingFontSize('xlarge');
    else setReadingFontSize('normal');
  };

  return (
    <aside
      aria-label="شريط أدوات القراءة للهاتف"
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-4 z-40 lg:hidden print:hidden"
    >
      <div className="bg-slate-950/95 backdrop-blur-lg border border-amber-500/40 rounded-2xl shadow-2xl p-1.5 flex items-center justify-between gap-1 text-white text-xs">
        {/* If in units tab, show Unit Stepper */}
        {activeTab === 'units' ? (
          <>
            {/* Previous Unit button */}
            <button
              type="button"
              onClick={handlePrevUnit}
              disabled={selectedUnit <= 1}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 text-[11px] font-bold text-amber-300 cursor-pointer active:scale-95"
              title="الوحدة السابقة"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>السابقة</span>
            </button>

            {/* Quick Unit Selector Dropdown */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-[11px]">
              <span className="text-slate-400 font-bold shrink-0">وحدة:</span>
              <select
                aria-label="اختر الوحدة الدراسية"
                value={selectedUnit}
                onChange={(e) => {
                  onSelectUnit(Number(e.target.value));
                  scrollToTop();
                }}
                className="bg-transparent font-black text-amber-400 focus:outline-none cursor-pointer max-w-[95px] truncate"
              >
                {unitsList.map((u) => (
                  <option key={u.number} value={u.number} className="bg-slate-950 text-white">
                    {u.number}. {u.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Unit button */}
            <button
              type="button"
              onClick={handleNextUnit}
              disabled={selectedUnit >= totalUnits}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 text-[11px] font-bold text-amber-300 cursor-pointer active:scale-95"
              title="الوحدة التالية"
            >
              <span>التالية</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          /* When in other tabs, show reading indicator and tab label */
          <div className="flex items-center gap-1.5 px-2 py-1 text-slate-300 text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">أدوات القراءة والمطالعة</span>
          </div>
        )}

        {/* Separator */}
        <div className="h-5 w-px bg-slate-800 mx-0.5" />

        {/* Reading Mode Toggle */}
        <button
          type="button"
          onClick={() => setReadingMode(!readingMode)}
          className={`p-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
            readingMode
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
          }`}
          title={readingMode ? 'إلغاء وضع القراءة' : 'تفعيل وضع القراءة المريح'}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Font Size Cycle */}
        <button
          type="button"
          onClick={cycleFontSize}
          className="px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px] font-black cursor-pointer hover:bg-slate-800"
          title="تكبير أو تصغير خط القراءة"
        >
          A
          <span className="text-[9px] text-amber-400 mr-0.5 font-bold">
            {readingFontSize === 'xlarge' ? '++' : readingFontSize === 'large' ? '+' : ''}
          </span>
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer transition-all active:scale-95 shadow-md"
            title="الصعود لأعلى الصفحة"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};
