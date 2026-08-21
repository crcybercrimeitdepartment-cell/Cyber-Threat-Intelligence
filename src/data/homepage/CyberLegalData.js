import { 
    FileText, ShieldAlert, Gavel, UserCheck, Database, 
    AlertTriangle, MessageCircleWarning, Smartphone, Fingerprint, Users 
} from "lucide-react";

export const legalCardsData = [
    { 
        id: 1, 
        title: "Cyber Complaint Preparation", 
        icon: FileText, 
        color: "from-blue-600 to-indigo-900", 
        desc: "Learn how to prepare relevant information before submitting a cybercrime complaint.", 
        details: {
            overview: "Preparing a clear cybercrime complaint helps authorities review what happened and collect essential evidence. Organizing your incident details before reporting increases response efficiency.",
            clauses: [
                "Section 66 (Computer hacking & data tampering)",
                "Section 43 (Unauthorised access to systems)",
                "IT Act Section 65 (Tampering with source documents)"
            ],
            checklist: [
                "Draft a detailed chronological timeline of events.",
                "Keep original email headers, URLs, and server logs.",
                "Take high-resolution screenshots before deleting data."
            ]
        }
    },
    { 
        id: 2, 
        title: "Cybercrime Reporting Process", 
        icon: ShieldAlert, 
        color: "from-emerald-600 to-teal-900", 
        desc: "Understand the general process for reporting a cybercrime incident.", 
        details: {
            overview: "Cybercrime reporting involves registering the incident through verified government portals, financial agencies, or platforms depending on the nature of the offense.",
            clauses: [
                "Section 66D (Cheating by personation using computer resource)",
                "IT Act Section 70 (Critical infrastructure security)",
                "Cybercrime portal reporting mandates"
            ],
            checklist: [
                "Report immediately to national portals (e.g. cybercrime.gov.in).",
                "Submit transaction details to your bank within 24 hours.",
                "Preserve copies of submitted official acknowledgment receipts."
            ]
        }
    },
    { 
        id: 3, 
        title: "Legal Action & Prosecution", 
        icon: Gavel, 
        color: "from-purple-600 to-violet-900", 
        desc: "Understand general legal options that may be relevant after a cyber incident.", 
        details: {
            overview: "Understanding your legal options ensures that you follow established legal pathways when pursuing justice or compensation after a cyber incident.",
            clauses: [
                "Section 43A (Compensation for failure to protect data)",
                "Civil remedies for damage to online reputation",
                "Criminal prosecution pathways under the IT Act"
            ],
            checklist: [
                "Consult a qualified cyber legal professional.",
                "Maintain a secure repository of all legal documents.",
                "Do not rely on unverified online recovery groups."
            ]
        }
    },
    { 
        id: 4, 
        title: "Victim Legal Safeguards", 
        icon: UserCheck, 
        color: "from-rose-600 to-red-900", 
        desc: "Learn about general legal considerations and support options available to cybercrime victims.", 
        details: {
            overview: "Cybercrime victims are entitled to legal rights, privacy safeguards, and victim compensation frameworks to assist in their recovery process.",
            clauses: [
                "Section 72A (Disclosure of information in breach of contract)",
                "Right to privacy under Article 21 in digital context",
                "Confidentiality safeguards during criminal filings"
            ],
            checklist: [
                "Request confidentiality when registering sensitive details.",
                "Engage with support networks and victim counseling.",
                "Understand your rights during investigations and statements."
            ]
        }
    },
    { 
        id: 5, 
        title: "Digital Evidence Handling", 
        icon: Database, 
        color: "from-amber-500 to-orange-800", 
        desc: "Learn how to identify, organize, and preserve digital evidence responsibly.", 
        details: {
            overview: "Digital evidence is highly volatile and must be handled carefully to maintain its admissibility during judicial proceedings or investigations.",
            clauses: [
                "Section 65B of Indian Evidence Act (Electronic certificates)",
                "IT Act Section 79A (Admissibility of electronic records)",
                "Standard operating procedures for forensic hash values"
            ],
            checklist: [
                "Maintain the original digital files without alteration.",
                "Obtain a 65B certificate from the service provider.",
                "Use write-blockers or professional forensic tools if possible."
            ]
        }
    },
    { 
        id: 6, 
        title: "Cyber Fraud Remedies", 
        icon: AlertTriangle, 
        color: "from-cyan-600 to-blue-900", 
        desc: "Understand general legal considerations after experiencing online financial fraud.", 
        details: {
            overview: "Legal remedies for online fraud help victims secure transaction rollbacks and freeze scammer accounts through banking and cyber police nodes.",
            clauses: [
                "Section 420 of IPC / BNS equivalents (Cheating)",
                "RBI guidelines on zero liability of customers in cyber fraud",
                "Section 66C (Identity theft & fraud)"
            ],
            checklist: [
                "Contact bank node officer to initiate charge disputes.",
                "File a complaint to freeze the beneficiary account.",
                "Verify transaction IDs and payment gateway details."
            ]
        }
    },
    { 
        id: 7, 
        title: "Online Harassment Options", 
        icon: MessageCircleWarning, 
        color: "from-pink-600 to-rose-900", 
        desc: "Understand general legal considerations when facing serious online harassment.", 
        details: {
            overview: "Harassment, stalking, and privacy breaches on digital platforms are serious offenses with specific legal remedies and platform takedown protocols.",
            clauses: [
                "Section 354D of IPC / BNS (Digital stalking & harassment)",
                "Section 67 (Publishing obscene material in electronic form)",
                "IT Act Section 66E (Violation of privacy)"
            ],
            checklist: [
                "Block the harasser across all digital profiles.",
                "Report details directly to platform safety divisions.",
                "Preserve chat backups, timestamps, and profiles URLs."
            ]
        }
    },
    { 
        id: 8, 
        title: "Cyberbullying Actions", 
        icon: Smartphone, 
        color: "from-fuchsia-600 to-purple-900", 
        desc: "Learn about general legal considerations related to cyberbullying and digital abuse.", 
        details: {
            overview: "Digital bullying, defamation, and abuse targeting minors or adults carry severe legal consequences and require proactive platform escalation.",
            clauses: [
                "Section 67A (Publishing sexually explicit material)",
                "POCSO Act provisions for digital child protection",
                "Defamation remedies under criminal and civil law"
            ],
            checklist: [
                "Notify school administration or guardians immediately.",
                "Submit takedown requests to platform administrators.",
                "Document bullying profiles, group chat links, and comments."
            ]
        }
    },
    { 
        id: 9, 
        title: "Identity Theft Guidance", 
        icon: Fingerprint, 
        color: "from-green-600 to-emerald-900", 
        desc: "Understand general legal steps and considerations when your identity is misused.", 
        details: {
            overview: "Identity theft occurs when personal credentials, biometrics, or profiles are misused to commit fraud or unauthorized transactions.",
            clauses: [
                "Section 66C (Punishment for identity theft)",
                "Section 66D (Cheating by personation using computer resource)",
                "IPC Section 468 (Forgery for purpose of cheating)"
            ],
            checklist: [
                "Change all compromised passwords and enable 2FA.",
                "Report compromised ID credentials to issuing authorities.",
                "Verify credit report for unauthorized loan applications."
            ]
        }
    },
    { 
        id: 10, 
        title: "Legal Support Referral", 
        icon: Users, 
        color: "from-slate-600 to-zinc-900", 
        desc: "Find appropriate legal support and verified resources for cyber-related concerns.", 
        details: {
            overview: "Finding legitimate legal support is crucial to navigating complex cyber law disputes and protecting your digital rights.",
            clauses: [
                "National Legal Services Authority (NALSA) guidelines",
                "State cyber cell legal aid cells",
                "Certified pro bono legal advice frameworks"
            ],
            checklist: [
                "Confirm credentials of cyber legal counsel.",
                "Check verified lists of legal aid clinics.",
                "Verify fees and retainer agreements beforehand."
            ]
        }
    }
];
