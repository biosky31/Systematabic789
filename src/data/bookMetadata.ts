export interface BookOverview {
  title: string;
  grade: string;
  part: string;
  stage: string;
  publisher: string;
  edition: string;
  yearHijri: string;
  yearGregorian: string;
  coverImageDescription: string;
  authors: {
    leader: string;
    members: string[];
    coordinator: string;
    artDirection: string;
  };
  reviewers: string[];
  approvalDate: string;
  ministerIntroduction: {
    ministerName: string;
    keyThemes: string[];
  };
  totalPagesInPDF: number;
  unitsCount: number;
  pedagogicalApproach: string;
}

export const BOOK_SERIES_OVERVIEW = {
  title: 'سِلْسِلَةُ «لُغَتِي العَرَبِيَّة» - الصَّفّ التَّاسِع الأَسَاسِيّ (الكِتَابَان الكَامِلَان: الجُزْءُ الأَوَّل وَالجُزْءُ الثَّانِي)',
  grade: 'الصَّفّ التَّاسِع مِن مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيّ',
  country: 'الجمهورية اليمنية - وزارة التربية والتعليم والبحث العلمي',
  totalUnits: 24, // 12 units in Part 1 + 12 units in Part 2
  totalPages: 354, // 176 pages in Part 1 + 178 pages in Part 2
  academicYear: 'المعتمد للعام الدراسي 1444هـ - 1447هـ / 2023م - 2026م',
  part1: {
    partNumber: 1,
    title: 'الجزء الأول',
    unitsRange: 'الوحدات 1 - 12',
    pageCount: 176,
    coverBadge: '«مَنْ أَحَبَّ الحَيَاةَ عَاشَ ذَلِيلًا»',
    coreTopics: 'الاستثناء (بإلا، غير، سوى، خلا، عدا)، أسلوب النداء، أسلوب الشرط واقتران جوابه بالفاء، أسلوب التعجب، أسلوب المدح والذم، أسلوب الإغراء والتحذير، قواعد الحذف والزيادة الإملائية.',
  },
  part2: {
    partNumber: 2,
    title: 'الجزء الثاني',
    unitsRange: 'الوحدات 13 - 24',
    pageCount: 178,
    coverBadge: 'جامع الشعب والمولد النبوي الشريف بصنعاء',
    coreTopics: 'المجرد والمزيد، الجامد والمشتق، الميزان الصرفي، مصادر الثلاثي والرباعي والخماسي والسداسي، المعاجم، اسم الفاعل وصيغ المبالغة، اسم المفعول، اسم التفضيل، اسما الزمان والمكان، الألف اللينة والهمزات وعلامات الترقيم.',
  },
};

export const BOOK_METADATA_PART1: BookOverview = {
  title: 'لُغَتِي العَرَبِيَّة',
  grade: 'الصَّفّ التَّاسِع',
  part: 'الجُزْء الأَوَّل',
  stage: 'مَرْحَلَة التَّعْلِيمِ الأَسَاسِيّ',
  publisher: 'الجمهورية اليمنية - وزارة التربية والتعليم والبحث العلمي - قطاع المناهج وتخطيط التعليم - الإدارة العامة للمناهج',
  edition: 'طبعة معتمدة 1447هـ - 2026م',
  yearHijri: '1447 هـ',
  yearGregorian: '2026 م',
  coverImageDescription: 'فارس عربي يماني ممتطٍ جواداً حاملاً راية خضراء كُتب عليها مقولة الإمام زيد بن علي الخالدة: «مَنْ أَحَبَّ الحَيَاةَ عَاشَ ذَلِيلًا»، ويعلوه شعار الطير الجمهوري لليمن ووزارة التربية والتعليم.',
  authors: {
    leader: 'فريق التطوير والإعداد للمناهج بوزارة التربية والتعليم',
    members: [
      'نخبة من خبراء المناهج واللغة العربية',
      'موجهو اللغة العربية للتعليم الأساسي',
    ],
    coordinator: 'الإدارة العامة للمناهج وتخطيط التعليم',
    artDirection: 'الإخراج الفني والتربوي - قطاع المناهج',
  },
  reviewers: [
    'اللجنة العليا للمناهج بالجمهورية اليمنية',
    'فريق التحكيم اللغوي والتربوي لمرحلة التعليم الأساسي',
  ],
  approvalDate: 'أقرت اللجنة العليا للمناهج هذا الكتاب يوم الأربعاء 9 / 11 / 1443هـ الموافق 8 / 6 / 2022م',
  ministerIntroduction: {
    ministerName: 'وزارة التربية والتعليم والبحث العلمي - الإدارة العامة للمناهج',
    keyThemes: [
      'تطوير وتجويد العملية التعليمية بإرساء قواعد منظومة متكاملة تلبي احتياجات البيئة اليمنية وتتناسب مع هويتها الإيمانية.',
      'العناية بالمتعلم باعتباره محور العملية التعليمية وإكسابه مهارات التعلم الذاتي والتعلم التعاوني.',
      'اعتماد المدخل التكاملي في بناء المنهج رأسياً وأفقياً لربط فروع اللغة العربية ببعضها وسائر المواد.',
      'تغطية مجالات: القرآن كتاب هداية، الغزو الفكري، القيم الإنسانية، المفاهيم الزراعية، الفخر والاعتزاز، والقيم الإيمانية والأعلام والعلوم.',
    ],
  },
  totalPagesInPDF: 176,
  unitsCount: 12,
  pedagogicalApproach: 'المدخل التكاملي في تعليم فروع اللغة العربية (القراءة والنصوص، النحو والصرف، الإملاء، الخط، التعبير الشفهي والكتابي، والأنشطة والتقويمات) كنواة معرفية واحدة متجانسة.',
};

export const BOOK_METADATA_PART2: BookOverview = {
  title: 'لُغَتِي العَرَبِيَّة',
  grade: 'الصَّفّ التَّاسِع',
  part: 'الجُزْء الثَّانِي',
  stage: 'مَرْحَلَة التَّعْلِيمِ الأَسَاسِيّ',
  publisher: 'الجمهورية اليمنية - وزارة التربية والتعليم - قطاع المناهج والتوجيه - الإدارة العامة للمناهج',
  edition: 'طبعة تجريبية 1444هـ - 2023م',
  yearHijri: '1444 هـ',
  yearGregorian: '2023 م',
  coverImageDescription: 'صورة الواجهة الأمامية لجامع الشعب / الصالح في العاصمة صنعاء محاطاً بحشود ذكرى المولد النبوي الشريف والأعلام الخضراء والبيضاء، ويعلوه شعار وزارة التربية وشعار الجمهورية اليمنية.',
  authors: {
    leader: 'د. ضيف الله حسين الدُّرَيْب (رئيسًا)',
    members: [
      'أ.د. عبد الله علي الكوري (عضوًا)',
      'أ. بلقيس محمد الحيمي (عضوًا)',
      'أ. فايز منصور شاطر (عضوًا)',
      'أ. عبد اللطيف عبده المطري (عضوًا)',
    ],
    coordinator: 'أ. قاسم علي الصغير (عضوًا ومنسقًا)',
    artDirection: 'عابد عبد الله سالم عزان',
  },
  reviewers: [
    'د. خالد عبده الجميلي',
    'د. خالد فتح الله الحوصلي',
    'د. أمة الباري محمد اللاحمزي',
    'أ. علي محمد الصائغ',
  ],
  approvalDate: 'أقرّت اللجنة العليا للمناهج هذا الكتاب يوم الأربعاء 9 / 11 / 1443هـ الموافق 8 / 6 / 2022م',
  ministerIntroduction: {
    ministerName: 'أ. يحيى بدر الدين الحوثي (وزير التربية والتعليم - رئيس اللجنة العليا للمناهج)',
    keyThemes: [
      'بناء الشخصية السليمة المتسقة مع الهوية الإيمانية والأهداف التربوية المنبثقة من الثقافة الإسلامية والواقع اليمني.',
      'مراعاة الفروق الفردية وربط المادة الدراسية ببيئة المتعلم الحقيقية.',
      'تكامل الأدوار بين المعلم، والمتعلم، والأسرة، ومؤسسات المجتمع.',
    ],
  },
  totalPagesInPDF: 178,
  unitsCount: 12,
  pedagogicalApproach: 'الأسلوب التكاملي الصرفي والنحوي المتقدم واستكمال دراسة المشتقات والمصادر والمعاجم اللغوية وتطبيقات الإملاء.',
};

export const BOOK_METADATA = BOOK_METADATA_PART1;

export interface TableOfContentsItem {
  unitNumber: number;
  part: 1 | 2;
  unitTitle: string;
  readingLesson: { title: string; pages: string; type: string };
  grammarLesson: { title: string; pages: string };
  spellingLesson: { title: string; pages: string };
  evaluationPages: string;
  totalPageRange: string;
}

export const TABLE_OF_CONTENTS: TableOfContentsItem[] = [
  // --- الجزء الأول (الوحدات 1 - 12) ---
  {
    unitNumber: 1,
    part: 1,
    unitTitle: 'القُرْآنُ كِتَابُ هِدَايَةٍ',
    readingLesson: { title: 'عِبَادُ الرَّحْمَنِ (الفرقان: 63 - 77)', pages: '9 - 14', type: 'قرآن كريم / نصوص وتذوق' },
    grammarLesson: { title: 'النحو والصرف: تطبيقات عامة لما سبقت دراسته', pages: '15 - 16' },
    spellingLesson: { title: 'الإملاء: تطبيقات إملائية عامة', pages: '17 - 18' },
    evaluationPages: '19',
    totalPageRange: '9 - 19',
  },
  {
    unitNumber: 2,
    part: 1,
    unitTitle: 'الغَزْوُ الفِكْرِيُّ',
    readingLesson: { title: 'الحَرْبُ النَّاعِمَةُ', pages: '20 - 24', type: 'نثر / مقال فكري وتوعوي' },
    grammarLesson: { title: 'النحو والصرف: المُسْتَثْنَى بِـ (إِلَّا)', pages: '24 - 30' },
    spellingLesson: { title: 'الإملاء: الحَذْفُ فِي أَوَّلِ الكَلِمَةِ', pages: '31 - 33' },
    evaluationPages: '34',
    totalPageRange: '20 - 34',
  },
  {
    unitNumber: 3,
    part: 1,
    unitTitle: 'قِيَمٌ إِنْسَانِيَّةٌ',
    readingLesson: { title: 'مِنْ عَهْدِ الإِمَامِ عَلِيٍّ لِمَالِكٍ الأَشْتَرِ', pages: '35 - 40', type: 'نثر / وثيقة سياسية وأدبية' },
    grammarLesson: { title: 'النحو والصرف: المُسْتَثْنَى بِـ (غَيْر وَسِوَى وَخَلَا وَعَدَا)', pages: '41 - 46' },
    spellingLesson: { title: 'الإملاء: تطبيقات على الحذف في أول الكلمة', pages: '47 - 48' },
    evaluationPages: '49',
    totalPageRange: '35 - 49',
  },
  {
    unitNumber: 4,
    part: 1,
    unitTitle: 'مَفَاهِيمُ زِرَاعِيَّةٌ',
    readingLesson: { title: 'المَحَاصِيلُ الزِّرَاعِيَّةُ فِي اليَمَنِ', pages: '50 - 54', type: 'نثر / مقال علمي واقتصادي' },
    grammarLesson: { title: 'النحو والصرف: أُسْلُوبُ النِّدَاءِ', pages: '55 - 60' },
    spellingLesson: { title: 'الإملاء: الحَذْفُ وَسَطَ الكَلِمَةِ', pages: '61 - 62' },
    evaluationPages: '63 - 64',
    totalPageRange: '50 - 64',
  },
  {
    unitNumber: 5,
    part: 1,
    unitTitle: 'فَخْرٌ وَاعْتِزَازٌ',
    readingLesson: { title: 'رُمْنَا الفَخَار (للشاعر الحسن بن علي الهبل)', pages: '65 - 71', type: 'شعر / فخر وحماسة وطنية' },
    grammarLesson: { title: 'النحو والصرف: تطبيقات على ما سبقت دراسته', pages: '72 - 74' },
    spellingLesson: { title: 'الإملاء: تطبيقات إملائية', pages: '74 - 75' },
    evaluationPages: '76 - 77',
    totalPageRange: '65 - 77',
  },
  {
    unitNumber: 6,
    part: 1,
    unitTitle: 'قِيَمٌ إِيمَانِيَّةٌ',
    readingLesson: { title: 'فَضْلُ الجِهَادِ فِي سَبِيلِ اللَّهِ', pages: '78 - 84', type: 'حديث شريف / نصوص وتذوق' },
    grammarLesson: { title: 'النحو والصرف: أُسْلُوبُ الشَّرْطِ', pages: '84 - 90' },
    spellingLesson: { title: 'الإملاء: الحَذْفُ فِي آخِرِ الكَلِمَةِ', pages: '91 - 95' },
    evaluationPages: '96',
    totalPageRange: '78 - 96',
  },
  {
    unitNumber: 7,
    part: 1,
    unitTitle: 'أَعْلَامٌ جِهَادِيَّةٌ',
    readingLesson: { title: 'الإِمَامُ الثَّائِرُ (زَيْدُ بْنُ عَلِيٍّ عَلَيْهِ السَّلَامُ)', pages: '97 - 101', type: 'سيرة وتراجم تاريخية' },
    grammarLesson: { title: 'النحو والصرف: اقْتِرَانُ جَوَابِ الشَّرْطِ بِالفَاءِ', pages: '102 - 106' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '106' },
    evaluationPages: '108 - 109',
    totalPageRange: '97 - 109',
  },
  {
    unitNumber: 8,
    part: 1,
    unitTitle: 'شَخْصِيَّاتٌ إِسْلَامِيَّةٌ',
    readingLesson: { title: 'الإِمَامُ الشَّافِعِيُّ', pages: '110 - 114', type: 'سيرة وتراجم إسلامية ولغوية' },
    grammarLesson: { title: 'النحو والصرف: تَطْبِيقَاتٌ نَحْوِيَّةٌ', pages: '115 - 116' },
    spellingLesson: { title: 'الإملاء: زِيَادَةُ الأَلِفِ وَالوَاوِ', pages: '117 - 121' },
    evaluationPages: '122 - 123',
    totalPageRange: '110 - 123',
  },
  {
    unitNumber: 9,
    part: 1,
    unitTitle: 'عُلُومٌ وَتِكْنُولُوجِيَا',
    readingLesson: { title: 'ثَوْرَةُ المَعْلُومَاتِ', pages: '124 - 128', type: 'نثر / مقال علمي وتكنولوجي' },
    grammarLesson: { title: 'النحو والصرف: أُسْلُوبُ التَّعَجُّبِ', pages: '129 - 135' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '136' },
    evaluationPages: '137',
    totalPageRange: '124 - 137',
  },
  {
    unitNumber: 10,
    part: 1,
    unitTitle: 'مِنْ ذَاكِرَةِ التَّارِيخِ',
    readingLesson: { title: 'دِمَاءُ الحَجِيجِ (مجزرة تنومة 1341هـ)', pages: '138 - 141', type: 'نثر / وثائقي تاريخي' },
    grammarLesson: { title: 'النحو والصرف: أُسْلُوبُ المَدْحِ وَالذَّمِّ', pages: '142 - 147' },
    spellingLesson: { title: 'الإملاء: تَطْبِيقَاتٌ عَلَى وَصْلِ «مَا» بِمَا قَبْلَهَا', pages: '148 - 149' },
    evaluationPages: '150 - 151',
    totalPageRange: '138 - 151',
  },
  {
    unitNumber: 11,
    part: 1,
    unitTitle: 'مِهَنٌ وَأَعْمَالٌ',
    readingLesson: { title: 'فِي سَبِيلِ التَّعْلِيمِ (للشاعر أحمد الشامي)', pages: '152 - 157', type: 'شعر / ديوان الشعر اليمني' },
    grammarLesson: { title: 'النحو والصرف: أُسْلُوبُ الإِغْرَاءِ وَالتَّحْذِيرِ', pages: '158 - 162' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '162 - 163' },
    evaluationPages: '165 - 166',
    totalPageRange: '152 - 166',
  },
  {
    unitNumber: 12,
    part: 1,
    unitTitle: 'جَمَالُ اللُّغَةِ العَرَبِيَّةِ',
    readingLesson: { title: 'اللُّغَةُ الخَالِدَةُ', pages: '167 - 171', type: 'نثر / مقال لغوي وحضاري' },
    grammarLesson: { title: 'النحو والصرف: تَطْبِيقَاتٌ عَامَّةٌ عَلَى مَا سَبَقَ', pages: '172 - 173' },
    spellingLesson: { title: 'الإملاء: تَطْبِيقَاتٌ إِمْلائِيَّةٌ شَامِلَةٌ', pages: '173 - 174' },
    evaluationPages: '175',
    totalPageRange: '167 - 176',
  },

  // --- الجزء الثاني (الوحدات 13 - 24) ---
  {
    unitNumber: 13,
    part: 2,
    unitTitle: 'الهُوِيَّة الإِيمَانِيَّة',
    readingLesson: { title: 'الرَّقَابَةُ الإِلَهِيَّة', pages: '8 - 13', type: 'نثر / فكري وديني' },
    grammarLesson: { title: 'النحو والصرف: المُجَرَّدُ وَالمَزِيدُ', pages: '14 - 19' },
    spellingLesson: { title: 'الإملاء: تطبيقات على همزتي الوصل والقطع', pages: '20 - 21' },
    evaluationPages: '23 - 25',
    totalPageRange: '8 - 25',
  },
  {
    unitNumber: 14,
    part: 2,
    unitTitle: 'مَعَ الرَّسُولِ وَالرِّسَالَةِ',
    readingLesson: { title: 'ثَقَافَةُ الِاتِّبَاعِ', pages: '26 - 31', type: 'نثر / توعوي ورسالي' },
    grammarLesson: { title: 'النحو والصرف: الجَامِدُ وَالمُشْتَقُّ', pages: '32 - 34' },
    spellingLesson: { title: 'الإملاء: تطبيقات على الهمزة المتوسطة', pages: '35' },
    evaluationPages: '37 - 38',
    totalPageRange: '26 - 38',
  },
  {
    unitNumber: 15,
    part: 2,
    unitTitle: 'الصِّنَاعَةُ',
    readingLesson: { title: 'صِنَاعَةُ الأَدْوِيَةِ', pages: '39 - 43', type: 'نثر / علمي وحضاري' },
    grammarLesson: { title: 'النحو والصرف: المِيزَانُ الصَّرْفِيُّ', pages: '44 - 48' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '49' },
    evaluationPages: '50',
    totalPageRange: '39 - 50',
  },
  {
    unitNumber: 16,
    part: 2,
    unitTitle: 'قِيَمٌ أَخْلاقِيَّةٌ',
    readingLesson: { title: 'النَّخْلَةُ الحَمْقَاءُ (للشاعر إيليا أبو ماضي)', pages: '51 - 58', type: 'شعر / رمزي قيمي' },
    grammarLesson: { title: 'النحو والصرف: مَصَادِرُ الأَفْعَالِ الثُّلَاثِيَّةِ وَالرُّبَاعِيَّةِ', pages: '59 - 64' },
    spellingLesson: { title: 'الإملاء: تطبيقات على الألف اللينة في الأسماء', pages: '65' },
    evaluationPages: '68',
    totalPageRange: '51 - 68',
  },
  {
    unitNumber: 17,
    part: 2,
    unitTitle: 'قِيَمٌ اجْتِمَاعِيَّةٌ',
    readingLesson: { title: 'التَّوَاضُعُ', pages: '69 - 74', type: 'نثر / أدبي وتربوي' },
    grammarLesson: { title: 'النحو والصرف: تطبيقات على ما سبقت دراسته', pages: '75 - 76' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '76' },
    evaluationPages: '78 - 79',
    totalPageRange: '69 - 79',
  },
  {
    unitNumber: 18,
    part: 2,
    unitTitle: 'مُدُنٌ أَثَرِيَّةٌ',
    readingLesson: { title: 'مَدِينَةُ بَرَاقِش', pages: '80 - 84', type: 'نثر / تاريخي وآثاري يمني' },
    grammarLesson: { title: 'النحو والصرف: مَصَادِرُ الأَفْعَالِ الخُمَاسِيَّةِ وَالسُّدَاسِيَّةِ', pages: '85 - 88' },
    spellingLesson: { title: 'الإملاء: تطبيقات على الألف اللينة في الأفعال', pages: '89' },
    evaluationPages: '91 - 92',
    totalPageRange: '80 - 92',
  },
  {
    unitNumber: 19,
    part: 2,
    unitTitle: 'فُنُونٌ تُرَاثِيَّةٌ',
    readingLesson: { title: 'زَخْرَفَةُ المَسَاجِدِ', pages: '93 - 98', type: 'نثر / فن معماري وتراثي يمني' },
    grammarLesson: { title: 'النحو والصرف: الكَشْفُ فِي المَعَاجِمِ', pages: '99 - 103' },
    spellingLesson: { title: 'الإملاء: إملاء اختباري وتطبيقات', pages: '104' },
    evaluationPages: '106',
    totalPageRange: '93 - 106',
  },
  {
    unitNumber: 20,
    part: 2,
    unitTitle: 'شَخْصِيَّاتٌ خَالِدَةٌ',
    readingLesson: { title: 'سَيِّدُ التَّابِعِينَ (أُوَيْس القَرَنِيّ)', pages: '107 - 112', type: 'سيرة وتراجم إسلامية ويمنية' },
    grammarLesson: { title: 'النحو والصرف: اسْمُ الفَاعِلِ وَصِيَغُ المُبَالَغَةِ', pages: '113 - 116' },
    spellingLesson: { title: 'الإملاء: تطبيقات على الحذف (الألف - الواو - الياء)', pages: '117' },
    evaluationPages: '119 - 120',
    totalPageRange: '107 - 120',
  },
  {
    unitNumber: 21,
    part: 2,
    unitTitle: 'أَحْدَاثٌ وَمُنَاسَبَاتٌ',
    readingLesson: { title: 'المَوْلِدُ النَّبَوِيُّ (للشاعر أحمد شوقي)', pages: '121 - 127', type: 'شعر / ديوان الشوقيات' },
    grammarLesson: { title: 'النحو والصرف: اسْمُ المَفْعُولِ', pages: '128 - 130' },
    spellingLesson: { title: 'الإملاء: تطبيقات على زيادة بعض الحروف', pages: '131' },
    evaluationPages: '133',
    totalPageRange: '121 - 133',
  },
  {
    unitNumber: 22,
    part: 2,
    unitTitle: 'قَضَايَا مُعَاصِرَةٌ',
    readingLesson: { title: 'الصُّمُودُ الأُسْطُورِيُّ', pages: '134 - 143', type: 'نثر / وثائقي ووطني معاصر' },
    grammarLesson: { title: 'النحو والصرف: اسْمُ التَّفْضِيلِ', pages: '143 - 147' },
    spellingLesson: { title: 'الإملاء: تطبيقات على علامات الترقيم', pages: '148' },
    evaluationPages: '150',
    totalPageRange: '134 - 150',
  },
  {
    unitNumber: 23,
    part: 2,
    unitTitle: 'مِنْ مَخْلُوقَاتِ اللهِ فِي الكَوْنِ',
    readingLesson: { title: 'الفَضَاءُ الخَارِجِيُّ', pages: '151 - 156', type: 'نثر / علمي كوني وإيماني' },
    grammarLesson: { title: 'النحو والصرف: اسْمَا الزَّمَانِ وَالمَكَانِ', pages: '156 - 160' },
    spellingLesson: { title: 'الإملاء: تطبيقات على المد والتنوين', pages: '161' },
    evaluationPages: '163 - 164',
    totalPageRange: '151 - 164',
  },
  {
    unitNumber: 24,
    part: 2,
    unitTitle: 'نَوَادِرُ وَفُكَاهَاتٌ',
    readingLesson: { title: 'طَرَائِفُ عَرَبِيَّةٌ (أربع طرائف تراثية)', pages: '165 - 169', type: 'أدب الطرائف والنوادر' },
    grammarLesson: { title: 'النحو والصرف: تطبيقات شاملة على المشتقات والمصادر', pages: '169 - 170' },
    spellingLesson: { title: 'الإملاء: تطبيقات شاملة على الهمزات والألف والزيادة', pages: '171' },
    evaluationPages: '173 - 174',
    totalPageRange: '165 - 174',
  },
];
