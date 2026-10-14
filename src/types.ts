export interface VocabularyItem {
  word: string;
  contextMeaning?: string;
  meaning?: string;
  synonym?: string;
  antonym?: string;
  notes?: string;
  page?: number;
  isFromTextbook?: boolean; // تمييز ما ورد في الكتاب عما هو مقترح
}

export interface DetailedExplanation {
  generalIdea: string;
  subIdeas: string[];
  detailedPoints: string[];
  causesAndEffects?: { cause: string; effect: string }[];
  moralValues?: string[];
  characters?: { name: string; role: string; traits: string }[];
  placesAndNumbers?: { item: string; detail: string }[];
  unsummarizedDetails?: string[]; // معلومات في الشرح والهوامش لم تذكر في الخلاصة
}

export interface GrammarLesson {
  title: string;
  ruleTitle: string;
  page?: number;
  mainRule?: string;
  detailedExplanation?: string;
  definition?: string;
  judgmentsAndSigns?: string[];
  conditions?: string[];
  typesAndCategories?: string[];
  examplesAndEvidence?: {
    sentence: string;
    evidencePlace: string;
    grammaticalRule: string;
    reason: string;
    parsingNotes?: string;
    isFromTextbook: boolean;
  }[];
  examplesAnalysis?: {
    example: string;
    focusWord: string;
    syntacticRole: string;
    reason: string;
  }[];
  unsummarizedGrammarPoints?: {
    point: string;
    explanation: string;
    page: number;
    evidence: string;
  }[]; // جدول: معلومات نحوية وردت في الشرح ولم تظهر في خلاصة القاعدة
  unmentionedDetails?: {
    topic: string;
    detail: string;
    page: number;
  }[];
  comparisons?: {
    conceptA?: string;
    conceptB?: string;
    termA?: string;
    termB?: string;
    pointsOfAgreement?: string;
    pointsOfDifference?: string;
    similarity?: string;
    difference?: string;
    distinguishingSigns?: string;
    quickTest?: string;
    correctExampleA?: string;
    correctExampleB?: string;
    commonErrorAndCorrection?: string;
  }[];
  quickSummary?: string;
  grammarQuestions?: {
    question: string;
    answer: string;
    type?: string;
  }[];
}

export interface SpellingLesson {
  title: string;
  page?: number;
  mainRule?: string;
  detailedExplanation?: string;
  wordsList?: string[];
  ruleSummary?: string;
  detailedRules?: string[];
  reasons?: string[];
  cases?: string[];
  exceptionsAndAlerts?: string[];
  wordsFromTextbook?: string[];
  unsummarizedSpellingPoints?: {
    point: string;
    explanation: string;
    page: number;
    evidence: string;
  }[]; // جدول: تفاصيل إملائية في الشرح لم تتضمنها الخلاصة
  practicalDistinctionTips?: string[];
  commonMistakes?: { mistake: string; correction: string; explanation: string }[];
  spellingQuestions?: {
    question: string;
    answer: string;
    type?: string;
  }[];
  unmentionedDetails?: {
    topic: string;
    detail: string;
    page: number;
  }[];
}

export interface QuestionItem {
  id?: string;
  question: string;
  modelAnswer?: string;
  answer?: string;
  sourceType?: 'text' | 'explanation' | 'rule' | 'example' | 'activity' | 'evaluation' | 'proposed';
  pageNumber?: number;
  skill?: string;
  skillTested?: string;
  category?: 'direct' | 'deductive' | 'applied';
  difficulty?: 'easy' | 'medium' | 'advanced' | string;
  priority?: 'essential' | 'important' | 'enrichment' | string;
}

export interface DiscoveredExamQuestion {
  question: string;
  importanceReason: string;
  lessonRelation?: string;
  relationToLesson?: string;
  isExplicitInText?: boolean;
  answerPresentInText?: boolean;
  modelAnswer: string;
  category: 'الفئة الأولى' | 'الفئة الثانية' | 'الفئة الثالثة' | 'الفئة الرابعة' | string;
  priority: 'عالية جدًا' | 'عالية' | 'متوسطة' | 'قصوى';
  unitNumber?: number;
  unitTitle?: string;
}

export interface UnitData {
  number: number;
  part: 1 | 2;
  title: string;
  theme: string;
  pagesRange: string;
  readingLesson: {
    title: string;
    author?: string;
    fullText: string;
    pageStart: number;
    pageEnd: number;
    genre: string;
    versesOrParagraphs?: { index: number; content: string; commentary?: string }[];
    explanation: DetailedExplanation;
    vocabulary: VocabularyItem[];
    readingQuestions?: QuestionItem[];
    comprehensionQuestions?: {
      question: string;
      answer: string;
      skillTested?: string;
    }[];
  };
  grammarLesson: GrammarLesson;
  spellingLesson: SpellingLesson;
  calligraphyAndComposition?: {
    calligraphyText?: string;
    scriptTypes?: string[];
    oralCompositionTopics?: string[];
    writtenCompositionTopic?: string;
    compositionPrompt?: string;
    activity?: string;
    page?: number;
  };
  unitEvaluationQuestions?: QuestionItem[];
  discoveredExamQuestions?: DiscoveredExamQuestion[];
  unitQuizBank?: {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
    topic: string;
    difficulty: string;
  }[];
}
