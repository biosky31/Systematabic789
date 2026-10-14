import React, { useState } from 'react';
import { ALL_UNITS } from '../data/unitsData';
import { GRADE_7_UNITS } from '../data/units/grade7AllUnits';
import { GRADE_8_UNITS } from '../data/units/grade8AllUnits';
import { BookA, Search, Filter, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface VocabularyTableTabProps {
  currentGrade?: 'grade7' | 'grade8' | 'grade9';
}

export const VocabularyTableTab: React.FC<VocabularyTableTabProps> = ({ currentGrade = 'grade7' }) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'grade7' | 'grade8' | 'grade9' | 'all'>(
    currentGrade === 'grade9' ? 'grade9' : currentGrade === 'grade8' ? 'grade8' : 'grade7'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'textbook' | 'enriched'>('all');

  const grade7Vocab = GRADE_7_UNITS.flatMap((u) =>
    u.readingLesson.vocabulary.map((v) => ({
      ...v,
      grade: 'الصف السابع',
      gradeKey: 'grade7',
      unitNumber: u.number,
      unitTitle: u.title,
    }))
  );

  const grade8Vocab = GRADE_8_UNITS.flatMap((u) =>
    u.readingLesson.vocabulary.map((v) => ({
      ...v,
      grade: 'الصف الثامن',
      gradeKey: 'grade8',
      unitNumber: u.number,
      unitTitle: u.title,
    }))
  );

  const grade9Vocab = ALL_UNITS.flatMap((u) =>
    u.readingLesson.vocabulary.map((v) => ({
      ...v,
      grade: 'الصف التاسع',
      gradeKey: 'grade9',
      unitNumber: u.number,
      unitTitle: u.title,
    }))
  );

  const allVocab = [...grade7Vocab, ...grade8Vocab, ...grade9Vocab];

  const filteredVocab = allVocab.filter((item) => {
    const matchesGrade =
      selectedGradeFilter === 'all' || item.gradeKey === selectedGradeFilter;

    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.contextMeaning || item.meaning || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.synonym && item.synonym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.antonym && item.antonym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.unitTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource =
      sourceFilter === 'all' ||
      (sourceFilter === 'textbook' && item.isFromTextbook) ||
      (sourceFilter === 'enriched' && !item.isFromTextbook);

    return matchesGrade && matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <BookA className="w-3.5 h-3.5" />
              المعجم اللغوي الشامل والتحليل الدلالي
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              مناهج التعليم الأساسي (7 • 8 • 9) • {allVocab.length} مفردة موثقة
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            جدول المفردات، المعاني في السياق، المرادفات، والأضداد
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
            استخراج معجمي محقق لكلمات النصوص وشروح الدروس وهوامش الكتاب المدرسي لجميع الصفوف، مع التمييز بين المفردات التي شرحها الكتاب صراحة والمفردات اللغوية الإثرائية.
          </p>
        </div>

        {/* Grade Quick Filter */}
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
              📘 السابع ({grade7Vocab.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade8')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade8'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              📗 الثامن ({grade8Vocab.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('grade9')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'grade9'
                  ? 'bg-amber-600 text-slate-950 shadow-md shadow-amber-600/30 ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🎓 التاسع ({grade9Vocab.length})
            </button>
            <button
              onClick={() => setSelectedGradeFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGradeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              🌐 الكل ({allVocab.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search and Secondary Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="ابحث عن كلمة، معنى سياقي، مرادف، أو ضد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold">مصدر الكلمة:</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">جميع المفردات</option>
            <option value="textbook">مشروحة صراحة في الكتاب</option>
            <option value="enriched">إثرائية مستخرجة من سياق الشرح</option>
          </select>
        </div>
      </div>

      {/* Vocabulary Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs">
                <th className="p-4 font-black">الصف والوحدة</th>
                <th className="p-4 font-black">الكلمة أو التعبير</th>
                <th className="p-4 font-black">المعنى في السياق</th>
                <th className="p-4 font-black">المرادف المحتمل</th>
                <th className="p-4 font-black">الضد المحتمل</th>
                <th className="p-4 font-black">ملاحظة وتوثيق</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
              {filteredVocab.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-md ml-1.5 ${
                        v.gradeKey === 'grade7'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : v.gradeKey === 'grade8'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {v.grade}
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">
                      و{v.unitNumber}: {v.unitTitle}
                    </span>
                  </td>
                  <td className="p-4 font-black text-slate-900 text-base">
                    {v.word}
                  </td>
                  <td className="p-4 text-slate-800 leading-relaxed font-medium">
                    {v.contextMeaning}
                  </td>
                  <td className="p-4 text-emerald-700 font-bold">
                    {v.synonym || '—'}
                  </td>
                  <td className="p-4 text-rose-600 font-bold">
                    {v.antonym || '—'}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block ${
                          v.isFromTextbook
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-purple-100 text-purple-800 border border-purple-200'
                        }`}
                      >
                        {v.isFromTextbook ? 'صريح بالكتاب' : 'إثراء سياقي'}
                      </span>
                      {v.notes && <p className="text-[11px] text-slate-500">{v.notes}</p>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
