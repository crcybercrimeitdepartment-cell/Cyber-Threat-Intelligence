import { 
    FileText, ShieldAlert, Gavel, UserCheck, Database, 
    AlertTriangle, MessageCircleWarning, Smartphone, Fingerprint, Users 
} from "lucide-react";

export const legalCardsData = [
    { 
        id: 1, 
        title: "Cyber Complaint Preparation Guidance", 
        icon: FileText, 
        color: "from-blue-600 to-indigo-900", 
        desc: "Learn how to prepare relevant information before submitting a cybercrime complaint.", 
        content: "Preparing a clear and complete cybercrime complaint can help communicate what happened and provide useful information to the appropriate authority. This section guides users on organizing important details such as the date and time of the incident, incident description, affected accounts or services, transaction information, communication records, screenshots, website addresses, and other relevant evidence. Users can learn how to create a clear timeline and avoid deleting important records before reporting. The guidance focuses on general preparation and does not replace official reporting procedures or individualized legal advice. Users should follow the requirements of the appropriate authority when submitting a complaint."
    },
    { 
        id: 2, 
        title: "Cybercrime Reporting Process Guidance", 
        icon: ShieldAlert, 
        color: "from-emerald-600 to-teal-900", 
        desc: "Understand the general process for reporting a cybercrime incident.", 
        content: "Cybercrime reporting involves communicating an incident to an appropriate official authority, service provider, financial institution, or other relevant organization depending on the situation. This section explains the general stages of reporting, including identifying the incident, securing affected accounts, collecting relevant information, preserving evidence, selecting an appropriate reporting channel, and maintaining complaint or reference details. Users can learn why accurate information and timely reporting may be important, particularly in cases involving financial loss or ongoing threats. The guidance is intended to improve public understanding of reporting procedures while encouraging users to follow the current requirements of the relevant official authority."
    },
    { 
        id: 3, 
        title: "Legal Action Guidance", 
        icon: Gavel, 
        color: "from-purple-600 to-violet-900", 
        desc: "Understand general legal options that may be relevant after a cyber incident.", 
        content: "Cyber incidents can involve different legal considerations depending on the nature of the offence, available evidence, affected parties, and applicable laws. This section provides general information about possible legal pathways, including reporting an offence, seeking assistance from appropriate authorities, consulting qualified legal professionals, and maintaining relevant documentation. Users can learn why legal action should be based on verified facts and applicable laws rather than assumptions or informal online advice. The content helps users understand the importance of proper documentation, official procedures, and professional legal guidance when considering further action after a cybercrime or digital security incident."
    },
    { 
        id: 4, 
        title: "Victim Legal Guidance", 
        icon: UserCheck, 
        color: "from-rose-600 to-red-900", 
        desc: "Learn about general legal considerations and support options available to cybercrime victims.", 
        content: "Cybercrime victims may need to understand their rights, reporting options, evidence requirements, financial concerns, privacy issues, and available support mechanisms. This section provides general legal guidance to help victims understand what information may be important when discussing an incident with authorities or qualified legal professionals. Users can learn about maintaining incident records, preserving relevant evidence, understanding official procedures, and seeking appropriate legal assistance when necessary. The content is designed to improve legal awareness and help victims make informed decisions without creating expectations about a specific legal outcome. Individual cases should always be evaluated by qualified legal professionals or appropriate authorities."
    },
    { 
        id: 5, 
        title: "Digital Evidence Guidance", 
        icon: Database, 
        color: "from-amber-500 to-orange-800", 
        desc: "Learn how to identify, organize, and preserve digital evidence responsibly.", 
        content: "Digital evidence can include emails, messages, screenshots, transaction records, photographs, videos, website addresses, account notifications, device information, and other electronic records connected to a cyber incident. This section provides general guidance on identifying relevant evidence, recording important dates and times, retaining original information, and organizing records securely. Users can learn why unnecessary editing, deletion, or alteration of evidence may create difficulties during formal review or investigation. The guidance also encourages users to seek professional assistance when evidence has legal significance or when specialized collection is required. Proper evidence handling can support clearer reporting and informed legal processes."
    },
    { 
        id: 6, 
        title: "Cyber Fraud Legal Guidance", 
        icon: AlertTriangle, 
        color: "from-cyan-600 to-blue-900", 
        desc: "Understand general legal considerations after experiencing online financial fraud.", 
        content: "Cyber fraud can involve unauthorized transactions, digital payment scams, banking fraud, investment deception, identity misuse, and other financially harmful activities. This section provides general legal information about documenting the incident, preserving transaction records, reporting suspected fraud through appropriate channels, and understanding possible support or recovery processes. Users can learn why timely reporting and accurate documentation may be important when financial loss has occurred. The content also encourages victims to communicate with relevant financial institutions and official authorities rather than relying on unverified recovery services. This guidance is educational and does not replace individualized financial or legal advice for a specific case."
    },
    { 
        id: 7, 
        title: "Online Harassment Legal Guidance", 
        icon: MessageCircleWarning, 
        color: "from-pink-600 to-rose-900", 
        desc: "Understand general legal considerations when facing serious online harassment.", 
        content: "Online harassment can include repeated unwanted communication, threats, abusive messages, impersonation, stalking, privacy violations, or other harmful digital behavior. This section provides general legal guidance on documenting incidents, preserving relevant communications, identifying appropriate reporting channels, and understanding that different forms of online harassment may be treated differently under applicable laws. Users can learn why maintaining a clear record of repeated incidents can be useful when seeking assistance. The content also encourages individuals facing serious or threatening behavior to seek appropriate official or professional support. It provides general legal information and does not determine whether a particular situation meets a specific legal offence."
    },
    { 
        id: 8, 
        title: "Cyberbullying Legal Guidance", 
        icon: Smartphone, 
        color: "from-fuchsia-600 to-purple-900", 
        desc: "Learn about general legal considerations related to cyberbullying and digital abuse.", 
        content: "Cyberbullying can involve repeated harmful messages, threats, humiliation, impersonation, unwanted content, or other abusive behavior through digital platforms. This section provides general legal awareness about documenting harmful activity, preserving messages and other relevant records, using platform reporting mechanisms, and seeking appropriate assistance when necessary. Parents, guardians, students, educators, and affected individuals can use the information to better understand possible legal and procedural considerations. The guidance emphasizes responsible reporting and avoiding retaliation or further escalation. Because applicable laws and procedures can vary according to circumstances and location, users should consult appropriate authorities or qualified legal professionals for specific matters."
    },
    { 
        id: 9, 
        title: "Identity Theft Legal Guidance", 
        icon: Fingerprint, 
        color: "from-green-600 to-emerald-900", 
        desc: "Understand general legal steps and considerations when your identity is misused.", 
        content: "Identity theft can involve unauthorized use of personal information, identity documents, account credentials, or other identifying details for fraudulent or harmful purposes. This section provides general legal guidance on documenting suspected misuse, preserving relevant records, securing affected accounts, and reporting the incident through appropriate official channels. Users can learn why evidence such as transaction records, suspicious communications, account notifications, or unauthorized documents may be important. The guidance also highlights the value of monitoring for continued misuse and seeking qualified legal or official assistance when necessary. The information is intended for general awareness and does not provide individualized legal advice or guarantee a particular outcome."
    },
    { 
        id: 10, 
        title: "Legal Support Referral Guidance", 
        icon: Users, 
        color: "from-slate-600 to-zinc-900", 
        desc: "Find appropriate legal support and verified resources for cyber-related concerns.", 
        content: "Legal support referral guidance helps users identify suitable sources of professional assistance when a cyber incident involves legal questions, disputes, victim rights, financial loss, harassment, identity misuse, or other concerns. This section can provide information about qualified legal professionals, official legal services, victim support organizations, legal aid resources, and other verified assistance channels. Users can learn how to identify appropriate support based on the nature of their situation and why they should verify the credentials and legitimacy of any service provider. The platform should clearly distinguish general information from professional legal advice and prioritize trustworthy referral sources for individuals seeking further assistance."
    }
];

// Compatibility mapping for TOPIC_GUIDES
const topicIds = [
    "complaint-prep",
    "reporting-process",
    "legal-action",
    "victim-legal",
    "evidence-guidance",
    "fraud-legal",
    "harassment-legal",
    "cyberbullying-legal",
    "identity-theft-legal",
    "legal-referral"
];

export const CYBER_SAFETY_GUIDENCE_DETAILS = {};
topicIds.forEach((id, index) => {
    const card = legalCardsData[index];
    if (card) {
        CYBER_SAFETY_GUIDENCE_DETAILS[id] = {
            description: card.desc,
            content: card.content,
            overview: card.content
        };
    }
});
