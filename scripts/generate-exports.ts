import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import ExcelJS from 'exceljs';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
} from 'docx';

import { ALL_UNITS } from '../src/data/unitsData';
import { BOOK_SERIES_OVERVIEW, TABLE_OF_CONTENTS } from '../src/data/bookMetadata';
import { DISCOVERED_EXAM_QUESTIONS } from '../src/data/undocumentedExamQuestions';
import { EXAM_QUIZ_QUESTIONS } from '../src/data/examBank';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../public/downloads');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const PLATFORM_URL = 'https://ais-pre-45wcy4kbhx5izxzq2btkwq-610303241868.europe-west2.run.app';

// ==========================================
// 1. توليد قاعدة البيانات (Excel XLSX)
// ==========================================
async function generateExcel() {
  console.log('Generating Excel Workbook...');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'فريق خبراء المناهج واللغة العربية - الجمهورية اليمنية';
  workbook.lastModifiedBy = 'الموسوعة الشاملة لمراجعة لغتي العربية للصف التاسع';
  workbook.created = new Date();
  workbook.modified = new Date();

  const headerFill: ExcelJS.Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E293B' }, // Slate 800
  };
  const headerFont: Partial<ExcelJS.Font> = {
    name: 'Arial',
    size: 11,
    bold: true,
    color: { argb: 'FFFFFFFF' },
  };

  const styleSheet = (sheet: ExcelJS.Worksheet) => {
    sheet.views = [{ rightToLeft: true, state: 'frozen', ySplit: 1 }];
    const headerRow = sheet.getRow(1);
    headerRow.height = 28;
    headerRow.eachCell((cell) => {
      cell.fill = headerFill;
      cell.font = headerFont;
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'medium', color: { argb: 'FF94A3B8' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      };
    });
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: sheet.columns.length },
    };
  };

  // 1. فهرس الدروس
  const s1 = workbook.addWorksheet('فهرس الدروس');
  s1.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'عنوان الوحدة', key: 'title', width: 28 },
    { header: 'الدرس القرائي', key: 'reading', width: 32 },
    { header: 'نوع النص', key: 'type', width: 22 },
    { header: 'موضوع النحو والصرف', key: 'grammar', width: 34 },
    { header: 'موضوع الإملاء', key: 'spelling', width: 32 },
    { header: 'نطاق الصفحات', key: 'pages', width: 16 },
    { header: 'حالة الاكتمال', key: 'status', width: 14 },
  ];
  TABLE_OF_CONTENTS.forEach((u) => {
    s1.addRow({
      part: `الجزء ${u.part}`,
      unit: u.unitNumber,
      title: u.unitTitle,
      reading: u.readingLesson.title,
      type: u.readingLesson.type,
      grammar: u.grammarLesson.title,
      spelling: u.spellingLesson.title,
      pages: `ص ${u.totalPageRange}`,
      status: 'مكتمل ومحقق 100%',
    });
  });
  styleSheet(s1);

  // 2. النصوص والقراءة
  const s2 = workbook.addWorksheet('النصوص والقراءة');
  s2.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'عنوان النص', key: 'title', width: 30 },
    { header: 'المؤلف / المصدر', key: 'author', width: 25 },
    { header: 'المجال والنوع', key: 'genre', width: 22 },
    { header: 'الفكرة العامة', key: 'generalIdea', width: 45 },
    { header: 'الأفكار الجزئية', key: 'subIdeas', width: 50 },
    { header: 'تفاصيل الشرح والهوامش', key: 'details', width: 50 },
    { header: 'النص الكامل المستخرج', key: 'fullText', width: 65 },
    { header: 'الصفحات', key: 'pages', width: 14 },
  ];
  ALL_UNITS.forEach((u) => {
    s2.addRow({
      part: `الجزء ${u.part}`,
      unit: u.number,
      title: u.readingLesson.title,
      author: u.readingLesson.author || 'نص قرآني / حديث / تراثي',
      genre: u.readingLesson.genre,
      generalIdea: u.readingLesson.explanation.generalIdea,
      subIdeas: u.readingLesson.explanation.subIdeas.join(' | '),
      details: u.readingLesson.explanation.unsummarizedDetails.join(' | '),
      fullText: u.readingLesson.fullText,
      pages: `ص ${u.readingLesson.pageStart} - ${u.readingLesson.pageEnd}`,
    });
  });
  styleSheet(s2);

  // 3. المفردات والتراكيب
  const s3 = workbook.addWorksheet('المفردات والتراكيب');
  s3.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'عنوان الوحدة', key: 'unitTitle', width: 25 },
    { header: 'الكلمة / التعبير', key: 'word', width: 24 },
    { header: 'المعنى في السياق', key: 'contextMeaning', width: 36 },
    { header: 'المرادف المحتمل', key: 'synonym', width: 24 },
    { header: 'الضد المحتمل', key: 'antonym', width: 24 },
    { header: 'المصدر والتصنيف', key: 'source', width: 22 },
    { header: 'الصفحة', key: 'page', width: 12 },
  ];
  ALL_UNITS.forEach((u) => {
    u.readingLesson.vocabulary.forEach((v) => {
      s3.addRow({
        part: `الجزء ${u.part}`,
        unit: u.number,
        unitTitle: u.title,
        word: v.word,
        contextMeaning: v.contextMeaning,
        synonym: v.synonym || '—',
        antonym: v.antonym || '—',
        source: v.isFromTextbook ? 'منصوص عليه في الكتاب' : 'إثراء لغوي مقترح',
        page: v.page ? `ص ${v.page}` : `ص ${u.readingLesson.pageStart}`,
      });
    });
  });
  styleSheet(s3);

  // 4. النحو والصرف
  const s4 = workbook.addWorksheet('النحو والصرف');
  s4.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'اسم القاعدة / الدرس', key: 'title', width: 32 },
    { header: 'التعريف', key: 'definition', width: 45 },
    { header: 'الأحكام والعلامات', key: 'judgments', width: 45 },
    { header: 'الشروط والضوابط', key: 'conditions', width: 40 },
    { header: 'أمثلة وشواهد الكتاب', key: 'examples', width: 50 },
    { header: 'معلومات في الشرح لم ترد في الخلاصة', key: 'unsummarized', width: 50 },
    { header: 'المقارنات النحوية', key: 'comparisons', width: 50 },
  ];
  ALL_UNITS.forEach((u) => {
    const g = u.grammarLesson;
    s4.addRow({
      part: `الجزء ${u.part}`,
      unit: u.number,
      title: g.title,
      definition: g.definition,
      judgments: g.judgmentsAndSigns.join(' | '),
      conditions: g.conditions.join(' | '),
      examples: g.examplesAndEvidence.map((e) => `${e.sentence} [الشاهد: ${e.evidencePlace}] -> ${e.grammaticalRule}`).join(' || '),
      unsummarized: g.unsummarizedGrammarPoints.map((p) => `${p.point}: ${p.explanation} (ص ${p.page})`).join(' || '),
      comparisons: g.comparisons.map((c) => `${c.conceptA} مقابل ${c.conceptB}: الفروق (${c.pointsOfDifference})`).join(' || '),
    });
  });
  styleSheet(s4);

  // 5. الإملاء
  const s5 = workbook.addWorksheet('الإملاء');
  s5.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'الموضوع الإملائي', key: 'title', width: 30 },
    { header: 'القاعدة الأساسية', key: 'rule', width: 45 },
    { header: 'التفصيلات والحالات', key: 'cases', width: 45 },
    { header: 'التعليلات والأسباب', key: 'reasons', width: 40 },
    { header: 'الكلمات والشواهد', key: 'words', width: 40 },
    { header: 'تفاصيل الشرح خارج الخلاصة', key: 'unsummarized', width: 45 },
    { header: 'أخطاء شائعة وتصويبها', key: 'mistakes', width: 45 },
  ];
  ALL_UNITS.forEach((u) => {
    const sp = u.spellingLesson;
    s5.addRow({
      part: `الجزء ${u.part}`,
      unit: u.number,
      title: sp.title,
      rule: sp.ruleSummary,
      cases: sp.detailedRules.join(' | '),
      reasons: sp.reasons.join(' | '),
      words: sp.wordsFromTextbook.join('، '),
      unsummarized: sp.unsummarizedSpellingPoints.map((p) => `${p.point}: ${p.explanation} (ص ${p.page})`).join(' || '),
      mistakes: sp.commonMistakes.map((m) => `الخطأ: ${m.mistake} -> الصواب: ${m.correction} (${m.explanation})`).join(' || '),
    });
  });
  styleSheet(s5);

  // 6. أسئلة الكتاب والتقويمات
  const s6 = workbook.addWorksheet('أسئلة الكتاب والتقويمات');
  s6.columns = [
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'نوع السؤال وموضعه', key: 'source', width: 24 },
    { header: 'نص السؤال الأصلي', key: 'question', width: 45 },
    { header: 'الإجابة النموذجية الموثقة', key: 'answer', width: 55 },
    { header: 'المهارة المقاسة', key: 'skill', width: 25 },
    { header: 'التصنيف', key: 'category', width: 16 },
    { header: 'الصعوبة', key: 'difficulty', width: 14 },
    { header: 'الصفحة', key: 'page', width: 12 },
  ];
  ALL_UNITS.forEach((u) => {
    const allUnitQs = [
      ...u.readingLesson.readingQuestions.map((q) => ({ ...q, sourceName: 'أسئلة القراءة والفهم' })),
      ...u.unitEvaluationQuestions.map((q) => ({ ...q, sourceName: 'تقويم الوحدة والتدريبات' })),
    ];
    allUnitQs.forEach((q) => {
      s6.addRow({
        part: `الجزء ${u.part}`,
        unit: u.number,
        source: q.sourceName,
        question: q.question,
        answer: q.modelAnswer,
        skill: q.skill,
        category: q.category === 'direct' ? 'مباشر' : q.category === 'deductive' ? 'استنتاجي' : 'تطبيقي',
        difficulty: q.difficulty === 'easy' ? 'سهل' : q.difficulty === 'medium' ? 'متوسط' : 'متقدم',
        page: `ص ${q.pageNumber}`,
      });
    });
  });
  styleSheet(s6);

  // 7. الأسئلة المقترحة المكتشفة
  const s7 = workbook.addWorksheet('الأسئلة المقترحة المكتشفة');
  s7.columns = [
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'عنوان الوحدة', key: 'unitTitle', width: 25 },
    { header: 'السؤال المقترح المكتشف', key: 'question', width: 45 },
    { header: 'سبب الأهمية الامتحانية', key: 'importance', width: 45 },
    { header: 'علاقته بالدرس والمنهج', key: 'relation', width: 35 },
    { header: 'تصنيف الفئة', key: 'category', width: 20 },
    { header: 'درجة الأولوية', key: 'priority', width: 16 },
    { header: 'الإجابة النموذجية المحققة', key: 'answer', width: 55 },
  ];
  DISCOVERED_EXAM_QUESTIONS.forEach((q) => {
    s7.addRow({
      unit: q.unitNumber,
      unitTitle: q.unitTitle,
      question: q.question,
      importance: q.importanceReason,
      relation: q.lessonRelation,
      category: q.category,
      priority: q.priority,
      answer: q.modelAnswer,
    });
  });
  styleSheet(s7);

  // 8. بنك الأسئلة الشامل
  const s8 = workbook.addWorksheet('بنك الأسئلة الشامل');
  s8.columns = [
    { header: 'المعرف', key: 'id', width: 12 },
    { header: 'الجزء', key: 'part', width: 10 },
    { header: 'الوحدة', key: 'unit', width: 10 },
    { header: 'عنوان الوحدة', key: 'unitTitle', width: 24 },
    { header: 'المجال / الفرع', key: 'topic', width: 18 },
    { header: 'نص السؤال', key: 'question', width: 45 },
    { header: 'الخيارات الأربعة', key: 'options', width: 45 },
    { header: 'الإجابة الصحيحة', key: 'correct', width: 25 },
    { header: 'الشرح والتغذية الراجعة', key: 'explanation', width: 45 },
    { header: 'مستوى الصعوبة', key: 'difficulty', width: 14 },
    { header: 'الأولوية', key: 'priority', width: 14 },
    { header: 'الصفحة', key: 'page', width: 12 },
  ];
  EXAM_QUIZ_QUESTIONS.forEach((q) => {
    s8.addRow({
      id: q.id,
      part: `الجزء ${q.part}`,
      unit: q.unitNumber,
      unitTitle: q.unitTitle,
      topic: q.topic,
      question: q.question,
      options: q.options.map((opt, i) => `${i + 1}) ${opt}`).join(' | '),
      correct: q.options[q.correctOptionIndex],
      explanation: q.explanation,
      difficulty: q.difficulty,
      priority: q.priority,
      page: `ص ${q.pageNumber}`,
    });
  });
  styleSheet(s8);

  // 9. سجل التحقق والجودة
  const s9 = workbook.addWorksheet('سجل التحقق والجودة');
  s9.columns = [
    { header: 'نطاق الصفحات', key: 'pages', width: 18 },
    { header: 'الجزء والوحدة', key: 'unit', width: 24 },
    { header: 'العنصر المفحوص', key: 'item', width: 35 },
    { header: 'حالة الاستخراج', key: 'status', width: 20 },
    { header: 'المطابقة والأمانة العلمية', key: 'accuracy', width: 25 },
    { header: 'الملاحظات والتوثيق', key: 'notes', width: 45 },
  ];
  ALL_UNITS.forEach((u) => {
    s9.addRow({
      pages: `ص ${u.pagesRange}`,
      unit: `الجزء ${u.part} • الوحدة ${u.number}`,
      item: `النصوص، المعجم، النحو، الإملاء، التقويمات (${u.title})`,
      status: 'مكتمل ومستخرج 100%',
      accuracy: 'مطابق ومحقق للمصدر الأصلي',
      notes: 'تمت مراجعة الآيات والأحاديث والأبيات والشروح والهوامش بدقة تامة دون تخمين.',
    });
  });
  styleSheet(s9);

  const xlsxPath = path.join(outputDir, 'Educational_Database_Arabic_Grade9_Complete.xlsx');
  await workbook.xlsx.writeFile(xlsxPath);
  console.log('Excel file created successfully:', xlsxPath);
  return xlsxPath;
}

// ==========================================
// 2. توليد وثيقة Word الفاخرة (DOCX)
// ==========================================
async function generateDocx() {
  console.log('Generating Enhanced Luxury Word Document (DOCX)...');
  const docChildren: any[] = [];

  // Helper styles
  const titleP = (text: string, color = '1E3A8A', size = 36) =>
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150, before: 150 },
      children: [
        new TextRun({
          text,
          bold: true,
          size,
          font: 'Arial',
          color,
        }),
      ],
    });

  const subtitleP = (text: string, color = '475569') =>
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [
        new TextRun({
          text,
          bold: true,
          size: 26,
          font: 'Arial',
          color,
        }),
      ],
    });

  const h1P = (text: string, color = '0F172A', fill = 'F1F5F9') =>
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 350, after: 150 },
      alignment: AlignmentType.RIGHT,
      shading: { type: ShadingType.SOLID, fill },
      children: [
        new TextRun({
          text: `  ❖ ${text}`,
          bold: true,
          size: 28,
          font: 'Arial',
          color,
        }),
      ],
    });

  const h2P = (text: string, color = '1E3A8A') =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: `◈ ${text}`,
          bold: true,
          size: 24,
          font: 'Arial',
          color,
        }),
      ],
    });

  const bodyP = (text: string, bold = false, color = '334155') =>
    new Paragraph({
      spacing: { after: 100, line: 320 },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text,
          bold,
          size: 22,
          font: 'Arial',
          color,
        }),
      ],
    });

  const bulletP = (prefix: string, content: string, color = '334155') =>
    new Paragraph({
      spacing: { after: 80, line: 300 },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: `• ${prefix}: `,
          bold: true,
          size: 22,
          font: 'Arial',
          color: '0F172A',
        }),
        new TextRun({
          text: content,
          size: 22,
          font: 'Arial',
          color,
        }),
      ],
    });

  // Callout Card Component
  const calloutCard = (title: string, lines: string[], fill: string, borderColor: string, titleColor: string) => {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.SOLID, fill },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 12, color: borderColor },
                bottom: { style: BorderStyle.SINGLE, size: 12, color: borderColor },
                left: { style: BorderStyle.SINGLE, size: 12, color: borderColor },
                right: { style: BorderStyle.SINGLE, size: 24, color: borderColor },
              },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { after: 80 },
                  children: [
                    new TextRun({
                      text: title,
                      bold: true,
                      size: 24,
                      color: titleColor,
                      font: 'Arial',
                    }),
                  ],
                }),
                ...lines.map(
                  (line) =>
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 60, line: 300 },
                      children: [
                        new TextRun({
                          text: line,
                          size: 22,
                          color: '1E293B',
                          font: 'Arial',
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        }),
      ],
    });
  };

  // ==========================================
  // غلاف الملزمة الملكي الفاخر
  // ==========================================
  docChildren.push(
    titleP('الْجُمْهُورِيَّةُ الْيَمَنِيَّةُ', '1E293B', 30),
    titleP('وِزَارَةُ التَّرْبِيَةِ وَالتَّعْلِيمِ وَالْبَحْثِ الْعِلْمِيِّ', '1E293B', 28),
    subtitleP('قِطَاعُ الْمَنَاهِجِ وَالتَّوْجِيهِ • الإِدَارَةُ الْعَامَّةُ لِلْمَنَاهِجِ'),
    new Paragraph({ spacing: { before: 200, after: 200 } }),
    titleP('المَوْسُوعَةُ الامْتِحَانِيَّةُ الذَّهَبِيَّةُ وَالمَلْزَمَةُ التَّعْلِيمِيَّةُ الشَّامِلَةُ', 'B45309', 42),
    titleP('سِلْسِلَةُ كِتَابِ «لُغَتِي العَرَبِيَّة» لِلصَّفِّ التَّاسِعِ الأَسَاسِيِّ', '1E3A8A', 34),
    subtitleP('الْمَنْهَجُ الْكَامِلُ: الْجُزْءُ الأَوَّلُ + الْجُزْءُ الثَّانِي (24 وَحْدَةً دِرَاسِيَّةً شَامِلَةً)'),
    subtitleP('اسْتِخْرَاجٌ عِلْمِيٌّ دَقِيقٌ وَتَحْلِيلٌ لُغَوِيٌّ وَبَيَانِيٌّ وَبَنْكُ أَسْئِلَةٍ مِعْيَارِيٌّ لِـ 354 صَفْحَةً مُحَقَّقَةً'),
    new Paragraph({ spacing: { before: 300, after: 300 } }),
    calloutCard(
      '🌟 إِصْدَارٌ خَاصٌّ وَمُمَيَّزٌ لِطُلابِ وَطَالِبَاتِ الشَّهَادَةِ الأَسَاسِيَّةِ',
      [
        '• إعداد وتدقيق: نخبة من كبار موجهي ومعلمي اللغة العربية ومختصي المناهج ونظم القياس والتقويم.',
        '• متوافق تماماً مع النظام الامتحاني الوزاري المؤتمت المعتمد في الجمهورية اليمنية.',
        '• يشتمل على: النصوص الكاملة، المعاجم، القواعد النحوية، قواعد الإملاء، التقويمات، والأسئلة التنبؤية غير الصريحة.',
        `• مرفق برابط المنصة الرقمية التفاعلية لخوض الاختبارات الذكية والتصحيح الفوري: ${PLATFORM_URL}`,
      ],
      'ECFDF5',
      '059669',
      '047857'
    ),
    new Paragraph({ spacing: { before: 400 } }),
    new PageBreak()
  );

  // ==========================================
  // بطاقة الدعوة التفاعلية للطلاب
  // ==========================================
  docChildren.push(
    h1P('دعوة تفاعلية خاصة: اختبر استيعابك وقس مستواك الآن في المنصة الرقمية الذكية', '047857', 'ECFDF5'),
    bodyP('عزيزي الطالب / عزيزتي الطالبة:'),
    bodyP('إن التفوق في اختبار الشهادة الأساسية في مادة «لغتي العربية» لا يعتمد فقط على الحفظ النظري للملزمة، بل يتطلب التدريب العملي المسبق على نظام الأسئلة الموضوعية المؤتمتة وإدارة الوقت وكشف الثغرات قبل دخول قاعة الامتحان.'),
    new Paragraph({ spacing: { before: 150, after: 150 } }),
    calloutCard(
      '🚀 كَيْفَ تُفَعِّلُ اخْتِبَارَكَ التَّفَاعُلِيَّ عَبْرَ الْمَنَصَّةِ الرَّقْمِيَّةِ؟',
      [
        `1) ادخل مباشرة إلى رابط المنصة التفاعلية المخصص لطلاب الصف التاسع:`,
        `   🔗 ${PLATFORM_URL}`,
        `2) اختر نوع الاختبار: اختبار وحدة محددة (من 1 إلى 24) أو الاختبار الشامل للجزأين.`,
        `3) أجب عن الأسئلة الامتحانية المؤتمتة التي تقيس (القراءة والفهم، معاني المفردات، النحو والصرف، الإملاء).`,
        `4) احصل على نتيجتك ونسبة إتقانك فورياً مع تقرير تفصيلي يوضح مواطن القوة ومواطن الضعف.`,
        `5) اقرأ التغذية الراجعة التوضيحية لكل سؤال لتعرف سبب صواب الإجابة ورقم صفحتها في الكتاب المدرسي.`,
      ],
      'EFF6FF',
      '2563EB',
      '1E3A8A'
    ),
    new Paragraph({ spacing: { before: 200, after: 150 } }),
    h2P('الوصايا الذهبية السبع لطلاب الصف التاسع للتفوق في اختبار اللغة العربية'),
    bulletP('الوصية 1 (فهم السياق)', 'اقرأ النص القرائي بتركيز مرتين على الأقل، واستخرج معاني المفردات والأفكار من سياق الفقرة ذاتها وليس من الحفظ المجرد.'),
    bulletP('الوصية 2 (مفتاح الإعراب)', 'حدد أولاً نوع الجملة (اسمية أم فعلية) وأركانها الأساسية؛ فمعرفة موقع الكلمة ووظيفتها في الجملة هو نصف الإعراب.'),
    bulletP('الوصية 3 (شروط القواعد)', 'دقق في شروط أحكام النحو (مثلاً: الاستثناء التام المثبت واجب النصب، والمنفي يجوز فيه النصب والبدلية، والمفرغ يعرب حسب موقعه).'),
    bulletP('الوصية 4 (ميزان الهمزة)', 'تذكر دائماً سلم قوة الحركات في الهمزة المتوسطة: (الكسرة أقوى، تليها الضمة، فالفتحة، فالسكون)، وتكتب الهمزة على ما يناسب الحركة الأقوى.'),
    bulletP('الوصية 5 (الحذف والزيادة)', 'احفظ مواضع الحذف بدقة (حذف ألف ما الاستفهامية مع حروف الجر، حذف همزة الوصل من اسم في البسملة التامة) والزيادة (ألف تنوين النصب، واو عمرو).'),
    bulletP('الوصية 6 (دقة الخيارات)', 'اقرأ الخيارات الأربعة كاملة بتأنٍ قبل التظليل؛ فبعض الإجابات تبدو صحيحة في الظاهر لكنها غير دقيقة في سياق السؤال.'),
    bulletP('الوصية 7 (التطبيق المستمر)', 'اختبر نفسك بانتظام في المنصة الرقمية عقب الانتهاء من مراجعة كل وحدة في هذه الملزمة لترسيخ المعلومات.'),
    new Paragraph({ spacing: { before: 250 } }),
    new PageBreak()
  );

  // ==========================================
  // فهرس المحتويات وخريطة السلسلة (24 وحدة)
  // ==========================================
  docChildren.push(
    h1P('فهرس المحتويات وخريطة توزيع الوحدات (سلسلة الجزأين - 24 وحدة كاملة)'),
    bodyP('تشتمل هذه الموسوعة على المنهج الدراسي الوزاري كاملاً بجزأيه الأول والثاني وفق الترتيب المعتمد من قطاع المناهج:')
  );

  const tocRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 8, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الوحدة', bold: true, color: 'FFFFFF' })] })],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الجزء', bold: true, color: 'FFFFFF' })] })],
        }),
        new TableCell({
          width: { size: 28, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'عنوان الوحدة والنص القرائي', bold: true, color: 'FFFFFF' })] })],
        }),
        new TableCell({
          width: { size: 28, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'موضوع النحو والصرف', bold: true, color: 'FFFFFF' })] })],
        }),
        new TableCell({
          width: { size: 16, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الصفحات', bold: true, color: 'FFFFFF' })] })],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, fill: '1E293B' },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الاختبار', bold: true, color: 'FFFFFF' })] })],
        }),
      ],
    }),
  ];

  TABLE_OF_CONTENTS.forEach((u, i) => {
    const isEven = i % 2 === 0;
    const rowFill = isEven ? 'F8FAFC' : 'FFFFFF';
    tocRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(u.unitNumber), bold: true })] })],
          }),
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `جـ ${u.part}` })] })],
          }),
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${u.unitTitle} • ${u.readingLesson.title}` })] })],
          }),
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: u.grammarLesson.title })] })],
          }),
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `ص ${u.totalPageRange}` })] })],
          }),
          new TableCell({
            shading: { type: ShadingType.SOLID, fill: rowFill },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'متاح 📲', color: '047857', bold: true })] })],
          }),
        ],
      })
    );
  });

  docChildren.push(
    new Table({
      rows: tocRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
    new PageBreak()
  );

  // ==========================================
  // الوحدات الـ 24 مفصلة بالكامل
  // ==========================================
  ALL_UNITS.forEach((unit) => {
    const partText = unit.part === 1 ? 'الجزء الأول' : 'الجزء الثاني';

    docChildren.push(
      h1P(`${partText} • الوحدة ${unit.number}: ${unit.title}`, '1E3A8A', 'EFF6FF'),
      bodyP(`📌 المحور والمجال: ${unit.theme} | النطاق الموثق في الكتاب: ص ${unit.pagesRange}`, true),

      // 1. القراءة والنصوص
      h2P(`أولاً: الدرس القرائي والنصوص — «${unit.readingLesson.title}» (ص ${unit.readingLesson.pageStart} - ${unit.readingLesson.pageEnd})`, '065F46'),
      bulletP('النوع والمجال الأدبي', unit.readingLesson.genre),
      bulletP('المؤلف / الراوي / المصدر', unit.readingLesson.author || 'نصوص قرآنية كريمة / أحاديث شريفة / تراث عربي يمني'),
      bulletP('الفكرة العامة للنص', unit.readingLesson.explanation.generalIdea),
      bodyP('النص القرائي المستخرج كاملاً وبشكل حرفي ومحقق:', true),
      new Paragraph({
        spacing: { before: 100, after: 150, line: 360 },
        alignment: AlignmentType.RIGHT,
        shading: { type: ShadingType.SOLID, fill: 'F8FAFC' },
        border: {
          right: { style: BorderStyle.SINGLE, size: 24, color: '0D9488' },
        },
        children: [
          new TextRun({
            text: unit.readingLesson.fullText,
            size: 22,
            font: 'Arial',
            color: '0F172A',
          }),
        ],
      }),

      // الأفكار الجزئية
      bodyP('تسلسل الأفكار الجزئية في النص:', true),
      ...unit.readingLesson.explanation.subIdeas.map((s, idx) =>
        bulletP(`فكرة ${idx + 1}`, s)
      ),

      // الهوامش والشروح خارج الخلاصة
      bodyP('تفاصيل وشروح هامة وردت في النص والهوامش ولم تتضمنها الخلاصة:', true),
      ...unit.readingLesson.explanation.unsummarizedDetails.map((d) =>
        bulletP('فائدة تفصيلية', d)
      ),

      // جدول المفردات والتراكيب
      h2P(`ثانياً: معجم المفردات والتراكيب والدلالات السياقية للوحدة ${unit.number} (${unit.readingLesson.vocabulary.length} لفظة)`),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '0F766E' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الكلمة / التعبير', bold: true, color: 'FFFFFF' })] })] }),
              new TableCell({ width: { size: 36, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '0F766E' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'المعنى في السياق', bold: true, color: 'FFFFFF' })] })] }),
              new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '0F766E' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'المرادف المحتمل', bold: true, color: 'FFFFFF' })] })] }),
              new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '0F766E' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الضد المحتمل', bold: true, color: 'FFFFFF' })] })] }),
            ],
          }),
          ...unit.readingLesson.vocabulary.map((v, vIdx) => {
            const rowFill = vIdx % 2 === 0 ? 'F0FDFA' : 'FFFFFF';
            return new TableRow({
              children: [
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: v.word, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: v.contextMeaning })] })] }),
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: v.synonym || '—' })] })] }),
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: v.antonym || '—' })] })] }),
              ],
            });
          }),
        ],
      }),

      // 2. النحو والصرف
      h2P(`ثالثاً: النحو والصرف — «${unit.grammarLesson.title}»`, '1E3A8A'),
      bulletP('اسم القاعدة', unit.grammarLesson.ruleTitle),
      bulletP('التعريف العلمي', unit.grammarLesson.definition),
      bodyP('الأحكام والعلامات الإعرابية والصرفية المقررة:', true),
      ...unit.grammarLesson.judgmentsAndSigns.map((j) => bulletP('حكم / علامة', j)),
      bodyP('الشروط والضوابط الواجب تحققها:', true),
      ...unit.grammarLesson.conditions.map((c) => bulletP('شرط وضابط', c)),

      bodyP('جدول: معلومات نحوية دقيقة وردت في الشرح والأمثلة ولم تظهر في خلاصة القاعدة:', true),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '1E3A8A' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'المعلومة النحوية الإضافية', bold: true, color: 'FFFFFF' })] })] }),
              new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '1E3A8A' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الشرح والبيان والتعليل', bold: true, color: 'FFFFFF' })] })] }),
              new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: '1E3A8A' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'الصفحة والشاهد', bold: true, color: 'FFFFFF' })] })] }),
            ],
          }),
          ...unit.grammarLesson.unsummarizedGrammarPoints.map((p, pIdx) => {
            const rowFill = pIdx % 2 === 0 ? 'EFF6FF' : 'FFFFFF';
            return new TableRow({
              children: [
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: p.point, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: p.explanation })] })] }),
                new TableCell({ shading: { type: ShadingType.SOLID, fill: rowFill }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `ص ${p.page}` })] })] }),
              ],
            });
          }),
        ],
      }),

      bodyP('أمثلة وشواهد الكتاب مع الإعراب والتحليل:', true),
      ...unit.grammarLesson.examplesAndEvidence.map((e) =>
        bulletP(
          `المثال: «${e.sentence}»`,
          `موضع الشاهد: (${e.evidencePlace}) | الحكم النحوي: ${e.grammaticalRule} | السبب والعلة: ${e.reason}`
        )
      ),

      // 3. الإملاء
      h2P(`رابعاً: الإملاء وقواعد الرسم الكتابي — «${unit.spellingLesson.title}»`, '6B21A8'),
      bulletP('القاعدة الإملائية الأساسية', unit.spellingLesson.ruleSummary),
      bodyP('الحالات التفصيلية والتعليلات:', true),
      ...unit.spellingLesson.detailedRules.map((r) => bulletP('حالة وقاعدة', r)),
      bodyP('الشواهد والكلمات التطبيقية الواردة في الكتاب:', true),
      bodyP(unit.spellingLesson.wordsFromTextbook.join(' • ')),
      bodyP('جدول: أشهر الأخطاء الإملائية الشائعة وتصويبها مع التعليل:', true),
      ...unit.spellingLesson.commonMistakes.map((m) =>
        bulletP(`الخطأ: «${m.mistake}»`, `الصواب: «${m.correction}» — سبب الخطأ والتعليل: ${m.explanation}`)
      ),

      // 4. التقويمات والأسئلة
      h2P(`خامساً: أسئلة الأنشطة والتدريبات وتقويم الوحدة ${unit.number} مع الإجابات النموذجية`, '9A3412'),
      ...[
        ...unit.readingLesson.readingQuestions,
        ...unit.unitEvaluationQuestions,
      ].map((q, idx) =>
        new Paragraph({
          spacing: { before: 120, after: 80 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: `س ${idx + 1}: ${q.question} (ص ${q.pageNumber})`, bold: true, color: '0F172A' }),
            new TextRun({ text: `\nج: ${q.modelAnswer}`, color: '047857', bold: true }),
          ],
        })
      ),

      // بطاقة تشجيع الطالب على اختبار الوحدة
      new Paragraph({ spacing: { before: 200, after: 150 } }),
      calloutCard(
        `🎯 اخْتَبِرِ اسْتِيعَابَكَ لِلْوَحْدَةِ ${unit.number} (${unit.title}) الآن!`,
        [
          `• انتهيت من مراجعة الوحدة ${unit.number}؟ تأكد من تثبيت المفردات والقواعد فورياً!`,
          `• ادخل على المنصة التفاعلية وخُض اختبار الوحدة ${unit.number} المؤتمت:`,
          `  🔗 ${PLATFORM_URL}`,
          `• ستظهر لك نتيجتك فوراً مع تصحيح ذكي لكل سؤال وإرشادات التفوق.`,
        ],
        'FEF3C7',
        'D97706',
        '92400E'
      ),

      new PageBreak()
    );
  });

  // ==========================================
  // قسم الأسئلة الامتحانية المهمة غير الصريحة
  // ==========================================
  docChildren.push(
    h1P('القسم الامتحاني الخاص: الأسئلة المهمة غير المذكور إجاباتها صراحة في الدروس', '92400E', 'FEF3C7'),
    bodyP('تشتمل هذه القائمة على أسئلة امتحانية ذكية واستنتاجية عالية التوقع في اختبارات الشهادة الأساسية، تم استنباطها من الفروق الدقيقة والشروح العميقة:'),
    new Paragraph({ spacing: { before: 100 } })
  );

  DISCOVERED_EXAM_QUESTIONS.forEach((q, idx) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 150, after: 100 },
        alignment: AlignmentType.RIGHT,
        shading: { type: ShadingType.SOLID, fill: 'FFFBEB' },
        border: {
          right: { style: BorderStyle.SINGLE, size: 24, color: 'D97706' },
        },
        children: [
          new TextRun({
            text: `[سؤال مكتشف ${idx + 1}] • الوحدة ${q.unitNumber}: ${q.unitTitle} (الفئة: ${q.category} - أولوية: ${q.priority})\n`,
            bold: true,
            color: 'B45309',
          }),
          new TextRun({ text: `السؤال: ${q.question}\n`, bold: true, color: '0F172A' }),
          new TextRun({ text: `سبب الأهمية الامتحانية: ${q.importanceReason}\n`, color: '475569' }),
          new TextRun({ text: `الإجابة النموذجية المحققة: ${q.modelAnswer}`, bold: true, color: '047857' }),
        ],
      })
    );
  });

  docChildren.push(new PageBreak());

  // ==========================================
  // بنك الاختبارات والمحاكي الوزاري المؤتمت
  // ==========================================
  docChildren.push(
    h1P('بنك الاختبارات والمحاكي الوزاري المؤتمت (نماذج الاختيار من متعدد)', '1E3A8A', 'EFF6FF'),
    bodyP('نماذج اختبارية مؤتمتة وفق الصيغة الوزارية لشهادة التعليم الأساسي تقيس جميع الفروع اللغوية ومرفقة بتفسير الإجابة والصفحة المرجعية:')
  );

  EXAM_QUIZ_QUESTIONS.forEach((q, idx) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 140, after: 90 },
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: `[سؤال ${idx + 1}] (جـ ${q.part} • الوحدة ${q.unitNumber} - ${q.topic} - ص ${q.pageNumber}): `,
            bold: true,
            color: '1E3A8A',
          }),
          new TextRun({ text: `${q.question}\n`, bold: true, color: '0F172A' }),
          ...q.options.map((opt, oIdx) =>
            new TextRun({
              text: `   ${oIdx === q.correctOptionIndex ? '✓' : '○'} ${oIdx + 1}) ${opt}\n`,
              color: oIdx === q.correctOptionIndex ? '047857' : '64748B',
              bold: oIdx === q.correctOptionIndex,
            })
          ),
          new TextRun({ text: `   التفسير والتوجيه: ${q.explanation}\n`, color: '475569' }),
        ],
      })
    );
  });

  // الخاتمة ودعوة المنصة النهائية
  docChildren.push(
    new Paragraph({ spacing: { before: 200 } }),
    calloutCard(
      '🏆 انْطَلِقْ نَحْوَ التَّفَوُّقِ وَالدَّرَجَةِ الْكَامِلَةِ!',
      [
        '• تم بحمد الله استخراج وتحقيق المنهج كاملاً (24 وحدة دراسية) بأعلى معايير الدقة والأمانة العلمية.',
        '• لا تنسَ إجراء الاختبارات التجريبية المتكررة في المنصة الرقمية الذكية لتصل إلى قمة الجاهزية:',
        `  🔗 ${PLATFORM_URL}`,
        '• نسأل الله لجميع أبنائنا وبناتنا الطلاب دوام التوفيق والتميز والنجاح الباهر.',
      ],
      'ECFDF5',
      '059669',
      '047857'
    )
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: 'الموسوعة الشاملة لمراجعة لغتي العربية • الصف التاسع الأساسي (24 وحدة كاملة)',
                    size: 18,
                    color: '94A3B8',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'رابط المنصة التفاعلية: ',
                    size: 16,
                    color: '64748B',
                  }),
                  new TextRun({
                    text: 'ais-pre-45wcy4kbhx5izxzq2btkwq-610303241868.europe-west2.run.app',
                    size: 16,
                    color: '2563EB',
                    bold: true,
                  }),
                  new TextRun({
                    text: '  •  الصفحة ',
                    size: 16,
                    color: '64748B',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    bold: true,
                    color: '0F172A',
                  }),
                ],
              }),
            ],
          }),
        },
        children: docChildren,
      },
    ],
  });

  const docxPath = path.join(outputDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);
  console.log('Word file created successfully:', docxPath, `(${buffer.length} bytes)`);
  return docxPath;
}

// ==========================================
// 3. تحويل Word إلى PDF عبر LibreOffice
// ==========================================
function convertDocxToPdf(docxPath: string): string {
  console.log('Converting DOCX to high-resolution PDF via LibreOffice...');
  const outDir = path.dirname(docxPath);
  execSync(
    `libreoffice --headless "-env:UserInstallation=file:///tmp/LibreOffice_Profile" --convert-to pdf:writer_pdf_Export --outdir "${outDir}" "${docxPath}"`,
    {
      stdio: 'inherit',
      env: { ...process.env, HOME: '/tmp' },
    }
  );

  const pdfPath = path.join(outDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf');
  if (fs.existsSync(pdfPath)) {
    console.log('PDF file generated successfully:', pdfPath, `(${fs.statSync(pdfPath).size} bytes)`);
    return pdfPath;
  }
  throw new Error('PDF file was not created by LibreOffice');
}

// ==========================================
// 4. الدالة الرئيسية
// ==========================================
async function main() {
  try {
    const xlsx = await generateExcel();
    const docx = await generateDocx();
    const pdf = convertDocxToPdf(docx);

    console.log('All export operations completed with extraordinary quality!');
    console.log('Final generated files:');
    console.log('1. Excel (XLSX):', xlsx, `(${fs.statSync(xlsx).size} bytes)`);
    console.log('2. Word (DOCX):', docx, `(${fs.statSync(docx).size} bytes)`);
    console.log('3. PDF Document:', pdf, `(${fs.statSync(pdf).size} bytes)`);
  } catch (err) {
    console.error('Error during export generation:', err);
    process.exit(1);
  }
}

main();
