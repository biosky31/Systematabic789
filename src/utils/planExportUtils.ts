import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  TextRun,
  HeadingLevel,
} from 'docx';
import ExcelJS from 'exceljs';
import { SemesterPlanData, PlanWeekItem } from '../data/semesterPlansData';

/**
 * Utility to download a Blob as a file in the browser
 */
function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export semester plan to a styled Microsoft Word (.docx) file
 * Meets all Yemeni Ministry standards:
 * - Merged lessons within the unit into one column
 * - Merged Hijri and Gregorian dates into one column
 * - No objective codes or numbers printed
 * - Whiteboard with markers (السبورة القلمية) only, no chalk
 * - Beautiful RTL Arabic typography
 */
export async function exportPlanToWord(
  plan: SemesterPlanData,
  customWeeklyData: Record<string, { status: PlanWeekItem['defaultStatus']; notes: string }>
): Promise<void> {
  const tableRows: TableRow[] = [];

  // Header Row (Clean, reduced column count for perfect landscape printing)
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 6, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الأسبوع', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'التاريخ (هجري / ميلادي)', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الوحدة وموضوعات الدروس المقررة', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 7, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'المجال', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 21, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الأهداف الإجرائية ومؤشرات التحقق', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الوسائل (السبورة القلمية والبدائل)', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الاستراتيجيات النشطة', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 6, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'حالة التنفيذ', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
        new TableCell({
          width: { size: 6, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ text: 'الملاحظات', alignment: AlignmentType.CENTER, style: 'Heading4' })],
        }),
      ],
    })
  );

  // Data Rows
  plan.weeklyPlan.forEach((week) => {
    const custom = customWeeklyData[week.id];
    const status = custom?.status || week.defaultStatus;
    const notes = custom?.notes || week.teacherNotes || '—';

    tableRows.push(
      new TableRow({
        children: [
          // 1. Week
          new TableCell({
            children: [
              new Paragraph({
                text: `${week.weekNumber}${week.isReviewWeek ? ' (مراجعة)' : ''}`,
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          // 2. Merged Date (Hijri + Gregorian)
          new TableCell({
            children: [
              new Paragraph({ text: week.hijriRange, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: week.gregorianRange, alignment: AlignmentType.CENTER }),
            ],
          }),
          // 3. Merged Unit and Lessons
          new TableCell({
            children: [
              new Paragraph({ text: week.unitTitle, style: 'strong', alignment: AlignmentType.RIGHT }),
              new Paragraph({ text: `• القراءة: ${week.lessonsList.readingText}`, alignment: AlignmentType.RIGHT }),
              new Paragraph({ text: `• النحو: ${week.lessonsList.grammarTopic}`, alignment: AlignmentType.RIGHT }),
              new Paragraph({ text: `• الإملاء: ${week.lessonsList.spellingTopic}`, alignment: AlignmentType.RIGHT }),
              ...(week.lessonsList.compositionAndCalligraphy
                ? [new Paragraph({ text: `• التعبير والخط: ${week.lessonsList.compositionAndCalligraphy}`, alignment: AlignmentType.RIGHT })]
                : []),
            ],
          }),
          // 4. Domain
          new TableCell({
            children: [new Paragraph({ text: week.domain, alignment: AlignmentType.CENTER })],
          }),
          // 5. Behavioral Objectives WITHOUT CODES OR NUMBERS
          new TableCell({
            children: week.behavioralObjectives.map(
              (obj) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `• ${obj.text} `, bold: true }),
                    new TextRun({ text: `(مؤشر التحقق: ${obj.indicator})`, italics: true }),
                  ],
                  alignment: AlignmentType.RIGHT,
                })
            ),
          }),
          // 6. Low-Tech Aids (Pen Whiteboard and Physical Real Aids)
          new TableCell({
            children: week.lowTechAids.slice(0, 3).map(
              (aid) => new Paragraph({ text: `• ${aid}`, alignment: AlignmentType.RIGHT })
            ),
          }),
          // 7. Active Strategies
          new TableCell({
            children: week.activeStrategies.map(
              (st) =>
                new Paragraph({
                  text: `• ${st.name}: ${st.description}`,
                  alignment: AlignmentType.RIGHT,
                })
            ),
          }),
          // 8. Execution Status
          new TableCell({
            children: [new Paragraph({ text: status, alignment: AlignmentType.CENTER })],
          }),
          // 9. Notes
          new TableCell({
            children: [new Paragraph({ text: notes, alignment: AlignmentType.RIGHT })],
          }),
        ],
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children: [
          new Paragraph({
            text: 'الجمهورية اليمنية - وزارة التربية والتعليم والبحث العلمي',
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `خطة توزيع منهج مادة «لُغَتِي الْعَرَبِيَّة» - ${plan.gradeTitle}`,
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: `${plan.semesterTitle} • العام الدراسي: ${plan.schoolYear} • استناداً للقرار الوزاري رقم (100)`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'ملاحظة: الخطة معدة لبيئة تعليمية واقعية تعتمد الوسائل المادية والسبورة القلمية، مع مراجعات دورية شاملة في الأسابيع (5، 10، 15).',
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: ' ' }),
          new Table({
            rows: tableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: ' ' }),
          new Paragraph({
            text: 'اعتماد وتوقيع الخطة الدراسية:',
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: 'معلم المادة: ............................    |    رئيس الشعبة: ............................    |    الموجه التربوي: ............................    |    مدير المدرسة: ............................ (الختم الرسمي)',
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `خطة_لغتي_العربية_${plan.gradeKey}_فصل_${plan.semester}_1448هـ.docx`;
  downloadBlob(blob, fileName);
}

/**
 * Export semester plan to a rich Microsoft Excel (.xlsx) file
 * Includes Sheet 1: Master Semester Plan (15 Weeks) with reduced columns and no codes
 * Includes Sheet 2: Weekly Schedule Template (6 Periods: Saturday to Wednesday)
 */
export async function exportPlanToExcel(
  plan: SemesterPlanData,
  customWeeklyData: Record<string, { status: PlanWeekItem['defaultStatus']; notes: string }>
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'منصة لغتي العربية - وزارة التربية والتعليم اليمنية';
  workbook.created = new Date();

  // -------------------------------------------------------------
  // SHEET 1: الخطة الفصلية الرسمية (15 أسبوعاً) - أعمدة مدمجة وأنيقة
  // -------------------------------------------------------------
  const sheet1 = workbook.addWorksheet('الخطة الفصلية الرسمية', {
    views: [{ rightToLeft: true }],
  });

  sheet1.columns = [
    { header: 'الأسبوع', key: 'weekNumber', width: 12 },
    { header: 'التاريخ (هجري / ميلادي)', key: 'dateRange', width: 26 },
    { header: 'الوحدة وموضوعات الدروس المقررة', key: 'unitAndLessons', width: 42 },
    { header: 'المجال', key: 'domain', width: 14 },
    { header: 'الأهداف الإجرائية ومؤشرات التحقق', key: 'objectives', width: 50 },
    { header: 'الوسائل (السبورة القلمية والبدائل)', key: 'aids', width: 36 },
    { header: 'الاستراتيجيات النشطة', key: 'strategies', width: 34 },
    { header: 'أساليب التقويم', key: 'assessment', width: 28 },
    { header: 'حالة التنفيذ', key: 'status', width: 16 },
    { header: 'ملاحظات المعلم', key: 'notes', width: 30 },
  ];

  // Title block
  sheet1.mergeCells('A1:J1');
  const titleCell = sheet1.getCell('A1');
  titleCell.value = `الجمهورية اليمنية - وزارة التربية والتعليم • خطة توزيع منهج لغتي العربية (${plan.gradeTitle}) - ${plan.semesterTitle} - ${plan.schoolYear}`;
  titleCell.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet1.getRow(1).height = 36;

  // Header row styling
  const headerRow = sheet1.getRow(2);
  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Populate data
  plan.weeklyPlan.forEach((week) => {
    const custom = customWeeklyData[week.id];
    const status = custom?.status || week.defaultStatus;
    const notes = custom?.notes || week.teacherNotes || '';

    // Merged lessons inside unit
    const unitAndLessonsText = [
      week.unitTitle,
      `• القراءة: ${week.lessonsList.readingText}`,
      `• النحو: ${week.lessonsList.grammarTopic}`,
      `• الإملاء: ${week.lessonsList.spellingTopic}`,
      ...(week.lessonsList.compositionAndCalligraphy
        ? [`• التعبير/الخط: ${week.lessonsList.compositionAndCalligraphy}`]
        : []),
    ].join('\n');

    // Objectives WITHOUT codes or numbers
    const objectivesText = week.behavioralObjectives
      .map((o) => `• ${o.text} (مؤشر التحقق: ${o.indicator})`)
      .join('\n');

    const aidsText = week.lowTechAids.join('\n');
    const strategiesText = week.activeStrategies.map((s) => `• ${s.name}: ${s.description}`).join('\n');
    const assessmentText = week.assessmentMethods.join(' • ');

    const row = sheet1.addRow({
      weekNumber: `${week.weekNumber}${week.isReviewWeek ? ' (مراجعة)' : ''}`,
      dateRange: `${week.hijriRange}\n${week.gregorianRange}`,
      unitAndLessons: unitAndLessonsText,
      domain: week.domain,
      objectives: objectivesText,
      aids: aidsText,
      strategies: strategiesText,
      assessment: assessmentText,
      status: status,
      notes: notes,
    });

    row.alignment = { vertical: 'top', wrapText: true };

    // Highlight review weeks (Weeks 5, 10, 15)
    if (week.isReviewWeek) {
      row.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFBEB' } };
        cell.font = { bold: true, color: { argb: 'FF92400E' } };
      });
    }
  });

  // -------------------------------------------------------------
  // SHEET 2: جدول توزيع الحصص الأسبوعية (6 حصص: من السبت إلى الأربعاء)
  // -------------------------------------------------------------
  const sheet2 = workbook.addWorksheet('توزيع الحصص الأسبوعية (6 حصص)', {
    views: [{ rightToLeft: true }],
  });

  sheet2.columns = [
    { header: 'الأسبوع', key: 'weekNumber', width: 12 },
    { header: 'اليوم', key: 'day', width: 14 },
    { header: 'رقم الحصة', key: 'period', width: 12 },
    { header: 'الفرع والموضوع المقترح', key: 'topic', width: 38 },
    { header: 'الأهداف الإجرائية المقررة', key: 'periodObjectives', width: 42 },
    { header: 'الاستراتيجية النشطة (السبورة القلمية)', key: 'strategy', width: 36 },
    { header: 'الواجب / النشاط الصفي', key: 'activity', width: 32 },
    { header: 'التنفيذ الفعلي', key: 'check', width: 16 },
  ];

  // Title block for Sheet 2
  sheet2.mergeCells('A1:H1');
  const titleCell2 = sheet2.getCell('A1');
  titleCell2.value = `نموذج توزيع الحصص الأسبوعية الست (من السبت إلى الأربعاء) - ${plan.gradeTitle} - ${plan.semesterTitle}`;
  titleCell2.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  titleCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF065F46' } };
  titleCell2.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet2.getRow(1).height = 32;

  const headerRow2 = sheet2.getRow(2);
  headerRow2.height = 26;
  headerRow2.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF047857' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Populate 6 periods for each week (Saturday to Wednesday)
  plan.weeklyPlan.forEach((week) => {
    const isRev = week.isReviewWeek;

    const periods = [
      {
        day: 'السبت',
        period: 'الحصة 1',
        topic: isRev ? 'مراجعة قراءة ونصوص واستيعاب' : `قراءة ونصوص: ${week.lessonsList.readingText} (قراءة جهرية ومفردات)`,
        strategy: 'استكشاف العنوان والقراءة المتدرجة على السبورة القلمية',
        activity: 'قراءة النص واستخراج الكلمات الصعبة بالدفتر',
      },
      {
        day: 'الأحد',
        period: 'الحصة 2',
        topic: isRev ? 'مراجعة الأفكار الفكرية وأسئلة الفهم' : `قراءة وتحليل: استيعاب النص وتدريبات المعجم وسياق المفردات`,
        strategy: 'المفردة في سياقها والشاهد من النص بالدفاتر',
        activity: 'حل أسئلة الفهم والاستيعاب بالكتاب المدرسي',
      },
      {
        day: 'الاثنين',
        period: 'الحصة 3',
        topic: isRev ? 'مراجعة القواعد النحوية ومقارنات ثنائية' : `نحو وصرف: ${week.lessonsList.grammarTopic} (الشواهد والقاعدة)`,
        strategy: 'التفسير قبل القاعدة والمقارنة الثنائية على السبورة القلمية',
        activity: 'تدوين القاعدة بالدفتر مع شواهد إضافية',
      },
      {
        day: 'الثلاثاء',
        period: 'الحصة 4',
        topic: isRev ? 'تطبيقات إعرابية شاملة واختبار شهري' : `نحو وصرف: تطبيقات إعرابية وتدريبات الكتاب وحل الأنشطة`,
        strategy: 'القاعدة في الاستعمال والتعلم من الزميل وتطبيقات فورية',
        activity: 'إعراب أمثلة من الشواهد المقررة بالدفتر',
      },
      {
        day: 'الأربعاء (أ)',
        period: 'الحصة 5',
        topic: isRev ? 'إملاء اختباري ومراجعة أخطاء الهمزات' : `إملاء ورسم: ${week.lessonsList.spellingTopic} وقواعد الخط العربي`,
        strategy: 'اكتشاف الخطأ وتصويبه على السبورة القلمية بالأقلام الملونة',
        activity: 'تطبيق فقرة إملائية في كراسة الإملاء',
      },
      {
        day: 'الأربعاء (ب)',
        period: 'الحصة 6',
        topic: isRev ? 'تقويم تعبير ختامي ومراجعة الكراسات' : `تعبير وإنشاء: ${week.lessonsList.compositionAndCalligraphy || 'تعبير كتابي وشفهي'}`,
        strategy: 'مراجعة الدفتر والتقويم الذاتي وبطاقة الخروج',
        activity: 'كتابة فقرة التعبير المنزلية والتصويب الذاتي',
      },
    ];

    periods.forEach((p) => {
      const r = sheet2.addRow({
        weekNumber: `أسبوع ${week.weekNumber}`,
        day: p.day,
        period: p.period,
        topic: p.topic,
        periodObjectives: `تحقيق أهداف الأسبوع ${week.weekNumber} الإجرائية`,
        strategy: p.strategy,
        activity: p.activity,
        check: '☐ لم ينفذ',
      });
      r.alignment = { vertical: 'middle', wrapText: true };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const fileName = `خطة_توزيع_المنهج_والحصص_${plan.gradeKey}_فصل_${plan.semester}_1448هـ.xlsx`;
  downloadBlob(blob, fileName);
}
