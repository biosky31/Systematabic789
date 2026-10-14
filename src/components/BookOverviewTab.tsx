import React, { useState } from 'react';
import {
  BOOK_SERIES_OVERVIEW,
  BOOK_METADATA_PART1,
  BOOK_METADATA_PART2,
  TABLE_OF_CONTENTS,
} from '../data/bookMetadata';
import {
  BookOpen,
  Award,
  ShieldCheck,
  BookmarkCheck,
  ArrowLeft,
  Sparkles,
  Compass,
  Layers,
  CheckCircle2,
  Download,
  FileText,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';

interface BookOverviewTabProps {
  onSelectUnit: (unitNumber: number) => void;
  selectedPartFilter?: 'all' | 1 | 2;
  setSelectedPartFilter?: (filter: 'all' | 1 | 2) => void;
}

export const BookOverviewTab: React.FC<BookOverviewTabProps> = ({
  onSelectUnit,
  selectedPartFilter = 'all',
  setSelectedPartFilter,
}) => {
  const [internalPartFilter, setInternalPartFilter] = useState<'all' | 1 | 2>('all');
  const activePart = setSelectedPartFilter ? selectedPartFilter : internalPartFilter;
  const setPart = setSelectedPartFilter || setInternalPartFilter;

  const filteredTOC = TABLE_OF_CONTENTS.filter((item) => {
    if (activePart === 'all') return true;
    return item.part === activePart;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-900/40 text-white p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Compass className="w-4 h-4" />
              سلسلة المنهج الكاملة والمحققة علمياً (الجزءان الأول والثاني معاً)
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-amber-50 leading-tight">
              سلسلة كُتُبِ «لُغَتِي العَرَبِيَّة»
              <span className="block text-xl md:text-2xl text-amber-400 font-bold mt-1">
                للصف التاسع من مرحلة التعليم الأساسي (الجزء الأول + الجزء الثاني)
              </span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              مرجع علمي واستخراجي وامتحاني متكامل يجمع الجزأين الأول والثاني في سلسلة موحدة، أعده فريق متكامل من الخبراء اللغويين ومعلمي المناهج اليمنية، يغطي 24 وحدة دراسية كاملة و354 صفحة محققة وموثقة كلمة بكلمة.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl text-center">
                <span className="text-2xl font-black text-amber-400">24</span>
                <span className="block text-xs text-slate-400 mt-0.5">وحدة تعليمية كاملة</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl text-center">
                <span className="text-2xl font-black text-emerald-400">354</span>
                <span className="block text-xs text-slate-400 mt-0.5">صفحة مفهرسة ومحققة</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl text-center">
                <span className="text-2xl font-black text-blue-400">100%</span>
                <span className="block text-xs text-slate-400 mt-0.5">أمانة تامة للمصدر</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl text-center">
                <span className="text-2xl font-black text-purple-400">1K - 4K</span>
                <span className="block text-xs text-slate-400 mt-0.5">توليد وسائل بصرية</span>
              </div>
            </div>
          </div>

          {/* Book Cards in Series */}
          <div className="space-y-3">
            <div className="bg-slate-800/95 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                  الجزء الأول (1 - 12)
                </span>
                <span className="text-xs text-slate-400">176 صفحة</span>
              </div>
              <h4 className="font-bold text-sm text-white">الاستثناء، النداء، الشرط، التعجب، المدح، الإغراء</h4>
              <p className="text-xs text-slate-300">
                غلاف: «مَنْ أَحَبَّ الحَيَاةَ عَاشَ ذَلِيلًا» • إقرار اللجنة العليا للمناهج 1443هـ / 2022م
              </p>
            </div>

            <div className="bg-slate-800/95 border border-emerald-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                  الجزء الثاني (13 - 24)
                </span>
                <span className="text-xs text-slate-400">178 صفحة</span>
              </div>
              <h4 className="font-bold text-sm text-white">المجرد والمزيد، المشتقات، المصادر، المعاجم، التفضيل</h4>
              <p className="text-xs text-slate-300">
                غلاف: جامع الشعب والمولد النبوي الشريف • إقرار المناهج 1444هـ / 2023م
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Download Section */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-2xl border-2 border-amber-300 p-6 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-200/70 pb-4 mb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              جاهز للتنزيل الفوري والمباشر
            </div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>📥 ملفات المراجعة الشاملة وقاعدة البيانات للمنهج اليمني (24 وحدة كاملة)</span>
            </h3>
            <p className="text-xs text-slate-600">
              انقر على أي ملف لتنزيله فوراً لجهازك بصيغة PDF الفاخرة للطباعة، أو مستند Word للتحرير، أو ملف Excel للفرز والبحث:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PDF Card */}
          <div className="bg-white rounded-xl border-2 border-rose-200 hover:border-rose-400 p-4 shadow-sm flex flex-col justify-between transition-all">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-bold">
                  PDF جاهز للطباعة (1.53 MB)
                </span>
              </div>
              <h4 className="font-black text-sm text-slate-900">الموسوعة الذهبية (PDF)</h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                إخراج فني احترافي، خطوط مشكولة، بطاقات تشجيع لاختبار الاستيعاب في التطبيق، و24 وحدة كاملة.
              </p>
            </div>
            <a
              href="/api/downloads/pdf"
              download="الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل نسخة PDF (طباعة)</span>
            </a>
          </div>

          {/* Word Card */}
          <div className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 p-4 shadow-sm flex flex-col justify-between transition-all">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-bold">
                  Word DOCX (224 KB)
                </span>
              </div>
              <h4 className="font-black text-sm text-slate-900">الملزمة التعليمية الشاملة (Word)</h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                ملف قابل للتحرير الكامل، شروح مفصلة، جداول مقارنات نحوية، وتفاصيل لم ترد في الخلاصات.
              </p>
            </div>
            <a
              href="/api/downloads/docx"
              download="الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.docx"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل نسخة Word (تحرير)</span>
            </a>
          </div>

          {/* Excel Card */}
          <div className="bg-white rounded-xl border-2 border-emerald-200 hover:border-emerald-400 p-4 shadow-sm flex flex-col justify-between transition-all">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Excel XLSX (182 KB)
                </span>
              </div>
              <h4 className="font-black text-sm text-slate-900">قاعدة البيانات الرقمية (Excel)</h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                9 أوراق عمل مستقلة، 266 مفردة، 164 سؤال تقويم، وبنك أسئلة مصنف بالكامل قابل للفلترة.
              </p>
            </div>
            <a
              href="/api/downloads/xlsx"
              download="قاعدة_بيانات_منهج_لغتي_العربية_الصف_التاسع.xlsx"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل قاعدة البيانات (Excel)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Part Switcher Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-sm text-slate-900">عرض فهرس السلسلة حسب الجزء:</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setPart('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
              activePart === 'all'
                ? 'bg-slate-900 text-amber-400 shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            السلسلة الكاملة (24 وحدة)
          </button>
          <button
            onClick={() => setPart(1)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
              activePart === 1
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الجزء الأول (الوحدات 1 - 12)
          </button>
          <button
            onClick={() => setPart(2)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
              activePart === 2
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الجزء الثاني (الوحدات 13 - 24)
          </button>
        </div>
      </div>

      {/* Pedagogical Plan & Work Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-700 font-black text-lg border-b pb-3">
            <BookmarkCheck className="w-5 h-5 text-amber-600" />
            <h3>قواعد العمل الصارمة المطبقة في التحقيق</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong className="text-slate-900">1. الأمانة المطلقة للكتابين:</strong> لا تخمين ولا إهمال؛ التمييز الدقيق بين ما نص عليه الكتاب وما استنتج منه، وتوثيق أرقام الصفحات من 1 إلى 176 (للجزء 1) ومن 8 إلى 178 (للجزء 2).
            </p>
            <p>
              <strong className="text-slate-900">2. استخراج النصوص كاملة:</strong> إثبات النصوص القرآنية والأحاديث والقصائد الشعرية والمقالات النثرية كاملة دون أي اجتزاء.
            </p>
            <p>
              <strong className="text-slate-900">3. التحليل اللغوي والمعجمي:</strong> استخراج المعاني في السياق، المرادفات، الأضداد، مع إبراز ما ورد في الكتاب مقابل الإثراء اللغوي.
            </p>
            <p>
              <strong className="text-slate-900">4. تدقيق النحو والصرف والإملاء:</strong> إبراز ما ورد في الشرح ولم يظهر في خلاصة القاعدة، وجداول المقارنة اللغوية الشاملة.
            </p>
            <p>
              <strong className="text-slate-900">5. الأسئلة الامتحانية غير الصريحة:</strong> تصنيف الأسئلة المتوقعة التي لم تذكر إجاباتها في الخلاصة ضمن الفئات الأربع المعتمدة.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-black text-lg border-b pb-3">
            <Award className="w-5 h-5 text-emerald-600" />
            <h3>المدخل التكاملي في المنهج اليمني</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              اعتمد فريق المناهج بوزارة التربية والتعليم «المدخل التكاملي»؛ حيث تعرض المعرفة بصورة متكاملة ومترابطة رأسياً بين الصفوف وأفقياً بين المواد، لتنطلق كل وحدة من درس محوري جامع (نص قرآني، حديث شريف، شعر، أو نثر) يعالج جميع فروع اللغة وقيمها ومفرداتها في نسق متجانس.
            </p>
            <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-950 border border-amber-200/60 mt-3 space-y-1">
              <strong className="block font-bold">تصدير وزارة التربية والتعليم والبحث العلمي:</strong>
              <p>
                «تحرص الوزارة على تجويد وتطوير العملية التعليمية من خلال إرساء قواعد منظومة متكاملة تلبي احتياجات البيئة اليمنية وتتناسب مع هويتها الإيمانية، ليصبح المتعلم محور العملية التعليمية وبناء الشخصية المتكاملة للفرد».
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table of contents grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {activePart === 'all'
                ? 'فهرس السلسلة الكاملة (الوحدات 1 إلى 24)'
                : activePart === 1
                ? 'فهرس الجزء الأول (الوحدات 1 إلى 12)'
                : 'فهرس الجزء الثاني (الوحدات 13 إلى 24)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              انقر على أي وحدة للانتقال المباشر إلى نصوصها وشروحها وقواعدها وبنك أسئلتها
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
            {filteredTOC.length} وحدة معروضة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTOC.map((unit) => (
            <div
              key={unit.unitNumber}
              onClick={() => onSelectUnit(unit.unitNumber)}
              className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded font-black text-xs ${
                        unit.part === 1
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      ج{unit.part} • الوحدة {unit.unitNumber}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                    ص {unit.totalPageRange}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                  {unit.unitTitle}
                </h4>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-slate-800 shrink-0">📖 القراءة:</span>
                    <span className="text-slate-700">{unit.readingLesson.title} ({unit.readingLesson.type})</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-slate-800 shrink-0">📐 النحو والصرف:</span>
                    <span className="text-slate-700">{unit.grammarLesson.title}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-slate-800 shrink-0">✍️ الإملاء:</span>
                    <span className="text-slate-700">{unit.spellingLesson.title}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold group-hover:translate-x-[-4px] transition-transform">
                <span>تصفح التحليل الكامل للوحدة</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
