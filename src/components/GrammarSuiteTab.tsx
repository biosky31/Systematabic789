import React, { useState } from 'react';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';
import { GraduationCap, Search, CheckCircle, ArrowRightLeft, BookOpen, Filter, Lightbulb, Scale } from 'lucide-react';

interface GrammarSuiteTabProps {
  currentGrade?: 'grade7' | 'grade8' | 'grade9';
}

export const GrammarSuiteTab: React.FC<GrammarSuiteTabProps> = ({ currentGrade = 'grade7' }) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'grade7' | 'grade8' | 'grade9' | 'all'>(
    currentGrade === 'grade9' ? 'grade9' : currentGrade === 'grade8' ? 'grade8' : 'grade7'
  );
  const [searchTerm, setSearchTerm] = useState('');

  const grade7Grammar = GRADE_7_UNITS.map((u) => ({
    grade: 'الصف السابع',
    gradeKey: 'grade7',
    unitNumber: u.number,
    unitTitle: u.title,
    ...u.grammarLesson,
  }));

  const grade8Grammar = GRADE_8_UNITS.map((u) => ({
    grade: 'الصف الثامن',
    gradeKey: 'grade8',
    unitNumber: u.number,
    unitTitle: u.title,
    ...u.grammarLesson,
  }));

  const grade9Grammar = ALL_UNITS.map((u) => ({
    grade: 'الصف التاسع',
    gradeKey: 'grade9',
    unitNumber: u.number,
    unitTitle: u.title,
    ...u.grammarLesson,
  }));

  const allGrammarLessons = [...grade7Grammar, ...grade8Grammar, ...grade9Grammar];

  const filteredLessons = allGrammarLessons.filter((g) => {
    const matchesGrade =
      selectedGradeFilter === 'all' || g.gradeKey === selectedGradeFilter;
    const matchesSearch =
      g.title.includes(searchTerm) ||
      (g.definition || '').includes(searchTerm) ||
      g.ruleTitle.includes(searchTerm) ||
      g.unitTitle.includes(searchTerm);
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              موسوعة النحو والصرف والميزان الصرفي
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              مناهج التعليم الأساسي (7 • 8 • 9) • 48 قاعدة مقررة
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            موسوعة القواعد النحوية والصرفية، الأوزان، والشواهد الإعرابية
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
            تغطية شاملة ومحققة لجميع القواعد المقررة في الصف السابع، الثامن، والتاسع: الجملة الاسمية، النواسخ (كان، كاد، إن، ظن وأخواتها)، إعراب المضارع، الأفعال الخمسة، التوابع، المشتقات، المصادر، والمعاجم.
          </p>
        </div>

        {/* Grade Filter Controls */}
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
              📘 السابع ({grade7Grammar.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade8')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade8'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              📗 الثامن ({grade8Grammar.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade9')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade9'
                  ? 'bg-amber-600 text-slate-950 shadow-md shadow-amber-600/30 ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🎓 التاسع ({grade9Grammar.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🌐 الكل ({allGrammarLessons.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="ابحث عن قاعدة، وزن، مصطلح، أو شاهد إعرابي..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
        </div>
        <span className="text-xs text-slate-500 font-bold shrink-0">
          عدد القواعد المعروضة: {filteredLessons.length}
        </span>
      </div>

      {/* Rules list */}
      <div className="grid grid-cols-1 gap-6">
        {filteredLessons.map((lesson, idx) => (
          <div
            key={`${lesson.gradeKey}_${lesson.unitNumber}_${idx}`}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5 hover:border-blue-400 transition-all"
          >
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
              <span className="text-xs font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {lesson.ruleTitle}
              </span>
            </div>

            {/* Definition Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs md:text-sm font-bold text-blue-950 leading-relaxed">
              📌 {lesson.definition}
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-700 block flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  الأحكام والضوابط الصرفية والنحوية:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(lesson.judgmentsAndSigns || []).map((j, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{j}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-700 block flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" />
                  الأنواع والأوزان الرئيسة:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(lesson.typesAndCategories || []).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Examples & Evidence */}
            {lesson.examplesAndEvidence && lesson.examplesAndEvidence.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-700 block">
                  الشواهد والأمثلة المحلولة من الكتاب:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {lesson.examplesAndEvidence.map((ex, exIdx) => (
                    <div key={exIdx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-black text-blue-900 block">«{ex.sentence}»</span>
                      <p className="text-[11px] text-slate-600">
                        <strong className="text-slate-800">موضع الشاهد:</strong> {ex.evidencePlace} • {ex.grammaticalRule}
                      </p>
                      {ex.parsingNotes && (
                        <p className="text-[11px] text-emerald-800 font-semibold">
                          <strong>الإعراب:</strong> {ex.parsingNotes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unsummarized Points */}
            {lesson.unsummarizedGrammarPoints && lesson.unsummarizedGrammarPoints.length > 0 && (
              <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-800" />
                  <span className="text-xs font-black text-amber-950">
                    🔍 معلومات نحوية وردت في الشرح ولم تظهر في خلاصة القاعدة (ذات قيمة امتحانية):
                  </span>
                </div>
                <div className="space-y-2">
                  {lesson.unsummarizedGrammarPoints.map((p, pIdx) => (
                    <div key={pIdx} className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-amber-950 font-black">• {p.point}</strong>
                        <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded-full text-amber-900 font-bold">
                          صفحة {p.page}
                        </span>
                      </div>
                      <p className="text-slate-700">{p.explanation}</p>
                      {p.evidence && (
                        <p className="text-blue-900 font-semibold text-[11px]">
                          الشاهد: «{p.evidence}»
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
