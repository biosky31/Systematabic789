import React from 'react';
import { BookOpen, Sparkles, Clock, CheckCircle2, Upload, BookMarked, Layers } from 'lucide-react';

interface Grade8PlaceholderTabProps {
  onSwitchToGrade7: () => void;
  onSwitchToGrade9: () => void;
}

export const Grade8PlaceholderTab: React.FC<Grade8PlaceholderTabProps> = ({
  onSwitchToGrade7,
  onSwitchToGrade9,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 border-2 border-purple-500/40 text-white p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black">
              📘 منصة المناهج اليمنية للتعليم الأساسي
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
              الصف الثامن الأساسي
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              جاهز للاستقبال والتحليل
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-purple-100 tracking-tight">
            كِتَابُ «لُغَتِي الْعَرَبِيَّة» - الصَّفُّ الثَّامِنُ الأَسَاسِيّ
          </h2>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            القسم مجهز ومبرمج في المنصة بالكامل، وبمجرد رفع ملفات كتاب الصف الثامن (الجزء الأول أو الثاني) سيقوم محرك التحليل فوراً باستخراج كافة النصوص وشروح الدروس والمفردات، وتحليل القواعد النحوية والإملائية وحل التقويمات وبناء بنك الأسئلة الامتحانية بدقة 100%.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onSwitchToGrade7}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-black shadow-lg transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>تصفح الصف السابع المكتمل (12 وحدة)</span>
            </button>
            <button
              onClick={onSwitchToGrade9}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs md:text-sm font-black shadow-lg transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>تصفح الصف التاسع المكتمل (24 وحدة)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preparation Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-900 text-base">في انتظار رفع الكتاب</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            يمكنك رفع صفحات أو وحدات كتاب الصف الثامن في الرسالة القادمة لتبدأ عملية الفهرسة والاستخراج والتحليل الفوري كما فعلنا في الصف السابع والتاسع.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-900 text-base">بنية معمارية موحدة</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            ستشمل كل وحدة مستخرجة: النص الكامل، جدول المفردات السياقية، الشرح الفكري، قسم النحو، قسم الإملاء، الخط والتعبير، وحلول التقويمات النموذجية.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-900 text-base">محاكي اختبارات متكامل</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            فور إضافة الوحدات، سيتم دمج أسئلتها وتقويماتها تلقائياً في بنك الاختبارات والمحاكي المؤتمت مع التغذية الراجعة ورقم الصفحة المرجعي.
          </p>
        </div>
      </div>
    </div>
  );
};
