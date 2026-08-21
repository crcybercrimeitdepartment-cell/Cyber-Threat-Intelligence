export const CYBER_SCAM_FRAUD_CARDS = [
  {
    id: 1,
    title: "Banking Scam Information",
    desc: "Learn how criminals use banking-related scams to target customers and their money.",
    content: "Banking scams involve fraudulent activities designed to obtain money, banking credentials, card details, or other financial information from victims. This section explains common banking scam patterns such as fake bank calls, fraudulent customer support, account verification requests, unauthorized transaction messages, and deceptive banking links. Users can learn how to recognize suspicious communication, verify requests through official banking channels, protect sensitive financial information, and avoid sharing passwords, PINs, or authentication codes. The content also provides general awareness about safe banking practices and the importance of acting quickly when suspicious banking activity or unauthorized transactions are noticed.",
    tag: "01"
  },
  {
    id: 2,
    title: "UPI Scam Information",
    desc: "Understand common UPI scams and learn how to recognize suspicious payment requests.",
    content: "UPI scams use digital payment systems to trick users into sending money or revealing sensitive payment information. This section explains common patterns such as fake payment requests, fraudulent refund offers, fake customer-support messages, QR-code manipulation, and deceptive collect requests. Users can learn why receiving money does not normally require entering a UPI PIN, how to verify payment details before approving transactions, and why unknown requests should be treated carefully. The content promotes safer UPI practices, transaction verification, and responsible handling of payment notifications to help reduce the risk of digital payment fraud.",
    tag: "02"
  },
  {
    id: 3,
    title: "Investment Scam Information",
    desc: "Recognize fraudulent investment offers and protect yourself from financial deception.",
    content: "Investment scams use promises of high returns, guaranteed profits, exclusive opportunities, or limited-time offers to convince people to transfer money. This section explains common investment scam patterns involving fake trading platforms, cryptocurrency schemes, social-media promotions, impersonated experts, and fraudulent investment groups. Users can learn how to identify unrealistic returns, pressure tactics, unverifiable platforms, and requests for additional payments. The content encourages users to verify investment services through reliable sources, avoid making decisions based only on online recommendations, and carefully review financial information before transferring funds or sharing sensitive personal details.",
    tag: "03"
  },
  {
    id: 4,
    title: "Job Scam Information",
    desc: "Identify fake job offers and avoid employment-related online fraud.",
    content: "Job scams use fake employment opportunities to collect money, personal information, identity documents, or account credentials from job seekers. This section explains common patterns such as fake recruitment agencies, fraudulent interviews, registration fees, work-from-home offers, fake appointment letters, and requests for payment before employment. Users can learn how to verify employers, check official company information, evaluate suspicious communication, and recognize unrealistic job promises. The content also highlights the importance of avoiding unnecessary payments and protecting personal documents during recruitment. These practices can help job seekers identify fraudulent opportunities and make safer decisions during online employment searches.",
    tag: "04"
  },
  {
    id: 5,
    title: "Loan Scam Information",
    desc: "Learn how fraudulent loan offers can put your money and personal information at risk.",
    content: "Loan scams often involve fake lenders, misleading advertisements, advance-fee demands, fraudulent approval messages, or requests for sensitive personal and financial information. This section helps users understand common loan fraud patterns and identify warning signs such as unrealistic interest rates, guaranteed approval, urgent payment demands, or unverified lending platforms. Users can learn how to verify lenders through reliable sources, carefully review loan terms, avoid unnecessary upfront payments, and protect identity documents and financial information. The content promotes cautious decision-making when applying for loans through websites, mobile applications, social media, or unsolicited messages.",
    tag: "05"
  },
  {
    id: 6,
    title: "OTP Scam Information",
    desc: "Understand OTP scams and learn how to protect authentication codes.",
    content: "OTP scams attempt to trick users into revealing one-time passwords or authentication codes that may be used to access accounts, approve transactions, or complete unauthorized activities. This section explains common tactics such as fake customer-support calls, account verification messages, fraudulent reward offers, and impersonation attempts. Users can learn why legitimate services generally do not require customers to disclose confidential OTPs and why unexpected requests should be independently verified. The content also highlights the importance of protecting authentication messages, avoiding screen-sharing with unknown persons, and reporting suspicious activity when an OTP may have been misused.",
    tag: "06"
  },
  {
    id: 7,
    title: "Courier Scam Information",
    desc: "Recognize fake courier messages and calls used to create panic and demand payments.",
    content: "Courier scams commonly involve fake calls, messages, or notifications claiming that a package has been stopped, contains prohibited items, or requires immediate payment or verification. Scammers may impersonate courier companies, government authorities, or law-enforcement personnel to create fear and pressure victims into following instructions. This section explains common warning signs, including unexpected delivery claims, urgent payment demands, suspicious links, and requests for personal information. Users can learn how to verify deliveries through official courier channels and avoid responding to unverified communications, helping reduce the risk of financial loss, identity misuse, and further fraud.",
    tag: "07"
  },
  {
    id: 8,
    title: "KYC Scam Information",
    desc: "Learn how fake KYC requests are used to steal information or money.",
    content: "KYC scams use fraudulent messages, calls, emails, or links claiming that a bank account, wallet, SIM card, or digital service will be blocked unless verification is completed immediately. This section explains common tactics such as fake KYC update links, impersonated customer-support representatives, fraudulent verification forms, and requests for account credentials or authentication codes. Users can learn how to recognize urgency, suspicious links, and unverified requests and how to complete legitimate verification only through official service channels. Understanding these patterns can help users protect personal information, account credentials, financial details, and digital identities from KYC-related fraud.",
    tag: "08"
  },
  {
    id: 9,
    title: "Social Media Scam Information",
    desc: "Identify common social media scams and protect your accounts, money, and identity.",
    content: "Social media scams can involve fake profiles, impersonation, fraudulent offers, investment promotions, fake giveaways, romance scams, malicious links, and deceptive messages. This section helps users understand how scammers may use social platforms to build trust, collect personal information, promote fraudulent services, or request money. Users can learn how to verify profiles, avoid sharing sensitive information, check suspicious offers, review account privacy settings, and report fraudulent activity through platform safety mechanisms. The content encourages users to treat unexpected requests, unfamiliar accounts, and unrealistic online opportunities carefully to reduce the risk of financial loss and identity misuse.",
    tag: "09"
  },
  {
    id: 10,
    title: "Government Impersonation Scam Information",
    desc: "Recognize scams involving fake government officials, agencies, notices, and legal threats.",
    content: "Government impersonation scams involve criminals pretending to represent government departments, law-enforcement agencies, tax authorities, regulatory bodies, or other public institutions. Scammers may use official-looking messages, fake documents, phone calls, or threats of penalties, arrest, account blocking, or legal action to pressure victims into making payments or sharing personal information. This section explains common warning signs and teaches users to verify official communications through trusted government channels. Users can also learn why urgent payment demands, unexpected legal threats, and requests for confidential information should be independently verified before taking any action.",
    tag: "10"
  }
];

// Compatibility mapping for TOPIC_GUIDES
const topicIds = [
  "banking-scams",
  "upi-scams",
  "investment-scams",
  "job-scams",
  "loan-scams",
  "otp-scams",
  "courier-scams",
  "kyc-scams",
  "social-media-scams",
  "gov-impersonation-scams"
];

export const CYBER_SCAM_FRAUD_DETAILS = {};
topicIds.forEach((id, index) => {
  const card = CYBER_SCAM_FRAUD_CARDS[index];
  if (card) {
    CYBER_SCAM_FRAUD_DETAILS[id] = {
      description: card.desc,
      content: card.content
    };
  }
});
