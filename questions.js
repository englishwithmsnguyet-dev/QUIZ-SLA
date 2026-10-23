const SLA_TOPICS = {
  FOUNDATIONS: "Nền tảng SLA & ISLA (Foundations)",
  KNOWLEDGE: "Tri thức Ẩn/Hiện & Noticing (Implicit/Explicit)",
  INTERACTION: "Tương tác & Phản hồi (Interaction & Feedback)",
  SCT: "Lý thuyết Văn hóa - Xã hội (Sociocultural Theory)",
  GRAMMAR_PRON: "Ngữ pháp & Phát âm (Grammar & Pronunciation)",
  PRAGMATICS: "Ngữ dụng học (Pragmatics)",
  INDIVIDUAL: "Khác biệt Cá nhân & Động lực (Individual Differences)",
  ESSAY: "Tự luận Tổng hợp (Synthesis Essay)"
};

const SLA_QUESTIONS = [
  {
    id: 1,
    type: "single",
    topic: "PRAGMATICS",
    question: "Acquisition and instruction of pragmatics involve ALL except...",
    options: [
      { key: "A", text: "Socially appropriate language use" },
      { key: "B", text: "Pragmalinguistic features i.e. linguistic means for communication" },
      { key: "C", text: "Social issues such as gender equity" },
      { key: "D", text: "Sociopragmatic features (e.g. when and how to use certain expressions)" }
    ],
    answer: "C",
    explanation: {
      en: "L2 Pragmatics focuses on how learners use language appropriately in social contexts. It comprises two main components (Leech, 1983; Thomas, 1983): Pragmalinguistics (the linguistic resources available to perform speech acts, e.g., modal verbs for requests) and Sociopragmatics (the social perceptions underlying participants' interpretation and performance of communicative action, e.g., politeness, social distance, power). Broader sociopolitical issues like 'gender equity' belong to sociology/critical pedagogy rather than core L2 pragmatic competence.",
      vi: "Ngữ dụng học (Pragmatics) trong SLA nghiên cứu cách sử dụng ngôn ngữ phù hợp với ngữ cảnh giao tiếp xã hội, bao gồm 2 thành tố cốt lõi: Pragmalinguistics (phương tiện ngôn ngữ để thực hiện hành vi lời nói) và Sociopragmatics (quy tắc văn hóa - xã hội quy định khi nào/nói với ai thì phù hợp). Các vấn đề xã hội vĩ mô như 'bình đẳng giới (gender equity)' không thuộc phạm trù cấu phần năng lực ngữ dụng.",
      tip: "Nhớ công thức: Pragmatics = Pragmalinguistics (cấu trúc/từ ngữ) + Sociopragmatics (ngữ cảnh/văn hóa giao tiếp). Loại trừ C."
    }
  },
  {
    id: 2,
    type: "tf",
    topic: "FOUNDATIONS",
    question: "Interlanguage refers to the random and inconsistent language use by L2 learners.",
    options: [
      { key: "A", text: "True" },
      { key: "B", text: "False" }
    ],
    answer: "B",
    explanation: {
      en: "False. Coined by Larry Selinker (1972), 'Interlanguage' refers to an L2 learner's developing linguistic system that is distinct from both L1 and the target L2. Crucially, interlanguage is SYSTEMATIC, rule-governed, and dynamic (evolving over time), rather than random or chaotic.",
      vi: "Sai (False). Khái niệm 'Ngôn ngữ trung gian' (Interlanguage - Selinker, 1972) chỉ hệ thống ngôn ngữ riêng của người học L2 (nằm giữa L1 và L2 đích). Đặc trưng quan trọng nhất của Interlanguage là TÍNH HỆ THỐNG (systematic), có quy tắc riêng và biến đổi linh hoạt (dynamic), chứ KHÔNG phải ngẫu nhiên (random) hay bất nhất.",
      tip: "Từ khóa bẫy: 'random and inconsistent' -> Chọn False ngay vì Interlanguage luôn có tính hệ thống (systematic)."
    }
  },
  {
    id: 3,
    type: "single",
    topic: "INTERACTION",
    question: "What is a key advantage of output-prompting feedback like elicitation?",
    options: [
      { key: "A", text: "It provides the correct form directly" },
      { key: "B", text: "It avoids learner errors entirely" },
      { key: "C", text: "It eliminates the need for noticing" },
      { key: "D", text: "It engages learners in deeper cognitive processing" }
    ],
    answer: "D",
    explanation: {
      en: "Output-prompting corrective feedback (prompts such as elicitation, metalinguistic clues, clarification requests, and repetition) withholds the correct form and pushes learners to self-repair. According to Lyster (2004) and Skill Acquisition Theory, retrieving and producing the correct form themselves engages learners in deeper cognitive processing and strengthens memory traces compared to simply hearing a recast.",
      vi: "Phản hồi thúc đẩy đầu ra (Output-prompting feedback / Prompts như gợi mở - elicitation) không đưa sẵn đáp án đúng mà buộc người học tự nhớ lại và tự sửa lỗi (self-repair). Quá trình này giúp người học xử lý nhận thức sâu hơn (deeper cognitive processing), củng cố kết nối thần kinh và chuyển hóa kiến thức hiệu quả hơn.",
      tip: "Elicitation (gợi mở để học viên tự sửa) -> Tự suy nghĩ -> Deeper cognitive processing (Xử lý nhận thức sâu hơn)."
    }
  },
  {
    id: 4,
    type: "single",
    topic: "PRAGMATICS",
    question: "What is a common method used to assess pragmatic competence?",
    options: [
      { key: "A", text: "Multiple-choice grammar tests" },
      { key: "B", text: "Translation exercises" },
      { key: "C", text: "Discourse completion tasks" },
      { key: "D", text: "Listening comprehension tests" }
    ],
    answer: "C",
    explanation: {
      en: "Discourse Completion Tasks (DCTs) are the most widely used instrument in L2 pragmatics research and assessment. A DCT presents a situational prompt describing the social context (setting, interlocutor's power/distance) and asks learners to write or speak what they would say (e.g., making a request, apology, or refusal).",
      vi: "Discourse Completion Tasks (DCTs - Bài tập hoàn thành diễn ngôn/tình huống giao tiếp) là phương pháp phổ biến nhất để đánh giá năng lực ngữ dụng. Đề bài đưa ra một ngữ cảnh xã hội cụ thể và yêu cầu người học phản hồi (xin lỗi, từ chối, đề nghị...) sao cho phù hợp.",
      tip: "Nhắc đến đánh giá Pragmatics (assess pragmatic competence) -> Chọn ngay Discourse Completion Tasks (DCTs)."
    }
  },
  {
    id: 5,
    type: "single",
    topic: "INTERACTION",
    question: "Which task type is most likely to promote negotiation of meaning?",
    options: [
      { key: "A", text: "Two-way information gap with convergent goals" },
      { key: "B", text: "One-way information gap with divergent goals" },
      { key: "C", text: "Memorization-based tasks" },
      { key: "D", text: "Grammar translation tasks" }
    ],
    answer: "A",
    explanation: {
      en: "According to Pica, Kanagy, and Falodun (1993), tasks generate the highest amount of negotiation of meaning when: (1) they are two-way (each participant holds unique information that must be shared), and (2) they have convergent goals (participants must agree on a single outcome/solution).",
      vi: "Theo nghiên cứu về Task-Based Language Teaching (Pica et al., 1993), hoạt động thúc đẩy 'thương lượng nghĩa' (negotiation of meaning) mạnh mẽ nhất là nhiệm vụ có khoảng trống thông tin hai chiều (Two-way information gap - cả hai bên đều giữ thông tin bắt buộc phải trao đổi) và mục tiêu hội tụ (convergent goals - phải thống nhất chung 1 kết quả).",
      tip: "Công thức vàng của Negotiation of Meaning: Two-way (2 chiều) + Convergent goals (cùng đi đến 1 đáp án thống nhất)."
    }
  },
  {
    id: 6,
    type: "matching",
    topic: "KNOWLEDGE",
    question: "Match the features and types of knowledge.",
    items: [
      { id: "1", prompt: "1. accessible for spontaneous communication", answer: "Implicit knowledge" },
      { id: "2", prompt: "2. metalinguistic awareness", answer: "Explicit knowledge" },
      { id: "3", prompt: "3. used for monitoring language performance", answer: "Explicit knowledge" },
      { id: "4", prompt: "4. incidentally acquired", answer: "Implicit knowledge" }
    ],
    choices: ["Implicit knowledge", "Explicit knowledge"],
    explanation: {
      en: "Implicit knowledge is tacit, intuitive, acquired incidentally without conscious effort, and accessed automatically in spontaneous/time-pressured communication. Explicit knowledge is conscious, declarative knowledge of rules and metalinguistic terms, requiring controlled processing and used to monitor/edit language output when time allows (Ellis, 2005; Krashen, 1982).",
      vi: "• Implicit knowledge (Tri thức ẩn/tiềm thức): Tiếp thu ngẫu nhiên (incidentally acquired - mục 4) và truy xuất tự động khi giao tiếp tự nhiên, tức thời (accessible for spontaneous communication - mục 1).\n• Explicit knowledge (Tri thức hiện/ý thức): Nhận thức siêu ngôn ngữ về quy tắc (metalinguistic awareness - mục 2) và dùng để kiểm soát/chỉnh sửa lỗi khi nói viết (used for monitoring language performance - mục 3).",
      tip: "Tự nhiên/Tức thời (spontaneous, incidental) = Implicit | Quy tắc/Giám sát (metalinguistic, monitoring) = Explicit."
    }
  },
  {
    id: 7,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "Which statement is false?",
    options: [
      { key: "A", text: "Pronunciation is learnable and guided practice and awareness can reshape habits." },
      { key: "B", text: "Awareness and feedback do not make any change in pronunciation." },
      { key: "C", text: "Intelligibility rather than native-like accent is the target of instruction." },
      { key: "D", text: "An integrated instructional approach is best for pronunciation instruction." }
    ],
    answer: "B",
    explanation: {
      en: "Statement B is false. Empirical SLA research (e.g., Derwing & Munro, 2015; Saito, 2012) demonstrates that phonological awareness, explicit instruction, and corrective feedback significantly improve L2 pronunciation. Furthermore, modern SLA prioritizes 'intelligibility' and 'comprehensibility' over native-like accent (nativeness principle).",
      vi: "Phát biểu B là SAI. Nghiên cứu ISLA chứng minh nhận thức âm vị (awareness) và phản hồi sửa lỗi (feedback) giúp cải thiện phát âm rõ rệt. Các câu A, C, D đều đúng (mục tiêu dạy phát âm hiện đại là Intelligibility - sự dễ hiểu, chứ không đòi hỏi giọng bản xứ tuyệt đối).",
      tip: "Câu phủ định cực đoan 'do not make any change' trong giảng dạy SLA luôn là mệnh đề Sai (False)."
    }
  },
  {
    id: 8,
    type: "single",
    topic: "PRAGMATICS",
    question: "Which factor most enhances pragmatic development in L2 learners?",
    options: [
      { key: "A", text: "Reading grammar books" },
      { key: "B", text: "Studying phonetics" },
      { key: "C", text: "Learning isolated vocabulary" },
      { key: "D", text: "Exposure to authentic language use" }
    ],
    answer: "D",
    explanation: {
      en: "Pragmatic competence relies heavily on understanding how language functions in real social contexts. Therefore, exposure to authentic language use (combined with awareness-raising/explicit instruction) is essential for learners to observe how speech acts, politeness strategies, and conversational routines operate naturally.",
      vi: "Sự phát triển năng lực ngữ dụng (pragmatic development) phụ thuộc lớn vào việc tiếp xúc với ngôn ngữ thực tế trong ngữ cảnh giao tiếp tự nhiên (Exposure to authentic language use), vì sách ngữ pháp, ngữ âm hay từ vựng rời rạc không thể hiện được sắc thái giao tiếp xã hội.",
      tip: "Pragmatics gắn liền với ngữ cảnh thực tế -> Chọn 'Exposure to authentic language use'."
    }
  },
  {
    id: 9,
    type: "single",
    topic: "FOUNDATIONS",
    question: "The role of Second Language Acquisition research is …………………………",
    options: [
      { key: "A", text: "to understand how learners can be taught." },
      { key: "B", text: "to inform linguists of how learners develop language." },
      { key: "C", text: "to tell stories of successful learners." },
      { key: "D", text: "to inform understanding of the second language learning process and how it can be facilitated or hindered." }
    ],
    answer: "D",
    explanation: {
      en: "SLA (and specifically Instructed SLA) investigates both the underlying cognitive/social mechanisms of how learners acquire a second language AND the internal/external factors or instructional interventions that facilitate or hinder that developmental process.",
      vi: "Vai trò toàn diện nhất của nghiên cứu SLA là giúp hiểu rõ quá trình thụ đắc ngôn ngữ thứ hai (second language learning process) cũng như các yếu tố thúc đẩy hoặc cản trở (facilitated or hindered) quá trình đó.",
      tip: "Chọn đáp án đầy đủ và bao quát nhất (D): hiểu quá trình học L2 + cách thức thúc đẩy/cản trở quá trình đó."
    }
  },
  {
    id: 10,
    type: "single",
    topic: "FOUNDATIONS",
    question: "Which statement is False about Second Language Acquisition?",
    options: [
      { key: "A", text: "SLA involves the study of how L2 instruction can impact the L2 implicit knowledge." },
      { key: "B", text: "SLA studies the L2 learner’s development of different aspects of L2 knowledge." },
      { key: "C", text: "One of the fundamental questions of SLA is the nature of knowledge that L2 learners develop." },
      { key: "D", text: "SLA focuses on the acquisition of a second language recognized as an official language by a government." }
    ],
    answer: "D",
    explanation: {
      en: "In SLA terminology, 'Second Language (L2)' is an umbrella term referring to ANY language learned after the first language (L1), regardless of whether it is spoken in the surrounding community, recognized officially by a government, or learned as a foreign language (FL) in a classroom (Ortega, 2009; Loewen, 2020).",
      vi: "Trong thuật ngữ SLA, 'Second Language (L2)' là khái niệm chung chỉ BẤT KỲ ngôn ngữ nào được học sau tiếng mẹ đẻ (L1), bất kể đó là ngôn ngữ thứ 2, thứ 3, ngoại ngữ (Foreign Language) hay có được chính phủ công nhận là ngôn ngữ chính thức hay không. Do đó D là phát biểu SAI.",
      tip: "SLA nghiên cứu mọi ngôn ngữ học sau L1, không giới hạn ở 'official language by a government'."
    }
  },
  {
    id: 11,
    type: "multi",
    topic: "PRAGMATICS",
    question: "Tick all factors influencing how pragmatics is acquired.",
    options: [
      { key: "A", text: "Assessment" },
      { key: "B", text: "Learners’ age" },
      { key: "C", text: "Learning environment" },
      { key: "D", text: "Learning motivation" },
      { key: "E", text: "Learner proficiency level" }
    ],
    answer: ["B", "C", "D", "E"],
    explanation: {
      en: "Pragmatic acquisition is influenced by individual learner factors (learners' age, learning motivation, L2 proficiency level) and contextual factors (learning environment, such as study abroad/second language setting vs. foreign language classroom). 'Assessment' measures competence rather than being a primary developmental factor of acquisition in this taxonomy.",
      vi: "Các yếu tố ảnh hưởng đến quá trình thụ đắc ngữ dụng bao gồm: Độ tuổi (B - Learners' age), Môi trường học tập (C - Learning environment), Động lực học tập (D - Learning motivation) và Trình độ ngôn ngữ của người học (E - Learner proficiency level). Loại trừ A (Assessment - Kiểm tra đánh giá).",
      tip: "Chọn 4 yếu tố thuộc về người học & môi trường: Age (B), Environment (C), Motivation (D), Proficiency (E). Bỏ Assessment (A)."
    }
  },
  {
    id: 12,
    type: "matching",
    topic: "INDIVIDUAL",
    question: "Match the individual factors and their characteristics.",
    items: [
      { id: "1", prompt: "1. working memory", answer: "stable trait" },
      { id: "2", prompt: "2. Learning strategies", answer: "dynamic and changing" },
      { id: "3", prompt: "3. language learning aptitude", answer: "stable trait" },
      { id: "4", prompt: "4. willingness to communicate", answer: "dynamic and changing" },
      { id: "5", prompt: "5. emotion", answer: "dynamic and changing" },
      { id: "6", prompt: "6. Learning styles", answer: "stable trait" }
    ],
    choices: ["stable trait", "dynamic and changing"],
    explanation: {
      en: "In SLA Individual Differences (ID) research: Cognitive capacities and general predispositions like Working Memory, Language Learning Aptitude, and Learning Styles are viewed as relatively fixed/stable traits. Conversely, affective and behavioral factors like Learning Strategies, Willingness to Communicate (WTC), Motivation, and Emotions fluctuate across contexts and time (dynamic and changing) and are malleable through classroom instruction.",
      vi: "• Stable trait (Đặc điểm ổn định, ít thay đổi): Trí nhớ làm việc (Working memory), Năng khiếu ngôn ngữ (Aptitude), Phong cách học tập (Learning styles).\n• Dynamic and changing (Linh hoạt, thay đổi theo thời gian & ngữ cảnh): Chiến lược học tập (Learning strategies), Sự sẵn sàng giao tiếp (Willingness to communicate - WTC), Cảm xúc (Emotion).",
      tip: "Cognitive/Bẩm sinh (Working memory, Aptitude, Styles) = Stable trait | Hành vi/Cảm xúc (Strategies, WTC, Emotion) = Dynamic & changing."
    }
  },
  {
    id: 13,
    type: "tf",
    topic: "FOUNDATIONS",
    question: "Second Language Acquisition not only presents explanations about how L2 is learned, but also researches the role of L2 instruction in the acquisition process.",
    options: [
      { key: "A", text: "True" },
      { key: "B", text: "False" }
    ],
    answer: "A",
    explanation: {
      en: "True. While general SLA investigates naturalistic and cognitive processes of learning an L2, its major subfield—Instructed Second Language Acquisition (ISLA)—specifically examines how pedagogical interventions and classroom instruction impact and facilitate the acquisition process.",
      vi: "Đúng (True). SLA không chỉ giải thích cơ chế học L2 tự nhiên mà còn nghiên cứu sâu về vai trò của hoạt động giảng dạy (L2 instruction / ISLA) đối với quá trình thụ đắc ngôn ngữ.",
      tip: "SLA bao gồm cả cơ chế học L2 lẫn vai trò của Instruction (ISLA) -> True."
    }
  },
  {
    id: 14,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "According to the Teachability Hypothesis, what determines when a learner can acquire a grammatical structure?",
    options: [
      { key: "A", text: "The learner’s motivation level" },
      { key: "B", text: "The number of times the structure is practiced" },
      { key: "C", text: "The complexity of the structure" },
      { key: "D", text: "The learner’s developmental readiness" }
    ],
    answer: "D",
    explanation: {
      en: "Manfred Pienemann's (1984, 1998) Teachability Hypothesis (part of Processability Theory) posits that instruction can only promote language acquisition if the learner's interlanguage is close to the point when the structure to be taught is acquired naturally—that is, learners cannot skip stages and must have 'developmental readiness'.",
      vi: "Theo Giả thuyết Khả năng Giảng dạy (Teachability Hypothesis của Pienemann), người học chỉ có thể thụ đắc một cấu trúc ngữ pháp khi họ đã đạt đến 'độ sẵn sàng phát triển' (developmental readiness) ở giai đoạn tương ứng, không thể đốt cháy giai đoạn dù dạy nhiều lần.",
      tip: "Teachability Hypothesis (Pienemann) = Developmental readiness (Sự sẵn sàng về mặt phát triển)."
    }
  },
  {
    id: 15,
    type: "matching",
    topic: "SCT",
    question: "Match the information.",
    items: [
      { id: "1", prompt: "1. Support provided to help learners perform beyond their current ability", answer: "scaffolding" },
      { id: "2", prompt: "2. Learners transform social interactions into internal cognitive processes", answer: "internalization" },
      { id: "3", prompt: "3. Use of tools (e.g., language, peers, technology) to aid learning", answer: "mediation" }
    ],
    choices: ["scaffolding", "internalization", "mediation"],
    explanation: {
      en: "These are three core concepts of Vygotskian Sociocultural Theory (SCT) in SLA (Lantolf & Thorne, 2006):\n1. Scaffolding: Temporary dialogic support provided by an expert/peer enabling a learner to perform within their ZPD.\n2. Internalization: The process by which intermental (social/external) activity is transformed into intramental (internal cognitive) self-regulation.\n3. Mediation: The use of symbolic tools (language) or material tools (technology, peers) to regulate cognitive activity.",
      vi: "Ba khái niệm trụ cột của Lý thuyết Văn hóa - Xã hội (Sociocultural Theory - Vygotsky):\n1. Support... beyond current ability -> Scaffolding (Bắc giàn giáo/Hỗ trợ vừa sức).\n2. Transform social interactions into internal cognitive processes -> Internalization (Nội tâm hóa).\n3. Use of tools (language, peers, technology) -> Mediation (Trung gian hóa).",
      tip: "Support = Scaffolding | Social -> Internal = Internalization | Use of tools = Mediation."
    }
  },
  {
    id: 16,
    type: "single",
    topic: "INTERACTION",
    question: "What does Swain’s Comprehensible Output Hypothesis argue?",
    options: [
      { key: "A", text: "Output is unnecessary for language learning" },
      { key: "B", text: "Output helps learners process morphosyntactic elements and test hypotheses" },
      { key: "C", text: "Learners should only focus on semantic meaning" },
      { key: "D", text: "Grammar instruction should precede output activities" }
    ],
    answer: "B",
    explanation: {
      en: "Merrill Swain (1985, 1995) formulated the Comprehensible Output Hypothesis in response to Krashen's Input Hypothesis. She argued that while comprehensible input allows learners to rely on semantic processing (guessing meaning from context), producing pushed output forces learners to move to syntactic/morphosyntactic processing, notice gaps in their interlanguage, and test hypotheses about how the target language works.",
      vi: "Giả thuyết Đầu ra Khả hiểu của Merrill Swain (Comprehensible Output Hypothesis) chỉ ra rằng nếu chỉ nghe/đọc (input), người học chỉ cần đoán nghĩa từ vựng (semantic processing). Khi buộc phải nói/viết (output), người học mới phải xử lý cấu trúc hình thái - cú pháp (process morphosyntactic elements), nhận ra lỗ hổng kiến thức và kiểm nghiệm giả thuyết ngôn ngữ (test hypotheses).",
      tip: "Swain's Output Hypothesis = Xử lý cú pháp/hình thái (morphosyntactic) + Kiểm nghiệm giả thuyết (test hypotheses)."
    }
  },
  {
    id: 17,
    type: "fill",
    topic: "FOUNDATIONS",
    question: "Instructed Second Language Acquisition is a theoretically and empirically based field of academic inquiry that aims to understand how the systematic manipulation of the mechanisms of learning and/or the .................... under which they occur enable or facilitate the development and acquisition of an additional language (Loewen, 2020, p.3)",
    answer: "conditions",
    acceptedAnswers: ["conditions", "condition"],
    explanation: {
      en: "This is the verbatim classic definition of ISLA by Shawn Loewen (2020, p. 3, Introduction to Instructed Second Language Acquisition): '...how the systematic manipulation of the mechanisms of learning and/or the CONDITIONS under which they occur enable or facilitate the development and acquisition of an additional language.'",
      vi: "Đây là định nghĩa kinh điển về ISLA của Shawn Loewen (2020, tr. 3): ISLA nghiên cứu cách thức tác động có hệ thống lên các cơ chế học tập (mechanisms of learning) và/hoặc các ĐIỀU KIỆN (conditions) mà trong đó việc học diễn ra nhằm thúc đẩy sự thụ đắc ngôn ngữ.",
      tip: "Cặp từ khóa trong định nghĩa Loewen (2020): 'mechanisms of learning and/or the CONDITIONS under which they occur'."
    }
  },
  {
    id: 18,
    type: "multi",
    topic: "FOUNDATIONS",
    question: "What are the theoretical foundations for instructed second language acquisition?",
    options: [
      { key: "A", text: "Skill Acquisition Theory" },
      { key: "B", text: "Interaction theory" },
      { key: "C", text: "Universal Grammar" },
      { key: "D", text: "Input Processing Theory" },
      { key: "E", text: "Sociocultural Theory" }
    ],
    answer: ["A", "B", "D", "E"],
    explanation: {
      en: "Major theoretical frameworks directly underpinning classroom Instructed SLA (ISLA) include Skill Acquisition Theory (DeKeyser), Interaction Theory (Long), Input Processing Theory (VanPatten), and Sociocultural Theory (Vygotsky/Lantolf). In contrast, Chomsky's Universal Grammar (UG) is a formal linguistic theory focusing on innate biological mental grammar and claims instruction has minimal effect on core UG parameters.",
      vi: "Các nền tảng lý thuyết cốt lõi cho Giảng dạy Ngôn ngữ thứ hai (ISLA) gồm: Skill Acquisition Theory (A), Interaction Theory (B), Input Processing Theory (D), và Sociocultural Theory (E). Loại trừ C (Universal Grammar - Ngữ pháp phổ quát của Chomsky vì thiên về bản năng sinh học bẩm sinh hơn là tác động sư phạm).",
      tip: "Chọn A, B, D, E. Loại trừ C (Universal Grammar)."
    }
  },
  {
    id: 19,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "Which best reflects a key fact about grammar acquisition in second language learning?",
    options: [
      { key: "A", text: "Grammar acquisition occurs in a fixed order that can be changed through instruction." },
      { key: "B", text: "Explicit instruction always leads to immediate and accurate grammar use in communication." },
      { key: "C", text: "Learners acquire grammatical structures in a natural developmental sequence, regardless of instruction." },
      { key: "D", text: "Learners can acquire any grammar rule if it is taught clearly and repeatedly." }
    ],
    answer: "C",
    explanation: {
      en: "Morpheme studies (Dulay & Burt; Krashen) and developmental sequence research (Pienemann, Ellis) show that L2 learners pass through predictable, natural developmental sequences when acquiring grammatical structures (e.g., negation, question formation). While instruction can speed up the rate of acquisition, it cannot alter or skip the natural route/sequence.",
      vi: "Nghiên cứu SLA khẳng định người học thụ đắc các cấu trúc ngữ pháp theo một trình tự phát triển tự nhiên (natural developmental sequence) bất kể thứ tự giảng dạy trên lớp. Việc dạy học giúp tăng TỐC ĐỘ (rate) học nhưng không làm thay đổi LỘ TRÌNH tự nhiên (route/sequence).",
      tip: "Instruction speeds up the RATE, but cannot change the natural DEVELOPMENTAL SEQUENCE (Route)."
    }
  },
  {
    id: 20,
    type: "multi",
    topic: "INTERACTION",
    question: "What factors influence the quality of interaction in the classroom?",
    options: [
      { key: "A", text: "Learners’ traits such as mindset and attitude towards collaboration" },
      { key: "B", text: "Learners’ background" },
      { key: "C", text: "Learners’ proficiency levels" },
      { key: "D", text: "Context of interaction" },
      { key: "E", text: "Learners’ use of L1 during interaction" }
    ],
    answer: ["A", "C", "D", "E"],
    explanation: {
      en: "In classroom interaction research (e.g., Storch, Philp, Loewen), the quality of peer and classroom interaction is shaped by learners' mindset/attitude toward collaboration (A), relative proficiency levels (C), the context/modality of interaction (D), and how learners use their L1 as a cognitive/mediational tool during tasks (E).",
      vi: "Các yếu tố ảnh hưởng trực tiếp đến chất lượng tương tác trong lớp học bao gồm: Thái độ & tư duy hợp tác (A), Trình độ ngôn ngữ (C), Ngữ cảnh tương tác (D), và Việc sử dụng tiếng mẹ đẻ L1 trong khi tương tác (E). Loại trừ B (Learners' background chung chung).",
      tip: "Chọn A, C, D, E (loại trừ B - Learners' background)."
    }
  },
  {
    id: 21,
    type: "single",
    topic: "SCT",
    question: "Which of the following best distinguishes Long’s Interaction Theory from Sociocultural Theory in second language acquisition?",
    options: [
      { key: "A", text: "Sociocultural Theory views learning as individual discovery, while Long’s theory promotes teacher-led instruction" },
      { key: "B", text: "Long’s theory centers on negotiation for meaning during interaction, while Sociocultural Theory emphasizes mediated learning through social collaboration" },
      { key: "C", text: "Long’s theory emphasizes social context, while Sociocultural Theory focuses on internal cognitive processes" },
      { key: "D", text: "Both theories reject the role of social interaction in language learning" }
    ],
    answer: "B",
    explanation: {
      en: "Long's Interaction Hypothesis is cognitive-interactionist: interaction serves as a trigger for internal cognitive mechanisms (selective attention/noticing) via negotiation for meaning during communication breakdowns. Vygotsky's Sociocultural Theory (SCT) is socially grounded: learning itself originates in social activity through mediation, scaffolding, and collaborative dialogue within the ZPD.",
      vi: "Điểm phân biệt cốt lõi:\n• Long's Interaction Theory: Tập trung vào 'thương lượng nghĩa' (negotiation for meaning) khi giao tiếp gặp trục trặc để kích hoạt sự chú ý nhận thức bên trong.\n• Sociocultural Theory (Vygotsky): Nhấn mạnh việc học qua trung gian (mediated learning) và sự hợp tác xã hội (social collaboration / scaffolding).",
      tip: "Long = Negotiation for meaning | Sociocultural Theory = Mediated learning through social collaboration."
    }
  },
  {
    id: 22,
    type: "single",
    topic: "INTERACTION",
    question: "What is the primary goal of the Interaction Approach in second language acquisition (SLA)?",
    options: [
      { key: "A", text: "To teach grammar rules explicitly" },
      { key: "B", text: "To help learners develop implicit knowledge for meaningful communication" },
      { key: "C", text: "To develop learners’ vocabulary through memorization" },
      { key: "D", text: "To focus exclusively on mechanical pronunciation drills" }
    ],
    answer: "B",
    explanation: {
      en: "The Interaction Approach (Gass & Mackey; Long) posits that engaging in meaningful communicative interaction—receiving comprehensible input, negotiating for meaning, receiving corrective feedback, and producing modified output—primarily drives the development of L2 implicit knowledge needed for real-time communication.",
      vi: "Mục tiêu chính của đường hướng Tương tác (Interaction Approach) trong SLA là giúp người học phát triển tri thức ẩn (implicit knowledge) thông qua giao tiếp có ý nghĩa (meaningful communication), chứ không phải học thuộc lòng quy tắc hay từ vựng rời rạc.",
      tip: "Interaction Approach -> Phát triển Implicit knowledge cho Meaningful communication."
    }
  },
  {
    id: 23,
    type: "single",
    topic: "INTERACTION",
    question: "Which type of corrective feedback is considered input-providing and typically implicit?",
    options: [
      { key: "A", text: "Elicitations" },
      { key: "B", text: "Metalinguistic feedback" },
      { key: "C", text: "Clarification requests" },
      { key: "D", text: "Recasts" }
    ],
    answer: "D",
    explanation: {
      en: "In Lyster and Ranta's (1997) and Sheen & Ellis's (2011) taxonomy of oral corrective feedback:\n- Input-providing vs. Output-prompting: Recasts and Explicit Correction provide the correct target form (input-providing), whereas Elicitation, Metalinguistic feedback, Clarification requests, and Repetition withhold the form (output-prompting).\n- Implicit vs. Explicit: Conversational recasts reformulate the learner's erroneous utterance without overtly stating an error was made, making them typically implicit.",
      vi: "Phân loại phản hồi sửa lỗi (Corrective Feedback):\n• Recasts (cải tổ câu/nói lại câu đúng giúp học viên): Vừa cung cấp sẵn dạng đúng (input-providing), vừa diễn ra tự nhiên trong mạch hội thoại nên mang tính ngầm ẩn (typically implicit).\n• A, B, C đều thuộc nhóm Output-prompting (yêu cầu học viên tự sửa).",
      tip: "Input-providing + Implicit = Recasts (Giáo viên nhắc lại câu đúng một cách tự nhiên)."
    }
  },
  {
    id: 24,
    type: "single",
    topic: "FOUNDATIONS",
    question: "Which ONE is NOT discussed by SLA researchers?",
    options: [
      { key: "A", text: "how to learn a second language successfully" },
      { key: "B", text: "individual factors that influence second language learning" },
      { key: "C", text: "socio-cultural environment in which second language learning takes place" },
      { key: "D", text: "mechanism by which second language acquisition takes place" }
    ],
    answer: "A",
    explanation: {
      en: "SLA is a scientific and empirical discipline that investigates the cognitive mechanisms of acquisition (D), individual learner differences (B), and sociocultural contexts (C). It does NOT prescribe simplistic 'self-help recipes' on 'how to learn a second language successfully' (A).",
      vi: "Các nhà nghiên cứu SLA tìm hiểu bản chất khoa học của cơ chế thụ đắc (D), các yếu tố cá nhân (B) và môi trường văn hóa - xã hội (C), chứ không phải viết cẩm nang dạy mẹo 'làm thế nào để học thành công một ngoại ngữ' (A).",
      tip: "Loại trừ câu mang tính lời khuyên chủ quan 'how to learn a second language successfully' (A)."
    }
  },
  {
    id: 25,
    type: "matching",
    topic: "GRAMMAR_PRON",
    question: "Match the instructional method with its primary characteristic.",
    items: [
      { id: "1", prompt: "1. Begins with rule explanation, followed by controlled and freer practice", answer: "PPP" },
      { id: "2", prompt: "2. Emphasizes comprehension and input processing", answer: "Processing instruction" },
      { id: "3", prompt: "3. Involves reconstructing a text to focus on form", answer: "Dictogloss" },
      { id: "4", prompt: "4. Directly draws attention to linguistic features", answer: "Explicit instruction" },
      { id: "5", prompt: "5. Focuses on learners discovering rules inductively", answer: "Consciousness-raising tasks" }
    ],
    choices: [
      "PPP",
      "Processing instruction",
      "Dictogloss",
      "Explicit instruction",
      "Consciousness-raising tasks"
    ],
    explanation: {
      en: "1. PPP (Presentation-Practice-Production): Deductive rule presentation -> controlled drills -> free production (Skill Acquisition Theory).\n2. Processing Instruction (VanPatten): Alters learners' default input processing strategies through structured input activities focusing on comprehension.\n3. Dictogloss (Wajnryb/Swain): Learners listen to a short text and collaboratively reconstruct it, pushing focus on grammatical form.\n4. Explicit instruction: Directly draws conscious attention to target linguistic features.\n5. Consciousness-raising (CR) tasks: Learners analyze language data to discover grammatical rules inductively.",
      vi: "Mẹo nối nhanh 5 phương pháp:\n1. Rule explanation -> controlled -> freer practice = PPP\n2. Comprehension and input processing = Processing instruction\n3. Reconstructing a text = Dictogloss (Nghe và tái tạo văn bản theo nhóm)\n4. Directly draws attention to linguistic features = Explicit instruction\n5. Discovering rules inductively (quy nạp) = Consciousness-raising tasks",
      tip: "Reconstructing text = Dictogloss | Inductive discovery = Consciousness-raising | Rule -> Practice = PPP."
    }
  },
  {
    id: 26,
    type: "matching",
    topic: "GRAMMAR_PRON",
    question: "Match each method of pronunciation instruction with its theoretical basis.",
    items: [
      { id: "1", prompt: "1. Focus on form instruction", answer: "Cognitivism and Communicative Language Teaching" },
      { id: "2", prompt: "2. Repetition drills", answer: "Behaviorist learning and Audiolingual method" },
      { id: "3", prompt: "3. Explicit instruction", answer: "Skill Acquisition Theory" },
      { id: "4", prompt: "4. Collaborative peer tasks", answer: "Sociocultural Theory" }
    ],
    choices: [
      "Cognitivism and Communicative Language Teaching",
      "Behaviorist learning and Audiolingual method",
      "Skill Acquisition Theory",
      "Sociocultural Theory"
    ],
    explanation: {
      en: "1. Focus on form instruction integrates cognitive noticing within communicative tasks (Cognitivism & CLT).\n2. Repetition drills (" + '"listen and repeat"' + ") stem from habit-formation in Behaviorism and the Audiolingual Method (ALM).\n3. Explicit phonetic/phonological instruction moves from declarative knowledge to proceduralization via practice (Skill Acquisition Theory).\n4. Collaborative peer pronunciation activities rely on scaffolding and mediation (Sociocultural Theory).",
      vi: "Nối phương pháp dạy phát âm với cơ sở lý thuyết:\n1. Focus on form instruction — Cognitivism and Communicative Language Teaching (Nhận thức & Giao tiếp)\n2. Repetition drills (Lặp lại máy móc) — Behaviorist learning and Audiolingual method (Thuyết hành vi & Nghe-Nói)\n3. Explicit instruction (Dạy quy tắc tường minh) — Skill Acquisition Theory (Thuyết thụ đắc kỹ năng)\n4. Collaborative peer tasks — Sociocultural Theory",
      tip: "Repetition drills = Behaviorist/Audiolingual | Explicit = Skill Acquisition | Focus on form = Cognitivism & CLT."
    }
  },
  {
    id: 27,
    type: "single",
    topic: "SCT",
    question: "Which classroom practice best reflects the pedagogical application of Sociocultural Theory?",
    options: [
      { key: "A", text: "Providing only summative assessments without interaction" },
      { key: "B", text: "Assigning individual language tasks" },
      { key: "C", text: "Assigning silent individual grammar drills" },
      { key: "D", text: "Facilitating collaborative tasks where learners scaffold each other’s language use" }
    ],
    answer: "D",
    explanation: {
      en: "In Sociocultural Theory (Vygotsky; Swain's 'languaging' and Donato's 'collective scaffolding'), peer collaboration allows learners to co-construct knowledge and scaffold one another within their Zones of Proximal Development (ZPD).",
      vi: "Ứng dụng sư phạm rõ nét nhất của Lý thuyết Văn hóa - Xã hội (Sociocultural Theory) là tổ chức các nhiệm vụ hợp tác (collaborative tasks) nơi người học hỗ trợ/bắc giàn giáo (scaffold) lẫn nhau trong quá trình sử dụng ngôn ngữ.",
      tip: "Sociocultural Theory = Collaborative tasks + Scaffolding."
    }
  },
  {
    id: 28,
    type: "fill",
    topic: "SCT",
    question: "What is the Vygotskian concept that describes the space between what a learner can do independently and what they can do with support?",
    answer: "ZPD (zone of proximal development)",
    acceptedAnswers: [
      "zpd",
      "zone of proximal development",
      "the zone of proximal development",
      "zpd (zone of proximal development)",
      "zone of proximal development (zpd)"
    ],
    explanation: {
      en: "Lev Vygotsky defined the Zone of Proximal Development (ZPD) as 'the distance between the actual developmental level as determined by independent problem solving and the level of potential development as determined through problem solving under adult guidance or in collaboration with more capable peers.'",
      vi: "Vùng phát triển gần — ZPD (Zone of Proximal Development) của Vygotsky là khoảng cách giữa năng lực hiện tại (những gì người học tự làm được độc lập) và năng lực tiềm năng (những gì họ làm được khi có sự hỗ trợ/scaffolding từ giáo viên hoặc bạn học).",
      tip: "Khoảng cách giữa Independent (tự làm) và With support (có hỗ trợ) = ZPD (Zone of Proximal Development)."
    }
  },
  {
    id: 29,
    type: "multi",
    topic: "INDIVIDUAL",
    question: "Tick the individual differences that can be impacted by instruction in the classroom.",
    options: [
      { key: "A", text: "motivation" },
      { key: "B", text: "willingness to communicate" },
      { key: "C", text: "emotions" },
      { key: "D", text: "aptitude" },
      { key: "E", text: "working memory" }
    ],
    answer: ["A", "B", "C"],
    explanation: {
      en: "Dynamic, context-dependent affective and conative factors—namely Motivation (A), Willingness to Communicate / WTC (B), and Emotions like anxiety and enjoyment (C)—can be directly influenced and enhanced by teacher practices, task design, and classroom climate. In contrast, cognitive traits like Aptitude (D) and Working Memory (E) are stable biological/cognitive capacities not easily changed by language instruction.",
      vi: "Hoạt động giảng dạy trên lớp có thể tác động và cải thiện các yếu tố biến thiên (dynamic factors) gồm: Động lực (A - motivation), Sự sẵn sàng giao tiếp (B - willingness to communicate), và Cảm xúc (C - emotions). Ngược lại, Năng khiếu (D - aptitude) và Trí nhớ làm việc (E - working memory) là đặc điểm nhận thức cố định (stable traits).",
      tip: "Liên hệ câu 12: Giáo viên chỉ tác động được các yếu tố Dynamic (Motivation, WTC, Emotions - A, B, C), không đổi được Aptitude & Working Memory (D, E)."
    }
  },
  {
    id: 30,
    type: "single",
    topic: "INTERACTION",
    question: "According to Long’s Interaction Hypothesis, what process is central to facilitating L2 acquisition?",
    options: [
      { key: "A", text: "Negotiation for meaning during communication breakdowns" },
      { key: "B", text: "Memorizing vocabulary lists" },
      { key: "C", text: "Avoiding errors through mechanical drills" },
      { key: "D", text: "Translating sentences between L1 and L2" }
    ],
    answer: "A",
    explanation: {
      en: "Michael Long's (1981, 1996) Interaction Hypothesis states that 'negotiation for meaning'—triggered when interlocutors experience communication breakdowns and use comprehension checks, confirmation checks, and clarification requests—connects input, internal learner capacities (selective attention), and output in productive ways.",
      vi: "Theo Giả thuyết Tương tác của Michael Long (Interaction Hypothesis), quá trình trung tâm thúc đẩy thụ đắc L2 là 'Thương lượng nghĩa khi giao tiếp gặp trục trặc' (Negotiation for meaning during communication breakdowns).",
      tip: "Long's Interaction Hypothesis = Negotiation for meaning during communication breakdowns."
    }
  },
  {
    id: 31,
    type: "tf",
    topic: "FOUNDATIONS",
    question: "One fact about the process of L2 acquisition is that L2 learners follow a similar developmental route in acquiring a new language.",
    options: [
      { key: "A", text: "True" },
      { key: "B", text: "False" }
    ],
    answer: "A",
    explanation: {
      en: "True. Across diverse L1 backgrounds and ages, L2 learners exhibit remarkably similar developmental routes (orders of acquisition for morphemes and developmental sequences for syntax like negation and questions).",
      vi: "Đúng (True). Một thực tế đã được chứng minh trong SLA (Ortega, 2009; Ellis, 2015) là người học L2 dù khác tiếng mẹ đẻ vẫn đi theo một lộ trình phát triển tương đồng (similar developmental route) khi thụ đắc ngôn ngữ mới.",
      tip: "Similar developmental route = True (Đồng nhất với câu 19)."
    }
  },
  {
    id: 32,
    type: "single",
    topic: "PRAGMATICS",
    question: "Which instructional approach is most effective for teaching pragmatics?",
    options: [
      { key: "A", text: "Explicit teaching of speech acts" },
      { key: "B", text: "Implicit instruction" },
      { key: "C", text: "Dictation exercises" },
      { key: "D", text: "Silent reading practice" }
    ],
    answer: "A",
    explanation: {
      en: "Meta-analyses of L2 pragmatics instruction (e.g., Jeon & Kaya, 2006; Taguchi, 2015) consistently conclude that explicit instruction—directly explaining pragmalinguistic forms and sociopragmatic norms for speech acts—is significantly more effective than implicit instruction alone, because pragmatic nuances often go unnoticed without metapragmatic explanation.",
      vi: "Các nghiên cứu tổng hợp trong ISLA chỉ ra rằng dạy ngữ dụng học hiệu quả nhất là Giảng dạy tường minh các hành vi lời nói (Explicit teaching of speech acts), vì các quy tắc ngầm về lịch sự/văn hóa rất khó tự nhận biết nếu chỉ dạy ẩn (implicit).",
      tip: "Dạy Pragmatics hiệu quả nhất = Explicit teaching of speech acts."
    }
  },
  {
    id: 33,
    type: "tf",
    topic: "SCT",
    question: "According to Sociocultural Theory, language learning occurs solely through internal cognitive processes without the influence of social interaction.",
    options: [
      { key: "A", text: "True" },
      { key: "B", text: "False" }
    ],
    answer: "B",
    explanation: {
      en: "False. Sociocultural Theory (Vygotsky) argues the exact opposite: cognitive development and language learning originate on the social (intermental) plane through social interaction and mediation before being internalized to the individual (intramental) plane.",
      vi: "Sai (False). Lý thuyết Văn hóa - Xã hội (Sociocultural Theory) khẳng định việc học ngôn ngữ bắt nguồn từ TƯƠNG TÁC XÃ HỘI (social interaction) trước rồi mới nội tâm hóa vào bên trong, hoàn toàn trái ngược với câu phát biểu.",
      tip: "Thấy Sociocultural Theory mà nói 'without social interaction' -> Chọn False ngay."
    }
  },
  {
    id: 34,
    type: "single",
    topic: "KNOWLEDGE",
    question: "According to Schmidt’s Noticing Hypothesis, what is necessary for second language acquisition?",
    options: [
      { key: "A", text: "Memorization of grammar rules" },
      { key: "B", text: "Avoidance of errors during interaction" },
      { key: "C", text: "Repetition of input without attention to form" },
      { key: "D", text: "Conscious awareness of linguistic forms" }
    ],
    answer: "D",
    explanation: {
      en: "Richard Schmidt's (1990, 2001) Noticing Hypothesis states that 'people learn about the things that they attend to and do not learn much about the things they do not attend to.' Specifically, input only becomes 'intake' for L2 acquisition when learners register linguistic forms with conscious awareness (noticing).",
      vi: "Theo Giả thuyết Nhận biết của Richard Schmidt (Noticing Hypothesis), điều kiện cần thiết để đầu vào (input) chuyển hóa thành tri thức thu nạp (intake) là người học phải có sự chú ý/nhận thức có ý thức về các hình thức ngôn ngữ (Conscious awareness of linguistic forms).",
      tip: "Schmidt's Noticing Hypothesis = Conscious awareness of linguistic forms (Sự chú ý có ý thức vào hình thức ngôn ngữ)."
    }
  },
  {
    id: 35,
    type: "fill",
    topic: "SCT",
    question: "What is the process called when learners transform external social interactions into internal cognitive functions?",
    answer: "internalization",
    acceptedAnswers: ["internalization", "internalisation"],
    explanation: {
      en: "In Vygotskian Sociocultural Theory, 'internalization' is the developmental process whereby learners transform external, socially mediated activity (intermental functioning) into internal cognitive self-regulation (intramental functioning).",
      vi: "Quá trình người học chuyển hóa các tương tác xã hội bên ngoài (external social interactions) thành các chức năng nhận thức bên trong (internal cognitive functions) được gọi là Nội tâm hóa (Internalization - trùng với ý số 2 ở Câu 15).",
      tip: "Transform external social interactions -> internal cognitive functions = Internalization."
    }
  },
  {
    id: 36,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "Which of the following best describes the difference between prescriptive and descriptive grammar?",
    options: [
      { key: "A", text: "Prescriptive grammar is based on how people actually speak; descriptive grammar is based on formal rules" },
      { key: "B", text: "Prescriptive grammar dictates how language should be used; descriptive grammar reflects actual usage" },
      { key: "C", text: "Descriptive grammar outlines how language should be used; prescriptive grammar describes natural usage" }
    ],
    answer: "B",
    explanation: {
      en: "Prescriptive grammar prescribes/dictates normative rules of how language 'ought' or 'should' be used according to standard conventions. Descriptive grammar objectively observes and describes how speakers actually use the language in real life.",
      vi: "• Prescriptive grammar (Ngữ pháp quy phạm): Quy định ngôn ngữ PHẢI được dùng như thế nào (dictates how language should be used).\n• Descriptive grammar (Ngữ pháp miêu tả): Phản ánh cách người bản ngữ THỰC SỰ sử dụng ngôn ngữ trong đời sống (reflects actual usage).",
      tip: "Prescriptive = 'Kê đơn/Quy định' (dictates how it SHOULD be used) | Descriptive = 'Miêu tả thực tế' (reflects actual usage)."
    }
  },
  {
    id: 37,
    type: "matching",
    topic: "INDIVIDUAL",
    question: "Match the motivational models with their descriptions.",
    items: [
      { id: "1", prompt: "1. Motivation consists of integrative and instrumental types and is key to L2 achievement", answer: "Socioeducational Model" },
      { id: "2", prompt: "2. Motivation is dynamic and changing over time", answer: "Process-oriented Model" },
      { id: "3", prompt: "3. Self-image and identity drive motivation", answer: "L2 Motivational Self-System" }
    ],
    choices: [
      "Socioeducational Model",
      "Process-oriented Model",
      "L2 Motivational Self-System"
    ],
    explanation: {
      en: "The three historical phases of L2 motivation research:\n1. Socioeducational Model (Gardner, 1985): Distinguishes integrative motivation (desire to integrate into the L2 community) and instrumental motivation (practical goals like career/exams).\n2. Process-oriented Model (Dörnyei & Ottó, 1998): Views motivation as dynamic, fluctuating across pre-actional, actional, and post-actional stages.\n3. L2 Motivational Self-System (Dörnyei, 2005, 2009): Centers on identity and self-image via the Ideal L2 Self, Ought-to L2 Self, and L2 Learning Experience.",
      vi: "Ba mô hình động lực học L2 kinh điển:\n1. Integrative & Instrumental (Hội nhập & Công cụ - Gardner) -> Socioeducational Model.\n2. Dynamic and changing over time (Biến thiên theo thời gian) -> Process-oriented Model.\n3. Self-image and identity (Hình ảnh bản thân & căn tính - Dörnyei) -> L2 Motivational Self-System.",
      tip: "Integrative/Instrumental = Socioeducational | Dynamic over time = Process-oriented | Self-image/Identity = L2 Motivational Self-System."
    }
  },
  {
    id: 38,
    type: "essay",
    topic: "ESSAY",
    question: "Write 150-200 words explaining how knowledge of instructed second language acquisition benefits your current or future teaching of English. Spend around 20 minutes for this question.",
    screenshotResponse: "Instructed Second Language Acquisition (SLA) plays an essential role in English teaching by changing the focus from knowledge delivery to process facilitation. The first reason is that SLA knowledge helps in understanding realistic expectations. And the better teachers understand such ideas as Krashen’s Monitor Hypothesis, the more they can appreciate that fluency comes through comprehensible input rather than hammered grammar rules. This mitigates teacher frustration and learner anxiety by prioritizing communication over total accuracy. Secondly, it supports sound pedagogical decisions. For example, an understanding of Vygotsky’s Zone of Proximal Development (ZPD) means instruction is scaffolded, which offers short term appropriate help as opposed to … [completed below: leaving learners overwhelmed or overly dependent, thereby fostering gradual internalization and learner autonomy. Finally, SLA insights into corrective feedback and individual differences empower teachers to use recasts or prompts strategically while cultivating motivation and willingness to communicate in a supportive classroom environment.]",
    modelEssay: "A solid understanding of Instructed Second Language Acquisition (ISLA) profoundly benefits my English teaching in three key ways: setting realistic developmental expectations, designing effective focus-on-form instruction, and catering to individual learner differences.\n\nFirst, ISLA research—such as Pienemann’s Teachability Hypothesis and natural developmental sequences—helps me realize that learners cannot immediately master every grammar structure simply because it was taught explicitly. Recognizing that interlanguage develops gradually reduces teacher frustration and shifts my priority toward providing rich comprehensible input and opportunities for meaningful interaction.\n\nSecond, theories like Schmidt’s Noticing Hypothesis, Long’s Interaction Hypothesis, and Swain’s Output Hypothesis guide my classroom methodology. Instead of relying on isolated mechanical drills (focus on forms), I can integrate input enhancement, two-way information-gap tasks, and strategic corrective feedback (such as recasts and elicitation prompts) within communicative activities. Furthermore, applying Vygotsky’s Zone of Proximal Development (ZPD) allows me to design collaborative tasks where peers scaffold each other.\n\nFinally, understanding dynamic learner factors enables me to foster students’ Ideal L2 Self, reduce foreign language anxiety, and boost their willingness to communicate, ultimately creating an evidence-based, learner-centered classroom. (184 words)",
    rubricChecklist: [
      "Luận điểm 1: Hiểu lộ trình phát triển tự nhiên & đặt kỳ vọng thực tế (Interlanguage, Teachability Hypothesis / Developmental Readiness, Comprehensible Input)",
      "Luận điểm 2: Thiết kế hoạt động giảng dạy & sửa lỗi dựa trên bằng chứng khoa học (Focus on Form, Noticing Hypothesis, Interaction/Output Hypothesis, Corrective Feedback)",
      "Luận điểm 3: Tổ chức tương tác xã hội & cá nhân hóa người học (Vygotsky's ZPD & Scaffolding, Motivation / Willingness to Communicate / Emotions)",
      "Độ dài chuẩn: 150 - 200 từ (Academic tone, có liên kết mạch lạc First / Second / Finally)"
    ],
    explanation: {
      en: "For a 150-200 word Master's exam response, aim for a clear 4-part structure: (1) Thesis statement naming 2-3 core benefits of ISLA; (2) Realistic expectations based on developmental sequences/Input/Teachability; (3) Evidence-based pedagogy (Focus on Form, Noticing, ZPD/Scaffolding, Corrective Feedback); and (4) Supporting dynamic individual differences (Motivation, WTC, Emotions).",
      vi: "Cách viết đạt điểm tối đa câu tự luận 150–200 từ:\n1. Mở bài (1 câu): Khẳng định kiến thức ISLA giúp chuyển dịch từ 'truyền thụ kiến thức' sang 'tạo điều kiện thụ đắc ngôn ngữ' (process facilitation).\n2. Ý 1 - Kỳ vọng thực tế (Realistic expectations): Dẫn chứng Interlanguage, Developmental Readiness (Pienemann) hoặc Input Hypothesis (Krashen) -> hiểu rằng học viên cần thời gian phát triển tri thức ẩn (implicit knowledge), tránh ép buộc sửa lỗi máy móc gây lo âu.\n3. Ý 2 - Quyết định sư phạm chuẩn xác (Sound pedagogical decisions): Dẫn chứng ZPD & Scaffolding (Vygotsky), Focus on Form, Noticing (Schmidt) và Corrective Feedback (Recasts/Elicitation) trong hoạt động giao tiếp.\n4. Ý 3 - Tâm lý & Động lực người học: Tác động tích cực lên các yếu tố dynamic như Motivation, WTC, và Emotions.",
      tip: "Bạn có thể gõ bài nháp vào ô bên dưới, hệ thống sẽ tự đếm số từ (mục tiêu 150-200 từ) và kiểm tra các thuật ngữ SLA bạn đã đưa vào bài!"
    }
  },
  {
    id: 39,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "What distinguishes “focus on form” from “focus on forms” in second language instruction?",
    options: [
      { key: "A", text: "Focus on forms avoids any attention to language structure" },
      { key: "B", text: "Focus on form integrates attention to linguistic items within meaning-focused interaction" },
      { key: "C", text: "Focus on form is more explicit than focus on forms" },
      { key: "D", text: "Focus on form emphasizes grammar rules exclusively" }
    ],
    answer: "B",
    explanation: {
      en: "Introduced by Michael Long (1991):\n- Focus on FormS (plural 's'): Traditional structural syllabus where discrete linguistic items (grammar rules) are taught in isolation as the primary object of study.\n- Focus on Form (no 's'): Draws learners' attention to linguistic elements briefly as they arise incidentally or planned WITHIN a lesson whose overriding focus is meaning or communication.",
      vi: "Phân biệt khái niệm kinh điển của Michael Long (1991):\n• Focus on formS (có 's'): Dạy từng cấu trúc ngữ pháp rời rạc theo kiểu truyền thống.\n• Focus on form (không 's'): Lồng ghép sự chú ý vào hình thức ngôn ngữ ngay TRONG quá trình giao tiếp hướng tới ý nghĩa (integrates attention to linguistic items within meaning-focused interaction).",
      tip: "Focus on Form (không 's') = Attention to linguistic items WITHIN meaning-focused interaction."
    }
  },
  {
    id: 40,
    type: "single",
    topic: "GRAMMAR_PRON",
    question: "The main goal of input enhancement in focus on form instruction is...",
    options: [
      { key: "A", text: "To highlight linguistic forms in input to increase noticing" },
      { key: "B", text: "To test learners’ memory of vocabulary" },
      { key: "C", text: "To provide corrective feedback during output" },
      { key: "D", text: "To replace authentic communication with drills" }
    ],
    answer: "A",
    explanation: {
      en: "Proposed by Mike Sharwood Smith (1991, 1993), 'Input Enhancement' makes target linguistic features more salient in the input (e.g., through bolding, underlining, color-coding in text, or acoustic stress/intonation in speech) so that learners are more likely to NOTICE them (connecting directly to Schmidt's Noticing Hypothesis).",
      vi: "Mục tiêu chính của việc làm nổi bật đầu vào (Input enhancement - như in đậm, gạch chân, tô màu cấu trúc trong bài đọc hoặc nhấn giọng khi nói) là làm nổi bật các hình thức ngôn ngữ trong input nhằm tăng khả năng nhận biết (highlight linguistic forms in input to increase noticing).",
      tip: "Input enhancement = Highlight linguistic forms in input to increase NOTICING."
    }
  }
];
