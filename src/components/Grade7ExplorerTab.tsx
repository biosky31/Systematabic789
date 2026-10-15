import React, { useState } from 'react';
import { UnitData } from '../types';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import {
  GRADE_7_SERIES_OVERVIEW,
  GRADE_7_METADATA_PART1,
  GRADE_7_METADATA_PART2,
  GRADE_7_TABLE_OF_CONTENTS,
} from '../data/grade7Metadata';
import {
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  BookA,
  Printer,
  Info,
} from 'lucide-react';

interface Grade7ExplorerTabProps {
  selectedUnit?: number;
  onSelectUnit?: (unitNumber: number) => void;
}

export const Grade7ExplorerTab: React.FC<Grade7ExplorerTabProps> = ({
  selectedUnit = 1,
  onSelectUnit,
}) => {
  const [localUnitNumber, setLocalUnitNumber] = useState<number>(selectedUnit);
  const [partFilter, setPartFilter] = useState<'all' | 1 | 2>('all');
  const [showMetadata, setShowMetadata] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedUnit) {
      setLocalUnitNumber(selectedUnit);
    }
  }, [selectedUnit]);

  const handleUnitChange = (num: number) => {
    setLocalUnitNumber(num);
    if (onSelectUnit) onSelectUnit(num);
  };

  const [activeSubSection, setActiveSubSection] = useState<
    'reading' | 'vocabulary' | 'grammar' | 'spelling' | 'questions' | 'composition'
  >('reading');
  const [copiedText, setCopiedText] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUnit: UnitData =
    GRADE_7_UNITS.find((u) => u.number === localUnitNumber) || GRADE_7_UNITS[0];

  const copyFullText = () => {
    navigator.clipboard.writeText(currentUnit.readingLesson.fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const filteredUnits = GRADE_7_UNITS.filter((u) => {
    const matchesPart = partFilter === 'all' || u.part === partFilter;
    const matchesSearch =
      u.title.includes(searchQuery) ||
      u.readingLesson.title.includes(searchQuery) ||
      u.grammarLesson.ruleTitle.includes(searchQuery);
    return matchesPart && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Grade 7 Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-2 border-emerald-500/40 text-white p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                🇾🇪 منهاج الجمهورية اليمنية المعتمد
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
                الجزآن الأول والثاني كاملان • 24 وحدة • 334 صفحة
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                طبعة وزارة التربية والتعليم
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-emerald-100 tracking-tight">
              كِتَابَا «لُغَتِي الْعَرَبِيَّة» - الصَّفُّ السَّابِعُ الأَسَاسِيّ (الجُزْءَان الأَوَّل وَالثَّانِي)
            </h2>

            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              تحليل واستخراج شامل ومحقق لكافة دروس القراءة والنصوص، قواعد النحو والصرف (الكلام وأقسامه، المعارف السبع، الأفعال الثلاثة، الفاعل ونائب الفاعل، المفاعيل الأربعة، الحال، التمييز، المجرورات)، وقواعد الإملاء (التاء المربوطة والمفتوحة، همزتي الوصل والقطع، والهمزة المتوسطة بحالاتها الثلاث: الألف والواو والياء)، مع حلول التقويمات وبنك الأسئلة المكتشفة.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/40 hover:bg-emerald-600/60 border border-emerald-400/40 text-emerald-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showMetadata ? 'إخفاء بطاقة الكتاب الوزاري' : 'عرض بطاقة الكتاب والمقدمة الوزارية'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30 grid grid-cols-2 gap-3 text-center shrink-0 w-full md:w-auto">
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-amber-400">24</span>
              <span className="text-[11px] text-slate-300">وحدة دراسية كاملة</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-emerald-400">334</span>
              <span className="text-[11px] text-slate-300">صفحة محققة وموثقة</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-cyan-400">24</span>
              <span className="text-[11px] text-slate-300">قاعدة نحوية وصرفية</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-rose-400">100%</span>
              <span className="text-[11px] text-slate-300">مطابقة للمصدر اليمني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Collapsible Drawer */}
      {showMetadata && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-xl space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Part 1 Card */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-emerald-300 text-sm">📘 الجزء الأول (الوحدات 1 - 12)</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">162 صفحة</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{GRADE_7_SERIES_OVERVIEW.part1.coreTopics}</p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• الغلاف: {GRADE_7_METADATA_PART1.coverImageDescription}</div>
                <div>• التأليف: {GRADE_7_METADATA_PART1.authors.leader} واللجنة الفنية</div>
                <div>• الاعتماد: {GRADE_7_METADATA_PART1.approvalDate}</div>
              </div>
            </div>

            {/* Part 2 Card */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-cyan-300 text-sm">📗 الجزء الثاني (الوحدات 13 - 24)</h4>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">172 صفحة</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{GRADE_7_SERIES_OVERVIEW.part2.coreTopics}</p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• المنهاج: {GRADE_7_METADATA_PART2.publisher}</div>
                <div>• المنهجية: {GRADE_7_METADATA_PART2.pedagogicalApproach}</div>
                <div>• الاعتماد: {GRADE_7_METADATA_PART2.approvalDate}</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-100 leading-relaxed">
            <span className="font-bold text-amber-300 ml-1">توجيهات وزير التربية والتعليم:</span>
            {GRADE_7_METADATA_PART2.ministerIntroduction.keyThemes.join(' • ')}
          </div>
        </div>
      )}

      {/* Unit Selector Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>اختر الوحدة الدراسية للصف السابع:</span>
          </div>

          {/* Part Filter Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPartFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                partFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جميع الوحدات (24)
            </button>
            <button
              onClick={() => setPartFilter(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                partFilter === 1
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📘 الجزء الأول (1-12)
            </button>
            <button
              onClick={() => setPartFilter(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                partFilter === 2
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📗 الجزء الثاني (13-24)
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن وحدة أو درس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredUnits.map((u) => {
            const isSelected = u.number === localUnitNumber;
            return (
              <button
                key={u.number}
                onClick={() => handleUnitChange(u.number)}
                className={`flex flex-col items-start p-3 rounded-xl border text-right transition-all text-xs cursor-pointer ${
                  isSelected
                    ? u.part === 1
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                      : 'bg-cyan-700 text-white border-cyan-800 shadow-md ring-2 ring-cyan-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`font-black ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                    الوحدة {u.number}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                      isSelected
                        ? 'bg-black/30 text-white'
                        : u.part === 1
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-cyan-100 text-cyan-800'
                    }`}
                  >
                    ج{u.part}
                  </span>
                </div>
                <span className="font-bold line-clamp-1 text-[11px]">{u.title}</span>
                <span
                  className={`text-[10px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  {u.readingLesson.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Unit Content Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Unit Top Bar */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-0.5 rounded-full text-slate-950 font-black text-xs ${
                  currentUnit.part === 1 ? 'bg-emerald-400' : 'bg-cyan-400'
                }`}
              >
                الصف السابع • {currentUnit.part === 1 ? 'الجزء الأول' : 'الجزء الثاني'}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                الوحدة {currentUnit.number} • الصفحات {currentUnit.pagesRange}
              </span>
            </div>
            <h3 className="text-2xl font-black text-amber-200">{currentUnit.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 mt-1">{currentUnit.theme}</p>
          </div>

          {/* Sub Navigation Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar whitespace-nowrap">
            {[
              { id: 'reading', label: 'النص والشرح', icon: BookOpen },
              { id: 'vocabulary', label: 'المفردات', icon: BookA },
              { id: 'grammar', label: 'النحو', icon: GraduationCap },
              { id: 'spelling', label: 'الإملاء', icon: FileText },
              { id: 'composition', label: 'الخط والتعبير', icon: Sparkles },
              { id: 'questions', label: 'التقويم والأسئلة', icon: HelpCircle },
            ].map((sub) => {
              const Icon = sub.icon;
              const isSubActive = activeSubSection === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubSection(sub.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSubActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* 1. Reading Sub-Section */}
          {activeSubSection === 'reading' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                    <span>{currentUnit.readingLesson.title}</span>
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>النوع: {currentUnit.readingLesson.genre}</span>
                    {currentUnit.readingLesson.author && (
                      <span>• الكاتب / المصدر: {currentUnit.readingLesson.author}</span>
                    )}
                    <span>
                      • الصفحات في الكتاب: {currentUnit.readingLesson.pageStart} - {currentUnit.readingLesson.pageEnd}
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyFullText}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ النص كاملاً</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Text Card */}
              <div className="bg-amber-50/40 rounded-2xl p-6 border border-amber-200/60">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3">
                  📜 النص القرائي / الشعري كاملاً كما ورد في كتاب الوزارة
                </span>
                <div className="text-base md:text-lg leading-loose text-slate-900 font-serif whitespace-pre-line text-right selection:bg-amber-200">
                  {currentUnit.readingLesson.fullText}
                </div>
              </div>

              {/* Verses / Paragraphs Commentary */}
              {currentUnit.readingLesson.versesOrParagraphs && (
                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-800">تحليل الفقرات والشواهد مع التعليق البلاغي:</h5>
                  <div className="space-y-2">
                    {currentUnit.readingLesson.versesOrParagraphs.map((v) => (
                      <div key={v.index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="font-bold text-slate-900 text-sm">
                          <span className="text-emerald-600 ml-1.5">[{v.index}]</span>
                          {v.content}
                        </div>
                        {v.commentary && (
                          <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                            💡 <span className="font-bold text-slate-700">الشرح والتذوق:</span> {v.commentary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideas and Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <h5 className="font-black text-emerald-900 text-sm">الفكرة العامة والأفكار الجزئية:</h5>
                  <p className="text-xs font-bold text-emerald-800 bg-white p-2 rounded-lg border border-emerald-100">
                    {currentUnit.readingLesson.explanation.generalIdea}
                  </p>
                  <ul className="text-xs text-emerald-950 space-y-1 list-disc list-inside">
                    {currentUnit.readingLesson.explanation.subIdeas.map((idea, idx) => (
                      <li key={idx}>{idea}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <h5 className="font-black text-purple-900 text-sm">القيم التربوية والدروس المستفادة:</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUnit.readingLesson.explanation.moralValues?.map((val, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-900 text-xs font-bold">
                        ⭐ {val}
                      </span>
                    ))}
                  </div>
                  {currentUnit.readingLesson.explanation.causesAndEffects && (
                    <div className="pt-2 border-t border-purple-200/50 space-y-1">
                      <span className="text-xs font-bold text-purple-900 block">الأسباب والنتائج:</span>
                      {currentUnit.readingLesson.explanation.causesAndEffects.map((ce, idx) => (
                        <div key={idx} className="text-[11px] text-purple-950 bg-white/80 p-1.5 rounded border border-purple-100">
                          <span className="font-bold">السبب:</span> {ce.cause} ← <span className="font-bold">النتيجة:</span> {ce.effect}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Unsummarized Details Note */}
              {currentUnit.readingLesson.explanation.unsummarizedDetails && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5">
                  <span className="font-black text-xs block text-amber-900">
                    🔍 تفاصيل وشروح وردت في ثنايا الدرس ولم تُذكر في الخلاصة:
                  </span>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    {currentUnit.readingLesson.explanation.unsummarizedDetails.map((det, idx) => (
                      <li key={idx}>{det}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 2. Vocabulary Sub-Section */}
          {activeSubSection === 'vocabulary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BookA className="w-5 h-5 text-emerald-600" />
                  <span>جدول المفردات والتراكيب اللغوية والسياقية ({currentUnit.readingLesson.vocabulary.length} مفردة)</span>
                </h4>
                <span className="text-xs text-slate-500 font-bold">
                  مستخرجة من نص الدرس وشروحه وهوامشه
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3">الكلمة أو التعبير</th>
                      <th className="p-3">المعنى في السياق</th>
                      <th className="p-3">المرادف</th>
                      <th className="p-3">الضد</th>
                      <th className="p-3">الصفحة</th>
                      <th className="p-3">المصدر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentUnit.readingLesson.vocabulary.map((vocab, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-950 text-sm">{vocab.word}</td>
                        <td className="p-3 text-slate-800 font-medium leading-relaxed">{vocab.contextMeaning}</td>
                        <td className="p-3 text-emerald-700 font-bold">{vocab.synonym || '—'}</td>
                        <td className="p-3 text-rose-700 font-bold">{vocab.antonym || '—'}</td>
                        <td className="p-3 text-slate-500">{vocab.page ? `ص ${vocab.page}` : '—'}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              vocab.isFromTextbook
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {vocab.isFromTextbook ? 'وارد في الكتاب' : 'مقترح لغوي'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Grammar Sub-Section */}
          {activeSubSection === 'grammar' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                  <span>{currentUnit.grammarLesson.title}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">{currentUnit.grammarLesson.ruleTitle}</p>
              </div>

              {/* Definition Box */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-black text-emerald-900">القاعدة الأساسية والتعريف:</span>
                <p className="text-sm font-bold text-slate-900 leading-relaxed bg-white p-3 rounded-lg border border-emerald-100">
                  {currentUnit.grammarLesson.definition}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="text-xs text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-900 block">• الأحكام والعلامات:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {(currentUnit.grammarLesson.judgmentsAndSigns || []).map((j, idx) => (
                        <li key={idx}>{j}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-900 block">• الأنواع والشروط:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {(currentUnit.grammarLesson.conditions || []).map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Examples and Evidence */}
              <div className="space-y-3">
                <h5 className="font-bold text-sm text-slate-800">تحليل الأمثلة والشواهد مع الإعراب:</h5>
                <div className="space-y-2">
                  {(currentUnit.grammarLesson.examplesAndEvidence || []).map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-900 text-sm">{ex.sentence}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          الشاهد: {ex.evidencePlace}
                        </span>
                      </div>
                      <div className="text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-900">الحكم والسبب:</span> {ex.grammaticalRule} — {ex.reason}
                      </div>
                      {ex.parsingNotes && (
                        <div className="bg-white p-2 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">
                          <span className="font-bold text-emerald-700 font-sans">الإعراب:</span> {ex.parsingNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsummarized Grammar Points */}
              {currentUnit.grammarLesson.unsummarizedGrammarPoints && (
                <div className="space-y-2">
                  <h5 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <span>📋 جدول: معلومات نحوية وردت في الشرح ولم تظهر في خلاصة القاعدة:</span>
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-amber-200">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-amber-100 text-amber-950 font-bold">
                        <tr>
                          <th className="p-2.5">المعلومة النحوية</th>
                          <th className="p-2.5">الشرح والتوضيح</th>
                          <th className="p-2.5">الشاهد</th>
                          <th className="p-2.5">الصفحة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-200 bg-amber-50/40">
                        {currentUnit.grammarLesson.unsummarizedGrammarPoints.map((pt, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-bold text-slate-900">{pt.point}</td>
                            <td className="p-2.5 text-slate-700 leading-relaxed">{pt.explanation}</td>
                            <td className="p-2.5 text-emerald-700 font-mono text-[11px]">{pt.evidence}</td>
                            <td className="p-2.5 text-slate-500 font-bold">ص {pt.page}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Comparisons */}
              {currentUnit.grammarLesson.comparisons && (
                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-800">المقارنات النحوية الدقيقة لمنع اللبس:</h5>
                  {currentUnit.grammarLesson.comparisons.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-black text-amber-300 text-sm">
                          مقارنة بين: ({comp.conceptA}) و ({comp.conceptB})
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                          اختبار سريع: {comp.quickTest}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                        <div>
                          <span className="font-bold text-emerald-300 block">• أوجه الاتفاق:</span>
                          <p>{comp.pointsOfAgreement}</p>
                        </div>
                        <div>
                          <span className="font-bold text-rose-300 block">• أوجه الاختلاف:</span>
                          <p>{comp.pointsOfDifference}</p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-200">
                        <span className="font-bold text-white ml-1">تنبيه لخطأ شائع:</span> {comp.commonErrorAndCorrection}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Summary */}
              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                <span className="text-emerald-700 font-black ml-1">خلاصة يسهل حفظها:</span>
                {currentUnit.grammarLesson.quickSummary}
              </div>
            </div>
          )}

          {/* 4. Spelling Sub-Section */}
          {activeSubSection === 'spelling' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-emerald-600" />
                  <span>{currentUnit.spellingLesson.title}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">{currentUnit.spellingLesson.ruleSummary}</p>
              </div>

              {/* Rules & Cases */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2 text-xs">
                <span className="text-xs font-black text-blue-900">القواعد التفصيلية والحالات:</span>
                <ul className="space-y-1 text-blue-950 list-disc list-inside">
                  {(currentUnit.spellingLesson.detailedRules || []).map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-blue-200 flex flex-wrap gap-1.5">
                  <span className="font-bold text-blue-900 ml-1">شواهد من الكتاب:</span>
                  {(currentUnit.spellingLesson.wordsFromTextbook || []).map((w, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white border border-blue-200 font-bold text-blue-800">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Distinction Tips & Common Mistakes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                  <span className="font-black text-emerald-900 block">طرق عملية وسريعة للتمييز:</span>
                  <ul className="space-y-1 list-disc list-inside text-emerald-950">
                    {(currentUnit.spellingLesson.practicalDistinctionTips || []).map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                  <span className="font-black text-rose-900 block">الأخطاء الشائعة وتصويبها:</span>
                  {(currentUnit.spellingLesson.commonMistakes || []).map((m, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border border-rose-100 space-y-1">
                      <div className="text-rose-700 font-bold">❌ {m.mistake}</div>
                      <div className="text-emerald-700 font-bold">✓ {m.correction}</div>
                      <div className="text-slate-600 text-[11px]">{m.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsummarized Spelling Points */}
              {currentUnit.spellingLesson.unsummarizedSpellingPoints && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 text-xs">
                  <span className="font-black block text-amber-900">
                    🔍 تفاصيل إملائية في الشرح لم تتضمنها الخلاصة:
                  </span>
                  {currentUnit.spellingLesson.unsummarizedSpellingPoints.map((pt, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-amber-200">
                      <span className="font-bold text-slate-900">{pt.point}:</span> {pt.explanation}
                      <span className="text-slate-400 font-sans mr-2">(ص {pt.page})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Composition Sub-Section */}
          {activeSubSection === 'composition' && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                  <span>الخط العربي والتعبير والإنشاء</span>
                </h4>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <span className="text-xs font-bold text-amber-900 uppercase">نص الخط العربي للمحاكاة والتمرين:</span>
                <div className="text-xl md:text-2xl font-serif text-slate-900 text-center py-4 bg-white rounded-xl border border-amber-200 font-bold shadow-sm">
                  {currentUnit.calligraphyAndComposition?.calligraphyText || '—'}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <span className="text-xs font-bold text-emerald-400">مهمة التعبير والإنشاء المقترحة:</span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {currentUnit.calligraphyAndComposition?.writtenCompositionTopic ||
                    currentUnit.calligraphyAndComposition?.compositionPrompt ||
                    '—'}
                </p>
              </div>
            </div>
          )}

          {/* 6. Questions Sub-Section */}
          {activeSubSection === 'questions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  <span>أسئلة الكتاب والتقويم مع الإجابات النموذجية ({currentUnit.readingLesson.readingQuestions?.length || 0} سؤال)</span>
                </h4>
                <span className="text-xs text-slate-500 font-bold">
                  إجابات موثقة وفق ما ورد في الكتاب المدرسي
                </span>
              </div>

              <div className="space-y-3">
                {(currentUnit.readingLesson.readingQuestions || []).map((q, idx) => (
                  <div key={q.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-black text-slate-900 text-sm">
                        <span className="text-emerald-600 ml-1.5 font-mono">س{idx + 1}:</span>
                        {q.question}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                          {q.skill}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          ص {q.pageNumber}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs leading-relaxed font-medium">
                      <span className="font-bold text-emerald-900 block mb-0.5">✓ الإجابة النموذجية:</span>
                      {q.modelAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
