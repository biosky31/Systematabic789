import React, { useState, useEffect } from 'react';
import { DISCOVERED_EXAM_QUESTIONS, GRADE_7_DISCOVERED_QUESTIONS } from '../data/undocumentedExamQuestions';
import { GRADE_8_DISCOVERED_QUESTIONS } from '../data/grade8DiscoveredQuestions';
import { ActiveGrade } from './Navbar';
import { Search, AlertTriangle, ShieldAlert, Award, HelpCircle } from 'lucide-react';

interface DiscoveredQuestionsTabProps {
  currentGrade?: ActiveGrade;
}

export const DiscoveredQuestionsTab: React.FC<DiscoveredQuestionsTabProps> = ({ currentGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<'grade9' | 'grade8' | 'grade7' | 'all'>(
    (currentGrade as any) || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  useEffect(() => {
    if (currentGrade) {
      setSelectedGrade(currentGrade as any);
    }
  }, [currentGrade]);

  const combinedQuestions = [
    ...DISCOVERED_EXAM_QUESTIONS.map((q) => ({ ...q, grade: 'الصف التاسع', gradeKey: 'grade9' })),
    ...GRADE_8_DISCOVERED_QUESTIONS.map((q) => ({ ...q, grade: 'الصف الثامن', gradeKey: 'grade8' })),
    ...GRADE_7_DISCOVERED_QUESTIONS.map((q) => ({ ...q, grade: 'الصف السابع', gradeKey: 'grade7' })),
  ];

  const filteredQuestions = combinedQuestions.filter((q) => {
    const matchesGrade = selectedGrade === 'all' || q.gradeKey === selectedGrade;
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || q.priority === selectedPriority;
    return matchesGrade && matchesCat && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            قسم الكشف والتنبؤ الامتحاني الذكي
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            بنك الأسئلة الهامة التي لا توجد إجاباتها صراحة في الدروس
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
            تم فحص المناهج لاكتشاف المسائل والمفاهيم العميقة التي يثيرها الدرس دون الإجابة عنها مباشرة، أو تتطلب ربط أكثر من معلومة داخل الكتاب، أو تتطلب معرفة لغوية مسبقة مناسبة لصفوف السابع والثامن والتاسع.
          </p>
        </div>

        {/* Categories explanation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
            <span className="font-black block text-blue-900">الفئة الأولى:</span>
            <p>أسئلة إجابتها مستنتجة مباشرة من محتوى وشرح الدرس.</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 space-y-1">
            <span className="font-black block text-purple-900">الفئة الثانية:</span>
            <p>أسئلة تحتاج إلى ربط أكثر من معلومة وقاعدة داخل الكتاب.</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <span className="font-black block text-emerald-900">الفئة الثالثة:</span>
            <p>أسئلة تحتاج لمعرفة لغوية خارج الدرس مناسبة لمستوى الصف.</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
            <span className="font-black block text-amber-900">الفئة الرابعة:</span>
            <p>أسئلة محتملة لكن لا توجد أدلة كافية لترجيح ورودها بالاختبار.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">الصف الدراسي:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border-2 border-purple-500 bg-purple-50 text-purple-950 font-black focus:outline-none"
            >
              <option value="all">كل الصفوف (السابع والثامن والتاسع)</option>
              <option value="grade8">📗 الصف الثامن (12 وحدة)</option>
              <option value="grade7">📘 الصف السابع (12 وحدة)</option>
              <option value="grade9">🎓 الصف التاسع (24 وحدة)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">تصفية حسب الفئة:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold focus:outline-none"
            >
              <option value="all">جميع الفئات</option>
              <option value="الفئة الأولى">الفئة الأولى (مستنتجة مباشرة)</option>
              <option value="الفئة الثانية">الفئة الثانية (ربط معلومات الكتاب)</option>
              <option value="الفئة الثالثة">الفئة الثالثة (معرفة لغوية مسبقة)</option>
              <option value="الفئة الرابعة">الفئة الرابعة (محتملة)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">الأولوية الامتحانية:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold focus:outline-none"
            >
              <option value="all">جميع الأولويات</option>
              <option value="عالية جدًا">عالية جدًا</option>
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Discovered Questions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs md:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">الصف</th>
                <th className="py-3 px-4">السؤال المقترح</th>
                <th className="py-3 px-4">سبب أهميته</th>
                <th className="py-3 px-4">علاقته بالدرس والوحدة</th>
                <th className="py-3 px-4">التصنيف والأولوية</th>
                <th className="py-3 px-4">هل إجابته صريحة؟</th>
                <th className="py-3 px-4 min-w-[280px]">الإجابة النموذجية المعللة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuestions.map((q, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      q.gradeKey === 'grade8'
                        ? 'bg-purple-100 text-purple-800'
                        : q.gradeKey === 'grade7'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900 leading-snug">{q.question}</td>
                  <td className="py-3 px-4 text-slate-600 leading-snug">{q.importanceReason}</td>
                  <td className="py-3 px-4 font-bold text-slate-700 whitespace-nowrap">{q.lessonRelation}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="block font-bold text-blue-700">{q.category}</span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      q.priority.includes('عالية') ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      أولوية: {q.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                      لا (مستنتج/مركب)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 leading-relaxed bg-emerald-50/30 font-medium">
                    {q.modelAnswer}
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
