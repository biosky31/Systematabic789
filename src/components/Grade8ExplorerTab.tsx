import React, { useState } from 'react';
import { UnitData, QuestionItem } from '../types';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';
import {
  GRADE_8_SERIES_OVERVIEW,
  GRADE_8_METADATA_PART1,
  GRADE_8_METADATA_PART2,
  GRADE_8_TABLE_OF_CONTENTS,
} from '../data/grade8Metadata';
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
  PenTool,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

interface Grade8ExplorerTabProps {
  selectedUnit?: number;
  onSelectUnit?: (unitNumber: number) => void;
}

export const Grade8ExplorerTab: React.FC<Grade8ExplorerTabProps> = ({
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
    GRADE_8_UNITS.find((u) => u.number === localUnitNumber) || GRADE_8_UNITS[0];

  const copyFullText = () => {
    navigator.clipboard.writeText(currentUnit.readingLesson.fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const filteredUnits = GRADE_8_UNITS.filter((u) => {
    const matchesPart = partFilter === 'all' || u.part === partFilter;
    const matchesSearch =
      u.title.includes(searchQuery) ||
      u.readingLesson.title.includes(searchQuery) ||
      (u.grammarLesson && u.grammarLesson.ruleTitle.includes(searchQuery));
    return matchesPart && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Grade 8 Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 border-2 border-purple-500/40 text-white p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black">
                🇾🇪 منهاج الجمهورية اليمنية المعتمد
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
                الجزآن الأول والثاني كاملان • 24 وحدة • 373 صفحة
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                طبعة وزارة التربية والتعليم
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-purple-100 tracking-tight">
              كِتَابَا «لُغَتِي الْعَرَبِيَّة» - الصَّفُّ الثَّامِنُ الأَسَاسِيّ (الجُزْءَان الأَوَّل وَالثَّانِي)
            </h2>

            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              تحليل واستخراج شامل ومحقق لكافة دروس القراءة والنصوص، وقواعد النحو (المبتدأ والخبر، كان وأخواتها، كاد وأخواتها، إن وأخواتها، لا النافية للجنس، إعراب المضارع والأفعال الخمسة، التوابع الأربعة: النعت، التوكيد، العطف، البدل، وجميع أنواع الضمائر المتصلة والمنفصلة والمستترة)، وقواعد الإملاء والرسم القرآني، مع حلول أسئلة التقويمات وبنك الأسئلة المكتشفة.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 border border-purple-400/40 text-purple-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showMetadata ? 'إخفاء بطاقة الكتاب الوزاري' : 'عرض بطاقة الكتابين والمقدمة الوزارية'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30 grid grid-cols-2 gap-3 text-center shrink-0 w-full md:w-auto">
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-amber-400">24</span>
              <span className="text-[11px] text-slate-300">وحدة دراسية كاملة</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-purple-400">373</span>
              <span className="text-[11px] text-slate-300">صفحة محققة وموثقة</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-cyan-400">24</span>
              <span className="text-[11px] text-slate-300">قاعدة نحوية وإملائية</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80">
              <span className="block text-2xl font-black text-emerald-400">100%</span>
              <span className="text-[11px] text-slate-300">مطابقة للمصدر اليمني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Collapsible Drawer */}
      {showMetadata && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-purple-500/40 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-black text-purple-200">
                بيانات التوثيق والاعتماد الوزاري لكتابي الصف الثامن الأساسي
              </h3>
            </div>
            <span className="text-xs bg-purple-900/60 border border-purple-700/60 px-3 py-1 rounded-full text-purple-200 font-bold">
              {GRADE_8_SERIES_OVERVIEW.academicYear}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Part 1 Card */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/30">
                  {GRADE_8_METADATA_PART1.part} (12 وحدة • 193 صفحة)
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {GRADE_8_METADATA_PART1.edition}
                </span>
              </div>
              <h4 className="font-black text-lg text-white">
                {GRADE_8_METADATA_PART1.title} - الجزء الأول
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>الغلاف والرمزية:</strong> {GRADE_8_METADATA_PART1.coverImageDescription}
              </p>
              <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-700/80">
                <p><strong>فريق التأليف:</strong> {GRADE_8_METADATA_PART1.authors.leader}، {GRADE_8_METADATA_PART1.authors.members.join('، ')}</p>
                <p><strong>المراجعة والإشراف:</strong> {GRADE_8_METADATA_PART1.reviewers.join('، ')}</p>
                <p><strong>الإقرار:</strong> {GRADE_8_METADATA_PART1.approvalDate}</p>
              </div>
            </div>

            {/* Part 2 Card */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-purple-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-black text-xs border border-purple-500/30">
                  {GRADE_8_METADATA_PART2.part} (12 وحدة • 180 صفحة)
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {GRADE_8_METADATA_PART2.edition}
                </span>
              </div>
              <h4 className="font-black text-lg text-white">
                {GRADE_8_METADATA_PART2.title} - الجزء الثاني
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>الغلاف والرمزية:</strong> {GRADE_8_METADATA_PART2.coverImageDescription}
              </p>
              <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-700/80">
                <p><strong>فريق التأليف:</strong> {GRADE_8_METADATA_PART2.authors.leader}، {GRADE_8_METADATA_PART2.authors.members.join('، ')}</p>
                <p><strong>المراجعة والإشراف:</strong> {GRADE_8_METADATA_PART2.reviewers.join('، ')}</p>
                <p><strong>المنهجية:</strong> {GRADE_8_METADATA_PART2.pedagogicalApproach}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit Selector Bar with Part Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-base shadow-sm">
              {currentUnit.number}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base md:text-lg">
                  الوحدة {currentUnit.number}: {currentUnit.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-black bg-purple-100 text-purple-800">
                  {currentUnit.part === 1 ? 'الجزء الأول' : 'الجزء الثاني'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                مجال الوحدة: {currentUnit.theme} (الصفحات: {currentUnit.pagesRange})
              </p>
            </div>
          </div>

          {/* Part Filter & Search Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Part Toggles */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setPartFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  partFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الكل (24)
              </button>
              <button
                onClick={() => setPartFilter(1)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  partFilter === 1
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ج1 (1 - 12)
              </button>
              <button
                onClick={() => setPartFilter(2)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  partFilter === 2
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ج2 (13 - 24)
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                placeholder="بحث في وحدات الثامن..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Units Tabs Grid (All 24 Units) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 pt-2 border-t border-slate-100">
          {filteredUnits.map((u) => {
            const isSelected = u.number === localUnitNumber;
            return (
              <button
                key={u.number}
                onClick={() => handleUnitChange(u.number)}
                className={`flex flex-col items-start p-2 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {u.number} ({u.part === 1 ? 'ج1' : 'ج2'})
                  </span>
                  <span className="text-[10px] opacity-80">ص {u.pagesRange.split('-')[0]}</span>
                </div>
                <span className="text-xs font-bold mt-1 line-clamp-1">{u.title}</span>
                <span className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                  {u.readingLesson.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-slate-200">
        {[
          { id: 'reading', label: 'القراءة والشرح والأفكار', icon: BookOpen, count: 'النص الكامل' },
          { id: 'vocabulary', label: 'المعجم والمفردات', icon: BookA, count: `${currentUnit.readingLesson.vocabulary.length} كلمة` },
          { id: 'grammar', label: 'النحو والصرف', icon: GraduationCap, count: currentUnit.grammarLesson?.title },
          { id: 'spelling', label: 'الإملاء والرسم', icon: PenTool, count: currentUnit.spellingLesson?.title },
          { id: 'questions', label: 'أسئلة الفهم والتقويم', icon: HelpCircle, count: `${currentUnit.readingLesson.readingQuestions?.length || currentUnit.readingLesson.comprehensionQuestions?.length || 0} سؤال` },
          { id: 'composition', label: 'التعبير والخط', icon: Sparkles, count: 'المهارات الفنية' },
        ].map((sub) => {
          const Icon = sub.icon;
          const isActive = activeSubSection === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubSection(sub.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sub.label}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                isActive ? 'bg-purple-700 text-purple-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {sub.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SUB-SECTION 1: READING & EXPLANATION */}
      {activeSubSection === 'reading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                  درس القراءة والمطالعة ({currentUnit.part === 1 ? 'الجزء الأول' : 'الجزء الثاني'} • ص {currentUnit.readingLesson.pageStart} - {currentUnit.readingLesson.pageEnd})
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {currentUnit.readingLesson.title}
                </h3>
                {currentUnit.readingLesson.author && (
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    المؤلف / المصدر: {currentUnit.readingLesson.author} • النوع الأدبي: {currentUnit.readingLesson.genre}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyFullText}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'تم نسخ النص' : 'نسخ النص'}</span>
                </button>
              </div>
            </div>

            {/* Full Textbook Text with Callout */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  النص القرائي الكامل كما ورد في كتاب الوزارة:
                </span>
                <span className="text-[11px] text-slate-400 font-bold">
                  مطابق 100% للصفحة الأصلية
                </span>
              </div>
              <div className="text-slate-800 text-base leading-relaxed font-serif whitespace-pre-line p-4 rounded-xl bg-white border border-slate-200/80 shadow-inner">
                {currentUnit.readingLesson.fullText}
              </div>
            </div>

            {/* Paragraph-by-Paragraph or Verse-by-Verse Breakdown */}
            {currentUnit.readingLesson.versesOrParagraphs && currentUnit.readingLesson.versesOrParagraphs.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  تحليل فقرات ومقاطع النص وشرحها التفصيلي:
                </h4>
                <div className="space-y-3">
                  {currentUnit.readingLesson.versesOrParagraphs.map((vp) => (
                    <div key={vp.index} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-purple-200 text-purple-800 text-xs font-black flex items-center justify-center">
                          {vp.index}
                        </span>
                        <p className="font-black text-slate-900 text-sm">
                          {vp.content}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed pr-8">
                        {vp.commentary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General & Sub Ideas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/70 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 text-xs font-bold">
                  الفكرة العامة للنص
                </span>
                <p className="text-xs md:text-sm text-slate-800 font-bold leading-relaxed">
                  {currentUnit.readingLesson.explanation.generalIdea}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                  الأفكار الرئيسة والفرعية
                </span>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                  {currentUnit.readingLesson.explanation.subIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed pedagogical points */}
            {currentUnit.readingLesson.explanation.detailedPoints && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                  تفصيلات ومعلومات وشواهد من شرح الكتاب
                </span>
                <ul className="space-y-1 text-xs md:text-sm text-slate-800">
                  {currentUnit.readingLesson.explanation.detailedPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: VOCABULARY */}
      {activeSubSection === 'vocabulary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                المعجم اللغوي والتراكيب • الوحدة {currentUnit.number}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                معجم الكلمات والتعبيرات وسياقاتها الواردة في الدرس
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200">
                    <th className="p-3">الكلمة أو التعبير</th>
                    <th className="p-3">المعنى في السياق</th>
                    <th className="p-3">المرادف المحتمل</th>
                    <th className="p-3">الضد المحتمل</th>
                    <th className="p-3">ملاحظات لغوية واشتقاقية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentUnit.readingLesson.vocabulary.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-black text-purple-900">{item.word}</td>
                      <td className="p-3 text-slate-800 font-medium">{item.contextMeaning || item.meaning}</td>
                      <td className="p-3 text-emerald-700">{item.synonym || '-'}</td>
                      <td className="p-3 text-rose-700">{item.antonym || '-'}</td>
                      <td className="p-3 text-slate-500 text-xs">{item.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: GRAMMAR */}
      {activeSubSection === 'grammar' && currentUnit.grammarLesson && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                القواعد النحوية والصرفية (ص {currentUnit.grammarLesson.page})
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {currentUnit.grammarLesson.title}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">
                {currentUnit.grammarLesson.ruleTitle}
              </p>
            </div>

            {/* Main Rule Box */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
              <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-700" />
                القاعدة الأساسية كما وردت في كتاب الوزارة:
              </span>
              <div className="text-slate-900 text-sm md:text-base font-bold whitespace-pre-line leading-relaxed">
                {currentUnit.grammarLesson.mainRule}
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-base">الشرح النحوي والصرفي المفصل:</h4>
              <div className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-50 border border-slate-200">
                {currentUnit.grammarLesson.detailedExplanation}
              </div>
            </div>

            {/* Table of Unmentioned details in summary */}
            {currentUnit.grammarLesson.unmentionedDetails && currentUnit.grammarLesson.unmentionedDetails.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                    معلومات نحوية وردت في الشرح ولم تظهر في خلاصة القاعدة
                  </span>
                </div>
                <div className="overflow-x-auto border border-amber-200 rounded-xl">
                  <table className="w-full text-right text-xs md:text-sm">
                    <thead>
                      <tr className="bg-amber-100/70 text-amber-900 font-black">
                        <th className="p-3">الموضوع / الحكم</th>
                        <th className="p-3">التفصيل الوارد في الشرح</th>
                        <th className="p-3 w-20">الصفحة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {currentUnit.grammarLesson.unmentionedDetails.map((ud, idx) => (
                        <tr key={idx} className="bg-amber-50/40">
                          <td className="p-3 font-bold text-slate-900">{ud.topic}</td>
                          <td className="p-3 text-slate-800">{ud.detail}</td>
                          <td className="p-3 text-slate-500 font-bold">{ud.page}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Examples & Syntactic Analysis */}
            {currentUnit.grammarLesson.examplesAnalysis && currentUnit.grammarLesson.examplesAnalysis.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="font-black text-slate-900 text-base">تحليل الشواهد والأمثلة وإعرابها:</h4>
                <div className="space-y-3">
                  {currentUnit.grammarLesson.examplesAnalysis.map((ex, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-black text-purple-900 text-sm md:text-base">
                        «{ex.example}»
                      </div>
                      <div className="text-xs md:text-sm text-slate-800">
                        <strong className="text-slate-900">موضع الشاهد: </strong>
                        <span className="text-emerald-800 font-bold">{ex.focusWord}</span>
                      </div>
                      <div className="text-xs md:text-sm text-slate-800">
                        <strong className="text-slate-900">الحكم والإعراب: </strong>
                        <span>{ex.syntacticRole}</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        <strong>التعليل والسبب: </strong>
                        <span>{ex.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparisons */}
            {currentUnit.grammarLesson.comparisons && currentUnit.grammarLesson.comparisons.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="font-black text-slate-900 text-base">المقارنات النحوية الدقيقة:</h4>
                <div className="space-y-3">
                  {currentUnit.grammarLesson.comparisons.map((cmp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-2">
                      <div className="flex items-center gap-2 font-black text-indigo-900 text-sm">
                        <span>{cmp.termA}</span>
                        <span className="text-slate-400">مقارنة مع</span>
                        <span>{cmp.termB}</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-700">
                        <strong>أوجه الاتفاق: </strong>{cmp.similarity}
                      </p>
                      <p className="text-xs md:text-sm text-slate-700">
                        <strong>أوجه الاختلاف والافتراق: </strong>{cmp.difference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: SPELLING */}
      {activeSubSection === 'spelling' && currentUnit.spellingLesson && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                قواعد الإملاء والرسم الكتابي (ص {currentUnit.spellingLesson.page})
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {currentUnit.spellingLesson.title}
              </h3>
            </div>

            {/* Spelling Main Rule */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-amber-700" />
                القاعدة الإملائية:
              </span>
              <div className="text-slate-900 text-sm md:text-base font-bold whitespace-pre-line leading-relaxed">
                {currentUnit.spellingLesson.mainRule}
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-base">الشرح والتطبيق والتعليل الإملائي:</h4>
              <div className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-50 border border-slate-200">
                {currentUnit.spellingLesson.detailedExplanation}
              </div>
            </div>

            {/* Examples Word List */}
            {currentUnit.spellingLesson.wordsList && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-black text-slate-700">أمثلة وكلمات وشواهد من الدرس:</span>
                <div className="flex flex-wrap gap-2">
                  {currentUnit.spellingLesson.wordsList.map((w, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 5: QUESTIONS & EVALUATION */}
      {activeSubSection === 'questions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                أسئلة الفهم والتقويم وبنك الأسئلة • الوحدة {currentUnit.number}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                الأسئلة الامتحانية وإجاباتها النموذجية الدقيقة
              </h3>
            </div>

            {/* Reading Comprehension Questions */}
            <div className="space-y-4">
              <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                أسئلة الفهم والاستيعاب للنص القرائي:
              </h4>

              {(((currentUnit.readingLesson.readingQuestions || currentUnit.readingLesson.comprehensionQuestions || []) as QuestionItem[])).map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="text-purple-700 font-black">سؤال {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <span>المهارة: {q.skillTested || 'فهم مباشر'}</span>
                      <span>•</span>
                      <span>{q.difficulty === 'easy' ? 'سهل' : q.difficulty === 'advanced' ? 'متقدم' : 'متوسط'}</span>
                    </div>
                  </div>

                  <p className="font-black text-slate-900 text-sm md:text-base">{q.question}</p>

                  <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-sm">
                    <span className="text-[11px] font-black text-emerald-800 block">الإجابة النموذجية المعتمدة:</span>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                      {q.modelAnswer || q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 6: COMPOSITION & CALLIGRAPHY */}
      {activeSubSection === 'composition' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                المهارات الفنية والتعبير • الوحدة {currentUnit.number}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                الخط العربي والتعبير والإنشاء
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                  درس الخط العربي
                </span>
                <h4 className="font-black text-slate-900 text-base">
                  قواعد خطي النسخ والرقعة
                </h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  يتدرب الطالب في هذه الوحدة على كتابة الشواهد القرآنية والأبيات الشعرية بخطي النسخ والرقعة مع مراعاة الحروف التي تستقر على السطر والحروف التي تهبط تحت السطر، وتناسب أبعاد الحروف وتوزيع الكلمات.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 text-xs font-bold">
                  درس التعبير والإنشاء
                </span>
                <h4 className="font-black text-slate-900 text-base">
                  الإنشاء التحريري والشفهي
                </h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  تطبيق عملي لكتابة مقال أو رسالة أو تلخيص مستلهم من فكرة الوحدة ({currentUnit.theme})، مع توظيف الأفكار الرئيسة والمفردات اللغوية الجديدة والقواعد النحوية والإملائية التي تعلمها الطالب في الوحدة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
