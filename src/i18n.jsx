import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      heroTitle: "Welcome to the <span>Uni Tech</span>",
      subtitle: "Innovation. Intelligence. Impact.",
      desc: "We are building a digital space where AI and innovation create real impact.",

      getStarted: "Get Started",
      learnMore: "Learn More",

      whatWeDo: "What We Do",
      whatWeDoDesc: "We provide powerful tools and experiences to help you grow with AI",

      services: {
        aiLearning: {
          title: "AI Learning",
          desc: "Explore AI concepts through interactive content and smart tools."
        },
        competitions: {
          title: "Competitions",
          desc: "Participate in challenges and earn XP to level up your skills."
        },
        knowledge: {
          title: "Knowledge Hub",
          desc: "Read curated articles from experts in technology and AI."
        },
        tools: {
          title: "Smart Tools",
          desc: "Use powerful AI tools to boost your productivity and learning."
        }
      },

      pages: {
        competitions: {
          title: "Competitions",
          desc: "Enjoy a unique learning experience based on gamification, where each user has their own profile and avatar. Start your journey as a rookie, and collect Experience Points (XP) by solving weekly competitions and daily challenges to reach the title of “AI Scientist” and top the leaderboard."
        },
        posts: {
          title: "Posts",
          desc: "Enjoy reading exclusive articles written by elite doctors and experts in the fields of technology, and following the latest trends and research in the world of artificial intelligence and contemporary technical fields. Building a strong knowledge base that ensures you stay informed of everything new in the artistic labor market."
        },
        ai: {
          title: "AI Tools",
          desc: "Discover a selection of the latest AI tools to support your educational journey. We provide you with a brief overview of each tool, with direct links and illustrated explanations of how to use them effectively. We aim to enable you to adapt modern technology to facilitate your academic and research tasks."
        },
        about: {
          title: "About Us",
          desc: "We seek to simplify the concepts of advanced technology and make them accessible to everyone, by providing interactive artificial intelligence tools and reliable knowledge content. We aim to stimulate students' scientific curiosity through a fun competitive system that rewards achievement and encourages continuous development"
        }
      },

      readMore: "Read More",

      ready: "Ready to unleash your own Workforce?",
      start: "Start Using Agent",

      navbar: {
        home: "Home",
        competitions: "Competitions",
        posts: "Posts",
        ai: "AI Tools",
        about: "About Us",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        logout: "Logout"
      },

      footer: {
        desc: "Building the future with AI and innovation. Learn, explore, and grow with cutting-edge technology.",
        quickLinks: "Quick Links",
        follow: "Follow Us",
        rights: "All rights reserved."
      },

      login: {
        title: "Log in to your account 👋",
        email: "Email",
        password: "Password",
        emailPlaceholder: "Enter your Email",
        passwordPlaceholder: "Enter your Password",
        loginBtn: "Login",
        loginLoading: "Logging in...",
        noAccount: "Don't have an account?",
        signup: "Sign Up",
        google: "Google",
        fillError: "Please fill all fields",
        loginError: "Login failed"
      },

      signup: {
        title: "Sign Up your account 👋",
        name: "Name",
        namePlaceholder: "Enter your Name",
        year: "Academic Year",
        yearPlaceholder: "Select your Academic Year",
        year1: "Year 1",
        year2: "Year 2",
        year3: "Year 3",
        year4: "Year 4",
        email: "Email",
        emailPlaceholder: "Enter your Email",
        password: "Password",
        passwordPlaceholder: "Password",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm Password",
        button: "Sign Up",
        loading: "Signing Up...",
        haveAccount: "Do you have an account?",
        login: "Login",
        errors: {
          required: "Please fill all fields",
          passwordMatch: "Passwords do not match",
          failed: "Signup failed"
        }
      },

      about: {
        title: "About Us",
        desc: "At <span>UniTech</span> we seek to simplify advanced technology concepts and make them accessible to everyone, by providing interactive artificial intelligence tools and reliable knowledge content. We aim to stimulate students' scientific curiosity through a fun competitive system that rewards achievement and encourages continuous development.",

        university: {
          name: "Fayoum University",
          faculty: "Faculty of Specific Education",
          desc: "The Faculty of Specific Education at Fayoum University is committed to excellence in education, research, and innovation. It empowers students with strong technical skills and encourages creative problem-solving in modern fields such as Artificial Intelligence and Software Development."
        },

        supervisor: {
          title: "Project Supervisor",
          name: "Dr. Reham Mostafa",
          desc: "Dr. Reham Mustafa provided ongoing guidance throughout the project. Her expertise in artificial intelligence and educational technologies helped transform the platform into a powerful and engaging learning experience."
        },

        team: {
          badge: "MEET OUR TEAM",
          title: "We talk a lot about helping and teamwork."
        }
      },

      posts: {
        loading: "Loading UniTech Hub...",
        readMore: "Read More",
        less: "Less",
        copied: "Copied!"
      },

      contact: {
        title: "Get in Touch",
        desc: "Have a question or a project in mind? Drop us a message and we'll get back to you within 24 hours.",
        sendMessage: "Send Message",
        fullName: "Full Name",
        email: "Email Address",
        message: "How can we help you?",
        sending: "Sending...",
        sent: "Message Sent!",
        success: "We've received your message!"
      },

      profile: {
        levels: "Levels",
        medals: "Medals",
        completed: "completed",
        keepTraining: "Keep training to earn your first medal!",
        initiate: "The Initiate",
        explorer: "The Explorer",
        innovator: "The Innovator",
        leader: "The Leader",
        inspider: "The Inspider"
      },

      medals: {
        quiz_1: "Programming Competitions 1 Medal: Language Types",
        quiz_2: "Programming Competitions 2 Medal: Memory Management",
        quiz_3: "Programming Competitions 3 Medal: Data Structures & Development",
        quiz_4: "Programming Competitions 4 Medal: Logic & OOP Concepts",
        quiz_5: "Programming Competitions 5 Medal: Python & Java Challenges",
        quiz_6: "Programming Competitions 6 Medal: Memory & Processes",
        quiz_7: "Programming Competitions 7 Medal: Asynchronous Programming",
        quiz_8: "Programming Competitions 8 Medal: Algorithm Complexity",
        quiz_9: "Programming Competitions 9 Medal: Computer Science Basics",
        quiz_10: "Programming Competitions 10 Medal: Graphics & Web",
        quiz_11: "Programming Competitions 11 Medal: Tools & Methodologies",
        quiz_12: "Programming Competitions 12 Medal: Modern Technologies",
        quiz_13: "Programming Competitions 13 Medal: Advanced Databases",
        quiz_14: "Programming Competitions 14 Medal: Information Security",
        quiz_15: "Programming Competitions 15 Medal: Software Engineering",
        quiz_16: "Programming Competitions 16 Medal: Modern Web Tech",
        quiz_17: "Programming Competitions 17 Medal: Operating Systems",
        quiz_18: "Programming Competitions 18 Medal: AI & Machine Learning",
        quiz_19: "Programming Competitions 19 Medal: Cloud Computing",
        quiz_20: "Programming Competitions 20 Medal: Data Structures & Algorithms II",
        quiz_21: "Programming Competitions 21 Medal: Mobile App Development",
        quiz_22: "Programming Competitions 22 Medal: Networking Basics",
        quiz_23: "Programming Competitions 23 Medal: Clean Code Best Practices",
        quiz_24: "Programming Competitions 24 Medal: Software Testing & QA",
        quiz_25: "Programming Competitions 25 Medal: Tech History & Facts"
      },

      aiTools: {
        title: "All AI Tool Categories",
        subtitle: "Find Most Popular and Featured Tools by Category",
        showAll: "Show all AI Productivity Tools",

        video: {
          title: "AI Video Tools",
          items: ["video generators (4)", "video editing (4)", "video enhancer (4)"]
        },

        audio: {
          title: "AI Audio Generators",
          items: ["music (4)", "text to speech (4)", "voice tools (4)"]
        },

        text: {
          title: "AI Text Generators",
          items: ["speech tools (4)", "paraphrasing (4)", "writing generators (4)"]
        },

        image: {
          title: "AI Image Tools",
          items: ["image editing (4)", "image generators (4)", "design generators (4)"]
        },

        code: {
          title: "AI Code Tools",
          items: ["SQL (4)", "low-code/no-code (4)", "code assistant (4)"]
        },

        art: {
          title: "AI Art Generators",
          items: ["avatars (4)", "portrait generators (4)", "cartoon generators (4)"]
        }
      },

      categoryDetails: {
        heroTag: "AI Tools Library",
        heroTitle: "Powerful Tools",
        heroDescription: "Discover curated AI tools to help you create, design, and work faster with smarter workflows.",
        exploreTools: "Explore Tools",
        viewCategories: "View Categories",
        loadingTools: "Loading tools...",
        toolsCount: "Tools",
        visitTool: "Visit Tool →",
        other: "Other",
        loginAgain: "Please login again"
      },

      Swal2: {
        "pointsEarned": "You earned a new point ⚡"
      },

      competitions: {
        competitions_title: "Challenge Center",
        tab_competitions: "Major Competitions",
        tab_daily: "Daily Challenge",
        leaderboard_btn: "Leaderboard",
        hero_desc: "Test your knowledge, earn points, and climb the leaderboard.",
        bonus_xp: "+250 XP Bonus",
        weekly_rank: "Weekly Rank",
        loading_comp: "Preparing questions...",
        already_played: "Already Participated",
        submission_success: "Submitted Successfully",
        finish_challenge: "Submit Answers",
        wait_next: "More challenges are coming soon. Stay ready!",
        wait_next_competition: "You have already participated. Please wait for the next competition.",
        daily_done_title: "You answered today's question",
        daily_done_desc: "Thanks for participating! Come back tomorrow for a new challenge.",
        major_done_title: "You already participated",
        major_done_desc: "You can check the leaderboard to see your current rank.",
        score: "Score",
        total_points: "Total Points",
        current_level: "Current Level",
        next: "Next",
        prev: "Previous",
        question: "Question",
        of: "of",
        no_data: "No data available right now",
        success_default: "Submitted Successfully",
        correct_answer_msg: "Well done! You are the smartest chick!",
        wrong_answer_msg: "Your answers are incorrect."
      },

      leaderboard: {
        title: "Leaderboard",
        loading: "Loading top players...",
        fetchError: "Failed to fetch data from server",
        user: "User",
        rank: "Rank",
        points: "Points",
        noData: "No data available right now"
      }
    }
  },

  ar: {
    translation: {
      heroTitle: "مرحبًا بك في يوني تك",
      subtitle: "ابتكار. ذكاء. تأثير.",
      desc: "نحن نبني مساحة رقمية حيث يخلق الذكاء الاصطناعي والابتكار تأثيرًا حقيقيًا.",

      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",

      whatWeDo: "ماذا نقدم",
      whatWeDoDesc: "نقدم أدوات وتجارب قوية لمساعدتك على النمو باستخدام الذكاء الاصطناعي",

      services: {
        aiLearning: {
          title: "تعلم الذكاء الاصطناعي",
          desc: "استكشف مفاهيم الذكاء الاصطناعي من خلال محتوى تفاعلي."
        },
        competitions: {
          title: "المسابقات",
          desc: "شارك في التحديات واكسب نقاط خبرة."
        },
        knowledge: {
          title: "مركز المعرفة",
          desc: "اقرأ مقالات مختارة من خبراء التكنولوجيا."
        },
        tools: {
          title: "أدوات ذكية",
          desc: "استخدم أدوات قوية لزيادة إنتاجيتك."
        }
      },

      pages: {
        competitions: {
          title: "المسابقات",
          desc: 'استمتع بتجربة تعليمية فريدة تعتمد على اللعب، حيث يكون لكل مستخدم ملفه الشخصي وصورته الرمزية. ابدأ رحلتك كمبتدئ، واجمع نقاط الخبرة (XP) من خلال حل المسابقات الأسبوعية والتحديات اليومية للوصول إلى لقب "AI Scientist" وتصدر قائمة المتصدرين.'
        },
        posts: {
          title: "المنشورات",
          desc: "استمتع بقراءة المقالات الحصرية التي يكتبها نخبة من الأطباء والخبراء في مجالات التكنولوجيا، ومتابعة أحدث الاتجاهات والأبحاث في عالم الذكاء الاصطناعي والمجالات التقنية المعاصرة. بناء قاعدة معرفية قوية تضمن لك البقاء على اطلاع بكل ما هو جديد في سوق العمل الفني."
        },
        ai: {
          title: "أدوات الذكاء الاصطناعي",
          desc: "اكتشف مجموعة مختارة من أحدث أدوات الذكاء الاصطناعي لدعم رحلتك التعليمية. ونقدم لك نبذة مختصرة عن كل أداة، مع روابط مباشرة وشروحات مصورة لكيفية استخدامها بفعالية. نهدف إلى تمكينكم من تكييف التكنولوجيا الحديثة لتسهيل مهامكم الأكاديمية والبحثية."
        },
        about: {
          title: "من نحن",
          desc: "نسعى إلى تبسيط مفاهيم التكنولوجيا المتقدمة وجعلها في متناول الجميع، من خلال توفير أدوات الذكاء الاصطناعي التفاعلية والمحتوى المعرفي الموثوق. نهدف إلى تحفيز الفضول العلمي لدى الطلاب من خلال نظام تنافسي ممتع يكافئ الإنجاز ويشجع التطوير المستمر"
        }
      },

      readMore: "اقرأ المزيد",

      ready: "هل أنت مستعد لإطلاق قدراتك؟",
      start: "ابدأ الآن",

      navbar: {
        home: "الرئيسية",
        competitions: "المسابقات",
        posts: "المنشورات",
        ai: "أدوات الذكاء الاصطناعي",
        about: "من نحن",
        contact: "تواصل معنا",
        login: "تسجيل الدخول",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج"
      },

      footer: {
        desc: "نبني المستقبل باستخدام الذكاء الاصطناعي والابتكار. تعلم، استكشف، وتطور مع أحدث التقنيات.",
        quickLinks: "روابط سريعة",
        follow: "تابعنا",
        rights: "جميع الحقوق محفوظة."
      },

      login: {
        title: "تسجيل الدخول 👋",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        emailPlaceholder: "اكتب بريدك الإلكتروني",
        passwordPlaceholder: "اكتب كلمة المرور",
        loginBtn: "تسجيل الدخول",
        loginLoading: "جارٍ تسجيل الدخول...",
        noAccount: "ليس لديك حساب؟",
        signup: "إنشاء حساب",
        google: "جوجل",
        fillError: "من فضلك املأ كل الحقول",
        loginError: "فشل تسجيل الدخول"
      },

      signup: {
        title: "إنشاء حساب جديد 👋",
        name: "الاسم",
        namePlaceholder: "اكتب اسمك",
        year: "السنة الدراسية",
        yearPlaceholder: "اختر السنة الدراسية",
        year1: "السنة الاولي",
        year2: "السنة الثانية",
        year3: "السنة الثالثة",
        year4: "السنة الرابعة",
        email: "البريد الإلكتروني",
        emailPlaceholder: "اكتب بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "تأكيد كلمة المرور",
        button: "إنشاء حساب",
        loading: "جاري إنشاء الحساب...",
        haveAccount: "هل لديك حساب؟",
        login: "تسجيل الدخول",
        errors: {
          required: "من فضلك املأ كل الحقول",
          passwordMatch: "كلمتا المرور غير متطابقتين",
          failed: "فشل إنشاء الحساب"
        }
      },

      about: {
        title: "من نحن",
        desc: "في <span>UniTech</span> نسعى إلى تبسيط مفاهيم التكنولوجيا المتقدمة وجعلها متاحة للجميع، من خلال تقديم أدوات ذكاء اصطناعي تفاعلية ومحتوى معرفي موثوق. نهدف إلى تحفيز فضول الطلاب العلمي من خلال نظام تنافسي ممتع يكافئ الإنجاز ويشجع على التطور المستمر.",

        university: {
          name: "جامعة الفيوم",
          faculty: "كلية التربية النوعية",
          desc: "تلتزم كلية التربية النوعية بجامعة الفيوم بالتميز في التعليم والبحث والابتكار، حيث تعمل على تمكين الطلاب بمهارات تقنية قوية وتشجعهم على التفكير الإبداعي في مجالات حديثة مثل الذكاء الاصطناعي وتطوير البرمجيات."
        },

        supervisor: {
          title: "مشرف المشروع",
          name: "د. ريهام مصطفى",
          desc: "قدمت الدكتورة ريهام مصطفى توجيهًا مستمرًا طوال المشروع، وساهمت خبرتها في الذكاء الاصطناعي وتقنيات التعليم في تحويل المنصة إلى تجربة تعليمية قوية وممتعة."
        },

        team: {
          badge: "فريقنا",
          title: "نؤمن بأهمية العمل الجماعي والتعاون."
        }
      },

      posts: {
        loading: "جاري تحميل UniTech Hub...",
        readMore: "اقرأ المزيد",
        less: "عرض أقل",
        copied: "تم النسخ"
      },

      contact: {
        title: "تواصل معنا",
        desc: "هل لديك سؤال أو مشروع؟ اترك لنا رسالة وسنرد عليك خلال 24 ساعة.",
        sendMessage: "إرسال الرسالة",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        message: "كيف يمكننا مساعدتك؟",
        sending: "جاري الإرسال...",
        sent: "تم إرسال الرسالة!",
        success: "تم استلام رسالتك 🎉"
      },

      profile: {
        levels: "المستويات",
        medals: "الميداليات",
        completed: "مكتمل",
        keepTraining: "استمر في التدريب لتحصل على أول وسام!",
        initiate: "المبتدئ",
        explorer: "المستكشف",
        innovator: "المبتكر",
        leader: "القائد",
        inspider: "الملهم"
      },

      medals: {
        quiz_1: "ميدالية مسابقة البرمجة 1: أنواع اللغات",
        quiz_2: "ميدالية مسابقة البرمجة 2: إدارة الذاكرة والمفاهيم",
        quiz_3: "ميدالية مسابقة البرمجة 3: هياكل البيانات والتطوير",
        quiz_4: "ميدالية مسابقة البرمجة 4: المنطق والبرمجة الكائنية",
        quiz_5: "ميدالية مسابقة البرمجة 5: تحديات بايثون وجافا",
        quiz_6: "ميدالية مسابقة البرمجة 6: الذاكرة والعمليات",
        quiz_7: "ميدالية مسابقة البرمجة 7: البرمجة غير المتزامنة",
        quiz_8: "ميدالية مسابقة البرمجة 8: تعقيد الخوارزميات",
        quiz_9: "ميدالية مسابقة البرمجة 9: أساسيات الحاسوب",
        quiz_10: "ميدالية مسابقة البرمجة 10: الجرافيك والويب",
        quiz_11: "ميدالية مسابقة البرمجة 11: الأدوات والمنهجيات",
        quiz_12: "ميدالية مسابقة البرمجة 12: التقنيات الحديثة",
        quiz_13: "ميدالية مسابقة البرمجة 13: قواعد البيانات المتقدمة",
        quiz_14: "ميدالية مسابقة البرمجة 14: أمن المعلومات",
        quiz_15: "ميدالية مسابقة البرمجة 15: هندسة البرمجيات",
        quiz_16: "ميدالية مسابقة البرمجة 16: تقنيات الويب الحديثة",
        quiz_17: "ميدالية مسابقة البرمجة 17: أنظمة التشغيل",
        quiz_18: "ميدالية مسابقة البرمجة 18: الذكاء الاصطناعي وتعلم الآلة",
        quiz_19: "ميدالية مسابقة البرمجة 19: الحوسبة السحابية",
        quiz_20: "ميدالية مسابقة البرمجة 20: هياكل البيانات والخوارزميات 2",
        quiz_21: "ميدالية مسابقة البرمجة 21: تطوير تطبيقات الهاتف",
        quiz_22: "ميدالية مسابقة البرمجة 22: أساسيات الشبكات والإنترنت",
        quiz_23: "ميدالية مسابقة البرمجة 23: الكود النظيف وأفضل الممارسات",
        quiz_24: "ميدالية مسابقة البرمجة 24: اختبار البرمجيات وضمان الجودة",
        quiz_25: "ميدالية مسابقة البرمجة 25: معلومات تقنية وتاريخية"
      },

      aiTools: {
        title: "جميع فئات أدوات الذكاء الاصطناعي",
        subtitle: "ابحث عن أكثر الأدوات شهرة والمميزة حسب الفئة",
        showAll: "عرض جميع أدوات الإنتاجية بالذكاء الاصطناعي",

        video: {
          title: "أدوات الفيديو بالذكاء الاصطناعي",
          items: ["مولدات الفيديو (4)", "تحرير الفيديو (4)", "تحسين الفيديو (4)"]
        },

        audio: {
          title: "مولدات الصوت بالذكاء الاصطناعي",
          items: ["موسيقى (4)", "تحويل النص إلى كلام (4)", "أدوات الصوت (4)"]
        },

        text: {
          title: "مولدات النصوص بالذكاء الاصطناعي",
          items: ["أدوات الكلام (4)", "إعادة الصياغة (4)", "مولدات الكتابة (4)"]
        },

        image: {
          title: "أدوات الصور بالذكاء الاصطناعي",
          items: ["تعديل الصور (4)", "توليد الصور (4)", "تصميمات (4)"]
        },

        code: {
          title: "أدوات البرمجة بالذكاء الاصطناعي",
          items: ["(4) SQL", "بدون كود (4)", "مساعد برمجي (4)"]
        },

        art: {
          title: "مولدات الفن بالذكاء الاصطناعي",
          items: ["صور رمزية (4)", "بورتريه (4)", "كرتون (4)"]
        }
      },

      categoryDetails: {
        heroTag: "مكتبة أدوات الذكاء الاصطناعي",
        heroTitle: "أدوات قوية",
        heroDescription: "اكتشف أدوات ذكاء اصطناعي مختارة بعناية تساعدك على الإنشاء والتصميم والعمل بشكل أسرع وأكثر ذكاءً.",
        exploreTools: "استكشف الأدوات",
        viewCategories: "عرض الأقسام",
        loadingTools: "جارٍ تحميل الأدوات...",
        toolsCount: "أداة",
        visitTool: "زيارة الأداة →",
        other: "أخرى",
        loginAgain: "يرجى تسجيل الدخول مرة أخرى"
      },

      Swal2: {
        "pointsEarned": "كسبت نقطة جديدة ⚡"
      },

      competitions: {
        competitions_title: "مركز المسابقات",
        tab_competitions: "المسابقات الكبرى",
        tab_daily: "التحدي اليومي",
        leaderboard_btn: "لوحة الصدارة",
        hero_desc: "اختبر معلوماتك، اجمع النقاط، وتصدر لوحة المتصدرين.",
        bonus_xp: "+250 نقطة إضافية",
        weekly_rank: "الترتيب الأسبوعي",
        loading_comp: "جارٍ تجهيز الأسئلة...",
        already_played: "لقد شاركت بالفعل",
        submission_success: "تم الإرسال بنجاح",
        finish_challenge: "إنهاء التحدي",
        wait_next: "بانتظارك تحديات جديدة قريباً، استعد!",
        wait_next_competition: "لقد شاركت بالفعل، انتظر المسابقة القادمة.",
        daily_done_title: "لقد أجبت على سؤال اليوم",
        daily_done_desc: "شكراً لمشاركتك! ننتظرك غداً في تحدٍ جديد.",
        major_done_title: "لقد شاركت بالفعل",
        major_done_desc: "يمكنك متابعة لوحة المتصدرين لمعرفة مركزك الحالي.",
        score: "النتيجة",
        total_points: "إجمالي النقاط",
        current_level: "المستوى الحالي",
        next: "التالي",
        prev: "السابق",
        question: "سؤال",
        of: "من",
        no_data: "لا توجد بيانات متاحة حالياً",
        success_default: "تم الإرسال بنجاح",
        correct_answer_msg: "إجابات صحيحة اشطر كتكوت",
        wrong_answer_msg: "للأسف الاجابة خاطئة ركز وجاوب تاني في سؤال بكره"
      },

      leaderboard: {
        title: "لوحة المتصدرين",
        loading: "جاري تحميل قائمة الأوائل...",
        fetchError: "فشل في جلب البيانات من السيرفر",
        user: "المستخدم",
        rank: "الترتيب",
        points: "النقاط",
        noData: "لا توجد بيانات متاحة حالياً"
      }
      
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }    
  });
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;