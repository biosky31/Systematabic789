import React from 'react';
import {
  BOOK_SERIES_OVERVIEW,
  BOOK_METADATA_PART1,
  BOOK_METADATA_PART2,
  TABLE_OF_CONTENTS,
} from '../data/bookMetadata';
import {
  GRADE_7_METADATA_PART1,
  GRADE_7_TABLE_OF_CONTENTS,
} from '../data/grade7Metadata';
import {
  GRADE_8_METADATA_PART1,
  GRADE_8_TABLE_OF_CONTENTS,
} from '../data/grade8Metadata';
import { ActiveGrade } from './Navbar';
import {
  BookOpen,
  Award,
  ShieldCheck,
  BookmarkCheck,
  ArrowLeft,
  Sparkles,
  Compass,
  Layers,
  CheckCircle2,
  Download,
  FileText,
  Printer,
  FileSpreadsheet,
  GraduationCap,
  School,
} from 'lucide-react';

interface UnifiedOverviewTabProps {
  currentGrade: ActiveGrade;
  setCurrentGrade: (grade: ActiveGrade) => void;
  onSelectUnit: (unitNumber: number) => void;
  selectedPartFilter: 'all' | 1 | 2;
  setSelectedPartFilter: (filter: 'all' | 1 | 2) => void;
}

export const UnifiedOverviewTab: React.FC<UnifiedOverviewTabProps> = ({
  currentGrade,
  setCurrentGrade,
  onSelectUnit,
  selectedPartFilter,
  setSelectedPartFilter,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Platform Master Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border-2 border-amber-500/30 text-white p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
              <Compass className="w-3.5 h-3.5" />
              منهاج الجمهورية اليمنية للتعليم الأساسي • طبعات معتمدة ومحققة
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              3 صفوف دراسية متكاملة (7 - 8 - 9)
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl font-black text-amber-50 leading-tight">
            مَوْسُوعَةُ «لُغَتِي الْعَرَبِيَّة»
            <span className="block text-lg md:text-2xl text-amber-400 font-bold mt-2">
              المرجع الشامل والامتحاني لمرحلة التعليم الأساسي (الصف السابع • الثامن • التاسع)
            </span>
          </h2>

          <p className="text-slate-300 text-xs md:text-base leading-relaxed max-w-4xl">
            نظام تعليمي وتربوي متكامل يجمع كتب اللغة العربية المقررة بوزارة التربية والتعليم في الجمهورية اليمنية لمرحلة التعليم الأساسي، يتيح للطلاب والمعلمين الانتقال السلس بين الصفوف، والاطلاع على النصوص الكاملة، والشروح الفكرية، وقواعد النحو والصرف، ومسائل الإملاء، مع بنك أسئلة واختبارات وتوليد الوسائل التعليمية البصرية والملزمة المطبوعة.
          </p>

          {/* Grade Selector Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Grade 7 Card */}
            <div
              onClick={() => {
                setCurrentGrade('grade7');
                onSelectUnit(1);
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                currentGrade === 'grade7'
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-xl ring-2 ring-emerald-400/50'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    ٧
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    24 وحدة كاملة (ج1 و ج2)
                  </span>
                </div>
                <h3 className="text-lg font-black text-emerald-200">الصف السابع الأساسي</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  ج1 (الكلام، الإعراب والبناء، والمبنيات) + ج2 (النكرة والمعرفة، الأفعال، الفاعل ونائبه، المفاعيل، الحال، التمييز، المجرورات، والهمزة المتوسطة).
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>{currentGrade === 'grade7' ? 'الصف النشط حالياً ✓' : 'انقر للتصفح والدراسة'}</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>

            {/* Grade 8 Card */}
            <div
              onClick={() => {
                setCurrentGrade('grade8');
                onSelectUnit(1);
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                currentGrade === 'grade8'
                  ? 'bg-purple-950/80 border-purple-400 shadow-xl ring-2 ring-purple-400/50'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-purple-500/60 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
                    ٨
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                    24 وحدة كاملة (الجزء الأول والثاني)
                  </span>
                </div>
                <h3 className="text-lg font-black text-purple-200">الصف الثامن الأساسي</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  ج1 (المبتدأ والخبر، النواسخ: كان وكاد وإن، ولا النافية للجنس، إعراب المضارع) + ج2 (التوابع: النعت، التوكيد، العطف، البدل، والضمائر كافة، والرسم الإملائي والقرآني).
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-purple-400">
                <span>{currentGrade === 'grade8' ? 'الصف النشط حالياً ✓' : 'انقر للتصفح والدراسة'}</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>

            {/* Grade 9 Card */}
            <div
              onClick={() => {
                setCurrentGrade('grade9');
                onSelectUnit(1);
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                currentGrade === 'grade9'
                  ? 'bg-amber-950/80 border-amber-400 shadow-xl ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/60 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                    ٩
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    24 وحدة (سلسلة كاملة)
                  </span>
                </div>
                <h3 className="text-lg font-black text-amber-200">الصف التاسع الأساسي</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  الجزأين الأول والثاني: الاستثناء، النداء، الشرط، التعجب، المدح والذم، المشتقات، المصادر، الميزان الصرفي، والمعاجم.
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>{currentGrade === 'grade9' ? 'الصف النشط حالياً ✓' : 'انقر للتصفح والدراسة'}</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade 7 Specific Content View when Active */}
      {currentGrade === 'grade7' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
                  فهرس المنهج الكامل • الصف السابع الأساسي
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  خريطة وحدات الجزأين الأول والثاني (24 وحدة دراسية • 334 صفحة)
                </h3>
              </div>
              <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl font-bold">
                طبعة معتمدة • الجزآن كاملان
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GRADE_7_TABLE_OF_CONTENTS.map((u) => (
                <div
                  key={u.unitNumber}
                  onClick={() => onSelectUnit(u.unitNumber)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/60 hover:bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      الوحدة {u.unitNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold">ص {u.totalPageRange}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{u.unitTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">📖 {u.readingLesson.title}</p>
                  <p className="text-xs text-emerald-800 line-clamp-1 font-semibold">⚖️ {u.grammarLesson.title}</p>
                  <p className="text-xs text-blue-700 line-clamp-1">✍️ {u.spellingLesson.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grade 8 Specific Content View when Active */}
      {currentGrade === 'grade8' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                  فهرس المنهج الكامل • الصف الثامن الأساسي
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  خريطة وحدات الجزأين الأول والثاني (24 وحدة دراسية • 373 صفحة)
                </h3>
              </div>
              <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl font-bold">
                طبعة معتمدة • الجزآن كاملان (193 + 180 صفحة)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GRADE_8_TABLE_OF_CONTENTS.map((u) => (
                <div
                  key={u.unitNumber}
                  onClick={() => onSelectUnit(u.unitNumber)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/60 hover:bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                      الوحدة {u.unitNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold">ص {u.totalPageRange}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{u.unitTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">📖 {u.readingLesson.title}</p>
                  <p className="text-xs text-purple-800 line-clamp-1 font-semibold">⚖️ {u.grammarLesson.title}</p>
                  <p className="text-xs text-blue-700 line-clamp-1">✍️ {u.spellingLesson.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grade 9 Specific Content View when Active */}
      {currentGrade === 'grade9' && (
        <div className="space-y-6">
          {/* Quick Part Switcher for Grade 9 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-slate-800">تصفية أجزاء الصف التاسع:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedPartFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedPartFilter === 'all'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  السلسلة كاملة (24 وحدة)
                </button>
                <button
                  onClick={() => setSelectedPartFilter(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedPartFilter === 1
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الجزء الأول (1 - 12)
                </button>
                <button
                  onClick={() => setSelectedPartFilter(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedPartFilter === 2
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الجزء الثاني (13 - 24)
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-bold">
              إجمالي الصفحات: 354 صفحة • 24 وحدة دراسية
            </div>
          </div>

          {/* Grade 9 Table of Contents Grid */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-4">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                فهرس المنهج • الصف التاسع الأساسي
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                خريطة الوحدات الدراسية (الجزأين 1 و 2)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TABLE_OF_CONTENTS.filter((u) => {
                if (selectedPartFilter === 'all') return true;
                if (selectedPartFilter === 1) return u.part === 1;
                return u.part === 2;
              }).map((u) => (
                <div
                  key={u.unitNumber}
                  onClick={() => onSelectUnit(u.unitNumber)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/60 hover:bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                      الوحدة {u.unitNumber} (الجزء {u.part})
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold">ص {u.totalPageRange}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{u.unitTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">📖 {u.readingLesson.title}</p>
                  <p className="text-xs text-amber-800 line-clamp-1 font-semibold">⚖️ {u.grammarLesson.title}</p>
                  <p className="text-xs text-blue-700 line-clamp-1">✍️ {u.spellingLesson.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
