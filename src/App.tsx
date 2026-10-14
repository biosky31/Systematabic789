import React, { useState, useEffect } from 'react';
import { Navbar, ActiveGrade } from './components/Navbar';
import { UnifiedOverviewTab } from './components/UnifiedOverviewTab';
import { UnitExplorerTab } from './components/UnitExplorerTab';
import { Grade7ExplorerTab } from './components/Grade7ExplorerTab';
import { Grade8ExplorerTab } from './components/Grade8ExplorerTab';
import { GrammarSuiteTab } from './components/GrammarSuiteTab';
import { SpellingSuiteTab } from './components/SpellingSuiteTab';
import { VocabularyTableTab } from './components/VocabularyTableTab';
import { DiscoveredQuestionsTab } from './components/DiscoveredQuestionsTab';
import { InteractiveQuizTab } from './components/InteractiveQuizTab';
import { VisualGeneratorTab } from './components/VisualGeneratorTab';
import { QualityControlTab } from './components/QualityControlTab';
import { ExportCenterTab } from './components/ExportCenterTab';
import { AdminSemesterPlanTab } from './components/AdminSemesterPlanTab';
import { ALL_UNITS } from './data/unitsData';

export default function App() {
  const [currentGrade, setCurrentGrade] = useState<ActiveGrade>('grade8');
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#admin-plans' || window.location.hash === '#plans')) {
      return 'plans';
    }
    return 'overview';
  });
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [selectedPartFilter, setSelectedPartFilter] = useState<'all' | 1 | 2>('all');

  // Handle global shortcuts and hash changes at root level
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') || (e.altKey && e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        setActiveTab('plans');
      }
    };

    const handleHash = () => {
      if (window.location.hash === '#admin-plans' || window.location.hash === '#plans') {
        setActiveTab('plans');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Selected unit depending on active grade
  const selectedGrade9Unit =
    ALL_UNITS.find((u) => u.number === selectedUnitNumber) || ALL_UNITS[0];

  const handleSelectUnit = (unitNumber: number) => {
    setSelectedUnitNumber(unitNumber);
    setActiveTab('units');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-['Cairo',sans-serif]">
      {/* Universal Top Navbar for Grades 7, 8, 9 */}
      <Navbar
        currentGrade={currentGrade}
        setCurrentGrade={setCurrentGrade}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedUnit={selectedUnitNumber}
        setSelectedUnit={handleSelectUnit}
        selectedPartFilter={selectedPartFilter}
        setSelectedPartFilter={setSelectedPartFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1. Universal Overview & Curriculum Map */}
        {activeTab === 'overview' && (
          <UnifiedOverviewTab
            currentGrade={currentGrade}
            setCurrentGrade={setCurrentGrade}
            onSelectUnit={handleSelectUnit}
            selectedPartFilter={selectedPartFilter}
            setSelectedPartFilter={setSelectedPartFilter}
          />
        )}

        {/* 2. Unit Explorer Tab based on Active Grade */}
        {activeTab === 'units' && (
          <>
            {currentGrade === 'grade7' && (
              <Grade7ExplorerTab
                selectedUnit={selectedUnitNumber}
                onSelectUnit={(num) => setSelectedUnitNumber(num)}
              />
            )}
            {currentGrade === 'grade8' && (
              <Grade8ExplorerTab
                selectedUnit={selectedUnitNumber}
                onSelectUnit={(num) => setSelectedUnitNumber(num)}
              />
            )}
            {currentGrade === 'grade9' && (
              <UnitExplorerTab
                unit={selectedGrade9Unit}
                onSelectUnit={(num) => setSelectedUnitNumber(num)}
              />
            )}
          </>
        )}

        {/* 3. Comprehensive Grammar Encyclopedia */}
        {activeTab === 'grammar' && <GrammarSuiteTab currentGrade={currentGrade} />}

        {/* 4. Spelling and Orthography Encyclopedia */}
        {activeTab === 'spelling' && <SpellingSuiteTab currentGrade={currentGrade} />}

        {/* 5. Vocabulary & Lexical Analysis */}
        {activeTab === 'vocabulary' && <VocabularyTableTab currentGrade={currentGrade} />}

        {/* 6. Undocumented Exam Questions */}
        {activeTab === 'discovered' && <DiscoveredQuestionsTab currentGrade={currentGrade} />}

        {/* 7. Interactive Quiz Simulator */}
        {activeTab === 'quiz' && <InteractiveQuizTab currentGrade={currentGrade} />}

        {/* 8. Visual Generation Studio */}
        {activeTab === 'visuals' && <VisualGeneratorTab />}

        {/* 9. Quality Assurance & Audit */}
        {activeTab === 'quality' && <QualityControlTab />}

        {/* 10. Export & Direct Downloads */}
        {activeTab === 'exports' && <ExportCenterTab currentGrade={currentGrade} />}

        {/* 11. Admin Protected Semester Plans (الخطط الفصلية) */}
        {activeTab === 'plans' && (
          <AdminSemesterPlanTab
            onExit={() => {
              window.location.hash = '';
              setActiveTab('overview');
            }}
          />
        )}
      </main>

      {/* Universal Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div>
            <p className="font-bold text-slate-200">
              منصة «لُغَتِي الْعَرَبِيَّة» للمرحلة الأساسية • الصفوف (السابع • الثامن • التاسع)
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              إعداد وتحقيق فريق الخبراء الأكاديمي واللغوي{' '}
              <button
                type="button"
                onClick={() => setActiveTab('plans')}
                className="opacity-20 hover:opacity-100 transition-opacity cursor-pointer p-0.5"
                title=""
              >
                •
              </button>{' '}
              استناداً إلى المناهج المعتمدة لوزارة التربية والتعليم - الجمهورية اليمنية
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="text-emerald-400 font-bold">الصف السابع: 12 وحدة كاملة (162 صفحة)</span>
            <span>•</span>
            <span className="text-purple-400 font-bold">الصف الثامن: 12 وحدة كاملة (193 صفحة)</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">الصف التاسع: 24 وحدة كاملة (354 صفحة)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
