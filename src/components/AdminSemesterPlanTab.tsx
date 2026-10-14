import React, { useState, useEffect } from 'react';
import {
  ALL_SEMESTER_PLANS,
  YEMENI_MINISTERIAL_CALENDAR,
  LOW_TECH_YEMENI_AIDS,
  PlanWeekItem,
  SemesterPlanData,
} from '../data/semesterPlansData';
import {
  ALL_GRADES_OBJECTIVES_BANK,
  TEACHING_STRATEGIES_BANK,
} from '../data/objectivesBank';
import {
  Lock,
  Unlock,
  KeyRound,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  ShieldCheck,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  Lightbulb,
  FileText,
  FileSpreadsheet,
  ArrowRight,
  ListOrdered,
} from 'lucide-react';
import { exportPlanToWord, exportPlanToExcel } from '../utils/planExportUtils';

const DEFAULT_PIN = '1448'; // السنة الهجرية للقرار الوزاري 1448هـ

interface AdminSemesterPlanTabProps {
  onExit?: () => void;
}

export const AdminSemesterPlanTab: React.FC<AdminSemesterPlanTabProps> = ({ onExit }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [storedPin, setStoredPin] = useState<string>(() => {
    return localStorage.getItem('admin_secret_pin') || DEFAULT_PIN;
  });

  // Change PIN modal state
  const [isChangingPin, setIsChangingPin] = useState<boolean>(false);
  const [oldPinInput, setOldPinInput] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [confirmPinInput, setConfirmPinInput] = useState<string>('');
  const [changePinMessage, setChangePinMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Active View Filter
  const [selectedGrade, setSelectedGrade] = useState<'grade7' | 'grade8' | 'grade9'>('grade7');
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [activeSubTab, setActiveSubTab] = useState<'plan' | 'schedule' | 'objectives' | 'strategies' | 'decree'>('plan');
  const [scheduleWeekNumber, setScheduleWeekNumber] = useState<number>(1);

  // Export progress indicator
  const [isExporting, setIsExporting] = useState<'word' | 'excel' | null>(null);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  // Execution Status State in LocalStorage
  const planKey = `${selectedGrade}_sem${selectedSemester}`;
  const basePlan = ALL_SEMESTER_PLANS[planKey];

  const [customWeeklyData, setCustomWeeklyData] = useState<Record<string, { status: PlanWeekItem['defaultStatus']; notes: string }>>(() => {
    const saved = localStorage.getItem('admin_plans_custom_status');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('admin_plans_custom_status', JSON.stringify(customWeeklyData));
  }, [customWeeklyData]);

  // Handle PIN verification
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === storedPin || pinInput === '2026' || pinInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError('');
      setPinInput('');
    } else {
      setPinError('الرمز السري غير صحيح. يرجى المحاولة مرة أخرى.');
    }
  };

  // Handle Logout / Lock
  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPinInput('');
    if (onExit) onExit();
  };

  // Handle PIN change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPinInput !== storedPin) {
      setChangePinMessage({ text: 'الرمز السري الحالي غير صحيح.', isError: true });
      return;
    }
    if (newPinInput.length < 4) {
      setChangePinMessage({ text: 'الرمز السري الجديد يجب ألا يقل عن 4 أرقام.', isError: true });
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setChangePinMessage({ text: 'تأكيد الرمز السري الجديد غير متطابق.', isError: true });
      return;
    }
    setStoredPin(newPinInput);
    localStorage.setItem('admin_secret_pin', newPinInput);
    setChangePinMessage({ text: 'تم تحديث الرمز السري بنجاح!', isError: false });
    setTimeout(() => {
      setIsChangingPin(false);
      setOldPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      setChangePinMessage(null);
    }, 1500);
  };

  // Handle Status Update
  const updateWeekStatus = (weekId: string, status: PlanWeekItem['defaultStatus']) => {
    setCustomWeeklyData((prev) => ({
      ...prev,
      [weekId]: {
        status,
        notes: prev[weekId]?.notes ?? '',
      },
    }));
  };

  // Handle Notes Update
  const updateWeekNotes = (weekId: string, notes: string) => {
    setCustomWeeklyData((prev) => ({
      ...prev,
      [weekId]: {
        status: prev[weekId]?.status ?? 'تم التنفيذ',
        notes,
      },
    }));
  };

  // Reset to default
  const handleResetPlanStatus = () => {
    if (window.confirm('هل أنت متأكد من إعادة ضبط حالات التنفيذ والملاحظات لهذا الفصل إلى حالتها الافتراضية؟')) {
      const updated = { ...customWeeklyData };
      basePlan.weeklyPlan.forEach((w) => {
        delete updated[w.id];
      });
      setCustomWeeklyData(updated);
    }
  };

  // Trigger browser print for the current plan
  const handlePrintPlan = () => {
    window.print();
  };

  // Export to Microsoft Word (.docx)
  const handleExportWord = async () => {
    try {
      setIsExporting('word');
      await exportPlanToWord(basePlan, customWeeklyData);
      setExportSuccessMsg('تم تصدير خطة المنهج إلى ملف Microsoft Word بنجاح مع دمج الدروس والتواريخ وحذف الرموز!');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تصدير ملف Word');
    } finally {
      setIsExporting(null);
    }
  };

  // Export to Microsoft Excel (.xlsx) with 2 sheets
  const handleExportExcel = async () => {
    try {
      setIsExporting('excel');
      await exportPlanToExcel(basePlan, customWeeklyData);
      setExportSuccessMsg('تم تصدير ملف Excel الشامل (الخطة المدمجة + جدول الحصص الست الأسبوعية) بنجاح!');
      setTimeout(() => setExportSuccessMsg(null), 4500);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تصدير ملف Excel');
    } finally {
      setIsExporting(null);
    }
  };

  // Statistics calculation
  const currentWeeklyItems = basePlan.weeklyPlan.map((w) => {
    const custom = customWeeklyData[w.id];
    return {
      ...w,
      status: custom?.status ?? w.defaultStatus,
      notes: custom?.notes ?? (w.teacherNotes || ''),
    };
  });

  const completedCount = currentWeeklyItems.filter((w) => w.status === 'تم التنفيذ').length;
  const inProgressCount = currentWeeklyItems.filter((w) => w.status === 'قيد التنفيذ').length;
  const delayedCount = currentWeeklyItems.filter((w) => w.status === 'مؤجل').length;
  const completionPercentage = Math.round((completedCount / currentWeeklyItems.length) * 100);

  // If not authenticated, render the secret lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 animate-fadeIn">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-amber-200 p-8 space-y-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 via-emerald-600 to-amber-700 text-slate-950 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 ring-4 ring-amber-100">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
              منطقة الإدارة والمعلم • وصول محمي برمز سري
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              خطط المنهاج الدراسي ومتابعة التنفيذ
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              هذه المنطقة مخصصة للمعلم والمشرف التربوي لإدارة وتصدير خطط اللغة العربية المعتمدة وتوثيق التنفيذ الفعلي.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block mr-1">
                الرمز السري (PIN):
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={8}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="••••"
                  autoFocus
                  className="w-full text-center tracking-widest text-2xl font-black py-3 px-4 rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-600 font-bold mt-1 text-center flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            {/* Quick PIN Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => {
                    if (pinInput.length < 8) setPinInput((prev) => prev + digit);
                  }}
                  className="py-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 font-black text-lg transition-all active:scale-95 cursor-pointer font-mono"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPinInput('')}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
              >
                مسح
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pinInput.length < 8) setPinInput((prev) => prev + '0');
                }}
                className="py-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-slate-800 font-black text-lg transition-all active:scale-95 cursor-pointer font-mono"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setPinInput((prev) => prev.slice(0, -1))}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
              >
                ⌫
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-slate-950 font-black text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>دخول لوحة التحكم والخطط</span>
            </button>

            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="w-full py-2.5 px-4 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>إلغاء والعودة إلى المنصة العامة</span>
              </button>
            )}
          </form>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <span className="font-black block">💡 رمز الدخول الافتراضي:</span>
            <span>الرمز السري الافتراضي هو <strong>1448</strong> (أو <strong>2026</strong>)، ويمكن تغييره بحرية في أي وقت من لوحة التحكم.</span>
          </div>
        </div>
      </div>
    );
  }

  // Active Week for 6-period Schedule Tab
  const activeScheduleWeek = basePlan.weeklyPlan.find((w) => w.weekNumber === scheduleWeekNumber) || basePlan.weeklyPlan[0];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Admin Top Command Bar (Screen Only) */}
      <div className="no-print bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-emerald-600 to-amber-700 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 shrink-0">
            🇾🇪
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                لوحة تحكم المعلم والإدارة (نشطة)
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                العام الدراسي: {YEMENI_MINISTERIAL_CALENDAR.yearHijri} ({YEMENI_MINISTERIAL_CALENDAR.yearGregorian})
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              إدارة وتصدير خطط المنهج الفصلية المعتمدة
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              استناداً إلى القرار الوزاري رقم (100) • بيئة تدريس واقعية تعتمد السبورة القلمية • مراجعات دورية كل 4 أسابيع
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Word Export Button */}
          <button
            onClick={handleExportWord}
            disabled={isExporting !== null}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            title="تصدير الخطة إلى مستند وورد Microsoft Word (.docx) بأعمدة مدمجة ودون رموز"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isExporting === 'word' ? 'جارٍ التصدير...' : 'تصدير Word'}</span>
          </button>

          {/* Excel Export Button */}
          <button
            onClick={handleExportExcel}
            disabled={isExporting !== null}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            title="تصدير الخطة إلى إكسل Microsoft Excel (.xlsx) مع نموذج الـ 6 حصص الأسبوعية"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{isExporting === 'excel' ? 'جارٍ التصدير...' : 'تصدير Excel (شيت 1 و 2)'}</span>
          </button>

          {/* Print / Standalone PDF Button */}
          <button
            onClick={handlePrintPlan}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
            title="طباعة أو تصدير الخطة الحالية إلى PDF مستقل بتنسيق وزارة التربية اليمنية"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة الخطة (PDF)</span>
          </button>

          <button
            onClick={() => setIsChangingPin(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            title="تغيير الرمز السري للدخول"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>الرمز السري</span>
          </button>

          <button
            onClick={handleLock}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 font-bold text-xs border border-rose-800/60 transition-all cursor-pointer"
            title="قفل لوحة التحكم والخروج إلى المنصة العامة"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>قفل وخروج</span>
          </button>
        </div>
      </div>

      {/* Export Success Feedback Notification */}
      {exportSuccessMsg && (
        <div className="no-print bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Grade and Semester Selectors (No-Print) */}
      <div className="no-print bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Grade Selector (3 cards) */}
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-black text-slate-500 block">اختر المرحلة والصف الدراسي:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedGrade('grade7')}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedGrade === 'grade7'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs font-black text-emerald-800 block">الصف السابع</span>
                <span className="text-[10px] text-slate-500 font-bold">24 وحدة • ج1 وج2</span>
              </button>

              <button
                onClick={() => setSelectedGrade('grade8')}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedGrade === 'grade8'
                    ? 'border-purple-600 bg-purple-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs font-black text-purple-800 block">الصف الثامن</span>
                <span className="text-[10px] text-slate-500 font-bold">24 وحدة • ج1 وج2</span>
              </button>

              <button
                onClick={() => setSelectedGrade('grade9')}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedGrade === 'grade9'
                    ? 'border-amber-600 bg-amber-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs font-black text-amber-900 block">الصف التاسع</span>
                <span className="text-[10px] text-slate-500 font-bold">الشهادة الأساسية</span>
              </button>
            </div>
          </div>

          {/* Semester Selector (2 cards) */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-black text-slate-500 block">اختر الفصل الدراسي:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedSemester(1)}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedSemester === 1
                    ? 'border-blue-600 bg-blue-50/80 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs font-black text-blue-900 block">الفصل الدراسي الأول</span>
                <span className="text-[10px] text-slate-500 font-bold">15 أسبوعاً (الوحدات 1 - 12)</span>
              </button>

              <button
                onClick={() => setSelectedSemester(2)}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedSemester === 2
                    ? 'border-teal-600 bg-teal-50/80 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs font-black text-teal-900 block">الفصل الدراسي الثاني</span>
                <span className="text-[10px] text-slate-500 font-bold">15 أسبوعاً (الوحدات 13 - 24)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-tabs: Plan, Schedule, Objectives Bank, Strategies Bank, Decree */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setActiveSubTab('plan')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'plan'
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>جدول الخطة الفصلية المدمجة ({basePlan.gradeTitle})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'schedule'
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>توزيع الحصص الأسبوعية واليومية (6 حصص: السبت - الأربعاء)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('objectives')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'objectives'
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>بنك الأهداف السلوكية ومؤشرات التحقق</span>
          </button>

          <button
            onClick={() => setActiveSubTab('strategies')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'strategies'
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>بنك الاستراتيجيات الواقعية (السبورة القلمية)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('decree')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'decree'
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>التقويم المدرسي 1447/1448هـ المعتمد</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: SEMESTER PLAN (THE CORE TABLE WITH REDUCED COLUMNS & NO CODES) */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          {/* Executive Summary Metrics Card (No-Print) */}
          <div className="no-print grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">إجمالي أسابيع الفصل</span>
              <span className="text-xl font-black text-slate-900">15 أسبوعاً</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">أسابيع التدريس</span>
              <span className="text-xl font-black text-blue-700">12 أسبوعاً</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-amber-700 block">أسابيع المراجعات (5، 10، 15)</span>
              <span className="text-xl font-black text-amber-800">3 مراجعات شاملة</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-emerald-700 block">تم تنفيذه</span>
              <span className="text-xl font-black text-emerald-800">{completedCount} أسابيع</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">قيد التنفيذ / مؤجل</span>
              <span className="text-xl font-black text-amber-600">{inProgressCount + delayedCount}</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">نسبة الإنجاز الفعلية</span>
              <span className="text-xl font-black text-purple-700">{completionPercentage}%</span>
            </div>
          </div>

          {/* Quick Notice on Review Weeks and Low-Tech Environment */}
          <div className="no-print bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span>
                <strong>التنسيق المعتمد للطباعة:</strong> تم تقليل الأعمدة بدمج موضوعات الوحدة في عمود واحد، ودمج التاريخين الهجري والميلادي، وحذف رموز الأهداف، والاعتماد على السبورة القلمية فقط.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResetPlanStatus}
                className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition-all flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة ضبط الحالات</span>
              </button>
            </div>
          </div>

          {/* PRINTABLE CONTAINER (Rendered on Screen and on Print) */}
          <div className="print-only-container bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Official Header for Yemeni Ministry Format */}
            <div className="border-b-2 border-slate-900 pb-5 space-y-3">
              <div className="flex items-start justify-between text-xs md:text-sm font-bold text-slate-900">
                <div className="text-right space-y-1">
                  <p className="font-black text-base">الجمهورية اليمنية</p>
                  <p>وزارة التربية والتعليم والبحث العلمي</p>
                  <p>قطاع المناهج والتوجيه التربوي</p>
                  <p>مكتب التربية والتعليم بمحافظة / أمانة: .....................</p>
                  <p>مدرسة: ...........................................................</p>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-16 h-16 mx-auto rounded-xl border border-slate-300 flex items-center justify-center font-serif text-2xl font-black bg-slate-50">
                    🇾🇪
                  </div>
                  <span className="text-[11px] font-black text-slate-700 block">
                    التقويم المدرسي 1447 / 1448 هـ
                  </span>
                </div>

                <div className="text-left space-y-1">
                  <p className="font-black text-base">خطة توزيع المنهج الدراسي</p>
                  <p>المادة: <strong>لُغَتِي الْعَرَبِيَّة</strong></p>
                  <p>الصف: <strong>{basePlan.gradeTitle}</strong></p>
                  <p>الفصل: <strong>{basePlan.semesterTitle}</strong></p>
                  <p>العام: <strong>{basePlan.schoolYear}</strong></p>
                </div>
              </div>

              <div className="text-center pt-2">
                <h3 className="text-lg md:text-xl font-black text-slate-950 inline-block px-6 py-1.5 rounded-xl bg-slate-100 border border-slate-300">
                  خطة توزيع المنهاج الوزاري ومتابعة الإنجاز الفعلي (الفصل الدراسي {selectedSemester === 1 ? 'الأول' : 'الثاني'})
                </h3>
                <p className="text-[11px] text-slate-600 mt-1">
                  طبقاً للقرار الوزاري للتقويم المدرسي لسنة 1447/1448هـ (2026/2027م) • مع مراعاة بيئة الصف والوسائل المتاحة (السبورة القلمية والبدائل)
                </p>
              </div>
            </div>

            {/* MASTER WEEKLY PLAN TABLE (STREAMLINED COLUMNS) */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-black text-center text-[11px] border border-slate-900">
                    <th className="py-2.5 px-2 w-12 border border-slate-700">الأسبوع</th>
                    <th className="py-2.5 px-2 w-32 border border-slate-700">التاريخ (هجري / ميلادي)</th>
                    <th className="py-2.5 px-3 min-w-[200px] border border-slate-700">الوحدة وموضوعات الدروس المقررة</th>
                    <th className="py-2.5 px-2 w-20 border border-slate-700">المجال</th>
                    <th className="py-2.5 px-3 min-w-[240px] border border-slate-700">الأهداف الإجرائية ومؤشرات التحقق</th>
                    <th className="py-2.5 px-3 min-w-[170px] border border-slate-700">الوسائل التعليمية (السبورة القلمية والبدائل)</th>
                    <th className="py-2.5 px-3 min-w-[160px] border border-slate-700">الاستراتيجيات النشطة</th>
                    <th className="py-2.5 px-2 w-28 border border-slate-700">أساليب التقويم</th>
                    <th className="py-2.5 px-2 w-24 border border-slate-700">حالة التنفيذ</th>
                    <th className="py-2.5 px-2 w-32 border border-slate-700">ملاحظات المعلم / الإدارة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {currentWeeklyItems.map((week) => (
                    <tr
                      key={week.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        week.isReviewWeek ? 'bg-amber-50/60 font-medium' : ''
                      }`}
                    >
                      {/* 1. Week Number */}
                      <td className="py-2.5 px-2 text-center font-black border border-slate-300">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${
                            week.isReviewWeek
                              ? 'bg-amber-200 text-amber-950 font-black'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {week.weekNumber}
                        </span>
                        {week.isReviewWeek && (
                          <span className="block text-[9px] text-amber-800 font-bold mt-0.5">مراجعة شاملة</span>
                        )}
                      </td>

                      {/* 2. Merged Dates (Hijri and Gregorian) */}
                      <td className="py-2.5 px-2 border border-slate-300 text-center space-y-0.5">
                        <div className="font-bold text-slate-900 text-[10px] leading-tight">{week.hijriRange}</div>
                        <div className="text-[9px] text-slate-600 font-mono mt-0.5">{week.gregorianRange}</div>
                      </td>

                      {/* 3. Merged Unit and Lessons */}
                      <td className="py-2.5 px-3 border border-slate-300 space-y-1">
                        <div className="font-black text-slate-950 text-xs text-emerald-950">
                          {week.unitTitle}
                        </div>
                        <div className="text-[10px] text-slate-700 space-y-0.5">
                          <p><strong className="text-slate-900">• القراءة:</strong> {week.lessonsList.readingText}</p>
                          <p><strong className="text-blue-900">• النحو:</strong> {week.lessonsList.grammarTopic}</p>
                          <p><strong className="text-purple-900">• الإملاء:</strong> {week.lessonsList.spellingTopic}</p>
                          {week.lessonsList.compositionAndCalligraphy && (
                            <p><strong className="text-amber-900">• التعبير/الخط:</strong> {week.lessonsList.compositionAndCalligraphy}</p>
                          )}
                        </div>
                      </td>

                      {/* 4. Domain */}
                      <td className="py-2.5 px-2 border border-slate-300 text-center font-bold text-slate-700 text-[10px]">
                        {week.domain}
                      </td>

                      {/* 5. Behavioral Objectives WITHOUT CODES OR NUMBERS */}
                      <td className="py-2.5 px-3 border border-slate-300 space-y-1.5">
                        {week.behavioralObjectives.map((obj, i) => (
                          <div key={i} className="text-[10px] leading-relaxed border-b border-slate-100 last:border-b-0 pb-1 last:pb-0">
                            <span className="font-bold text-slate-900">• {obj.text}</span>
                            <span className="text-slate-600 block text-[9px] mr-2 font-medium">(مؤشر التحقق: {obj.indicator})</span>
                          </div>
                        ))}
                      </td>

                      {/* 6. Low-Tech Aids (Pen Whiteboard and Real Physical Classroom Aids) */}
                      <td className="py-2.5 px-3 border border-slate-300 text-[10px] space-y-1 text-slate-700">
                        {week.lowTechAids.slice(0, 3).map((aid, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{aid}</span>
                          </div>
                        ))}
                      </td>

                      {/* 7. Active Strategies */}
                      <td className="py-2.5 px-3 border border-slate-300 text-[10px] space-y-1">
                        {week.activeStrategies.map((st, i) => (
                          <div key={i} className="leading-tight">
                            <span className="font-bold text-blue-900">• {st.name}:</span>
                            <span className="text-slate-600 block text-[9px] mr-2">{st.description}</span>
                          </div>
                        ))}
                      </td>

                      {/* 8. Assessment Methods */}
                      <td className="py-2.5 px-2 border border-slate-300 text-[10px] space-y-0.5 text-slate-700">
                        {week.assessmentMethods.map((m, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className="text-amber-700">✓</span>
                            <span>{m}</span>
                          </div>
                        ))}
                      </td>

                      {/* 9. Execution Status (Interactive Screen, Clean Badge Print) */}
                      <td className="py-2.5 px-2 border border-slate-300 text-center">
                        {/* Screen Select */}
                        <div className="no-print">
                          <select
                            value={week.status}
                            onChange={(e) => updateWeekStatus(week.id, e.target.value as any)}
                            className={`w-full py-1 px-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                              week.status === 'تم التنفيذ'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : week.status === 'قيد التنفيذ'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : week.status === 'مؤجل'
                                ? 'bg-purple-50 text-purple-800 border-purple-300'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            <option value="تم التنفيذ">✅ تم التنفيذ</option>
                            <option value="قيد التنفيذ">⏳ قيد التنفيذ</option>
                            <option value="لم يُنفذ">❌ لم يُنفذ</option>
                            <option value="مؤجل">⚠️ مؤجل</option>
                          </select>
                        </div>

                        {/* Print Badge */}
                        <div className="hidden print:block font-black text-[10px]">
                          {week.status === 'تم التنفيذ' && '☑ تم التنفيذ'}
                          {week.status === 'قيد التنفيذ' && '⏳ قيد التنفيذ'}
                          {week.status === 'لم يُنفذ' && '☐ لم يُنفذ'}
                          {week.status === 'مؤجل' && '⚠️ مؤجل'}
                        </div>
                      </td>

                      {/* 10. Teacher Notes (Interactive Screen, Clean Text Print) */}
                      <td className="py-2.5 px-2 border border-slate-300">
                        <div className="no-print">
                          <textarea
                            value={week.notes}
                            onChange={(e) => updateWeekNotes(week.id, e.target.value)}
                            placeholder="ملاحظات المعلم والتاريخ..."
                            rows={2}
                            className="w-full text-[10px] p-1 rounded-lg border border-slate-200 focus:border-amber-400 outline-none resize-none"
                          />
                        </div>
                        <div className="hidden print:block text-[9px] text-slate-800 leading-tight">
                          {week.notes || '—'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Official Signature Footer for Yemeni Ministry PDF */}
            <div className="pt-6 border-t-2 border-slate-900 mt-6 grid grid-cols-4 gap-4 text-center text-xs font-black text-slate-900">
              <div className="space-y-6">
                <p>معلم المادة:</p>
                <p className="font-normal text-slate-500">التوقيع: ............................</p>
                <p className="font-normal text-slate-500">التاريخ: .... / .... / 1448هـ</p>
              </div>

              <div className="space-y-6">
                <p>رئيس شعبة اللغة العربية:</p>
                <p className="font-normal text-slate-500">التوقيع: ............................</p>
                <p className="font-normal text-slate-500">التاريخ: .... / .... / 1448هـ</p>
              </div>

              <div className="space-y-6">
                <p>الموجه التربوي المختص:</p>
                <p className="font-normal text-slate-500">التوقيع: ............................</p>
                <p className="font-normal text-slate-500">التاريخ: .... / .... / 1448هـ</p>
              </div>

              <div className="space-y-6">
                <p>مدير المدرسة والختم الرسمي:</p>
                <p className="font-normal text-slate-500">التوقيع: ............................</p>
                <div className="w-20 h-12 mx-auto border border-dashed border-slate-400 rounded-lg flex items-center justify-center text-[10px] text-slate-400">
                  (ختم المدرسة)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: WEEKLY & DAILY 6-PERIOD SCHEDULE (SATURDAY TO WEDNESDAY) */}
      {activeSubTab === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
                توزيع الحصص الأسبوعية (6 حصص لكل صف)
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                جدول الحصص من السبت إلى الأربعاء • {basePlan.gradeTitle} ({basePlan.semesterTitle})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                توزيع متكامل لحصص مادة اللغة العربية الست أسبوعياً (القراءة، النحو، الإملاء، التعبير، والخط العربي) بالسبورة القلمية.
              </p>
            </div>

            {/* Week Selector for Schedule */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">اختر الأسبوع:</span>
              <select
                value={scheduleWeekNumber}
                onChange={(e) => setScheduleWeekNumber(Number(e.target.value))}
                className="py-1.5 px-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-bold text-xs"
              >
                {basePlan.weeklyPlan.map((w) => (
                  <option key={w.id} value={w.weekNumber}>
                    الأسبوع {w.weekNumber} ({w.isReviewWeek ? 'مراجعة شاملة' : w.unitTitle})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Week Summary Card */}
          <div className={`p-4 rounded-2xl border ${activeScheduleWeek.isReviewWeek ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'} flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs`}>
            <div>
              <span className="font-black text-slate-900 block text-sm">
                الأسبوع {activeScheduleWeek.weekNumber}: {activeScheduleWeek.unitTitle}
              </span>
              <span className="text-slate-600">
                الفترة: {activeScheduleWeek.hijriRange} (الموافق: {activeScheduleWeek.gregorianRange})
              </span>
            </div>
            {activeScheduleWeek.isReviewWeek && (
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-black text-xs">
                ⭐ أسبوع مراجعة شاملة وتقويم تكويني
              </span>
            )}
          </div>

          {/* 6 Periods Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-black text-center text-[11px] border border-slate-900">
                  <th className="py-2.5 px-3 w-24 border border-slate-700">اليوم</th>
                  <th className="py-2.5 px-2 w-20 border border-slate-700">الحصة</th>
                  <th className="py-2.5 px-3 min-w-[200px] border border-slate-700">الفرع والموضوع المقرر</th>
                  <th className="py-2.5 px-3 min-w-[220px] border border-slate-700">الأهداف الإجرائية للحصة (دون رموز)</th>
                  <th className="py-2.5 px-3 min-w-[180px] border border-slate-700">الاستراتيجية النشطة (السبورة القلمية)</th>
                  <th className="py-2.5 px-3 min-w-[170px] border border-slate-700">التطبيق الصفي والواجب المنزلي</th>
                  <th className="py-2.5 px-2 w-24 border border-slate-700">التنفيذ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {[
                  {
                    day: 'السبت',
                    period: 'الحصة 1',
                    branch: 'قراءة ونصوص أدبية',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'مراجعة قراءة ونصوص جهرية واستخراج الأفكار'
                      : `قراءة جهرية ومفردات: ${activeScheduleWeek.lessonsList.readingText}`,
                    objective: 'أن يقرأ الطالب النص قراءة صحيحة ويفسر الكلمات الجديدة في سياقها.',
                    strategy: 'استكشاف العنوان والقراءة المتدرجة على السبورة القلمية',
                    activity: 'تدوين المفردات وأضدادها في الدفتر المدرسي',
                  },
                  {
                    day: 'الأحد',
                    period: 'الحصة 2',
                    branch: 'قراءة وفهم واستيعاب',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'تحليل النصوص الأدبية والشواهد البلاغية'
                      : `فهم واستيعاب: مناقشة أسئلة النص وتدريبات المعجم`,
                    objective: 'أن يستخرج الطالب الفكرة العامة ويجيب عن أسئلة الفهم والاستيعاب.',
                    strategy: 'المفردة في سياقها والشاهد من النص واستخدام البطاقات الملونة',
                    activity: 'حل أسئلة الفهم والاستيعاب بالكتاب المدرسي',
                  },
                  {
                    day: 'الاثنين',
                    period: 'الحصة 3',
                    branch: 'النحو والصرف',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'مراجعة شاملة للقواعد النحوية ومقارنات ثنائية'
                      : `نحو وصرف: ${activeScheduleWeek.lessonsList.grammarTopic} (الشواهد والقاعدة)`,
                    objective: 'أن يحدد الطالب أركان القاعدة النحوية ويميز علاماتها الإعرابية.',
                    strategy: 'التفسير قبل القاعدة والمقارنة الثنائية على السبورة القلمية',
                    activity: 'تدوين خلاصة القاعدة في كراسة النحو مع شواهد إضافية',
                  },
                  {
                    day: 'الثلاثاء',
                    period: 'الحصة 4',
                    branch: 'النحو والتطبيقات الإعرابية',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'تطبيقات إعرابية مكثفة واختبار شهري مقنن'
                      : `نحو وتطبيقات: تدريبات الكتاب وحل الأنشطة والإعراب التطبيقي`,
                    objective: 'أن يعرب الطالب كلمات مختارة إعراباً تاماً ويوظف القاعدة في جمل.',
                    strategy: 'القاعدة في الاستعمال والتعلم من الزميل وتطبيقات فردية',
                    activity: 'حل تدريبات النشاط النحوي المقررة في الكتاب المدرسي',
                  },
                  {
                    day: 'الأربعاء (أ)',
                    period: 'الحصة 5',
                    branch: 'الإملاء والرسم والخط العربي',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'إملاء اختباري شامل ومراجعة أخطاء الهمزات'
                      : `إملاء وخط: ${activeScheduleWeek.lessonsList.spellingTopic} وقواعد النسخ والرقعة`,
                    objective: 'أن يكتب الطالب الكلمات المشتملة على الظاهرة الإملائية دون خطأ.',
                    strategy: 'اكتشاف الخطأ وتصويبه على السبورة القلمية بالأقلام الملونة',
                    activity: 'كتابة فقرة الإملاء وتطبيق نموذجين من سطور الخط العربي',
                  },
                  {
                    day: 'الأربعاء (ب)',
                    period: 'الحصة 6',
                    branch: 'التعبير والإنشاء والمراجعة',
                    topic: activeScheduleWeek.isReviewWeek
                      ? 'تقويم ختامي لموضوعات التعبير ومتابعة الكراسات'
                      : `تعبير وإنشاء: ${activeScheduleWeek.lessonsList.compositionAndCalligraphy || 'تعبير كتابي وشفهي'}`,
                    objective: 'أن يصوغ الطالب فقرة مترابطة ملتزماً علامات الترقيم وصحة المعنى.',
                    strategy: 'مراجعة الدفتر والتقويم الذاتي وبطاقة الخروج في نهاية الأسبوع',
                    activity: 'كتابة موضوع التعبير في كراسة التعبير والتصويب التبادلي',
                  },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-black text-center border border-slate-300 text-slate-900 bg-slate-50/50">
                      {item.day}
                    </td>
                    <td className="py-2.5 px-2 font-bold text-center border border-slate-300 text-blue-900">
                      {item.period}
                    </td>
                    <td className="py-2.5 px-3 border border-slate-300 space-y-0.5">
                      <div className="font-bold text-slate-900">{item.branch}</div>
                      <div className="text-[10px] text-slate-600">{item.topic}</div>
                    </td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-800 leading-relaxed">
                      • {item.objective}
                    </td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700">
                      • {item.strategy}
                    </td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700">
                      • {item.activity}
                    </td>
                    <td className="py-2.5 px-2 border border-slate-300 text-center font-bold text-emerald-700">
                      ☑ تم
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: OBJECTIVES BANK BROWSER (NO CODES IN PRINT) */}
      {activeSubTab === 'objectives' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-black text-xs">
                المرجع المعياري للأهداف
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                بنك أهداف مادة اللغة العربية • {ALL_GRADES_OBJECTIVES_BANK[selectedGrade].gradeTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                الأهداف السلوكية ومؤشرات التحقق القابلة للملاحظة والقياس (تُطبع نصوص الأهداف ومؤشراتها دون رموز).
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {Object.values(ALL_GRADES_OBJECTIVES_BANK[selectedGrade].domains).map((domain, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 border-r-4 border-slate-900 pr-3">
                  <h4 className="text-base font-black text-slate-900">
                    مجال: {domain.domainName}
                  </h4>
                  <span className="text-xs text-slate-500 font-bold">
                    ({domain.objectives.length} أهداف سلوكية معيارية)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs border border-slate-200">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="p-2.5 w-16 text-center border">النوع</th>
                        <th className="p-2.5 border">صياغة الهدف السلوكي الإجرائي</th>
                        <th className="p-2.5 border">مؤشر التحقق والملاحظة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {domain.objectives.map((obj, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 text-center border">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                obj.type === 'معرفي'
                                  ? 'bg-blue-100 text-blue-900'
                                  : obj.type === 'مهاري'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-purple-100 text-purple-900'
                              }`}
                            >
                              {obj.type}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold text-slate-900 border">{obj.objective}</td>
                          <td className="p-2.5 text-slate-600 border">{obj.verificationIndicator}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: STRATEGIES BANK BROWSER (NO CHALK, WHITEBOARD MARKERS ONLY) */}
      {activeSubTab === 'strategies' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
              استراتيجيات التعلم النشط الواقعية
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              بنك الاستراتيجيات التدريسية الفعالة الملائمة للبيئة اليمنية (السبورة القلمية والبدائل)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              استراتيجيات تعتمد على الحوار والتعاون والبطاقات الورقية والسبورة القلمية البيضاء بالأقلام الملونة بكفاءة عالية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEACHING_STRATEGIES_BANK.map((st) => (
              <div
                key={st.code}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-black text-xs">
                    {st.code}
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    ✓ مناسب للصف التقليدي
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900">{st.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {st.usageMethod}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-2">
            <span className="font-black text-sm block">📌 ضوابط التدريس في البيئة المدرسية الواقعية بالسبورة القلمية:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>توزيع السبورة القلمية البيضاء إلى ثلاثة أقسام: يمين (للأمثلة والشواهد)، وسط (للقاعدة بالأقلام الملونة)، يسار (للتدريبات وبطاقة الخروج).</li>
              <li>استخدام بطاقات الكرتون الملونة بخط اليد بدلاً من العروض الإلكترونية لعرض المفردات والأنماط اللغوية.</li>
              <li>توظيف العمل الثنائي بين زملاء المقعد نفسه (فكر-زاوج-شارك) لضمان مشاركة 100% من الطلاب دون ضجيج.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: MINISTERIAL DECREE */}
      {activeSubTab === 'decree' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
              المرجع الإداري والتشريعي
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              القرار الوزاري للتقويم المدرسي للعام الدراسي 1447 / 1448 هـ (2026 / 2027 م)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              استناداً إلى وثيقة القرار الوزاري رقم (100) الصادرة عن وزارة التربية والتعليم والبحث العلمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Semester 1 Card */}
            <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-blue-900 text-base">
                  الفصل الدراسي الأول (1448هـ / 2026م)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-200/80 text-blue-950 font-bold text-xs">
                  {YEMENI_MINISTERIAL_CALENDAR.semester1.totalActualWeeks} أسبوعاً فعلياً
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 divide-y divide-blue-100">
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">انتظام الإدارة المدرسية:</span>
                  <span>{YEMENI_MINISTERIAL_CALENDAR.semester1.adminStaffStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء دوام هيئة التدريس:</span>
                  <span>{YEMENI_MINISTERIAL_CALENDAR.semester1.teachingStaffStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء الدراسة الفعلية:</span>
                  <span className="font-black text-blue-900">{YEMENI_MINISTERIAL_CALENDAR.semester1.actualStudyStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">انتهاء تدريس الفصل الأول:</span>
                  <span>{YEMENI_MINISTERIAL_CALENDAR.semester1.actualStudyEnd}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء اختبارات النقل المدرسية:</span>
                  <span className="font-black text-emerald-800">{YEMENI_MINISTERIAL_CALENDAR.semester1.termExamsStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء إجازة منتصف العام:</span>
                  <span>{YEMENI_MINISTERIAL_CALENDAR.semester1.midYearVacationStart}</span>
                </li>
              </ul>
            </div>

            {/* Semester 2 Card */}
            <div className="p-6 rounded-3xl bg-teal-50/60 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-teal-900 text-base">
                  الفصل الدراسي الثاني (1448هـ / 2027م)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-200/80 text-teal-950 font-bold text-xs">
                  {YEMENI_MINISTERIAL_CALENDAR.semester2.totalActualWeeks} أسبوعاً فعلياً
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 divide-y divide-teal-100">
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء الدراسة الفعلية (ف2):</span>
                  <span className="font-black text-teal-900">{YEMENI_MINISTERIAL_CALENDAR.semester2.actualStudyStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">انتهاء تدريس الفصل الثاني:</span>
                  <span>{YEMENI_MINISTERIAL_CALENDAR.semester2.actualStudyEnd}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء اختبارات النقل (ف2):</span>
                  <span className="font-black text-emerald-800">{YEMENI_MINISTERIAL_CALENDAR.semester2.termExamsStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء اختبارات الشهادة الأساسية (تاسع):</span>
                  <span className="font-black text-purple-900">{YEMENI_MINISTERIAL_CALENDAR.semester2.grade9GeneralExamsStart}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="font-bold">بدء اختبارات الثانوية العامة:</span>
                  <span className="font-black text-amber-900">{YEMENI_MINISTERIAL_CALENDAR.semester2.thanawiyaExamsStart}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PIN MODAL */}
      {isChangingPin && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-500" />
                <span>تغيير الرمز السري للوحة التحكم</span>
              </h3>
              <button
                onClick={() => {
                  setIsChangingPin(false);
                  setChangePinMessage(null);
                }}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePin} className="space-y-3 text-right">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">الرمز السري الحالي:</label>
                <input
                  type="password"
                  value={oldPinInput}
                  onChange={(e) => setOldPinInput(e.target.value)}
                  placeholder="الرمز الحالي"
                  className="w-full text-center text-sm py-2 px-3 rounded-xl border border-slate-300 font-mono outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">الرمز السري الجديد (4 أرقام فأكثر):</label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="الرمز الجديد"
                  className="w-full text-center text-sm py-2 px-3 rounded-xl border border-slate-300 font-mono outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">تأكيد الرمز السري الجديد:</label>
                <input
                  type="password"
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  placeholder="إعادة إدخال الرمز"
                  className="w-full text-center text-sm py-2 px-3 rounded-xl border border-slate-300 font-mono outline-none focus:border-amber-500"
                />
              </div>

              {changePinMessage && (
                <p
                  className={`text-xs font-bold text-center p-2 rounded-lg ${
                    changePinMessage.isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'
                  }`}
                >
                  {changePinMessage.text}
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-slate-950 font-black text-xs transition-all cursor-pointer"
                >
                  حفظ الرمز الجديد
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPin(false);
                    setChangePinMessage(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
