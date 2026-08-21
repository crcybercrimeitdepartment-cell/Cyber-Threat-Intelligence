import { 
  ShieldAlert, UserX, Lock, Fingerprint, CreditCard, 
  Cpu, AlertTriangle, Globe, MonitorX, Server 
} from "lucide-react";

export const cardsData = [
  { 
    id: 1, 
    title: "Phishing Activity Awareness", 
    icon: ShieldAlert, 
    color: "from-red-500 to-rose-700",
    description: "Understand how phishing activities are used to deceive people online.",
    content: "Phishing is a common cybercrime technique in which criminals use deceptive emails, messages, websites, or other communications to trick people into revealing information or taking unsafe actions. This section explains common phishing patterns, warning signs, and the types of information criminals may attempt to obtain. Users can learn how to examine suspicious messages, verify website addresses, recognize unusual requests, and avoid interacting with untrusted links or attachments. The focus is on awareness and prevention, helping people understand how phishing works at a high level without providing instructions that could enable misuse."
  },
  { 
    id: 2, 
    title: "Social Engineering Techniques", 
    icon: UserX, 
    color: "from-blue-500 to-indigo-700",
    description: "Learn how criminals manipulate trust, emotions, and human behavior online.",
    content: "Social engineering involves manipulating people into revealing information, providing access, transferring money, or performing actions that may compromise their security. This section explains common social engineering approaches such as impersonation, urgency, fear, trust-building, deception, and fraudulent requests. Users can learn how criminals may exploit human behavior through calls, messages, emails, social media, or other communication channels. The content focuses on recognizing manipulation techniques, verifying unexpected requests, and avoiding pressure-based decisions. Understanding social engineering can help individuals identify suspicious interactions and protect themselves from scams that rely more on human deception than technical attacks."
  },
  { 
    id: 3, 
    title: "Account Takeover Methods", 
    icon: Lock, 
    color: "from-purple-500 to-fuchsia-700",
    description: "Understand common ways criminals attempt to gain unauthorized access to online accounts.",
    content: "Account takeover occurs when a criminal gains unauthorized control of another person's online account. This section explains common high-level methods associated with account compromise, including stolen credentials, phishing, password reuse, credential exposure, session abuse, and social engineering. Users can learn how attackers may target email, social media, financial, or other important accounts and recognize warning signs such as unfamiliar login notifications, unexpected password changes, or unknown devices. The focus is on awareness and protection, including the importance of unique passwords, multi-factor authentication, secure recovery options, and monitoring account activity for suspicious changes."
  },
  { 
    id: 4, 
    title: "Identity Theft Methods", 
    icon: Fingerprint, 
    color: "from-green-500 to-emerald-700",
    description: "Learn how criminals may misuse personal information to impersonate or target individuals.",
    content: "Identity theft involves the unauthorized use of personal information, identity details, credentials, or documents for fraudulent or harmful purposes. This section explains common ways criminals may obtain or misuse personal information, including phishing, social engineering, data exposure, impersonation, and compromised accounts. Users can learn about warning signs such as unfamiliar financial activity, unexpected account notifications, unknown applications, or communications made in their name. The content emphasizes protecting personal information, limiting unnecessary data sharing, monitoring important accounts, and reporting suspected misuse. Understanding identity theft methods helps users recognize risks before they lead to wider financial or personal harm."
  },
  { 
    id: 5, 
    title: "Online Financial Crime Methods", 
    icon: CreditCard, 
    color: "from-yellow-500 to-orange-700",
    description: "Understand common methods used to commit financial crimes through digital platforms.",
    content: "Online financial crime can involve unauthorized transactions, payment fraud, investment deception, banking scams, digital payment abuse, and other criminal activities conducted through online systems. This section explains these activities at a high level so users can recognize common patterns and warning signs without receiving operational instructions. Users can learn how criminals may use impersonation, fraudulent offers, deceptive payment requests, compromised accounts, or social engineering to target financial information and funds. The focus is on prevention, transaction verification, account protection, and responsible reporting. Awareness of financial crime methods can help users make safer decisions when managing money online."
  },
  { 
    id: 6, 
    title: "Malware Distribution Methods", 
    icon: Cpu, 
    color: "from-cyan-500 to-teal-700",
    description: "Understand how malicious software can be delivered through common digital channels.",
    content: "Malware distribution involves methods used to deliver malicious software to computers, smartphones, networks, or other digital devices. This section provides high-level awareness about common delivery channels such as suspicious email attachments, malicious links, compromised websites, unsafe downloads, fraudulent applications, and deceptive messages. Users can learn how to recognize potential warning signs and reduce exposure by using trusted software sources, keeping systems updated, avoiding unknown downloads, and maintaining appropriate security controls. The content focuses on prevention and awareness rather than technical instructions for creating or distributing malware, helping users better understand how malicious software may reach their devices."
  },
  { 
    id: 7, 
    title: "Ransomware Activity Awareness", 
    icon: AlertTriangle, 
    color: "from-red-600 to-black",
    description: "Understand ransomware risks and how criminal activity can affect digital data and systems.",
    content: "Ransomware is a type of malicious activity in which criminals attempt to disrupt access to systems or data and may demand payment from victims. This section explains ransomware at a public-awareness level, including common warning signs, potential impacts, prevention practices, and basic response considerations. Users can learn why regular backups, software updates, strong access controls, security awareness, and cautious handling of suspicious files are important. The content also highlights the importance of reporting suspected incidents and seeking appropriate technical or official assistance. The objective is to improve understanding of ransomware risks without providing operational guidance for conducting attacks."
  },
  { 
    id: 8, 
    title: "Fake Website Operations", 
    icon: Globe, 
    color: "from-pink-500 to-rose-600",
    description: "Learn how fraudulent websites are used to deceive users and collect sensitive information.",
    content: "Fake websites are designed to imitate legitimate websites, services, businesses, or organizations in order to mislead visitors. Criminals may use these websites to collect login credentials, payment information, personal details, or other sensitive data. This section explains common characteristics of fraudulent websites, including misleading domain names, unusual URLs, copied branding, unrealistic offers, suspicious payment requests, and unexpected login pages. Users can learn how to verify website addresses, check trusted sources, avoid suspicious links, and use official websites when accessing important services. The goal is to help people identify deceptive websites before sharing information or making transactions."
  },
  { 
    id: 9, 
    title: "Online Extortion Methods", 
    icon: MonitorX, 
    color: "from-violet-500 to-purple-800",
    description: "Understand how criminals use threats, pressure, or sensitive information for online extortion.",
    content: "Online extortion occurs when criminals use threats, intimidation, or sensitive information to pressure individuals into providing money, access, or other demands. Situations may involve threats to publish private information, expose personal content, damage reputations, or continue harassment. This section helps users recognize common warning signs and understand that responding under pressure may increase risk. Users can learn the importance of preserving evidence, avoiding unnecessary engagement, protecting accounts, seeking trusted support, and using appropriate reporting channels. The content focuses on awareness, safety, and victim protection rather than providing operational details that could facilitate criminal activity."
  },
  { 
    id: 10, 
    title: "Cybercrime Modus Operandi", 
    icon: Server, 
    color: "from-slate-600 to-slate-900",
    description: "Understand common patterns criminals use to plan and carry out cybercrime.",
    content: "Modus operandi refers to the general patterns, behaviors, and approaches associated with how criminal activities are carried out. This section provides high-level awareness of common cybercrime patterns, including targeting methods, impersonation, social engineering, fraudulent communication, unauthorized access, data misuse, and financial deception. Users can learn how different techniques may be combined during a cybercrime incident and how recognizing recurring patterns can improve prevention and early detection. The content is designed for public awareness, education, and risk recognition rather than operational use. Understanding cybercrime patterns helps individuals identify suspicious situations and make safer decisions in the digital environment."
  }
];
