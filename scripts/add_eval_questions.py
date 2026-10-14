import os

eval_questions_data = {
    13: [
        {
            "id": "g7_u13_eval1",
            "question": "صنف الأسماء الآتية إلى نكرة ومعرفة مبيناً نوع المعرفة: (مَسْجِدٌ، هَذَا، أَنَا، بَلْدَةٌ، الْقُرْآنُ، عَلِيٌّ)",
            "modelAnswer": "النكرات: (مَسْجِدٌ، بَلْدَةٌ). المعارف: هَذَا (اسم إشارة)، أَنَا (ضمير)، الْقُرْآنُ (معرف بأل)، عَلِيٌّ (علم).",
            "sourceType": "evaluation",
            "pageNumber": 20,
            "skill": "التصنيف النحوي",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        },
        {
            "id": "g7_u13_eval2",
            "question": "علل: لماذا لا تقتصر العبادة في الإسلام على الصلاة والصيام والحج فحسب؟",
            "modelAnswer": "لأن الإسلام دين حياة شامل، فكل عمل صالح يقصد به وجه الله، كالسعي للرزق وعمارة الأرض والجهاد وبر الوالدين، هو عبادة مقبولة.",
            "sourceType": "evaluation",
            "pageNumber": 21,
            "skill": "الفهم والتعليل",
            "category": "deductive",
            "difficulty": "medium",
            "priority": "essential"
        }
    ],
    14: [
        {
            "id": "g7_u14_eval1",
            "question": "ميّز الأفعال في الآية الكريمة وبيّن نوع كل فعل (ماضٍ، مضارع، أمر): ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۞ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۞ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۞ الَّذِي عَلَّمَ بِالْقَلَمِ﴾",
            "modelAnswer": "اقْرَأْ: فعل أمر مبني على السكون. خَلَقَ: فعل ماضٍ مبني على الفتح. عَلَّمَ: فعل ماضٍ مبني على الفتح.",
            "sourceType": "evaluation",
            "pageNumber": 34,
            "skill": "الاستخراج والتصنيف",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        },
        {
            "id": "g7_u14_eval2",
            "question": "بيّن سبب كتابة الهمزة المتوسطة على الألف في الكلمات الآتية: (سَأَلَ، مَسْأَلَةٌ، رَأْسٌ)",
            "modelAnswer": "سَأَلَ: مفتوحة وما قبلها مفتوح. مَسْأَلَةٌ: مفتوحة وما قبلها ساكن صحيح والفتحة أقوى. رَأْسٌ: ساكنة وما قبلها مفتوح والفتحة أقوى من السكون.",
            "sourceType": "evaluation",
            "pageNumber": 35,
            "skill": "التعليل الإملائي",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    15: [
        {
            "id": "g7_u15_eval1",
            "question": "استخرج الضمائر من الجملة الآتية وبيّن نوعها (منفصل، متصل، مستتر): «نَحْنُ نَحْصُدُ أَرْضَنَا بِأَيْدِينَا»",
            "modelAnswer": "نَحْنُ: ضمير بارز منفصل مبني في محل رفع مبتدأ. فاعل نحصد: ضمير مستتر وجوباً تقديره نحن. نَا في (أرضنا وأيدينا): ضمير بارز متصل مبني في محل جر مضاف إليه.",
            "sourceType": "evaluation",
            "pageNumber": 48,
            "skill": "التحليل الإعرابي والضمائر",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u15_eval2",
            "question": "ما أهم محاصيل الحبوب التي يزرعها اليمنيون؟ وما أهميتها في تحقيق الاكتفاء الذاتي؟",
            "modelAnswer": "القمح (البُر)، الذرة الرفيعة، الذرة الشامية، الدخن، والشعير؛ وأهميتها تكمن في توفير الغذاء الأساسي للشعب وصون السيادة الوطنية والاستقلال من التبعية للخارج.",
            "sourceType": "evaluation",
            "pageNumber": 49,
            "skill": "الفهم والاستيعاب",
            "category": "direct",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    16: [
        {
            "id": "g7_u16_eval1",
            "question": "عيّن اسم الإشارة والاسم الموصول وصلته في قوله تعالى: ﴿إِنَّ هَذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ﴾",
            "modelAnswer": "اسم الإشارة: (هَذَا) مبني في محل نصب اسم إن. الاسم الموصول: (الَّتِي) مبني في محل جر باللام. صلة الموصول: الجملة الاسمية (هِيَ أَقْوَمُ) لا محل لها من الإعراب.",
            "sourceType": "evaluation",
            "pageNumber": 62,
            "skill": "الاستخراج والتحليل",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u16_eval2",
            "question": "علل كتابة الهمزة على الواو في: (مَسْؤُول، فُؤَاد، يُؤْمِنُ)",
            "modelAnswer": "مَسْؤُول: مضمومة بعد ساكن. فُؤَاد: مفتوحة بعد ضم. يُؤْمِنُ: ساكنة بعد ضم، والضمة أقوى من الفتحة والسكون في كل هذه الحالات وتناسبها الواو.",
            "sourceType": "evaluation",
            "pageNumber": 63,
            "skill": "التعليل الإملائي",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    17: [
        {
            "id": "g7_u17_eval1",
            "question": "ابنِ الأفعال الآتية للمجهول مع ضبط الفعل ونائب الفاعل بالشكل التام: (كَتَبَ التِّلْمِيذُ الدَّرْسَ / يَحْرُسُ الْجُنُودُ الْوَطَنَ)",
            "modelAnswer": "1) كُتِبَ الدَّرْسُ (ضم أوله وكسر ما قبل آخره ورفع نائب الفاعل بالضمة). 2) يُحْرَسُ الْوَطَنُ (ضم أوله وفتح ما قبل آخره ورفع نائب الفاعل بالضمة).",
            "sourceType": "evaluation",
            "pageNumber": 76,
            "skill": "التحويل النحوي",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u17_eval2",
            "question": "اشرح قول أمير الشعراء: «وَإِنَّمَا الأُمَمُ الأَخْلَاقُ مَا بَقِيَتْ ... فَإِنْ هُمُ ذَهَبَتْ أَخْلَاقُهُمْ ذَهَبُوا»",
            "modelAnswer": "قانون اجتماعي تاريخي يؤكد أن بقاء الأمم وعزتها وقوتها مرتبط بتمسكها بالقيم الأخلاقية، فإذا انهارت الأخلاق سقطت الأمة وتلاشت حضارتها مهما بلغت قوتها المادية.",
            "sourceType": "evaluation",
            "pageNumber": 77,
            "skill": "الشرح الأدبي والفكري",
            "category": "deductive",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    18: [
        {
            "id": "g7_u18_eval1",
            "question": "استخرج المفعول به وبيّن صورته وعلامة إعرابه في الجملتين: 1) شَيَّدَ الْمُلُوكُ الْمَدَارِسَ الْعِلْمِيَّةَ. 2) أَعْجَبَنِي سُوقُ الشَّنِينِيِّ.",
            "modelAnswer": "1) الْمَدَارِسَ: اسم ظاهر، منصوب بالفتحة الظاهرة. 2) ياء المتكلم في (أَعْجَبَنِي): ضمير متصل مبني في محل نصب مفعول به مقدم وجوباً.",
            "sourceType": "evaluation",
            "pageNumber": 90,
            "skill": "الاستخراج والإعراب",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u18_eval2",
            "question": "بيّن سبب كتابة الهمزة المتوسطة على نبرة في: (رَئِيس، فِئَة، بِيئَة)",
            "modelAnswer": "رَئِيس: مكسورة بعد فتح. فِئَة: مفتوحة بعد كسر. بِيئَة: مفتوحة مسبوقة بياء ساكنة والياء في قوة الكسرة، والكسرة أقوى الحركات وتناسبها النبرة.",
            "sourceType": "evaluation",
            "pageNumber": 91,
            "skill": "التعليل الإملائي",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    19: [
        {
            "id": "g7_u19_eval1",
            "question": "عيّن المفعول المطلق والمفعول لأجله في الجملة: «احْتَرَمْتُ أَبِي احْتِرَاماً جَمِيلاً، وَأَطَعْتُهُ طَلَباً لِرِضَا اللَّهِ»",
            "modelAnswer": "احْتِرَاماً: مفعول مطلق مبين للنوع منصوب بالفتحة لأنه موصوف بـ (جميلاً). طَلَباً: مفعول لأجله منصوب بالفتحة لأنه مصدر قلبي يبين سبب الطاعة.",
            "sourceType": "evaluation",
            "pageNumber": 104,
            "skill": "التمييز بين المفاعيل",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u19_eval2",
            "question": "ما النصيحة التي وجهها الإمام علي لابنه الحسن في وصيته حول تأديب الصغير؟",
            "modelAnswer": "المبادرة بتأديب الحدث وغرس بذور الخير في قلبه وهو كالأرض الخالية قبل أن يقسو قلبه ويشتغل لبه بالملهيات والباطل.",
            "sourceType": "evaluation",
            "pageNumber": 105,
            "skill": "الفهم والتذكر",
            "category": "direct",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    20: [
        {
            "id": "g7_u20_eval1",
            "question": "استخرج المفعول فيه وبيّن نوعه (زمان أو مكان) في قوله تعالى: ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى﴾",
            "modelAnswer": "لَيْلًا: مفعول فيه ظرف زمان منصوب وعلامة نصبه الفتحة الظاهرة، دل على وقت حدوث الإسراء متضمناً معنى (في الليل).",
            "sourceType": "evaluation",
            "pageNumber": 118,
            "skill": "الاستخراج الإعرابي",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        },
        {
            "id": "g7_u20_eval2",
            "question": "ما الحكمة الجهادية والسياسية في شعار الشيخ راغب حرب: «الْمَوْقِفُ سِلَاحٌ، وَالْمُصَافَحَةُ اعْتِرَافٌ»؟",
            "modelAnswer": "أن اتخاذ الموقف المبدئي الصلب ورفض التطبيع هو سلاح مقاوم يهدم شرعية المحتل، وأن مصافحة الغاصب تعني الاعتراف باحتلاله وجرائمه وهو خيانة للمقدسات.",
            "sourceType": "evaluation",
            "pageNumber": 119,
            "skill": "التحليل والاستنتاج",
            "category": "deductive",
            "difficulty": "medium",
            "priority": "essential"
        }
    ],
    21: [
        {
            "id": "g7_u21_eval1",
            "question": "عيّن الحال وصاحب الحال وعلامة الإعراب في: «رَأَيْتُ الطُّلَّابَ مُسْتَبْشِرِينَ بِالنَّجَاحِ»",
            "modelAnswer": "الحال: مُسْتَبْشِرِينَ، منصوبة وعلامة نصبها الياء لأنها جمع مذكر سالم. صاحب الحال: الطُّلَّابَ (المفعول به المعرفة).",
            "sourceType": "evaluation",
            "pageNumber": 132,
            "skill": "التحليل الإعرابي للحال",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        },
        {
            "id": "g7_u21_eval2",
            "question": "لماذا تعد كربلاء مدرسة ملهمة لأحرار العالم وثواره عبر العصور؟",
            "modelAnswer": "لأنها رسخت مبدأ انتصار الدم المظلوم والمبدأ الحق على السيف الطاغي، وأكدت أن الشهادة والحرية خير من الحياة الذليلة تحت حكم الظالمين والمستكبرين.",
            "sourceType": "evaluation",
            "pageNumber": 133,
            "skill": "الفهم والقيم",
            "category": "deductive",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    22: [
        {
            "id": "g7_u22_eval1",
            "question": "ميّز تمييز الذات (الملفوظ) من تمييز النسبة (الملحوظ) في الجملتين: 1) ازْدَادَ الْمُقَاتِلُ شَجَاعَةً. 2) اشْتَرَيْتُ صَاعاً قَمْحاً.",
            "modelAnswer": "1) شَجَاعَةً: تمييز نسبة (ملحوظ) يزيل إبهام الجملة ونسبة الزيادة. 2) قَمْحاً: تمييز ذات (ملفوظ) يزيل إبهام اسم الكيل السابق (صاعاً).",
            "sourceType": "evaluation",
            "pageNumber": 146,
            "skill": "التصنيف والتمييز",
            "category": "applied",
            "difficulty": "medium",
            "priority": "essential"
        },
        {
            "id": "g7_u22_eval2",
            "question": "وضح المعنى الذي يقصده الشاعر بتشبيه المقاتلين اليمنيين بـ (أسد الشرى).",
            "modelAnswer": "يقصد شجاعتهم الفائقة وضراوتهم وبسالتهم في مواجهة الأعداء دفاعاً عن حياض الوطن والمقدسات، تشبيهاً بأسود مأسدة الشرى المعروفة في تراث العرب بالبطولة.",
            "sourceType": "evaluation",
            "pageNumber": 147,
            "skill": "التذوق البلاغي",
            "category": "deductive",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    23: [
        {
            "id": "g7_u23_eval1",
            "question": "استخرج المجرور بحرف الجر والمجرور بالإضافة في: «يَدُورُ الْقَمَرُ فِي مَدَارِ الأَرْضِ»",
            "modelAnswer": "مَدَارِ: اسم مجرور بـ (في) وعلامة جره الكسرة الظاهرة. الأَرْضِ: مضاف إليه مجرور وعلامة جره الكسرة الظاهرة تحت آخره.",
            "sourceType": "evaluation",
            "pageNumber": 160,
            "skill": "الإعراب والمجرورات",
            "category": "applied",
            "difficulty": "easy",
            "priority": "essential"
        },
        {
            "id": "g7_u23_eval2",
            "question": "ما الفرق بين الشمس والقمر من الناحية الفلكية والإنارة كما بين القرآن والدرس؟",
            "modelAnswer": "الشمس ضياء ملتهب متوهج ينتج الضوء والحرارة بذاته، والقمر نور منعكس بارد يعكس ضوء الشمس دون أن ينتج ضوءاً بذاته.",
            "sourceType": "evaluation",
            "pageNumber": 161,
            "skill": "المقارنة العلمية",
            "category": "direct",
            "difficulty": "easy",
            "priority": "essential"
        }
    ],
    24: [
        {
            "id": "g7_u24_eval1",
            "question": "أعرب الجملة إعراباً كاملاً: «حَضَرَ مُعَلِّمُو الْمَدْرَسَةِ مُسْتَبْشِرِينَ»",
            "modelAnswer": "حَضَرَ: فعل ماضٍ مبني على الفتح. مُعَلِّمُو: فاعل مرفوع بالواو لأنه جمع مذكر سالم، وحذفت النون للإضافة. الْمَدْرَسَةِ: مضاف إليه مجرور بالكسرة. مُسْتَبْشِرِينَ: حال منصوبة بالياء لأنها جمع مذكر سالم.",
            "sourceType": "evaluation",
            "pageNumber": 171,
            "skill": "الإعراب الشامل",
            "category": "applied",
            "difficulty": "advanced",
            "priority": "essential"
        },
        {
            "id": "g7_u24_eval2",
            "question": "ما العبرة اللغوية والتربوية المستفادة من نوادر التراث العربي وطرفة الأعرابي مع اللحن؟",
            "modelAnswer": "أن الإعراب الدقيق يصون المعاني الشرعية والعقدية من التحريف والفساد، وأن الفكاهة العربية كانت وعاءً لسرعة البديهة والذكاء والحكمة وعلاج عيوب المجتمع.",
            "sourceType": "evaluation",
            "pageNumber": 172,
            "skill": "الفهم والاستنتاج",
            "category": "deductive",
            "difficulty": "medium",
            "priority": "essential"
        }
    ]
}

import json

for u_num, questions in eval_questions_data.items():
    file_path = f"src/data/units/grade7/unit{u_num}.ts"
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist!")
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the end of calligraphyAndComposition
    q_str = "  unitEvaluationQuestions: [\n"
    for q in questions:
        q_str += "    {\n"
        q_str += f"      id: '{q['id']}',\n"
        q_str += f"      question: '{q['question']}',\n"
        q_str += f"      modelAnswer: '{q['modelAnswer']}',\n"
        q_str += f"      sourceType: '{q['sourceType']}',\n"
        q_str += f"      pageNumber: {q['pageNumber']},\n"
        q_str += f"      skill: '{q['skill']}',\n"
        q_str += f"      category: '{q['category']}',\n"
        q_str += f"      difficulty: '{q['difficulty']}',\n"
        q_str += f"      priority: '{q['priority']}',\n"
        q_str += "    },\n"
    q_str += "  ],\n};\n"

    # Replace the trailing `};\n` or `};`
    last_brace_idx = content.rfind("};")
    if last_brace_idx != -1:
        new_content = content[:last_brace_idx] + q_str
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated unit{u_num}.ts successfully!")
    else:
        print(f"Could not find closing brace in unit{u_num}.ts")
