import React, { useState, useEffect } from 'react';
import { EXAM_QUIZ_QUESTIONS, QuizQuestion, GRADE_7_EXAM_QUESTIONS } from '../data/examBank';
import { GRADE_8_EXAM_QUESTIONS } from '../data/grade8QuizBank';
import { ActiveGrade } from './Navbar';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, ChevronLeft } from 'lucide-react';

interface InteractiveQuizTabProps {
  currentGrade?: ActiveGrade;
}

export const InteractiveQuizTab: React.FC<InteractiveQuizTabProps> = ({ currentGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<'grade9' | 'grade8' | 'grade7'>(
    (currentGrade as any) || 'grade8'
  );
  const [userAnswers, setUserAnswers] = useState<{ [id: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<'all' | 1 | 2>('all');

  useEffect(() => {
    if (currentGrade) {
      setSelectedGrade(currentGrade as any);
      resetQuiz();
    }
  }, [currentGrade]);

  const activeQuestionSource: QuizQuestion[] =
    selectedGrade === 'grade8'
      ? GRADE_8_EXAM_QUESTIONS
      : selectedGrade === 'grade7'
      ? GRADE_7_EXAM_QUESTIONS
      : EXAM_QUIZ_QUESTIONS;

  const filteredQuestions = activeQuestionSource.filter((q) => {
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesPart = selectedPart === 'all' || q.part === selectedPart;
    return matchesTopic && matchesPart;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const score = calculateScore();
  const percentage = Math.round((score / filteredQuestions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Quiz Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            محاكي الامتحانات والتقويم الذاتي التفاعلي
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            بنك الأسئلة والاختبارات التجريبية (المرحلة الأساسية)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            اختبارات مؤتمتة تقيس استيعاب القراءة، النحو، الصرف، الإملاء، والتذوق البلاغي مع التغذية الراجعة الفورية ورقم الصفحة المرجعية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Grade Selector */}
          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value as 'grade9' | 'grade8' | 'grade7');
              resetQuiz();
            }}
            className="px-3 py-2 text-xs rounded-xl border-2 border-purple-500 bg-purple-50 text-purple-950 font-black focus:outline-none"
          >
            <option value="grade8">📗 الصف الثامن (12 وحدة)</option>
            <option value="grade7">📘 الصف السابع (12 وحدة)</option>
            <option value="grade9">🎓 الصف التاسع (24 وحدة)</option>
          </select>

          {selectedGrade === 'grade9' && (
            <select
              value={selectedPart}
              onChange={(e) => {
                setSelectedPart(e.target.value === 'all' ? 'all' : (Number(e.target.value) as 1 | 2));
                resetQuiz();
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold focus:outline-none"
            >
              <option value="all">كل السلسلة (الجزأين)</option>
              <option value="1">الجزء الأول (1 - 12)</option>
              <option value="2">الجزء الثاني (13 - 24)</option>
            </select>
          )}

          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              resetQuiz();
            }}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold focus:outline-none"
          >
            <option value="all">جميع الفروع ({activeQuestionSource.length} سؤال)</option>
            <option value="نحو وصرف">نحو وصرف فقط</option>
            <option value="فهم واستيعاب">فهم واستيعاب فقط</option>
            <option value="نصوص وقراءة">نصوص وقراءة فقط</option>
            <option value="إملاء ورسم كتابي">إملاء ورسم كتابي فقط</option>
            <option value="إملاء">إملاء فقط</option>
            <option value="بلاغة وتذوق">بلاغة وتذوق فقط</option>
          </select>

          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={totalAnswered === 0}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all ${
                totalAnswered > 0
                  ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              تصحيح الاختبار ({totalAnswered}/{filteredQuestions.length})
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              إعادة الاختبار
            </button>
          )}
        </div>
      </div>

      {/* Results banner if shown */}
      {showResults && (
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-6 text-white border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black text-2xl shadow-lg">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-purple-300 font-bold block">نتيجة الاختبار التجريبي:</span>
              <h3 className="text-2xl md:text-3xl font-black text-purple-50">
                حصلت على {score} من أصل {filteredQuestions.length} ({percentage}%)
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {percentage >= 90
                  ? 'ممتاز جداً! إتقان رائع لكافة مفردات وقواعد المنهج.'
                  : percentage >= 75
                  ? 'جيد جداً! لديك فهم عميق مع بعض النقاط التي تحتاج إلى مراجعة.'
                  : 'تحتاج إلى مراجعة بعض القواعد والشروح في الوحدات المقررة.'}
              </p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer"
          >
            بدء اختبار جديد
          </button>
        </div>
      )}

      {/* Quiz Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Question metadata badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    الوحدة {q.unitNumber}: {q.unitTitle}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {q.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold">ص {q.pageNumber}</span>
                  <span>•</span>
                  <span
                    className={`font-bold ${
                      q.difficulty === 'سهل'
                        ? 'text-emerald-700'
                        : q.difficulty === 'متقدم'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-4 leading-relaxed">
                {q.question}
              </h3>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctOptionIndex === optIdx;

                  let optionStyle =
                    'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 cursor-pointer';

                  if (isThisSelected) {
                    optionStyle =
                      'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-400';
                  }

                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-100/80 text-emerald-950 font-black ring-2 ring-emerald-500';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle =
                        'border-rose-500 bg-rose-100/80 text-rose-950 font-bold ring-2 ring-rose-500';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-right text-xs md:text-sm transition-all flex items-center justify-between gap-2 ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold">
                          {['أ', 'ب', 'ج', 'د'][optIdx]}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {showResults && isThisCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {showResults && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when showing results */}
              {showResults && (
                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="font-black block mb-0.5">
                    {isCorrect ? 'إجابة صحيحة ✓' : 'إجابة غير صحيحة ✗'}
                  </span>
                  <p>
                    <strong>التعليل والتفسير:</strong> {q.explanation} (راجع الكتاب المدرسي صفحة {q.pageNumber})
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
