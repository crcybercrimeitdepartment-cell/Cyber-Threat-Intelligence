import { 
  BellRing, Activity, TrendingUp, AlertOctagon, MapPin, 
  DollarSign, MailWarning, PhoneOff, MessageSquareWarning, Link2Off 
} from "lucide-react";

export const cardsData = [
  { 
    id: 1, 
    title: "New Scam Alerts", 
    icon: BellRing, 
    color: "from-blue-500 to-cyan-700", 
    description: "Stay informed about newly identified scams and emerging fraud patterns.", 
    details: {
      overview: "New Scam Alerts provide timely information about recently identified scams that may affect individuals, businesses, or communities. These alerts can highlight newly observed fraud patterns, suspicious messages, fake offers, impersonation attempts, or other emerging scam activities. Users can learn what the scam looks like, which warning signs to watch for, what type of information or payment criminals may request, and what precautions can reduce risk. Each alert should clearly mention the date, source, affected audience, and recommended safety actions where available. The goal is to help the public recognize new scams before they become widespread."
    }
  },
  { 
    id: 2, 
    title: "Active Scam Alerts", 
    icon: Activity, 
    color: "from-green-500 to-emerald-700", 
    description: "Stay updated about scams that are currently being reported or observed.", 
    details: {
      overview: "Active Scam Alerts provide information about scams that are currently occurring or receiving recent reports. These alerts help users understand which fraudulent activities may pose an immediate risk and what signs they should watch for. Information can include the scam type, common contact methods, affected services or platforms, reported patterns, and recommended protective measures. Users are encouraged to verify suspicious communications through trusted sources and avoid making payments or sharing sensitive information without confirmation. Active alerts should be based on reliable and appropriately verified information so that the public receives useful warnings without unnecessary fear or misinformation."
    }
  },
  { 
    id: 3, 
    title: "Trending Scam Alerts", 
    icon: TrendingUp, 
    color: "from-purple-500 to-indigo-700", 
    description: "Discover scams that are rapidly gaining attention or spreading across digital platforms.", 
    details: {
      overview: "Trending Scam Alerts highlight scam patterns that are receiving increased attention, spreading rapidly, or being frequently discussed across relevant sources. These alerts can help users understand why a particular scam is becoming common and what types of people or services may be targeted. Information may include the scam's general approach, common warning signs, platforms where it may appear, and recommended precautions. Users should be encouraged to verify information before sharing or acting on a trending alert. The purpose is to improve public awareness of fast-spreading scams and help people recognize them before becoming victims."
    }
  },
  { 
    id: 4, 
    title: "Urgent Scam Warnings", 
    icon: AlertOctagon, 
    color: "from-red-600 to-rose-800", 
    description: "Receive important warnings about scams requiring immediate public attention.", 
    details: {
      overview: "Urgent Scam Warnings are designed for situations where a scam presents a significant or time-sensitive risk to the public. These warnings may relate to widespread financial fraud, impersonation campaigns, malicious links, fraudulent payment requests, or other scams requiring immediate awareness. Each warning should clearly communicate the nature of the threat, important warning signs, affected users or services, and recommended protective actions. Where appropriate, users should be directed toward verified official sources or reporting channels. The purpose is to deliver concise and timely safety information so individuals can recognize serious scam activity and take appropriate precautions without unnecessary delay."
    }
  },
  { 
    id: 5, 
    title: "Regional Scam Alerts", 
    icon: MapPin, 
    color: "from-yellow-500 to-orange-700", 
    description: "Stay aware of scam activities reported within specific regions or communities.", 
    details: {
      overview: "Regional Scam Alerts provide information about scams that have been reported or observed in particular geographic areas, communities, or local populations. These alerts can help identify localized fraud patterns such as impersonation of local authorities, regional businesses, community services, financial institutions, or other trusted organizations. Users can learn about the general nature of the scam, warning signs, affected groups, and recommended safety measures. Regional information should be based on reliable sources and clearly identify the relevant location and reporting period. The goal is to help local communities understand threats that may specifically affect people in their area."
    }
  },
  { 
    id: 6, 
    title: "Financial Scam Alerts", 
    icon: DollarSign, 
    color: "from-amber-500 to-yellow-600", 
    description: "Get timely warnings about emerging financial scams and fraudulent payment activities.", 
    details: {
      overview: "Financial Scam Alerts provide timely information about scams involving banking, digital payments, investments, loans, cards, wallets, refunds, or other financial activities. Alerts can explain the general scam pattern, how victims may be approached, what warning signs to recognize, and which precautions should be followed. Users can be reminded to independently verify payment requests, avoid sharing authentication credentials, and use official financial-service channels when checking suspicious activity. These alerts should rely on credible information and clearly communicate the nature of the reported risk. The goal is to help users identify financial scams early and reduce the possibility of monetary loss."
    }
  },
  { 
    id: 7, 
    title: "Phishing Alerts", 
    icon: MailWarning, 
    color: "from-teal-500 to-cyan-800", 
    description: "Get warnings about newly reported phishing messages, links, and websites.", 
    details: {
      overview: "Phishing Alerts notify users about recently identified phishing campaigns or suspicious communication patterns designed to deceive recipients. Alerts may involve fraudulent emails, text messages, social media messages, fake login pages, or deceptive links that imitate legitimate organizations or services. Users can learn what indicators to watch for, such as unusual sender addresses, misleading URLs, unexpected requests, urgent messages, or suspicious attachments. The alerts should avoid exposing unnecessary harmful details while providing enough information for public protection. Users should verify important communications through official channels and avoid entering credentials or sensitive information through untrusted links or pages."
    }
  },
  { 
    id: 8, 
    title: "Fake Call Alerts", 
    icon: PhoneOff, 
    color: "from-rose-500 to-pink-700", 
    description: "Stay informed about fraudulent calls involving impersonation, threats, or deceptive requests.", 
    details: {
      overview: "Fake Call Alerts provide warnings about reported telephone scams in which callers may impersonate banks, government officials, police personnel, customer support representatives, employers, delivery services, or other trusted entities. These calls may involve urgent payment demands, account verification requests, threats, fake rewards, or attempts to obtain personal information. Alerts can explain common warning signs and recommended precautions, including independently verifying the caller's identity and avoiding disclosure of passwords, PINs, OTPs, or other confidential information. The goal is to help users recognize suspicious calls quickly and avoid making decisions under pressure or fear."
    }
  },
  { 
    id: 9, 
    title: "Fake Message Alerts", 
    icon: MessageSquareWarning, 
    color: "from-fuchsia-500 to-purple-800", 
    description: "Identify suspicious scam messages before clicking links or sharing sensitive information.", 
    details: {
      overview: "Fake Message Alerts provide information about fraudulent SMS, messaging app notifications, social media messages, and other deceptive communications. Such messages may contain fake delivery updates, account warnings, payment requests, job offers, rewards, KYC notices, or links to fraudulent websites. Users can learn how to identify suspicious wording, unexpected requests, misleading links, unknown senders, and pressure-based instructions. Alerts should explain the general scam pattern and provide safe actions such as verifying information through official channels and avoiding unknown links or attachments. Timely awareness can help users recognize fraudulent messages before they lead to financial loss or information theft."
    }
  },
  { 
    id: 10, 
    title: "Fake Website Alerts", 
    icon: Link2Off, 
    color: "from-sky-500 to-blue-800", 
    description: "Get warnings about fraudulent websites impersonating trusted services and organizations.", 
    details: {
      overview: "Fake Website Alerts warn users about websites that may imitate legitimate banks, government services, businesses, shopping platforms, support services, or other trusted organizations. These websites can be used to collect passwords, payment information, identity details, or other sensitive data. Alerts can explain the general characteristics of the reported website, such as misleading addresses, suspicious domains, copied branding, unexpected payment requests, or unusual login pages. Users should verify website addresses and access important services through trusted official sources. The goal is to help the public identify deceptive websites and avoid entering personal, financial, or account information on unsafe pages."
    }
  }
];