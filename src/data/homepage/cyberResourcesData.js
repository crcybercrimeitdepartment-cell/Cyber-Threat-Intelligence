import {
  FolderOpen, Landmark, Link, Book, Shield, Settings, Bell, Info, Map, Globe
} from 'lucide-react';

export const cyberResourcesCategory = {
  id: 10,
  title: "CYBER RESOURCES & PUBLIC INFORMATION",
  items: [
    { title: "Cyber Safety Resources", icon: FolderOpen },
    { title: "Official Cybercrime Resources", icon: Landmark },
    { title: "Cyber Reporting Resources", icon: Link },
    { title: "Cybersecurity Knowledge Resources", icon: Book },
    { title: "Emergency Cyber Resources", icon: Shield },
    { title: "Cybersecurity Tools & Resources", icon: Settings },
    { title: "Public Cyber Information", icon: Bell },
    { title: "Cyber Information Library", icon: Info },
    { title: "Cyber Support Directory", icon: Map },
    { title: "Trusted Cyber Links & Resources", icon: Globe },
  ]
};

export const cyberResourcesCardsData = [
  {
    num: "01",
    cardType: "split_bar",
    title: "Cyber Safety Resources",
    hashtag: "#SafetyGuides",
    description: "Access practical resources to improve everyday cybersecurity and online safety.",
    content: "Cyber safety resources provide users with reliable information and practical materials for protecting themselves in everyday digital activities. This section can include safety guides, checklists, awareness materials, prevention tips, privacy guidance, account security resources, and information about common cyber risks. Users can explore resources based on their needs, whether they want to improve personal security, protect their devices, secure online accounts, or understand safer internet practices. The resources are designed to be simple, accessible, and useful for the general public, helping individuals build stronger cybersecurity habits and make safer decisions while using digital services.",
    splitTopText: "Verified",
    splitTopVal: "100%",
    splitTopBg: "bg-[#34d399]",
    splitBotText: "Updated",
    splitBotVal: "2026",
    splitBotBg: "bg-[#fef08a]",
    icon: FolderOpen
  },
  {
    num: "02",
    cardType: "giant_stat",
    statValue: "↑ 99.8%",
    title: "Official Cybercrime Resources",
    statLabel: "Verified Government Authorities & Statutory Channels",
    description: "Find trusted official resources for cybercrime information, assistance, and reporting.",
    content: "Official cybercrime resources connect users with verified information and services provided by relevant government authorities, law-enforcement agencies, regulatory bodies, and other authorized organizations. This section can provide links and references to official cybercrime information, reporting platforms, safety advisories, public notices, and support services. Users can learn where to find authoritative information instead of relying on unverified websites or social media posts. The platform should verify official sources regularly and clearly identify their purpose. These resources help users access reliable information and appropriate channels when dealing with cybercrime, online fraud, security incidents, or related concerns.",
    blobColor: "bg-[#f472b6]/30",
    icon: Landmark
  },
  {
    num: "03",
    cardType: "yin_yang_wave",
    headerLabel: "Verified Incident Reporting",
    title: "Cyber Reporting Resources",
    stat1Val: "1930+",
    stat1Label: "Helpline Direct",
    stat2Val: "24/7",
    stat2Label: "Official Channel",
    description: "Find reliable resources for reporting cybercrime and digital security incidents.",
    content: "Cyber reporting resources help users identify appropriate channels for reporting cybercrime, fraud, suspicious activity, online abuse, security incidents, or other digital concerns. This section can provide information about relevant reporting platforms, official complaint systems, service-provider reporting mechanisms, and other verified channels. Users can learn what type of information may be useful when making a report and why accurate incident details and supporting evidence can be important. The resources should clearly distinguish between official reporting channels and general information sources. The goal is to make cyber incident reporting easier to understand and help users reach the appropriate authority or service.",
    waveBg: "bg-[#a7f3d0]",
    icon: Link
  },
  {
    num: "04",
    cardType: "mint_hero",
    title: "Cybersecurity Knowledge Resources",
    subtitle: "Explore reliable cybersecurity information for deeper understanding and informed digital decisions.",
    description: "Explore reliable cybersecurity information for deeper understanding and informed digital decisions.",
    content: "Cybersecurity knowledge resources provide educational and reference information covering a wide range of digital security topics. Users can explore materials related to cyber threats, online privacy, authentication, data protection, secure devices, network security, cybercrime prevention, and emerging cybersecurity risks. Resources may include articles, guides, reports, research materials, educational publications, and trusted reference sources. The content is intended for users with different levels of knowledge, from beginners to professionals seeking additional information. By bringing useful cybersecurity knowledge together, this section helps users develop a stronger understanding of digital security and make more informed decisions online.",
    mintBg: "bg-[#6ee7b7]",
    icon: Book
  },
  {
    num: "05",
    cardType: "pie_chart",
    title: "Cybersecurity Tools & Resources",
    description: "Discover useful tools and resources that support safer digital security practices.",
    content: "Cybersecurity tools and resources can help users perform practical security tasks, improve awareness, and manage common digital risks. This section may include reputable password management tools, security check resources, privacy tools, device protection resources, educational utilities, account security resources, and other trusted cybersecurity services. Each tool should be presented with clear information about its purpose, appropriate use, limitations, and source. Users should be encouraged to use reputable and verified tools rather than downloading unknown security software. The goal is to provide practical resources that complement cybersecurity knowledge and help users strengthen their everyday digital protection.",
    pieLabels: ["Audit", "Encrypt", "Backup", "Protect", "Verify"],
    icon: Settings
  },
  {
    num: "06",
    cardType: "pastel_gold",
    statVal: "24/7 Priority",
    subStatLabel: "Urgent Incident & Crisis Support",
    title: "Emergency Cyber Resources",
    description: "Quickly find important resources when facing an urgent cyber incident or security concern.",
    content: "Emergency cyber resources are intended for situations where a user needs timely information or immediate access to an appropriate support or reporting channel. This section can include verified resources for urgent cyber fraud, account compromise, financial loss, serious online threats, major data exposure, or other critical digital incidents. Users can find information about what immediate actions may be appropriate, which accounts or services may need attention, and where official assistance may be available. The resources should clearly distinguish urgent situations from routine cybersecurity questions and direct users toward appropriate official or professional support when immediate action is required.",
    floatingText: "Direct Helpline: 1930 • Emergency Aid",
    goldBg: "bg-[#fde68a]",
    icon: Shield
  },
  {
    num: "07",
    cardType: "giant_stat",
    statValue: "↑ 100k+",
    title: "Public Cyber Information",
    statLabel: "Clear & Reliable Advisories Relevant to the General Public",
    description: "Access clear and reliable cybersecurity information relevant to the general public.",
    content: "Public cyber information provides easy-to-understand information about cybersecurity developments, digital risks, online safety, cybercrime awareness, security practices, and important public advisories. This section is designed for people who may not have technical cybersecurity knowledge but need reliable information to make safer digital decisions. Content can include public notices, awareness updates, security explanations, important reminders, and information about emerging issues affecting everyday users. The focus is on presenting complex cybersecurity topics in simple language while maintaining accuracy and credibility. This helps the public stay informed without requiring advanced technical or security expertise.",
    blobColor: "bg-[#c084fc]/30",
    icon: Bell
  },
  {
    num: "08",
    cardType: "pie_chart",
    title: "Cyber Information Library",
    description: "Explore a centralized collection of useful cybersecurity information and reference materials.",
    content: "The Cyber Information Library provides an organized collection of cybersecurity-related documents, guides, reports, articles, awareness materials, publications, and reference information. Users can browse or search resources according to topics such as cybercrime, digital safety, privacy, fraud prevention, cybersecurity education, victim support, and emerging threats. Materials can be categorized by subject, audience, format, and publication date to make information easier to find. The library is intended to serve as a long-term knowledge repository where users can return for reliable cybersecurity information, educational content, and reference materials whenever they need deeper understanding or supporting information.",
    pieLabels: ["Docs", "Laws", "Cases", "Manuals", "Guides"],
    icon: Info
  },
  {
    num: "09",
    cardType: "split_bar",
    title: "Cyber Support Directory",
    hashtag: "#SupportDirectory",
    description: "Find relevant organizations and support services for cyber-related assistance.",
    content: "The Cyber Support Directory provides organized information about organizations, services, institutions, and support channels that may assist people with cyber-related concerns. Directory categories can include official reporting bodies, cybersecurity organizations, legal resources, victim-support services, financial institutions, counselling resources, educational organizations, and other verified support providers. Each listing should include relevant information such as organization name, service type, official contact details, website, and area of assistance where appropriate. The directory should prioritize verified and trustworthy sources so users can identify suitable support without relying on unknown or potentially misleading online contacts.",
    splitTopText: "Verified",
    splitTopVal: "500+",
    splitTopBg: "bg-[#60a5fa]",
    splitBotText: "Support",
    splitBotVal: "Free",
    splitBotBg: "bg-[#f472b6]",
    icon: Map
  },
  {
    num: "10",
    cardType: "yin_yang_wave",
    headerLabel: "Curated Web Directory",
    title: "Trusted Cyber Links & Resources",
    stat1Val: "100%",
    stat1Label: "Verified Links",
    stat2Val: "Zero",
    stat2Label: "Spoof Risk",
    description: "Access a curated collection of verified cybersecurity websites, services, and information sources.",
    content: "Trusted cyber links and resources provide users with a carefully organized collection of reliable websites, official portals, cybersecurity organizations, educational platforms, reporting services, and other relevant digital resources. Each link should be reviewed for authenticity, relevance, and reliability before being included on the platform. Users can use this section to quickly access verified information instead of searching through potentially misleading or unsafe websites. Resources can be grouped into categories such as reporting, safety, education, privacy, legal information, threat awareness, and victim support. Regular verification and maintenance can help keep the collection accurate, useful, and trustworthy for the public.",
    waveBg: "bg-[#bfdbfe]",
    icon: Globe
  }
];
