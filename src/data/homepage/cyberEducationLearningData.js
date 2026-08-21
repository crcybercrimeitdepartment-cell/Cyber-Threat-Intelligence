export const CYBER_EDUCATION_CARDS = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    desc: "Build a strong foundation in cybersecurity concepts and digital security.",
    content: "Cybersecurity fundamentals introduce users to the basic concepts needed to understand digital security and online protection. This section covers essential topics such as cyber threats, vulnerabilities, authentication, data protection, secure devices, network security, privacy, and basic risk management. Users can learn how cybersecurity affects everyday digital activities and why security practices are important for individuals, families, students, and professionals. The content is designed for beginners and provides a clear foundation before moving into more advanced cybersecurity topics. It helps users develop basic knowledge needed to make safer and more informed decisions online.",
    icon: "GraduationCap",
    tag: "01"
  },
  {
    id: 2,
    title: "Cyber Hygiene Learning",
    desc: "Learn everyday cybersecurity habits that help keep your digital life secure.",
    content: "Cyber hygiene refers to the routine security practices people should follow to maintain safer digital environments. This section teaches users how to keep software updated, use strong and unique passwords, enable multi-factor authentication, review security settings, manage permissions, protect devices, back up important information, and monitor accounts for unusual activity. Users can learn how small and consistent security habits can reduce common cyber risks. The content focuses on practical routines that can be applied regularly across personal devices, online accounts, applications, and digital services to improve overall cybersecurity and reduce unnecessary exposure.",
    icon: "Sparkles",
    tag: "02"
  },
  {
    id: 3,
    title: "Digital Literacy Learning",
    desc: "Develop essential knowledge for using digital technology safely and confidently.",
    content: "Digital literacy helps people understand how to use computers, smartphones, applications, websites, online services, and digital communication tools effectively and responsibly. This section provides learning resources about identifying reliable information, understanding online accounts, managing digital content, protecting personal information, recognizing suspicious activity, and using internet services safely. Users can also learn how digital technologies work in everyday situations and how responsible digital behavior can reduce security and privacy risks. The goal is to improve confidence, awareness, and decision-making skills so individuals can participate safely and effectively in the modern digital environment.",
    icon: "BookOpen",
    tag: "03"
  },
  {
    id: 4,
    title: "Safe Internet Practices",
    desc: "Learn practical habits for safer browsing, communication, and online activities.",
    content: "Safe internet practices help users reduce common risks while browsing websites, communicating online, downloading content, using digital services, and interacting with unfamiliar sources. This section covers habits such as checking website addresses, avoiding suspicious links, verifying information, using secure connections, limiting sensitive information sharing, reviewing permissions, and being cautious with unexpected messages or downloads. Users can learn how to make safer decisions when using public networks, websites, social platforms, and online services. Following these practices can reduce exposure to phishing, fraud, malicious content, privacy risks, and other common online threats.",
    icon: "Globe",
    tag: "04"
  },
  {
    id: 5,
    title: "Cyber Safety Tutorials",
    desc: "Follow simple tutorials to learn practical cybersecurity and safety skills.",
    content: "Cyber safety tutorials provide step-by-step learning for common digital security tasks and everyday protection practices. Users can learn how to secure an online account, enable multi-factor authentication, adjust privacy settings, identify suspicious messages, protect a mobile device, create safer passwords, review application permissions, and perform other basic security actions. Tutorials are designed in a simple and practical format so that users can follow each step without requiring advanced technical knowledge. The goal is to turn cybersecurity awareness into practical skills that individuals can apply directly to their devices, accounts, and online activities.",
    icon: "Video",
    tag: "05"
  },
  {
    id: 6,
    title: "Cybersecurity How-To Guides",
    desc: "Find practical instructions for handling common cybersecurity tasks and situations.",
    content: "Cybersecurity how-to guides provide clear instructions for completing specific security-related tasks and responding to common digital risks. Topics may include securing accounts, checking suspicious activity, improving device security, protecting personal data, managing application permissions, responding to phishing attempts, preparing backups, and strengthening privacy settings. Each guide focuses on a particular task and explains the recommended steps in an easy-to-follow format. These resources are intended to help users solve common cybersecurity problems independently while encouraging safe and responsible practices. The guides can support beginners as well as users looking for quick, practical security instructions.",
    icon: "FileQuestion",
    tag: "06"
  },
  {
    id: 7,
    title: "Cybersecurity FAQs",
    desc: "Get clear answers to common questions about cybersecurity and online safety.",
    content: "Cybersecurity FAQs provide simple answers to questions people commonly ask about digital security, privacy, cyber threats, online fraud, account protection, devices, and safe internet use. Users can quickly find explanations for everyday concerns such as suspicious links, unusual account activity, password security, phishing messages, data protection, malware warnings, and online scams. The FAQ content is designed to use clear language rather than complex technical terminology. It helps users understand cybersecurity concepts and make informed decisions without needing extensive technical knowledge. Frequently updated questions can also address new threats and common public concerns.",
    icon: "HelpCircle",
    tag: "07"
  },
  {
    id: 8,
    title: "Cyber Glossary",
    desc: "Understand important cybersecurity terms in simple and easy-to-follow language.",
    content: "The Cyber Glossary provides simple explanations of commonly used cybersecurity, cybercrime, privacy, and digital safety terminology. Users can look up terms such as phishing, malware, ransomware, firewall, authentication, encryption, data breach, identity theft, social engineering, and other technical or legal concepts. Each definition is designed to explain the meaning of a term without unnecessary technical complexity. The glossary helps students, general users, professionals, and cybercrime victims understand information found in security alerts, educational materials, reports, and online resources. It also supports better communication and understanding across different areas of cybersecurity.",
    icon: "BookMarked",
    tag: "08"
  },
  {
    id: 9,
    title: "Cyber Learning Materials",
    desc: "Access useful educational materials for learning and improving cybersecurity knowledge.",
    content: "Cyber learning materials provide structured educational resources that users can study according to their interests and knowledge level. These materials may include guides, articles, awareness documents, infographics, presentations, checklists, reference documents, videos, and other educational resources. Content can cover cybersecurity fundamentals, online safety, privacy, cybercrime awareness, digital protection, and emerging cyber risks. The resources are intended for individuals, students, educators, families, and organizations seeking reliable cybersecurity knowledge. Organized learning materials make it easier for users to explore topics, review important concepts, and develop a stronger understanding of safe and responsible digital practices.",
    icon: "FileText",
    tag: "09"
  },
  {
    id: 10,
    title: "Cyber Skills Development",
    desc: "Build practical cybersecurity skills for safer and more confident digital participation.",
    content: "Cyber skills development focuses on helping users strengthen practical abilities related to cybersecurity and digital safety. Depending on the learning level, topics may include security awareness, risk identification, secure account management, privacy protection, incident recognition, safe digital practices, and basic cybersecurity problem-solving. The section can support beginners, students, professionals, and other users who want to improve their cybersecurity capabilities. Learning activities, practical exercises, guided resources, and skill-based content can help users move beyond basic awareness and develop useful skills that support safer digital behavior and stronger personal or professional cybersecurity practices.",
    icon: "Zap",
    tag: "10"
  }
];

const topicIds = [
  "cyber-fundamentals",
  "cyber-hygiene",
  "digital-literacy",
  "safe-internet-practices",
  "safety-tutorials",
  "howto-guides",
  "cyber-faqs",
  "cyber-glossary",
  "cyber-learning-materials",
  "cyber-skills-development"
];

export const CYBER_EDUCATION_DETAILS = {};
topicIds.forEach((id, index) => {
  const card = CYBER_EDUCATION_CARDS[index];
  if (card) {
    CYBER_EDUCATION_DETAILS[id] = {
      description: card.desc,
      content: card.content
    };
  }
});
