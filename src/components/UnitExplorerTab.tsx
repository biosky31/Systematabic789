import React, { useState } from 'react';
import { UnitData } from '../types';
import {
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Table as TableIcon,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

interface UnitExplorerTabProps {
  unit: UnitData;
  onSelectUnit: (unitNumber: number) => void;
}

export const UnitExplorerTab: React.FC<UnitExplorerTabProps> = ({
  unit,
  onSelectUnit,
}) => {
  const [activeSubSection, setActiveSubSection] = useState<
    'reading' | 'vocabulary' | 'grammar' | 'spelling' | 'questions' | 'composition'
  >('reading');
  const [copiedText, setCopiedText] = useState(false);

  const copyFullText = () => {
    navigator.clipboard.writeText(unit.readingLesson.fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Unit header badge */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full font-black text-xs ${
                unit.part === 1
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              الجزء {unit.part === 1 ? 'الأول' : 'الثاني'} • الوحدة {unit.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
              الصفحات: {unit.pagesRange}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200/60">
              {unit.readingLesson.genre}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            {unit.title} : {unit.readingLesson.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            <strong>المحور العام:</strong> {unit.theme}
          </p>
        </div>

        {/* Quick jump to unit */}
        <div className="flex flex-col gap-1.5 shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>انتقال سريع:</span>
            <span>24 وحدة</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-amber-700 font-bold w-6">ج 1:</span>
              <div className="flex flex-wrap gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <button
                    key={num}
                    onClick={() => onSelectUnit(num)}
                    className={`w-6 h-6 rounded text-[11px] font-black transition-all ${
                      unit.number === num
                        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                        : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-emerald-700 font-bold w-6">ج 2:</span>
              <div className="flex flex-wrap gap-1">
                {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((num) => (
                  <button
                    key={num}
                    onClick={() => onSelectUnit(num)}
                    className={`w-6 h-6 rounded text-[11px] font-black transition-all ${
                      unit.number === num
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                        : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-section buttons (Scrollable horizontally on mobile to preserve vertical reading space) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveSubSection('reading')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeSubSection === 'reading'
              ? 'bg-slate-900 text-amber-300 shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          النص القرائي الكامل وشروحه (ص {unit.readingLesson.pageStart}-{unit.readingLesson.pageEnd})
        </button>

        <button
          onClick={() => setActiveSubSection('vocabulary')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeSubSection === 'vocabulary'
              ? 'bg-slate-900 text-amber-300 shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <TableIcon className="w-4 h-4 text-emerald-500" />
          المفردات والتراكيب ({unit.readingLesson.vocabulary.length} لفظة)
        </button>

        <button
          onClick={() => setActiveSubSection('grammar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeSubSection === 'grammar'
              ? 'bg-slate-900 text-amber-300 shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-blue-500" />
          النحو والصرف والمقارنات
        </button>

        <button
          onClick={() => setActiveSubSection('spelling')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeSubSection === 'spelling'
              ? 'bg-slate-900 text-amber-300 shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-500" />
          الإملاء والتطبيقات
        </button>

        <button
          onClick={() => setActiveSubSection('questions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            activeSubSection === 'questions'
              ? 'bg-slate-900 text-amber-300 shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-red-500" />
          أسئلة الكتاب والتقويم ({(unit.readingLesson.readingQuestions?.length || 0) + (unit.unitEvaluationQuestions?.length || 0)})
        </button>
      </div>

      {/* Sub-section 1: Full Verbatim Reading Text & In-depth Explanation */}
      {activeSubSection === 'reading' && (
        <div className="space-y-6">
          {/* Full Text Box */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                  النص الأصلي الكامل كما ورد في الكتاب المدرسي (ص {unit.readingLesson.pageStart} - {unit.readingLesson.pageEnd})
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                  {unit.readingLesson.title}
                  {unit.readingLesson.author && (
                    <span className="text-sm font-normal text-slate-500 block mt-0.5">
                      تأليف: {unit.readingLesson.author}
                    </span>
                  )}
                </h3>
              </div>
              <button
                onClick={copyFullText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>نسخ النص الكامل</span>
                  </>
                )}
              </button>
            </div>

            {/* Verses breakdown if poetry, else prose */}
            {unit.readingLesson.versesOrParagraphs ? (
              <div className="space-y-3">
                {unit.readingLesson.versesOrParagraphs.map((item) => (
                  <div
                    key={item.index}
                    className="p-4 rounded-xl bg-slate-50/80 hover:bg-amber-50/40 border border-slate-200/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {item.index}
                      </span>
                      <p className="font-['Amiri',serif] text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                    {item.commentary && (
                      <p className="text-xs text-slate-600 mt-2 mr-10 leading-relaxed border-t border-slate-200/50 pt-2">
                        💡 <strong>الشرح البلاغي:</strong> {item.commentary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-amber-50/20 p-5 rounded-xl border border-amber-900/10 font-['Amiri',serif] text-base md:text-lg text-slate-800 leading-loose whitespace-pre-line text-justify">
                {unit.readingLesson.fullText}
              </div>
            )}
          </div>

          {/* In-depth Analytical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General & Sub ideas */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-black text-slate-900 text-base flex items-center gap-2 border-b pb-3">
                <Bookmark className="w-4 h-4 text-amber-600" />
                الفكرة العامة والأفكار الجزئية المرتبة
              </h4>
              <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60 text-sm font-bold text-amber-950">
                الفكرة العامة: {unit.readingLesson.explanation.generalIdea}
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">الأفكار الرئيسة والفرعية:</span>
                <ul className="space-y-2">
                  {unit.readingLesson.explanation.subIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Causes, Effects & Moral Values */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-black text-slate-900 text-base flex items-center gap-2 border-b pb-3">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                الأسباب والنتائج والقيم والدروس المستفادة
              </h4>
              {unit.readingLesson.explanation.causesAndEffects && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">الأسباب والنتائج الواردة في النص:</span>
                  {unit.readingLesson.explanation.causesAndEffects.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 border border-slate-200/70">
                      <p><strong className="text-red-700">السبب:</strong> {item.cause}</p>
                      <p><strong className="text-emerald-700">النتيجة:</strong> {item.effect}</p>
                    </div>
                  ))}
                </div>
              )}

              {unit.readingLesson.explanation.moralValues && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block">القيم والدروس المستفادة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {unit.readingLesson.explanation.moralValues.map((val, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                        ✓ {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Table: Information in Explanation Not in Final Summary */}
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-black text-base">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h4>معلومات وتفاصيل هامة وردت في الشرح والهوامش والأنشطة ولم تتضمنها الخلاصة</h4>
            </div>
            <p className="text-xs text-amber-800">
              استخراج دقيق لتفاصيل الأسئلة الامتحانية المباغتة المأخوذة من ثنايا الشرح:
            </p>
            <div className="space-y-2 mt-2">
              {(unit.readingLesson.explanation.unsummarizedDetails || []).map((detail, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-xs md:text-sm text-slate-800 flex items-start gap-2 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-section 2: Vocabulary & Structure Table */}
      {activeSubSection === 'vocabulary' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                جدول المفردات والتراكيب اللغوية للوحدة {unit.number}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                يشمل الكلمات التي شرحها الكتاب صراحة، إضافة إلى المفردات السياقية والمرادفات والأضداد مع التمييز الواضح بينها.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                منصوص عليه في الكتاب ({unit.readingLesson.vocabulary.filter((v) => v.isFromTextbook).length})
              </span>
              <span className="flex items-center gap-1 font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                مقترح لغوي إضافي ({unit.readingLesson.vocabulary.filter((v) => !v.isFromTextbook).length})
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">الكلمة أو التعبير</th>
                  <th className="py-3 px-4">المعنى في السياق</th>
                  <th className="py-3 px-4">المرادف المحتمل</th>
                  <th className="py-3 px-4">الضد المحتمل</th>
                  <th className="py-3 px-4">الصفحة</th>
                  <th className="py-3 px-4">المصدر والملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unit.readingLesson.vocabulary.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-black text-amber-900 font-['Amiri',serif] text-base">
                      {item.word}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {item.contextMeaning}
                    </td>
                    <td className="py-3 px-4 text-emerald-800 font-medium">
                      {item.synonym || '—'}
                    </td>
                    <td className="py-3 px-4 text-rose-800 font-medium">
                      {item.antonym || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.page ? `ص ${item.page}` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      {item.isFromTextbook ? (
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          نص الكتاب
                        </span>
                      ) : (
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          مقترح إثرائي
                        </span>
                      )}
                      {item.notes && <span className="block text-[11px] text-slate-500 mt-0.5">{item.notes}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-section 3: Grammar & Morphology Deep Dive */}
      {activeSubSection === 'grammar' && (
        <div className="space-y-6">
          {/* Main Rule & Detailed Explanation */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-4">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                قسم النحو والصرف
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {unit.grammarLesson.title}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                {unit.grammarLesson.ruleTitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 text-sm md:text-base text-blue-950 leading-relaxed font-bold">
              📌 <strong>القاعدة الأساسية:</strong> {unit.grammarLesson.definition}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">الأحكام والعلامات الصرفية:</span>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                  {(unit.grammarLesson.judgmentsAndSigns || []).map((j, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{j}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">الأنواع والأقسام والأوزان:</span>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                  {(unit.grammarLesson.typesAndCategories || []).map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Crucial Table: Information in Explanation Not in Final Rule Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <h4 className="text-base font-black text-slate-900">
                  جدول خاص: «معلومات نحوية وصرفية وردت في الشرح ولم تظهر في خلاصة القاعدة»
                </h4>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                بند تدقيق إلزامي
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-right text-xs md:text-sm">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b">
                  <tr>
                    <th className="py-3 px-4">المسألة الصرفية أو النحوية</th>
                    <th className="py-3 px-4">التوضيح الدقيق من الشرح</th>
                    <th className="py-3 px-4">الصفحة</th>
                    <th className="py-3 px-4">الشاهد والنص المثبت من الكتاب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(unit.grammarLesson.unsummarizedGrammarPoints || []).map((point, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {point.point}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed">
                        {point.explanation}
                      </td>
                      <td className="py-3 px-4 font-semibold text-amber-800 whitespace-nowrap">
                        ص {point.page}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-600 bg-slate-50/50">
                        {point.evidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Examples and Evidence Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-base font-black text-slate-900 border-b pb-3">
              تحليل الأمثلة والشواهد المقررة في الدرس
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(unit.grammarLesson.examplesAndEvidence || []).map((ex, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900 text-sm font-['Amiri',serif]">
                    «{ex.sentence}»
                  </p>
                  <div className="text-xs space-y-1 text-slate-700">
                    <p><strong className="text-blue-700">موضع الشاهد:</strong> {ex.evidencePlace}</p>
                    <p><strong className="text-emerald-700">الحكم الصرفي:</strong> {ex.grammaticalRule}</p>
                    <p><strong className="text-slate-900">التعليل:</strong> {ex.reason}</p>
                    {ex.parsingNotes && (
                      <p className="text-purple-800 bg-purple-50 p-1.5 rounded mt-1">
                        <strong>إعراب:</strong> {ex.parsingNotes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammatical Comparisons & Common Errors */}
          {(unit.grammarLesson.comparisons || []).length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-black text-slate-900 border-b pb-3">
                جداول المقارنة النحوية والفروق الدقيقة وتصحيح الأخطاء الشائعة
              </h4>
              <div className="space-y-4">
                {(unit.grammarLesson.comparisons || []).map((cmp, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-black border-b border-slate-200 pb-2">
                      <div className="text-blue-900">الحالة الأولى: {cmp.conceptA}</div>
                      <div className="text-emerald-900">الحالة الثانية: {cmp.conceptB}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
                      <div>
                        <strong className="text-slate-900 block mb-0.5">أوجه الاتفاق:</strong>
                        <p>{cmp.pointsOfAgreement}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">أوجه الاختلاف:</strong>
                        <p>{cmp.pointsOfDifference}</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                      <p><strong className="text-amber-800">العلامة المميزة:</strong> {cmp.distinguishingSigns}</p>
                      <p><strong className="text-purple-800">الاختبار اللغوي البسيط:</strong> {cmp.quickTest}</p>
                      <p><strong className="text-emerald-800">مثال صحيح أ:</strong> {cmp.correctExampleA}</p>
                      <p><strong className="text-emerald-800">مثال صحيح ب:</strong> {cmp.correctExampleB}</p>
                      <p><strong className="text-rose-800">الخطأ الشائع وتصويبه:</strong> {cmp.commonErrorAndCorrection}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-section 4: Spelling (الإملاء) */}
      {activeSubSection === 'spelling' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-4">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                قسم الإملاء وقواعد الرسم الكتابي
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {unit.spellingLesson.title}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/80 text-sm md:text-base text-purple-950 font-bold leading-relaxed">
              📝 <strong>القاعدة الإملائية الأساسية:</strong> {unit.spellingLesson.ruleSummary}
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 block">شرح القواعد والحالات المختلفة بالتفصيل:</span>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                {(unit.spellingLesson.detailedRules || []).map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unsummarized Spelling Points Table */}
            {(unit.spellingLesson.unsummarizedSpellingPoints || []).length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  جدول: «تفاصيل إملائية في الشرح لم تتضمنها الخلاصة»
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b">
                      <tr>
                        <th className="py-2.5 px-3">المسألة الإملائية</th>
                        <th className="py-2.5 px-3">التفصيل والشرح</th>
                        <th className="py-2.5 px-3">الصفحة</th>
                        <th className="py-2.5 px-3">الشاهد المثبت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(unit.spellingLesson.unsummarizedSpellingPoints || []).map((pt, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{pt.point}</td>
                          <td className="py-2.5 px-3 text-slate-700">{pt.explanation}</td>
                          <td className="py-2.5 px-3 font-semibold text-purple-800 whitespace-nowrap">ص {pt.page}</td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono">{pt.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Common Mistakes & Practical Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">طريقة عملية تساعد الطالب على التمييز:</span>
                <div className="space-y-2">
                  {(unit.spellingLesson.practicalDistinctionTips || []).map((tip, idx) => (
                    <div key={idx} className="p-3 bg-emerald-50 text-emerald-950 rounded-xl text-xs border border-emerald-200 leading-relaxed">
                      💡 {tip}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">الأخطاء الشائعة وتصويبها:</span>
                <div className="space-y-2">
                  {(unit.spellingLesson.commonMistakes || []).map((m, idx) => (
                    <div key={idx} className="p-3 bg-rose-50 rounded-xl text-xs border border-rose-200 space-y-1">
                      <p className="text-rose-900"><strong className="text-rose-700">الخطأ:</strong> {m.mistake}</p>
                      <p className="text-emerald-900 font-bold"><strong className="text-emerald-700">الصواب:</strong> {m.correction}</p>
                      <p className="text-slate-600"><strong>السبب:</strong> {m.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-section 5: Textbook & Evaluation Questions */}
      {activeSubSection === 'questions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-3">
              <h3 className="text-xl font-black text-slate-900">
                أسئلة الكتاب وتدريبات الفهم والاستيعاب والتقويم النهائي للوحدة {unit.number}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                جميع أسئلة الكتاب الأصلية مصحوبة بإجابات نموذجية دقيقة مستندة إلى نصوص الكتاب وشروحه.
              </p>
            </div>

            <div className="space-y-4">
              {[...(unit.readingLesson.readingQuestions || []), ...(unit.unitEvaluationQuestions || [])].map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 transition-all shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      سؤال {idx + 1} • ص {q.pageNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {q.skill}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {q.category === 'direct' ? 'مباشر' : q.category === 'deductive' ? 'استنتاجي' : 'تطبيقي'}
                      </span>
                    </div>
                  </div>

                  <p className="font-bold text-slate-900 text-sm md:text-base leading-relaxed">
                    {q.question}
                  </p>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs md:text-sm text-emerald-950 leading-relaxed">
                    <strong className="block text-emerald-800 font-bold mb-1">
                      الإجابة النموذجية الدقيقة:
                    </strong>
                    {q.modelAnswer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
