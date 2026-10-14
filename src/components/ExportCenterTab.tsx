import React, { useState, useEffect } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  FileCheck,
  Printer,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Table as TableIcon,
  RefreshCw,
  Filter,
  Calendar,
  Lock,
} from 'lucide-react';
import { BOOK_SERIES_OVERVIEW } from '../data/bookMetadata';

interface ExportCenterTabProps {
  currentGrade?: 'grade7' | 'grade8' | 'grade9';
}

export const ExportCenterTab: React.FC<ExportCenterTabProps> = ({ currentGrade = 'grade8' }) => {
  const [selectedGrade, setSelectedGrade] = useState<'grade7' | 'grade8' | 'grade9' | 'all'>(
    currentGrade
  );
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (currentGrade) {
      setSelectedGrade(currentGrade);
    }
  }, [currentGrade]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      setIsRegenerating(true);
      setFeedback('جارٍ بدء التنزيل...');
      const response = await fetch(url);
      if (!response.ok) throw new Error('فشل جلب الملف عبر الواجهة');
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
      setFeedback(`تم تنزيل ${filename} بنجاح!`);
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      // Fallback direct link trigger
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border-2 border-amber-500/30 text-white p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
                📥 مركز التحميل والطباعة الرسمي
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                جاهز للطباعة والتعديل (Word / PDF / Excel)
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-amber-100 tracking-tight">
              تحميل الملازم والمذكرات الامتحانية المطبوعة
            </h2>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              تصدير المرجع الأكاديمي والامتحاني الموحد لمناهج لغتي العربية للمرحلة الأساسية (الصفوف 7 و 8 و 9) كملفات متكاملة مجهزة للطباعة الفورية على ورق A4، وبصيغ Word قابلة للتعديل والإضافة المباشرة من قبل المعلمين والمدارس.
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-amber-500/30 text-center shrink-0 w-full md:w-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>مخرجات معتمدة ومحققة 100%</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-[200px] leading-snug">
              مضبوطة بالتشكيل الكامل وعلامات الترقيم والجداول المنظمة
            </p>
          </div>
        </div>
      </div>

      {/* Grade Selector Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>اختر ملازم الصف المطلوب تحميلها:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedGrade('grade7')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedGrade === 'grade7'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📘 ملازم الصف السابع (24 وحدة - ج1 و ج2)
          </button>
          <button
            onClick={() => setSelectedGrade('grade8')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedGrade === 'grade8'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📗 ملازم الصف الثامن (24 وحدة - ج1 و ج2)
          </button>
          <button
            onClick={() => setSelectedGrade('grade9')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedGrade === 'grade9'
                ? 'bg-amber-600 text-slate-950 shadow-md shadow-amber-600/30 ring-2 ring-amber-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎓 ملازم الصف التاسع (24 وحدة)
          </button>
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedGrade === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🌐 جميع الملفات
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs md:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}


      {/* Grade 8 Materials (Shown if 'grade8' or 'all') */}
      {(selectedGrade === 'grade8' || selectedGrade === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <h3 className="text-xl font-black text-slate-900">
              📗 ملفات وملازم الصف الثامن الأساسي (الجزأين 1 و 2 - 24 وحدة كاملة • 373 صفحة)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grade 8 Word Doc */}
            <div className="bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black">
                    DOCX • قابل للتعديل
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    ملزمة المراجعة الشاملة للصف الثامن (Word)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    كافة نصوص الوحدات الـ 24، المعجم الشامل، شروح القواعد، الشواهد، وأسئلة التقويمات.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>الوحدات 1 إلى 24 كاملة ومحققة من كتابي وزارة التربية والتعليم</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>جداول المفردات والأضداد، والشواهد النحوية والإملائية مع إعرابها</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/docx', 'ملزمة_مراجعة_لغتي_العربية_الصف_الثامن.docx')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل ملزمة الصف الثامن (Word)</span>
                </button>
              </div>
            </div>

            {/* Grade 8 PDF */}
            <div className="bg-white rounded-2xl border-2 border-indigo-200 hover:border-indigo-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200 shadow-sm">
                    <Printer className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
                    PDF • جاهز للطباعة المباشرة
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    المذكرة الامتحانية الفاخرة للصف الثامن (PDF)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    تصميم أكاديمي فاخر بالتشكيل الكامل وعلامات الترقيم، مناسب للطباعة والتوزيع المدرسي والمنزلي.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>تنسيق A4 مريح ومُشكّل بخطوط واضحة وألوان تعليمية</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>بنك الأسئلة المكتشفة خارج الخلاصة وأسئلة التقويمات المحلولة</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/pdf', 'مذكرة_لغتي_العربية_الصف_الثامن_جاهزة_للطباعة.pdf')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل مذكرة الصف الثامن (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade 7 Materials (Shown if 'grade7' or 'all') */}
      {(selectedGrade === 'grade7' || selectedGrade === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="text-xl font-black text-slate-900">
              📘 ملفات وملازم الصف السابع الأساسي (الجزأين 1 و 2 - 24 وحدة كاملة • 334 صفحة)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grade 7 Word Doc */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    DOCX • قابل للتعديل
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    ملزمة المراجعة الشاملة للصف السابع (Word)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    كافة نصوص الوحدات الـ 12، المعجم، شروح القواعد، الشواهد، وأسئلة التقويمات.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>الوحدات 1 إلى 12 كاملة ومحققة من الأصل</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>جداول المفردات وتفاصيل الشروح التي لم ترد في الخلاصة</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/docx', 'ملزمة_مراجعة_لغتي_العربية_الصف_السابع.docx')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل ملزمة الصف السابع (Word)</span>
                </button>
              </div>
            </div>

            {/* Grade 7 PDF */}
            <div className="bg-white rounded-2xl border-2 border-teal-200 hover:border-teal-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shadow-sm">
                    <Printer className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black">
                    PDF • جاهز للطباعة المباشرة
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    المذكرة الامتحانية الفاخرة للصف السابع (PDF)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    تصميم فاخر بالتشكيل الكامل وعلامات الترقيم، مناسب للطباعة والتوزيع المدرسي.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>تنسيق A4 مريح ومُشكّل بخطوط واضحة</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>بنك الأسئلة المكتشفة وأسئلة التقويم الوزاري</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/pdf', 'مذكرة_لغتي_العربية_الصف_السابع_جاهزة_للطباعة.pdf')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل مذكرة الصف السابع (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade 9 Materials (Shown if 'grade9' or 'all') */}
      {(selectedGrade === 'grade9' || selectedGrade === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <h3 className="text-xl font-black text-slate-900">
              🎓 ملفات وملازم الصف التاسع الأساسي (الجزأين 1 و 2 - 24 وحدة كاملة)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Word DOCX Card */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 hover:border-blue-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                    DOCX • قابل للتعديل
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    ملزمة المراجعة الشاملة (Word)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    ملف وورد متكامل يحتوي على كافة نصوص وشروح وقواعد وأسئلة الصف التاسع.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>24 وحدة دراسية كاملة ومحققة</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>جاهز للطباعة أو التعديل والإضافة المباشرة</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/docx', 'المرجع_الشامل_لغتي_العربية_الصف_التاسع.docx')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل ملزمة Word</span>
                </button>
              </div>
            </div>

            {/* PDF Card */}
            <div className="bg-white rounded-2xl border-2 border-rose-200 hover:border-rose-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 shadow-sm">
                    <Printer className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
                    PDF • جاهز للطباعة
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    كتاب المراجعة الامتحاني (PDF)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    كتاب إلكتروني منسق بدقة فائقة بالألوان والخطوط التعليمية.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>تنسيق A4 مريح ومُشكّل بالكامل</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>فهارس تفاعلية وأرقام الصفحات الأصلية</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/pdf', 'المرجع_الشامل_لغتي_العربية_الصف_التاسع_جاهز_للطباعة.pdf')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل ملف PDF</span>
                </button>
              </div>
            </div>

            {/* Excel Card */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 transition-all p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-sm">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    XLSX • جداول إكسل
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    جداول المعجم وبنك الأسئلة (Excel)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    جداول بيانات إكسل تحتوي على مئات المفردات وبنك الأسئلة المكتشفة.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>جدول معجم المفردات مع السياق والأضداد</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>جدول الأسئلة المكتشفة مصنفة حسب الأولوية</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDownload('/api/downloads/xlsx', 'جداول_معجم_واسئلة_لغتي_العربية.xlsx')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل جداول Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
