import {
  ShieldAlert, Eye, Lock, KeyRound, UserShield, Smartphone, Share2, Mail, CreditCard, ShieldCheck
} from 'lucide-react';

export const cyberAwarenessCategory = {
  id: 3,
  title: "CYBER AWARENESS & PUBLIC SAFETY",
  focus: "Public ko daily cyber risks se aware aur safe banana",
  items: [
    { title: "Cybercrime Awareness", icon: ShieldAlert },
    { title: "Digital Threat Awareness", icon: Eye },
    { title: "Online Privacy Awareness", icon: Lock },
    { title: "Password Safety Awareness", icon: KeyRound },
    { title: "Account Security Awareness", icon: UserShield },
    { title: "Mobile Safety Awareness", icon: Smartphone },
    { title: "Social Media Safety Awareness", icon: Share2 },
    { title: "Email Safety Awareness", icon: Mail },
    { title: "Online Payment Safety Awareness", icon: CreditCard },
    { title: "Personal Cyber Protection Awareness", icon: ShieldCheck },
  ]
};

export const cyberAwarenessCardsData = [
  {
    num: "01",
    title: "Cybercrime Awareness",
    description: "Understand common cybercrimes and learn how to stay safe online.",
    content: "Cybercrime refers to illegal activities carried out using computers, mobile devices, networks, or online platforms. Common examples include online fraud, phishing, identity theft, account hacking, cyber harassment, data theft, and digital extortion. This section helps users recognize different forms of cybercrime, understand common warning signs, and adopt safer digital habits. It also provides basic information about protecting personal information, securing online accounts, preserving evidence, and taking appropriate action after a suspected cybercrime incident. The goal is to improve public awareness and encourage responsible and secure use of digital technology.",
    icon: ShieldAlert,
    accentColor: "#f59e0b",
    bgOuter: "bg-[#f59e0b]",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300"
  },
  {
    num: "02",
    title: "Digital Threat Awareness",
    description: "Recognize emerging digital threats before they become serious risks.",
    content: "Digital threats can affect devices, online accounts, personal information, networks, and everyday internet activities. These threats may include malicious links, harmful software, fake websites, social engineering, data exposure, account compromise, and other evolving cybersecurity risks. This section helps users understand how digital threats develop, where they commonly appear, and what warning signs to look for. Users can learn how to identify suspicious digital activity, reduce unnecessary exposure, verify online information, and follow basic security practices. Building digital threat awareness helps people respond more carefully to unfamiliar or potentially dangerous online situations.",
    icon: Eye,
    accentColor: "#3b82f6",
    bgOuter: "bg-[#2563eb]",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-300"
  },
  {
    num: "03",
    title: "Online Privacy Awareness",
    description: "Learn how to protect your personal information and online privacy.",
    content: "Online privacy awareness helps users understand how personal information can be collected, shared, stored, and exposed while using websites, applications, social media, and digital services. This section explains important privacy practices such as reviewing privacy settings, limiting unnecessary information sharing, checking app permissions, protecting sensitive documents, and being careful about public posts. Users can also learn about tracking technologies, data collection, privacy risks, and the importance of controlling access to personal information. Good privacy habits reduce unnecessary exposure and help individuals maintain greater control over their digital identity and personal data.",
    icon: Lock,
    accentColor: "#ec4899",
    bgOuter: "bg-[#d946ef]",
    badgeBg: "bg-pink-100 text-pink-800 border-pink-300"
  },
  {
    num: "04",
    title: "Password Safety Awareness",
    description: "Create stronger password habits and protect your online accounts.",
    content: "Password safety is an essential part of protecting online accounts from unauthorized access. This section explains how weak, reused, predictable, or publicly exposed passwords can increase security risks. Users can learn about creating strong and unique passwords, using passphrases, avoiding password sharing, and storing credentials securely with trusted password management tools. The section also highlights the importance of changing compromised passwords and using additional authentication methods wherever available. Developing good password practices can help protect email accounts, social media profiles, banking services, cloud platforms, and other important digital accounts from unauthorized access.",
    icon: KeyRound,
    accentColor: "#991b1b",
    bgOuter: "bg-[#b91c1c]",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-300"
  },
  {
    num: "05",
    title: "Account Security Awareness",
    description: "Learn practical ways to keep your digital accounts secure.",
    content: "Account security involves protecting online accounts from unauthorized access, misuse, and suspicious activity. This section helps users understand important security controls such as multi-factor authentication, recovery options, login notifications, trusted devices, and account activity monitoring. Users can learn how to recognize unusual login attempts, suspicious password-reset requests, unfamiliar devices, and unauthorized account changes. It also explains why recovery email addresses and phone numbers should be kept secure and up to date. Strong account security practices provide an additional layer of protection for personal, professional, financial, and social media accounts.",
    icon: UserShield,
    accentColor: "#10b981",
    bgOuter: "bg-[#10b981]",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300"
  },
  {
    num: "06",
    title: "Mobile Safety Awareness",
    description: "Keep your smartphone, apps, data, and mobile activity safer.",
    content: "Mobile devices contain personal messages, photos, contacts, financial applications, authentication codes, documents, and other sensitive information, making mobile safety extremely important. This section provides awareness about secure screen locks, operating system updates, trusted applications, app permissions, device backups, and safe use of public networks. Users can also learn to recognize suspicious applications, unexpected permissions, malicious links, and unusual device behavior. Avoiding untrusted downloads and keeping mobile security settings properly configured can reduce the risk of unauthorized access, data exposure, malicious software, and other threats affecting smartphones and tablets.",
    icon: Smartphone,
    accentColor: "#8b5cf6",
    bgOuter: "bg-[#8b5cf6]",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300"
  },
  {
    num: "07",
    title: "Social Media Safety Awareness",
    description: "Use social media safely while protecting your identity and personal information.",
    content: "Social media platforms can expose users to privacy risks, fake profiles, scams, harassment, impersonation, malicious links, and unauthorized use of personal information. This section helps users understand safer social media practices, including reviewing privacy settings, limiting sensitive information, verifying unknown profiles, controlling account visibility, and being cautious with messages and links. Users can also learn how to identify suspicious friend requests, impersonation attempts, misleading content, and inappropriate contact. Responsible social media use can reduce unnecessary exposure and help protect personal identity, reputation, relationships, and digital accounts.",
    icon: Share2,
    accentColor: "#06b6d4",
    bgOuter: "bg-[#06b6d4]",
    badgeBg: "bg-cyan-100 text-cyan-800 border-cyan-300"
  },
  {
    num: "08",
    title: "Email Safety Awareness",
    description: "Identify suspicious emails and reduce phishing and email security risks.",
    content: "Email remains one of the most common channels used for phishing, fraud, malware delivery, impersonation, and unauthorized information requests. This section teaches users how to examine sender addresses, links, attachments, urgent requests, unexpected invoices, and unusual messages before taking action. Users can learn why they should avoid opening suspicious attachments, entering credentials through unknown links, or responding to unexpected requests for sensitive information. The section also covers secure email practices, account protection, spam awareness, and reporting suspicious messages. Careful email habits can significantly reduce exposure to phishing and other email-based cyber threats.",
    icon: Mail,
    accentColor: "#f97316",
    bgOuter: "bg-[#f97316]",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-300"
  },
  {
    num: "09",
    title: "Online Payment Safety Awareness",
    description: "Protect your money and payment information during online transactions.",
    content: "Online payment safety helps users securely manage digital transactions through banking services, UPI, cards, wallets, and other payment platforms. This section explains important precautions such as verifying recipients, checking payment requests, protecting PINs and authentication credentials, avoiding unknown payment links, and never sharing sensitive banking information. Users can also learn how to recognize payment scams, fake customer-support requests, fraudulent refund offers, and suspicious transaction messages. Safe payment practices help reduce the risk of financial fraud and encourage users to verify every transaction carefully before approving or transferring money online.",
    icon: CreditCard,
    accentColor: "#14b8a6",
    bgOuter: "bg-[#14b8a6]",
    badgeBg: "bg-teal-100 text-teal-800 border-teal-300"
  },
  {
    num: "10",
    title: "Personal Cyber Protection Awareness",
    description: "Build everyday habits that protect your digital identity, devices, and data.",
    content: "Personal cyber protection brings together essential security practices that individuals can follow across their digital activities. This includes protecting personal information, securing devices and accounts, maintaining software updates, using trusted services, managing privacy settings, recognizing suspicious activity, and keeping important data backed up. Users can also learn how to reduce their digital exposure and respond responsibly when something appears unsafe. The goal is to develop a practical personal cybersecurity routine that protects digital identity, accounts, devices, communications, and sensitive information while supporting safer and more confident participation in the digital world.",
    icon: ShieldCheck,
    accentColor: "#6366f1",
    bgOuter: "bg-[#6366f1]",
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-300"
  }
];
