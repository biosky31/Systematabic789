import React, { useState } from 'react';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';
import {
  PenTool,
  Search,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Filter,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface SpellingSuiteTabProps {
  currentGrade?: 'grade7' | 'grade8' | 'grade9';
}

export const SpellingSuiteTab: React.FC<SpellingSuiteTabProps> = ({ currentGrade = 'grade7' }) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'grade7' | 'grade8' | 'grade9' | 'all'>(
    currentGrade === 'grade9' ? 'grade9' : currentGrade === 'grade8' ? 'grade8' : 'grade7'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabSubFilter, setActiveTabSubFilter] = useState<'all' | 'unsummarized' | 'mistakes'>('all');

  const grade7Spelling = GRADE_7_UNITS.map((u) => ({
    grade: 'الصف السابع',
    gradeKey: 'grade7',
    unitNumber: u.number,
    unitTitle: u.title,
    theme: u.theme,
    ...u.spellingLesson,
  }));

  const grade8Spelling = GRADE_8_UNITS.map((u) => ({
    grade: 'الصف الثامن',
    gradeKey: 'grade8',
    unitNumber: u.number,
    unitTitle: u.title,
    theme: u.theme,
    ...u.spellingLesson,
  }));

  const grade9Spelling = ALL_UNITS.map((u) => ({
    grade: 'الصف التاسع',
    gradeKey: 'grade9',
    unitNumber: u.number,
    unitTitle: u.title,
    theme: u.theme,
    ...u.spellingLesson,
  }));

  const allLessons = [...grade7Spelling, ...grade8Spelling, ...grade9Spelling];

  const filteredLessons = allLessons.filter((item) => {
    const matchesGrade =
      selectedGradeFilter === 'all' || item.gradeKey === selectedGradeFilter;

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.ruleSummary || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.wordsFromTextbook || []).some((w) => w.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubFilter =
      activeTabSubFilter === 'all' ||
      (activeTabSubFilter === 'unsummarized' && (item.unsummarizedSpellingPoints?.length || 0) > 0) ||
      (activeTabSubFilter === 'mistakes' && (item.commonMistakes?.length || 0) > 0);

    return matchesGrade && matchesSearch && matchesSubFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              موسوعة الرسم الإملائي وقواعد الكتابة المعتمدة
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              مناهج التعليم الأساسي (7 • 8 • 9) • {allLessons.length} درساً محققاً
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            موسوعة الإملاء، رسم الهمزات، والألف اللينة، والمدّات، وعلامات الترقيم
          </h2>

          <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
            استعراض دقيق وشامل لجميع الدروس الإملائية المقررة في الصف السابع، الثامن، والتاسع، مع خفايا الشرح، وتصويب الأخطاء الشائعة، وطرق التمييز السريع للاختبارات الوزارية.
          </p>
        </div>

        {/* Grade Quick Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200 shrink-0">
          <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            تصفية الصف:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setSelectedGradeFilter('grade7')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade7'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              📘 السابع ({grade7Spelling.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade8')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade8'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              📗 الثامن ({grade8Spelling.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade9')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade9'
                  ? 'bg-amber-600 text-slate-950 shadow-md shadow-amber-600/30 ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🎓 التاسع ({grade9Spelling.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🌐 الكل ({allLessons.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search and Sub-filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="ابحث عن قاعدة إملائية، همزة، ألف لينة، أو كلمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTabSubFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTabSubFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع الدروس ({filteredLessons.length})
          </button>
          <button
            onClick={() => setActiveTabSubFilter('unsummarized')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTabSubFilter === 'unsummarized'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🔍 خفايا الشرح التي لم ترد في الخلاصة
          </button>
          <button
            onClick={() => setActiveTabSubFilter('mistakes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTabSubFilter === 'mistakes'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⚠️ تصويب الأخطاء الشائعة
          </button>
        </div>
      </div>

      {/* Spelling Lessons Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredLessons.map((lesson, idx) => (
          <div
            key={`${lesson.gradeKey}_${lesson.unitNumber}_${idx}`}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                    lesson.gradeKey === 'grade7'
                      ? 'bg-emerald-600 text-white'
                      : lesson.gradeKey === 'grade8'
                      ? 'bg-purple-600 text-white'
                      : 'bg-amber-600 text-slate-950 font-black'
                  }`}
                >
                  {lesson.unitNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        lesson.gradeKey === 'grade7'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : lesson.gradeKey === 'grade8'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {lesson.grade}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      الوحدة {lesson.unitNumber}: {lesson.unitTitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {lesson.title}
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                درس إملائي مقرر
              </span>
            </div>

            {/* Rule Summary */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs md:text-sm font-bold text-indigo-950 leading-relaxed">
              📌 <strong className="text-indigo-900">القاعدة الأساسية: </strong>
              {lesson.ruleSummary}
            </div>

            {/* Detailed Rules & Cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.detailedRules && lesson.detailedRules.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-700 block flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                    الشرح التفصيلي وحالات القاعدة:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {lesson.detailedRules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.exceptionsAndAlerts && lesson.exceptionsAndAlerts.length > 0 && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <span className="text-xs font-black text-amber-900 block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    الاستثناءات والتنبيهات المنهجية:
                  </span>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {lesson.exceptionsAndAlerts.map((exc, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Words from textbook */}
            {lesson.wordsFromTextbook && lesson.wordsFromTextbook.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-600 block">
                  الشواهد والكلمات التطبيقية الواردة في الكتاب:
                </span>
                <div className="flex flex-wrap gap-2">
                  {lesson.wordsFromTextbook.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unsummarized Points (Important for exams) */}
            {lesson.unsummarizedSpellingPoints && lesson.unsummarizedSpellingPoints.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-black text-amber-900">
                    جدول: تفاصيل إملائية هامة وردت في الشرح ولم تتضمنها الخلاصة النهائية (قيمة امتحانية عالية)
                  </span>
                </div>
                <div className="space-y-2">
                  {lesson.unsummarizedSpellingPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-amber-950 font-black">{pt.point}</strong>
                        <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded-full text-amber-900 font-bold">
                          صفحة {pt.page}
                        </span>
                      </div>
                      <p className="text-slate-700">{pt.explanation}</p>
                      {pt.evidence && (
                        <p className="text-indigo-900 font-semibold text-[11px]">
                          الشاهد: «{pt.evidence}»
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Distinction Tips & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {lesson.practicalDistinctionTips && lesson.practicalDistinctionTips.length > 0 && (
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-2">
                  <span className="text-xs font-black text-blue-900 block flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                    طرق عملية للتمييز السريع في الامتحان:
                  </span>
                  <ul className="space-y-1.5 text-xs text-blue-950">
                    {lesson.practicalDistinctionTips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 space-y-2">
                  <span className="text-xs font-black text-rose-900 block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    الأخطاء الشائعة والتحذيرات الامتحانية:
                  </span>
                  <div className="space-y-2">
                    {lesson.commonMistakes.map((mis, mIdx) => (
                      <div key={mIdx} className="bg-white/80 p-2.5 rounded-xl border border-rose-200 text-xs space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-600 font-bold line-through">الخطأ: {mis.mistake}</span>
                          <span className="text-emerald-700 font-black">← الصواب: {mis.correction}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{mis.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
