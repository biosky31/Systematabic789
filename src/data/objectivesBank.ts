export interface BehavioralObjective {
  code: string;
  type: 'معرفي' | 'مهاري' | 'وجداني';
  objective: string;
  verificationIndicator: string;
}

export interface DomainObjectives {
  domainName: string;
  domainCode: 'QR' | 'NT' | 'NH' | 'IM' | 'KH' | 'TA';
  objectives: BehavioralObjective[];
}

export interface GradeObjectivesBank {
  gradeKey: 'grade7' | 'grade8' | 'grade9';
  gradeTitle: string;
  domains: {
    readingAndComprehension: DomainObjectives;
    literaryTexts: DomainObjectives;
    grammarAndStructures: DomainObjectives;
    spellingAndCalligraphy: DomainObjectives;
    expressionAndCommunication: DomainObjectives;
  };
}

export interface TeachingStrategy {
  code: string;
  name: string;
  usageMethod: string;
  suitedForNoSmartBoard: boolean;
  notes?: string;
}

export const TEACHING_STRATEGIES_BANK: TeachingStrategy[] = [
  {
    code: 'ST-01',
    name: 'استكشاف العنوان',
    usageMethod: 'سؤال الطلاب عن دلالة العنوان وتوقع مضمون النص قبل القراءة، وكتابة التوقعات على جانب السبورة القلمية.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-02',
    name: 'المفردة في سياقها',
    usageMethod: 'عرض الجملة من الكتاب أو بطاقة ورقية، وطلب تفسير الكلمة، ثم اختبار التفسير باستبدالها بمرادف سياقي مناسب.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-03',
    name: 'شاهدك من النص',
    usageMethod: 'لا تُقبل الإجابة الاستنتاجية حتى يشير الطالب إلى قرينة لفظية أو سطر محدد في الكتاب يدعمها.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-04',
    name: 'القراءة المتدرجة',
    usageMethod: 'قراءة جهرية نموذجية من المعلم، ثم قراءة زمرية جماعية من الطلاب المتقنين، ثم قراءات فردية متتابعة مع تصويب فوري للأخطاء.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-05',
    name: 'التلخيص المتدرج',
    usageMethod: 'تلخيص فقرة واحدة في جملة مفتاحية، ثم جمع الأفكار الرئيسة على السبورة القلمية، ثم صياغة الملخص الكلي في الدفاتر.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-06',
    name: 'العبارة الأجمل',
    usageMethod: 'يختار كل طالب أو مجموعة بيتًا شعريًا أو عبارة أدبية ويشرح سبب إعجابه بها وجمال التصوير فيها.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-07',
    name: 'اكتشاف الخطأ',
    usageMethod: 'كتابة جملة على السبورة القلمية تتضمن خطأ نحويًا أو إملائيًا شائعًا ومطالبة الطلاب باكتشافه وتصويبه مع التعليل.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-08',
    name: 'المقارنة الثنائية',
    usageMethod: 'رسم جدول عمودين على السبورة القلمية لمقارنة كلمتين أو تركيبين نحويين أو فكرتين لاستخراج أوجه الاتفاق والاختلاف.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-09',
    name: 'التفسير قبل القاعدة',
    usageMethod: 'عرض شواهد وأمثلة واقعية على السبورة القلمية وملاحظة حركة الأواخر أو بنية الكلمة أولًا، ثم استنباط القاعدة بمشاركة الطلاب.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-10',
    name: 'القاعدة في الاستعمال',
    usageMethod: 'مطالبة الطالب بتوظيف القاعدة النحوية أو الإملائية فورًا في جملة من إنشائه بدل الاكتفاء بحفظ التعريف المجرد.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-11',
    name: 'استدعاء سريع (الافتتاحية)',
    usageMethod: 'طرح سؤالين أو ثلاثة سريعة على السبورة القلمية في بداية الحصة لمدة 3 دقائق لاسترجاع معارف الدرس السابق وربطه بالجديد.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-12',
    name: 'مراجعة الدفتر وتصويب الأقران',
    usageMethod: 'اختيار خطأ إملائي أو نحوي متكرر في كراسات الطلاب وتدريبهم جماعيًا على اكتشافه ذاتيًا وتعديله.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-13',
    name: 'التعلم من الزميل (فكر-زاوج-شارك)',
    usageMethod: 'يفكر الطالب بمفرده، ثم يناقش زميله في المقعد نفسه للوصول لإجابة مشتركة، ثم مشاركة الإجابة مع الفصل.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-14',
    name: 'مثال من الحياة والبيئة اليمنية',
    usageMethod: 'ربط المعنى القرائي أو الشاهد النحوي بموقف أو عادات أو بيئة زراعية أو تاريخية مألوفة للطلاب في واقعهم المعاش.',
    suitedForNoSmartBoard: true,
  },
  {
    code: 'ST-15',
    name: 'بطاقة الخروج (دقيقة التقييم)',
    usageMethod: 'يكتب الطالب على قصاصة ورقية صغيرة قبل نهاية الحصة معلومة جديدة استوعبها وسؤالاً واحدًا لا يزال بحاجة لتوضيح.',
    suitedForNoSmartBoard: true,
  },
];

export const GRADE_7_OBJECTIVES_BANK: GradeObjectivesBank = {
  gradeKey: 'grade7',
  gradeTitle: 'الصف السابع الأساسي',
  domains: {
    readingAndComprehension: {
      domainName: 'القراءة والفهم والاستيعاب',
      domainCode: 'QR',
      objectives: [
        { code: '7-QR-01', type: 'معرفي', objective: 'أن يفسر الطالب المفردات الجديدة بالاستعانة بسياقها في النص.', verificationIndicator: 'يشرح معنى الكلمة في جملة النص.' },
        { code: '7-QR-02', type: 'معرفي', objective: 'أن يميز الطالب بين معنى الكلمة ومرادفها التقريبي.', verificationIndicator: 'يوضح المعنى ثم يذكر مرادفًا مناسبًا.' },
        { code: '7-QR-03', type: 'مهاري', objective: 'أن يقرأ الطالب النص قراءة صحيحة مع ضبط أواخر الكلمات بحسب ما تعلمه.', verificationIndicator: 'تقل أخطاؤه في النطق والضبط.' },
        { code: '7-QR-04', type: 'مهاري', objective: 'أن يراعي الطالب علامات الترقيم أثناء القراءة الجهرية.', verificationIndicator: 'يقف عند مواضع الوقف المناسبة.' },
        { code: '7-QR-05', type: 'معرفي', objective: 'أن يستخرج الطالب الفكرة العامة للنص.', verificationIndicator: 'يصوغ الفكرة في جملة واضحة.' },
        { code: '7-QR-06', type: 'معرفي', objective: 'أن يحدد الطالب الأفكار الرئيسة في النص.', verificationIndicator: 'يربط كل فقرة بفكرتها الأساسية.' },
        { code: '7-QR-07', type: 'مهاري', objective: 'أن يلخص الطالب نصًا قصيرًا بلغته.', verificationIndicator: 'يقدم ملخصًا يحفظ المعنى الأساسي دون نسخ النص كاملًا.' },
        { code: '7-QR-08', type: 'وجداني', objective: 'أن يبدي الطالب اهتمامًا بموضوع النص وصلته بحياته.', verificationIndicator: 'يذكر موقفًا حياتيًا يرتبط بفكرة النص.' },
        { code: '7-QR-09', type: 'معرفي', objective: 'أن يستنتج الطالب معنى مباشرًا من القرائن اللفظية.', verificationIndicator: 'يستدل من النص على إجابته.' },
        { code: '7-QR-10', type: 'مهاري', objective: 'أن يجيب الطالب عن أسئلة الفهم إجابات مكتملة.', verificationIndicator: 'يقدم إجابة واضحة مرتبطة بالسؤال.' },
      ],
    },
    literaryTexts: {
      domainName: 'النصوص الأدبية وتذوقها',
      domainCode: 'NT',
      objectives: [
        { code: '7-NT-01', type: 'معرفي', objective: 'أن يشرح الطالب المعنى الإجمالي لبيت شعري أو عبارة أدبية.', verificationIndicator: 'يعيد المعنى بأسلوبه.' },
        { code: '7-NT-02', type: 'وجداني', objective: 'أن يحدد الطالب بيتًا أو عبارة أعجبته ويبين سبب إعجابه.', verificationIndicator: 'يختار العبارة ويعلل اختياره.' },
        { code: '7-NT-03', type: 'مهاري', objective: 'أن يلقي الطالب أبياتًا أو عبارات مختارة إلقاءً معبرًا.', verificationIndicator: 'يوظف نبرة الصوت والوقف المناسب.' },
        { code: '7-NT-04', type: 'معرفي', objective: 'أن يميز الطالب بين المعنى الحقيقي والتصوير البلاغي في أمثلة مناسبة لمستواه.', verificationIndicator: 'يشرح الصورة شرحًا مبسطًا.' },
        { code: '7-NT-05', type: 'مهاري', objective: 'أن يحفظ الطالب النص المحدد حفظًا سليمًا.', verificationIndicator: 'يستظهر النص دون حذف أو تغيير مؤثر.' },
        { code: '7-NT-06', type: 'معرفي', objective: 'أن يربط الطالب عنوان النص بموضوعه.', verificationIndicator: 'يعلل مناسبة العنوان لمضمون النص.' },
        { code: '7-NT-07', type: 'وجداني', objective: 'أن يعبر الطالب عن استجابته الجمالية للنص.', verificationIndicator: 'يذكر لفظًا أو صورة أو معنى أثّر فيه.' },
      ],
    },
    grammarAndStructures: {
      domainName: 'النحو والتراكيب والإعراب',
      domainCode: 'NH',
      objectives: [
        { code: '7-NH-01', type: 'معرفي', objective: 'أن يميز الطالب بين الاسم والفعل والحرف في أمثلة متنوعة.', verificationIndicator: 'يصنف الكلمات تصنيفًا صحيحًا.' },
        { code: '7-NH-02', type: 'معرفي', objective: 'أن يحدد الطالب أركان الجملة الاسمية الأساسية.', verificationIndicator: 'يحدد المبتدأ والخبر في أمثلة مناسبة.' },
        { code: '7-NH-03', type: 'معرفي', objective: 'أن يحدد الطالب الفعل والفاعل في الجملة الفعلية.', verificationIndicator: 'يستخرج الفعل والفاعل بصورة صحيحة.' },
        { code: '7-NH-04', type: 'مهاري', objective: 'أن يضبط الطالب أواخر الكلمات في التراكيب المدروسة.', verificationIndicator: 'يختار الحركة المناسبة وفق القاعدة.' },
        { code: '7-NH-05', type: 'معرفي', objective: 'أن يميز الطالب بين المفرد والمثنى والجمع.', verificationIndicator: 'يصنف الأسماء بحسب العدد.' },
        { code: '7-NH-06', type: 'مهاري', objective: 'أن يوظف الطالب القاعدة النحوية في جمل من إنشائه.', verificationIndicator: 'يكتب جملًا سليمة وفق القاعدة.' },
        { code: '7-NH-07', type: 'معرفي', objective: 'أن يحدد الطالب علامات الترقيم المناسبة في جمل قصيرة.', verificationIndicator: 'يضع العلامة المناسبة للسياق.' },
      ],
    },
    spellingAndCalligraphy: {
      domainName: 'الإملاء والرسم والخط العربي',
      domainCode: 'IM',
      objectives: [
        { code: '7-IM-01', type: 'معرفي', objective: 'أن يميز الطالب بين همزتي الوصل والقطع في الكلمات المقررة.', verificationIndicator: 'يصنف الكلمات ويعلل اختياره في الأمثلة المدروسة.' },
        { code: '7-IM-02', type: 'مهاري', objective: 'أن يكتب الطالب الكلمات المشتملة على همزات كتابة صحيحة.', verificationIndicator: 'يقل عدد أخطاء الهمزة في كتابته.' },
        { code: '7-IM-03', type: 'معرفي', objective: 'أن يميز الطالب بين التاء المربوطة والهاء في أواخر الكلمات.', verificationIndicator: 'يحدد الرسم الصحيح في أمثلة متنوعة.' },
        { code: '7-IM-04', type: 'مهاري', objective: 'أن يكتب الطالب فقرة قصيرة مع مراعاة القواعد الإملائية التي درسها.', verificationIndicator: 'يكتب فقرة بأخطاء إملائية محدودة.' },
        { code: '7-KH-01', type: 'مهاري', objective: 'أن يكتب الطالب الحروف والكلمات بخط واضح ومقروء.', verificationIndicator: 'تتضح الحروف وتتمايز الكلمات.' },
        { code: '7-KH-02', type: 'مهاري', objective: 'أن يلتزم الطالب بالسطر والمسافات المناسبة بين الكلمات.', verificationIndicator: 'ينتظم النص في الدفتر.' },
      ],
    },
    expressionAndCommunication: {
      domainName: 'التعبير الكتابي والشفهي والتواصل',
      domainCode: 'TA',
      objectives: [
        { code: '7-TA-01', type: 'مهاري', objective: 'أن يكتب الطالب فقرة مترابطة حول موضوع مألوف.', verificationIndicator: 'تتضمن الفقرة فكرة واضحة وجملًا مترابطة.' },
        { code: '7-TA-02', type: 'مهاري', objective: 'أن يرتب الطالب أفكاره قبل الكتابة.', verificationIndicator: 'يقدم الأفكار بتسلسل مفهوم.' },
        { code: '7-TA-03', type: 'مهاري', objective: 'أن يستخدم الطالب مفردات مناسبة لموضوع التعبير.', verificationIndicator: 'يوظف مفردات دقيقة وغير مكررة قدر الإمكان.' },
        { code: '7-TA-04', type: 'مهاري', objective: 'أن يعبر الطالب شفهيًا عن رأيه في موضوع قريب من حياته.', verificationIndicator: 'يقدم رأيًا واضحًا مع سبب مناسب.' },
        { code: '7-TA-05', type: 'وجداني', objective: 'أن يحترم الطالب آراء زملائه أثناء المناقشة.', verificationIndicator: 'يستمع دون مقاطعة ويستجيب بأدب.' },
      ],
    },
  },
};

export const GRADE_8_OBJECTIVES_BANK: GradeObjectivesBank = {
  gradeKey: 'grade8',
  gradeTitle: 'الصف الثامن الأساسي',
  domains: {
    readingAndComprehension: {
      domainName: 'القراءة والفهم والاستيعاب',
      domainCode: 'QR',
      objectives: [
        { code: '8-QR-01', type: 'معرفي', objective: 'أن يفسر الطالب المفردات في سياقات متعددة.', verificationIndicator: 'يحدد المعنى المناسب للسياق لا للكلمة منفردة فقط.' },
        { code: '8-QR-02', type: 'معرفي', objective: 'أن يميز الطالب بين المعنى المعجمي والمعنى المقصود في السياق.', verificationIndicator: 'يوضح كيف أسهم السياق في تحديد المعنى.' },
        { code: '8-QR-03', type: 'مهاري', objective: 'أن يقرأ الطالب نصًا قراءة جهرية سليمة ومعبرة.', verificationIndicator: 'يراعي سلامة النطق والوقف ونبرة الصوت.' },
        { code: '8-QR-04', type: 'معرفي', objective: 'أن يستنتج الطالب الفكرة التي تدعمها شواهد النص.', verificationIndicator: 'يربط الاستنتاج بعبارة أو دليل من النص.' },
        { code: '8-QR-05', type: 'معرفي', objective: 'أن يميز الطالب بين الفكرة الرئيسة والتفاصيل الداعمة.', verificationIndicator: 'يصنف الجمل وفق وظيفتها في النص.' },
        { code: '8-QR-06', type: 'مهاري', objective: 'أن يلخص الطالب نصًا مع الحفاظ على أفكاره الأساسية.', verificationIndicator: 'يحذف التفاصيل الثانوية دون الإخلال بالمعنى.' },
        { code: '8-QR-07', type: 'معرفي', objective: 'أن يستنتج الطالب هدف الكاتب من عرض موضوعه.', verificationIndicator: 'يحدد الغرض مستندًا إلى مضمون النص.' },
        { code: '8-QR-08', type: 'مهاري', objective: 'أن يطرح الطالب سؤالًا مناسبًا حول فكرة أو معلومة في النص.', verificationIndicator: 'يصوغ سؤالًا واضحًا يرتبط بالمحتوى.' },
        { code: '8-QR-09', type: 'وجداني', objective: 'أن يربط الطالب موضوع النص بقضية في بيئته أو حياته.', verificationIndicator: 'يقدم مثالًا واقعيًا مناسبًا.' },
      ],
    },
    literaryTexts: {
      domainName: 'النصوص الأدبية وتذوقها',
      domainCode: 'NT',
      objectives: [
        { code: '8-NT-01', type: 'معرفي', objective: 'أن يشرح الطالب المعنى الإجمالي للأبيات أو العبارات الأدبية.', verificationIndicator: 'يعيد صياغة المعنى دون الاكتفاء باستبدال الكلمات بمرادفاتها.' },
        { code: '8-NT-02', type: 'معرفي', objective: 'أن يفسر الطالب الصور والتعبيرات الأدبية الواضحة.', verificationIndicator: 'يبين المعنى الذي توحي به الصورة.' },
        { code: '8-NT-03', type: 'وجداني', objective: 'أن يختار الطالب أجمل عبارة في النص ويعلل اختياره.', verificationIndicator: 'يربط إعجابه بلفظ أو صورة أو معنى.' },
        { code: '8-NT-04', type: 'مهاري', objective: 'أن يلقي الطالب النص إلقاءً يبرز معانيه وانفعالاته.', verificationIndicator: 'ينوع النبرة والوقف بما يناسب المعنى.' },
        { code: '8-NT-05', type: 'معرفي', objective: 'أن يوضح الطالب العلاقة بين عنوان النص ومضمونه.', verificationIndicator: 'يعلل دلالة العنوان في ضوء النص.' },
        { code: '8-NT-06', type: 'معرفي', objective: 'أن يميز الطالب بين العاطفة والفكرة في نص أدبي مناسب.', verificationIndicator: 'يحدد الفكرة ويصف الشعور الغالب.' },
        { code: '8-NT-07', type: 'مهاري', objective: 'أن يوظف الطالب تعبيرًا أدبيًا تعلمه في جملة جديدة.', verificationIndicator: 'يستخدم التعبير في سياق سليم.' },
        { code: '8-NT-08', type: 'وجداني', objective: 'أن يبدي الطالب تقديرًا لجمال اللغة والصورة الأدبية.', verificationIndicator: 'يذكر أثر التعبير في فهمه أو شعوره.' },
      ],
    },
    grammarAndStructures: {
      domainName: 'النحو والتراكيب والإعراب',
      domainCode: 'NH',
      objectives: [
        { code: '8-NH-01', type: 'معرفي', objective: 'أن يحدد الطالب وظيفة الكلمة في الجملة وفق القواعد المدروسة.', verificationIndicator: 'يميز الوظيفة النحوية في أمثلة متنوعة.' },
        { code: '8-NH-02', type: 'معرفي', objective: 'أن يميز الطالب بين علامات الإعراب الأصلية والفرعية في الأمثلة المقررة.', verificationIndicator: 'يحدد العلامة ويبين سببها.' },
        { code: '8-NH-03', type: 'معرفي', objective: 'أن يفرق الطالب بين جمع المذكر السالم والأفعال الخمسة.', verificationIndicator: 'يستدل على النوع من بنية الكلمة وموقعها.' },
        { code: '8-NH-04', type: 'مهاري', objective: 'أن يضبط الطالب الكلمات بحسب موقعها الإعرابي.', verificationIndicator: 'يختار علامة الإعراب الصحيحة.' },
        { code: '8-NH-05', type: 'معرفي', objective: 'أن يحدد الطالب أثر الأدوات الداخلة على الفعل المضارع وفق ما درسه.', verificationIndicator: 'يبين أثر الأداة في الفعل في أمثلة تطبيقية.' },
        { code: '8-NH-06', type: 'مهاري', objective: 'أن يصحح الطالب الخطأ النحوي في جملة قصيرة.', verificationIndicator: 'يحدد موضع الخطأ ويقدم التصحيح المناسب.' },
        { code: '8-NH-07', type: 'مهاري', objective: 'أن يوظف الطالب القاعدة في كتابة فقرة قصيرة.', verificationIndicator: 'تظهر القاعدة بصورة صحيحة في كتابته.' },
        { code: '8-NH-08', type: 'معرفي', objective: 'أن يفسر الطالب سبب اختلاف علامة الإعراب بين مثالين.', verificationIndicator: 'يربط اختلاف العلامة باختلاف الوظيفة أو نوع الكلمة.' },
      ],
    },
    spellingAndCalligraphy: {
      domainName: 'الإملاء والرسم والخط العربي',
      domainCode: 'IM',
      objectives: [
        { code: '8-IM-01', type: 'معرفي', objective: 'أن يميز الطالب بين صور الهمزة وفق القواعد التي درسها.', verificationIndicator: 'يصنف الكلمات ويعلل الرسم الإملائي.' },
        { code: '8-IM-02', type: 'مهاري', objective: 'أن يكتب الطالب الكلمات ذات الألف اللينة وفق القاعدة المقررة.', verificationIndicator: 'يختار صورة الألف المناسبة.' },
        { code: '8-IM-03', type: 'معرفي', objective: 'أن يفرق الطالب بين التاء المربوطة والتاء المفتوحة والهاء.', verificationIndicator: 'يحدد الرسم الصحيح في سياقات مختلفة.' },
        { code: '8-IM-04', type: 'مهاري', objective: 'أن يراجع الطالب كتابته لاكتشاف الأخطاء الإملائية وتصحيحها.', verificationIndicator: 'يصحح أخطاءه بعد المراجعة.' },
        { code: '8-KH-01', type: 'مهاري', objective: 'أن يحسن الطالب وضوح خطه وانتظامه في الكتابة المتصلة.', verificationIndicator: 'تتضح الحروف وتتناسق الكلمات.' },
        { code: '8-KH-02', type: 'مهاري', objective: 'أن ينقل الطالب نصًا قصيرًا محافظًا على الرسم والترتيب.', verificationIndicator: 'يقل الحذف والزيادة والتشويه في النقل.' },
      ],
    },
    expressionAndCommunication: {
      domainName: 'التعبير الكتابي والشفهي والتواصل',
      domainCode: 'TA',
      objectives: [
        { code: '8-TA-01', type: 'مهاري', objective: 'أن يكتب الطالب موضوعًا قصيرًا يتضمن مقدمة وعرضًا وخاتمة مناسبة.', verificationIndicator: 'تظهر الأجزاء الثلاثة بترابط منطقي.' },
        { code: '8-TA-02', type: 'مهاري', objective: 'أن يدعم الطالب رأيه بمثال أو تعليل.', verificationIndicator: 'يقدم سببًا أو شاهدًا مرتبطًا برأيه.' },
        { code: '8-TA-03', type: 'مهاري', objective: 'أن يعيد الطالب صياغة فقرة بأسلوبه مع الحفاظ على معناها.', verificationIndicator: 'ينتج صياغة جديدة لا تنقل النص حرفيًا.' },
        { code: '8-TA-04', type: 'معرفي', objective: 'أن يميز الطالب بين العبارة المباشرة والعبارة التي تحمل إيحاءً في سياق مناسب.', verificationIndicator: 'يشرح الفرق بين المعنى الظاهر والمقصود.' },
        { code: '8-TA-05', type: 'مهاري', objective: 'أن يلخص الطالب موضوعًا أو تجربة في تسلسل منطقي.', verificationIndicator: 'يعرض الأحداث أو الأفكار بترتيب مفهوم.' },
        { code: '8-TA-06', type: 'وجداني', objective: 'أن يتقبل الطالب الملاحظات على كتابته ويستفيد منها.', verificationIndicator: 'يعدل نصه بناءً على ملاحظة محددة.' },
      ],
    },
  },
};

export const GRADE_9_OBJECTIVES_BANK: GradeObjectivesBank = {
  gradeKey: 'grade9',
  gradeTitle: 'الصف التاسع الأساسي (الشهادة العامة)',
  domains: {
    readingAndComprehension: {
      domainName: 'القراءة والفهم والتحليل',
      domainCode: 'QR',
      objectives: [
        { code: '9-QR-01', type: 'معرفي', objective: 'أن يحدد الطالب معنى المفردة وفق السياق والقرائن المصاحبة.', verificationIndicator: 'يفسر المعنى ويستشهد بقرينة مناسبة.' },
        { code: '9-QR-02', type: 'معرفي', objective: 'أن يميز الطالب بين المرادف والمعنى التفسيري للمفردة.', verificationIndicator: 'يذكر مرادفًا مناسبًا وشرحًا يوضح الاستعمال.' },
        { code: '9-QR-03', type: 'مهاري', objective: 'أن يقرأ الطالب نصًا قراءة سليمة دقيقة معبرة.', verificationIndicator: 'يراعي النطق والضبط والوقف وسلامة الأداء.' },
        { code: '9-QR-04', type: 'معرفي', objective: 'أن يحلل الطالب بنية النص إلى فكرة عامة وأفكار رئيسة وتفاصيل.', verificationIndicator: 'ينظم الأفكار بحسب مستوياتها.' },
        { code: '9-QR-05', type: 'معرفي', objective: 'أن يستنتج الطالب موقف الكاتب أو غرضه من النص.', verificationIndicator: 'يستدل على الموقف من ألفاظ النص وأفكاره.' },
        { code: '9-QR-06', type: 'معرفي', objective: 'أن يميز الطالب بين الحقيقة والرأي في نص مناسب.', verificationIndicator: 'يصنف العبارات ويعلل تصنيفه.' },
        { code: '9-QR-07', type: 'مهاري', objective: 'أن يلخص الطالب نصًا متوسط الطول بلغة دقيقة ومترابطة.', verificationIndicator: 'يحافظ على الأفكار الأساسية ويستبعد الحشو.' },
        { code: '9-QR-08', type: 'معرفي', objective: 'أن يقارن الطالب بين فكرتين أو موقفين وردا في النص.', verificationIndicator: 'يحدد أوجه الاتفاق والاختلاف بدقة.' },
        { code: '9-QR-09', type: 'معرفي', objective: 'أن يستدل الطالب على إجابته من النص بدل الاعتماد على التخمين.', verificationIndicator: 'يذكر الشاهد الذي يدعم إجابته.' },
        { code: '9-QR-10', type: 'مهاري', objective: 'أن يعيد الطالب صياغة فقرة علمية أو تاريخية بأسلوب واضح.', verificationIndicator: 'يحافظ على المعلومات ويستخدم لغة سليمة.' },
        { code: '9-QR-11', type: 'وجداني', objective: 'أن يربط الطالب موضوع القراءة بواقع المجتمع دون الخروج عن مضمون النص.', verificationIndicator: 'يقدم مثالًا واقعيًا ويبين صلته بالفكرة.' },
      ],
    },
    literaryTexts: {
      domainName: 'النصوص الأدبية والذوق الأدبي',
      domainCode: 'NT',
      objectives: [
        { code: '9-NT-01', type: 'معرفي', objective: 'أن يشرح الطالب المعنى الكلي للنص الأدبي مع مراعاة العلاقات بين أجزائه.', verificationIndicator: 'يقدم تفسيرًا مترابطًا لا شرحًا منفصلًا لكل كلمة.' },
        { code: '9-NT-02', type: 'معرفي', objective: 'أن يفسر الطالب الصور البيانية والتعبيرات المجازية المناسبة لمستواه.', verificationIndicator: 'يوضح الصورة والمعنى الذي تؤديه في النص.' },
        { code: '9-NT-03', type: 'معرفي', objective: 'أن يبين الطالب أثر اختيار الكاتب للألفاظ والتراكيب في المعنى.', verificationIndicator: 'يربط اللفظ بأثره الدلالي أو الشعوري.' },
        { code: '9-NT-04', type: 'وجداني', objective: 'أن يختار الطالب بيتًا أو عبارة يراها الأجمل ويعلل اختياره.', verificationIndicator: 'يقدم تعليلًا قائمًا على الصورة أو الإيقاع أو المعنى.' },
        { code: '9-NT-05', type: 'مهاري', objective: 'أن يلقي الطالب نصًا أدبيًا بما يناسب عاطفته ومعناه.', verificationIndicator: 'يوظف الصوت والوقف والإيقاع دون تكلف.' },
        { code: '9-NT-06', type: 'معرفي', objective: 'أن يميز الطالب بين الفكرة والعاطفة والصورة في النص.', verificationIndicator: 'يحدد كل عنصر مع شاهد مناسب.' },
        { code: '9-NT-07', type: 'مهاري', objective: 'أن يحفظ الطالب النصوص المقررة ويستظهرها بدقة.', verificationIndicator: 'يستظهر الأبيات أو العبارات دون تحريف مؤثر.' },
        { code: '9-NT-08', type: 'معرفي', objective: 'أن يفسر الطالب علاقة العنوان بالبناء الكلي للنص.', verificationIndicator: 'يوضح ما يكشفه العنوان عن الموضوع أو الرؤية.' },
        { code: '9-NT-09', type: 'مهاري', objective: 'أن ينتج الطالب تعبيرًا أدبيًا قصيرًا مستفيدًا من صورة أو أسلوب تعلمه.', verificationIndicator: 'يوظف صورة أو تركيبًا جديدًا في سياق مناسب.' },
        { code: '9-NT-10', type: 'وجداني', objective: 'أن يميز الطالب بين إعجابه الشخصي بالنص والحكم الذي يستطيع تعليله.', verificationIndicator: 'يقدم رأيًا مدعومًا بقرائن من النص.' },
      ],
    },
    grammarAndStructures: {
      domainName: 'النحو والتراكيب والإعراب',
      domainCode: 'NH',
      objectives: [
        { code: '9-NH-01', type: 'معرفي', objective: 'أن يحلل الطالب الجملة وفق الوظائف النحوية المدروسة.', verificationIndicator: 'يحدد الوظائف والعلاقات بين الكلمات.' },
        { code: '9-NH-02', type: 'معرفي', objective: 'أن يميز الطالب بين علامات الإعراب الأصلية والفرعية.', verificationIndicator: 'يحدد العلامة ويعلل استخدامها.' },
        { code: '9-NH-03', type: 'معرفي', objective: 'أن يميز الطالب بين جمع المذكر السالم والأفعال الخمسة من خلال البنية والموقع.', verificationIndicator: 'يصنف المثال ويبين علامة الإعراب المناسبة.' },
        { code: '9-NH-04', type: 'معرفي', objective: 'أن يطبق الطالب قواعد الأسماء الخمسة في أمثلة مناسبة.', verificationIndicator: 'يحدد شروط الإعراب بالحروف ويضبط المثال.' },
        { code: '9-NH-05', type: 'معرفي', objective: 'أن يحدد الطالب أثر النواصب والجوازم في الفعل المضارع وفق المنهج المقرر.', verificationIndicator: 'يحدد الأداة وأثرها وعلامة الفعل.' },
        { code: '9-NH-06', type: 'مهاري', objective: 'أن يعرب الطالب الكلمات المستهدفة إعرابًا صحيحًا.', verificationIndicator: 'يذكر الوظيفة والعلامة وسببها عند الحاجة.' },
        { code: '9-NH-07', type: 'مهاري', objective: 'أن يصحح الطالب الخطأ النحوي ويشرح سبب التصحيح.', verificationIndicator: 'يقدم التصحيح مع تعليل مرتبط بالقاعدة.' },
        { code: '9-NH-08', type: 'معرفي', objective: 'أن يقارن الطالب بين تركيبين نحويين متشابهين في الصورة مختلفين في الوظيفة.', verificationIndicator: 'يفسر اختلاف الحكم النحوي بينهما.' },
        { code: '9-NH-09', type: 'مهاري', objective: 'أن يوظف الطالب القواعد النحوية في تعبيره الكتابي.', verificationIndicator: 'يكتب تراكيب سليمة ويقلل الأخطاء المتكررة.' },
        { code: '9-NH-10', type: 'مهاري', objective: 'أن يستخرج الطالب الشاهد النحوي من نص مقروء.', verificationIndicator: 'يحدد الشاهد ثم يفسر وجه الاستدلال به.' },
      ],
    },
    spellingAndCalligraphy: {
      domainName: 'الإملاء والرسم والخط العربي',
      domainCode: 'IM',
      objectives: [
        { code: '9-IM-01', type: 'معرفي', objective: 'أن يعلل الطالب رسم الهمزة في الكلمات التي درس قواعدها.', verificationIndicator: 'يحدد نوع الهمزة ويذكر القاعدة المناسبة.' },
        { code: '9-IM-02', type: 'مهاري', objective: 'أن يكتب الطالب الألف اللينة في الأسماء والأفعال وفق القواعد المقررة.', verificationIndicator: 'يختار الرسم الصحيح في أمثلة متنوعة.' },
        { code: '9-IM-03', type: 'مهاري', objective: 'أن يراجع الطالب النصوص التي يكتبها مراجعة إملائية مستقلة.', verificationIndicator: 'يكتشف الأخطاء ويصححها قبل التسليم.' },
        { code: '9-IM-04', type: 'مهاري', objective: 'أن يكتب الطالب فقرة سليمة في الهمزات والتاء والألف اللينة بحسب القواعد المدروسة.', verificationIndicator: 'تنخفض الأخطاء في الأنماط المستهدفة.' },
        { code: '9-KH-01', type: 'مهاري', objective: 'أن يكتب الطالب نصًا واضحًا منظمًا مع المحافظة على مقروئية الخط.', verificationIndicator: 'ينتظم النص وتظهر الحروف والكلمات بوضوح.' },
        { code: '9-KH-02', type: 'مهاري', objective: 'أن ينقل الطالب نصًا مضبوطًا مع المحافظة على علامات الترقيم.', verificationIndicator: 'يقل الحذف والتحريف وتثبت العلامات في مواضعها.' },
      ],
    },
    expressionAndCommunication: {
      domainName: 'التعبير والكتابة والتواصل',
      domainCode: 'TA',
      objectives: [
        { code: '9-TA-01', type: 'مهاري', objective: 'أن يكتب الطالب موضوعًا مترابطًا يعالج فكرة محددة.', verificationIndicator: 'تتضح الفكرة وتتسلسل الفقرات.' },
        { code: '9-TA-02', type: 'مهاري', objective: 'أن يدعم الطالب رأيه بالحجة أو المثال أو الشاهد المناسب.', verificationIndicator: 'يقدم دليلًا مرتبطًا بالفكرة.' },
        { code: '9-TA-03', type: 'مهاري', objective: 'أن يلخص الطالب نصًا علميًا أو تاريخيًا محافظًا على دقة معلوماته.', verificationIndicator: 'لا يخلط بين التلخيص وإبداء الرأي الشخصي.' },
        { code: '9-TA-04', type: 'مهاري', objective: 'أن يعيد الطالب صياغة نص بأسلوبه مع حفظ المعنى الأساسي.', verificationIndicator: 'تختلف الصياغة مع بقاء الفكرة والمعلومة.' },
        { code: '9-TA-05', type: 'مهاري', objective: 'أن يكتب الطالب مقدمة مناسبة وخاتمة مرتبطة بموضوعه.', verificationIndicator: 'تؤدي المقدمة وظيفة التمهيد والخاتمة وظيفة الإغلاق.' },
        { code: '9-TA-06', type: 'مهاري', objective: 'أن يراجع الطالب كتابته من حيث الفكرة والترابط والنحو والإملاء.', verificationIndicator: 'ينتج نسخة محسنة بعد المراجعة.' },
        { code: '9-TA-07', type: 'مهاري', objective: 'أن يقدم الطالب عرضًا شفهيًا موجزًا ومنظمًا.', verificationIndicator: 'يعرض الفكرة بوضوح ويلتزم بالموضوع والوقت.' },
        { code: '9-TA-08', type: 'وجداني', objective: 'أن يتفاعل الطالب مع آراء الآخرين بحوار منضبط.', verificationIndicator: 'يستمع ويرد على الفكرة لا على الشخص.' },
      ],
    },
  },
};

export const ALL_GRADES_OBJECTIVES_BANK = {
  grade7: GRADE_7_OBJECTIVES_BANK,
  grade8: GRADE_8_OBJECTIVES_BANK,
  grade9: GRADE_9_OBJECTIVES_BANK,
};
