/**
 * classroom_data.js
 * Centralized data store for Classroom Virtual Whiteboard & CR Cyber Threat Intelligence.
 * Includes complete 50 Software Objectives, lesson pages, interactive desk book modules,
 * chalk/duster states, and layout configurations.
 */

export const INITIAL_CHALK_STATE = {
  x: 472,
  y: 462,
  rot: 85,
  color: '#0f172a',
  visible: true,
  isWriting: false,
  duration: 350,
  ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
};

export const INITIAL_DUSTER_STATE = {
  x: 946,
  y: 449,
  rot: 0,
  visible: true,
  isErasing: false,
  duration: 350,
  ease: 'ease',
};

export const INITIAL_TEXT_LENGTHS = {
  title: 0,
  description: 0,
};

export const INITIAL_STROKES = {
  underline: false,
};

export const BASE_CANVAS_CONFIG = {
  width: 1478,
  height: 830,
  boardViewBox: { x: 400, y: 78, w: 666, h: 426 },
  colors: {
    wall: '#687588',
    floor: '#24202d',
    horizon: '#1d1a24',
    chalkboardBg: '#0f3d30',
    whiteboardBg: '#ffffff',
  }
};

/**
 * COMPLETE 50 SOFTWARE OBJECTIVES FOR CR CYBER THREAT INTELLIGENCE
 */
export const SOFTWARE_OBJECTIVES = [
  {
    id: 1,
    title: "Defining Clear Software Objectives",
    description: "The primary objective of CR Cyber Threat Intelligence is to develop a useful software experience that helps people understand cyber risks and make more informed digital-safety decisions. Its objectives should be clear enough to guide planning, content development, review, and future evaluation. Because the product is still in development, these objectives describe intended outcomes rather than achievements already demonstrated. Each objective should remain realistic, measurable where possible, and consistent with the product’s educational and informational role."
  },
  {
    id: 2,
    title: "Improving Cyber Safety Awareness",
    description: "One objective is to improve users’ understanding of common cybersecurity risks through clear and relevant awareness material. Content may explain suspicious messages, account safety, privacy choices, impersonation, and deceptive online offers. The intended result is stronger recognition of warning signs and a better understanding of practical precautions. The product should not claim that awareness alone prevents all incidents. Progress toward this objective could eventually be assessed through content quality, user feedback, and other suitable measures once those methods are established."
  },
  {
    id: 3,
    title: "Making Threat Concepts Easier to Recognize",
    description: "The software aims to help users recognize and understand common threat patterns without requiring advanced technical knowledge. Explanations may cover how phishing, social engineering, impersonation, and other digital risks typically appear. The objective is better recognition and informed caution, not a promise of automatic threat detection. Any future detection feature would require separate implementation and validation. Educational material should use realistic, responsible examples that help users learn without giving harmful actors instructions for misuse."
  },
  {
    id: 4,
    title: "Supporting Better-Informed Digital Decisions",
    description: "An objective of the product is to give users understandable context that can support careful decisions when they encounter unfamiliar online situations. This may include evaluating unexpected requests, checking identity through trusted channels, and considering privacy before sharing information. The software should encourage independent verification rather than present every explanation as a definitive answer. Success should be judged by whether the information is clear, relevant, and useful to its intended audience, not by unsupported promises about eliminating digital risk."
  },
  {
    id: 5,
    title: "Strengthening Scam-Prevention Knowledge",
    description: "The product aims to improve understanding of common scam indicators, including urgency, secrecy, unusual payment requests, impersonation, and demands for confidential information. An objective is to help users pause and verify claims before acting. This does not guarantee that users will avoid every scam or recover money after a loss. Educational examples should be updated when reliable information supports a change and should avoid naming specific people or businesses as fraudulent without sufficient evidence."
  },
  {
    id: 6,
    title: "Encouraging Practical Safety Habits",
    description: "Another objective is to make everyday digital-safety habits easier to understand and apply. Topics may include unique passwords, multifactor authentication where available, software updates, careful handling of links, and thoughtful privacy settings. The aim is to communicate why these habits matter and where their limits lie. The software should not claim that it directly configures or protects a user’s devices or accounts unless such functionality is later implemented, tested, and clearly described."
  },
  {
    id: 7,
    title: "Improving Understanding of Threat Information",
    description: "The product aims to help users interpret cybersecurity information with appropriate context. An objective is to distinguish general examples, preliminary reports, and confirmed information so that users do not mistake a possibility for proof. Any future threat-related content should make its source, date, and limitations understandable. The software should not claim to operate a comprehensive or real-time threat-intelligence feed unless that capability genuinely exists. Clear communication is a key measure of whether this objective is being pursued responsibly."
  },
  {
    id: 8,
    title: "Using Clear and Accessible Language",
    description: "An objective is to present cybersecurity concepts in language that is approachable for people with different levels of technical experience. Headings, definitions, examples, and structured explanations may help users find and understand relevant material. Simplicity must not distort technical meaning, so important qualifications should remain visible. The product should aim to reduce unnecessary confusion while acknowledging that some issues require specialist knowledge. Future reviews may use feedback to identify unclear passages and improve the presentation of information."
  },
  {
    id: 9,
    title: "Encouraging Independent Verification",
    description: "The software aims to encourage users to verify important claims through trusted channels separate from the message or request being assessed. This may include checking an organization’s published contact details or confirming an unusual request with a known person through another method. The objective is to strengthen a habit of verification, not to claim that the platform itself authenticates every account, identity, or offer. Guidance should explain its limits and avoid treating appearance alone as proof of legitimacy or fraud."
  },
  {
    id: 10,
    title: "Improving Privacy Awareness",
    description: "An objective is to help users better understand privacy choices when using websites, applications, messaging services, and social platforms. Educational material may explain permission requests, public sharing, account visibility, and the possible consequences of disclosing sensitive details. The intended outcome is more informed control over personal information. The software should not imply that it currently changes privacy settings or manages user data across external services. Any future privacy-related feature would need clear permissions and appropriate safeguards."
  },
  {
    id: 11,
    title: "Strengthening Account-Security Knowledge",
    description: "The product aims to explain account-protection practices such as using unique passwords, enabling multifactor authentication when available, securing recovery methods, and reviewing unfamiliar sign-in activity. The objective is to help users understand and consider these measures through the tools provided by their chosen services. It is not a claim that the software currently connects to or secures user accounts. Any future account integration would require explicit design, testing, permissions, and transparent communication."
  },
  {
    id: 12,
    title: "Improving Recognition of Phishing Attempts",
    description: "The software aims to help users recognize possible phishing indicators, such as misleading links, unexpected attachments, copied branding, and pressure to act quickly. Educational examples should explain how to verify a request independently and avoid sharing sensitive information prematurely. The objective is awareness rather than a promise that every phishing attempt can be identified. Any future automated classification capability would need separate validation and clear disclosure of false positives, false negatives, and other limitations."
  },
  {
    id: 13,
    title: "Raising Awareness of Impersonation",
    description: "An objective is to improve understanding of online impersonation and the ways a person or organization may be misrepresented. Users may be encouraged to check identities through a separate trusted channel and treat unexpected requests cautiously. The software should not make unsupported accusations about named individuals or organizations. Its objective is to teach safer verification habits and explain general options, while leaving formal determinations to appropriate processes and reliable evidence."
  },
  {
    id: 14,
    title: "Promoting Safer Social Media Practices",
    description: "The product aims to help users understand social media risks related to oversharing, unwanted contact, harassment, impersonation, and misleading offers. An objective is to make privacy controls and platform reporting options easier to understand, subject to accurate and current information. The software should not promise to remove content, restore accounts, or compel action by external platforms. Progress should be reflected in the clarity and usefulness of educational resources, not in outcomes that depend on third parties."
  },
  {
    id: 15,
    title: "Prioritizing Women’s Digital Safety",
    description: "An important objective is to give appropriate attention to digital-safety concerns that may affect women, including harassment, impersonation, privacy risks, unwanted contact, and image-based abuse. Content should be respectful, practical, and free from victim-blaming. The aim is to make information easier to access and help users understand possible support options. The software should not claim to provide crisis intervention or direct case management unless those services are formally established and responsibly delivered."
  },
  {
    id: 16,
    title: "Considering Girls’ Online Safety",
    description: "The product aims to include age-appropriate awareness of online risks that may affect girls, with attention to privacy, respectful communication, and seeking help from a trusted adult or suitable support service. An objective is to present this information in a careful, non-sensational manner and avoid collecting unnecessary personal details. The software should not imply that it provides child-protection intervention. Content should respect safeguarding needs and explain when support from qualified people or services may be important."
  },
  {
    id: 17,
    title: "Clarifying General Options After a Suspected Incident",
    description: "The software aims to help users understand general considerations after a suspected cybercrime incident. These may include keeping relevant records, avoiding further interaction with suspicious actors, and checking current support or reporting pathways. The objective is to reduce confusion without presenting general information as individualized legal advice or emergency assistance. The platform should not promise a particular investigation or outcome. Guidance should be clear about its scope and should direct users toward suitable assistance when the situation requires it."
  },
  {
    id: 18,
    title: "Explaining Responsible Record Preservation",
    description: "An objective is to explain how relevant digital records may be retained carefully, such as messages, dates, transaction references, or other details that could help when seeking assistance. Guidance should emphasize privacy and safe handling. The software should not claim to authenticate evidence, establish chain of custody, or produce court-ready reports unless such capabilities are implemented and validated. The intended outcome is a better understanding of careful record keeping, not encouragement to collect information in ways that create additional risk."
  },
  {
    id: 19,
    title: "Improving Awareness of Reporting Pathways",
    description: "The product aims to help users understand that different incidents may involve different reporting or support channels, including service providers and appropriate authorities. An objective is to explain how to look for current, trusted contact information and retain reference details when available. The software should not represent itself as an official reporting portal or imply that a message to the platform automatically starts an investigation. Any future resource directory should be checked and maintained so it remains accurate."
  },
  {
    id: 20,
    title: "Encouraging Appropriate Help-Seeking",
    description: "The software aims to help users recognize when general information may not be enough and when additional support may be needed. Depending on the circumstances, that may mean contacting a service provider, trusted person, qualified adviser, or appropriate authority. The objective is to make possible next steps easier to understand without guaranteeing a response or resolution. Guidance should be particularly careful where threats, financial loss, ongoing harassment, or account compromise may require prompt attention."
  },
  {
    id: 21,
    title: "Avoiding Fear-Based Communication",
    description: "An objective is to communicate cyber risks in a balanced way that informs rather than unnecessarily frightens users. Content should explain realistic threats, practical precautions, and relevant limitations without implying that every online activity is dangerous. The intended result is greater understanding and confidence, not avoidance of digital services. Reviews should check whether wording is proportionate, respectful, and useful. The software should not use alarming claims merely to attract attention or suggest that no precautions can ever help."
  },
  {
    id: 22,
    title: "Communicating Uncertainty Accurately",
    description: "The product aims to make uncertainty visible when information is incomplete, preliminary, or open to more than one interpretation. An objective is to distinguish what is known from what is inferred and what remains unverified. This is especially important where a claim could affect someone’s reputation or influence a consequential decision. Content should avoid overstating evidence and should be corrected when credible new information changes the understanding. Careful wording is a key part of trustworthy cybersecurity communication."
  },
  {
    id: 23,
    title: "Clarifying the Limits of General Guidance",
    description: "An objective is to help users understand when educational information differs from professional legal, financial, technical, or emergency assistance. Some situations require case-specific assessment beyond the scope of a software information resource. The platform should communicate this boundary clearly and avoid presenting general suggestions as definitive instructions for every user. This objective supports more appropriate help-seeking and reduces the risk that people rely on the product for services it does not provide."
  },
  {
    id: 24,
    title: "Promoting Ethical Cybersecurity Learning",
    description: "The software aims to reinforce lawful, authorized, and defensive approaches to cybersecurity learning. An objective is to explain why consent and clearly defined scope matter when testing systems or handling digital information. Educational material should not encourage unauthorized access, surveillance, retaliation, or intrusion into private accounts. The intended outcome is responsible awareness and safer learning practices. Technical curiosity should be guided toward legitimate environments and responsible reporting rather than actions that could harm others."
  },
  {
    id: 25,
    title: "Supporting Research-Led Information Quality",
    description: "The product aims to base future cybersecurity information on careful research and reliable sources rather than rumours or sensational claims. An objective is to consider source credibility, publication date, context, and whether multiple sources support a conclusion. Public availability alone does not prove that information is accurate. Research processes should be described according to what is genuinely performed, and the software should not claim comprehensive monitoring or a complete intelligence database unless those capabilities are implemented."
  },
  {
    id: 26,
    title: "Separating Facts From Interpretation",
    description: "An objective is to present information so users can distinguish directly supported facts from interpretation, possibilities, and recommendations. This separation helps prevent an early report or isolated indicator from being treated as conclusive evidence. Future content should use suitable context and make uncertainty understandable. The software should not declare a specific person, account, or organization malicious on the basis of an unverified claim. Reliable information requires both careful sourcing and disciplined wording."
  },
  {
    id: 27,
    title: "Evaluating AI Use Responsibly",
    description: "The product may explore AI as a future tool for organizing information, explaining concepts, or supporting selected analysis. An objective is to evaluate whether such use can offer genuine benefit while addressing accuracy, privacy, bias, and misuse risks. AI-generated output should not be treated as authoritative without appropriate review. This is a development objective, not a claim that AI features are already operational. Any eventual feature should be tested and its scope and limitations explained clearly."
  },
  {
    id: 28,
    title: "Assessing Advanced Threat Analysis Possibilities",
    description: "Advanced threat analysis may be considered as a longer-term objective if suitable data, methods, expertise, and safeguards can be established. The purpose would be to help users interpret relevant information more effectively, not to produce unsupported certainty. Any future analytical function would need testing, clear scope, and communication of uncertainty. The software should not claim current advanced detection or validated intelligence assessments unless they have been implemented and demonstrated to work as described."
  },
  {
    id: 29,
    title: "Evaluating Monitoring Ideas With Safeguards",
    description: "Monitoring-related capabilities may be assessed during future planning, but only with a clear purpose, appropriate permissions, lawful sources, and safeguards against misuse. An objective is to determine whether any such feature can be useful and responsible before deciding to build it. The software should not claim that it currently monitors devices, accounts, or the internet in real time. Any future capability must be transparently described and separated from ideas that remain under consideration."
  },
  {
    id: 30,
    title: "Keeping Information Maintained and Relevant",
    description: "An objective is to plan for review of educational content when important platform settings, threat patterns, or reporting processes change. Where updates are made, relevant details should be checked and outdated guidance corrected. Dates or source context may help users assess the currency of material. The product should not promise immediate updates to every change or imply that all content is continuously monitored. A realistic maintenance process is more trustworthy than an unsupported claim of permanent accuracy."
  },
  {
    id: 31,
    title: "Improving Usability for Different Experience Levels",
    description: "The software aims to make relevant information usable for beginners and people with more technical experience. An objective is to organize material so users can locate essential explanations quickly while still having access to detail where appropriate. Readable structure, definitions, and practical examples may help. User feedback, when collected through suitable methods, could reveal where explanations are confusing. The product should not assume that a single presentation style will meet every user’s needs."
  },
  {
    id: 32,
    title: "Considering Language and Accessibility Goals",
    description: "An objective is to consider language needs and accessible presentation as the product’s audience develops. Terminology, reading level, and local context can affect whether guidance is understood correctly. Translation should be reviewed for meaning, not treated as a word-for-word task alone. The software should clearly state which languages and accessibility features are actually supported, and should not claim comprehensive coverage before implementation and testing. This objective supports wider usability without overstating current readiness."
  },
  {
    id: 33,
    title: "Supporting Student Digital Awareness",
    description: "The product aims to provide educational resources that may be useful to students and young adults using digital services for learning, communication, entertainment, and work opportunities. An objective is to explain common risks and safer choices in an approachable manner. Content should be age-appropriate where necessary and should encourage suitable help-seeking. The software is not intended to replace schools, families, or qualified support services, and it should not blame young people for misconduct directed at them."
  },
  {
    id: 34,
    title: "Considering Organizational Awareness Needs",
    description: "The software may explore educational resources for organizations seeking to improve staff understanding of suspicious requests, account security, and safe information handling. An objective is to define any organization-focused content carefully and explain its scope. Educational material should not be presented as a formal audit, compliance certification, or guarantee of security. Organizational protection also depends on governance, technical controls, and suitable professional assessment. Future offerings should be evaluated for usefulness before being described as available services."
  },
  {
    id: 35,
    title: "Improving Recognition of Suspicious Opportunities",
    description: "An objective is to help users assess online job offers, prizes, investment claims, and other opportunities that may use unrealistic promises or pressure. Educational material may explain warning signs such as upfront fees, unverifiable identities, and requests for sensitive information without a clear reason. Users should be encouraged to verify details independently. The product should not label specific offers or organizations fraudulent without reliable evidence. The goal is improved judgment, not a guarantee that every legitimate or fraudulent offer can be identified."
  },
  {
    id: 36,
    title: "Promoting Safer Digital Payment Decisions",
    description: "The software aims to explain practical precautions for digital payments, including checking recipient details, protecting authentication codes, and verifying unexpected payment requests. An objective is to help users understand safer decision-making before a transaction and where to seek help if a problem occurs. The platform should not claim to process payments, access bank accounts, trace funds, or recover losses unless those capabilities are separately implemented and verified. Educational information should be balanced and should not promise that any payment is risk-free."
  },
  {
    id: 37,
    title: "Improving Device-Safety Awareness",
    description: "An objective is to help users understand basic device-safety practices, such as installing updates from trusted sources, reviewing app permissions, using screen locks, and being careful with unfamiliar downloads. The software should not imply that it currently scans or repairs devices. If technical tools are considered in the future, their permissions, effects, and limits must be clear. Advice should account for differences among operating systems, devices, and software versions rather than assuming that one set of steps works everywhere."
  },
  {
    id: 38,
    title: "Building Awareness of AI-Related Digital Risks",
    description: "As AI tools become more common, users may need to understand risks involving fabricated outputs, impersonation, sensitive prompts, and misleading content. An objective is to provide clear educational information that encourages verification and careful data sharing. This should remain separate from claims about the software’s own AI capabilities. Any AI feature developed in the future should be assessed for reliability, privacy, bias, and misuse potential, with human judgment remaining important for consequential decisions."
  },
  {
    id: 39,
    title: "Making Product Claims Verifiable",
    description: "An objective is to ensure that descriptions of the software match its real development status and demonstrated capabilities. Planned features should be labelled as planned, while available features should have a clear and accurate scope. The product should not claim official status, certifications, real-time monitoring, or investigative powers without verifiable grounds. This discipline can help users form realistic expectations and guide future teams toward evidence-based communication. Trust should be built through accuracy rather than ambitious but unsupported wording."
  },
  {
    id: 40,
    title: "Integrating Privacy Into Development Goals",
    description: "The product aims to consider privacy from the earliest stages of design. An objective is to evaluate data minimization, access controls, retention, and transparent explanations wherever future features may handle personal information. These are goals for responsible development, not claims that particular controls or certifications are already in place. Features involving sensitive reports or user submissions should receive suitable review before release. Privacy practices should be proportionate to the information handled and explained in a way users can understand."
  },
  {
    id: 41,
    title: "Reducing the Risk of Misleading Conclusions",
    description: "An objective is to reduce the chance that users mistake a warning sign, rumour, or incomplete record for a confirmed conclusion. Content should separate evidence from interpretation and explain when additional verification is needed. This matters because cybersecurity claims can affect reputations, relationships, and decisions. The product should not make accusations against named people or organizations without reliable support. Responsible communication should acknowledge limitations and correct material when credible evidence shows that an explanation was inaccurate."
  },
  {
    id: 42,
    title: "Maintaining Clear Limits on Authority",
    description: "The software is being developed as a cybersecurity information and awareness product, not as a government body, law-enforcement agency, or official investigative authority. An objective is to communicate this distinction consistently. The product should not promise arrests, enforcement action, official case outcomes, or direct intervention unless a legitimate and verified basis exists. Users need to understand what the software can realistically provide, particularly when they are distressed or seeking help after a suspected incident."
  },
  {
    id: 43,
    title: "Defining Meaningful Measures of Progress",
    description: "As development matures, objectives may be evaluated using appropriate measures such as content accuracy reviews, usability feedback, accessibility checks, and the successful completion of planned development milestones. Measures should reflect actual product goals and should not be invented to suggest success. User feedback or usage figures alone may not prove that cybercrime has decreased. A responsible evaluation approach should explain what is being measured, what the result means, and what conclusions cannot be drawn from it."
  },
  {
    id: 44,
    title: "Preparing for Relevance Across India",
    description: "An objective is to develop content that can become relevant to users across India while recognizing differences in language, digital services, and local reporting processes. This may require additional research and review before information is presented as suitable for a particular audience. The software should not imply that all states, communities, or languages are already covered. Progress should depend on product readiness and the quality of available information, with current support described accurately."
  },
  {
    id: 45,
    title: "Exploring Future Global Relevance",
    description: "The longer-term objective is to assess whether selected educational resources can responsibly serve audiences beyond India. This may require research into local terminology, legal differences, support pathways, and user expectations. The product should not claim global coverage before these needs are addressed and the relevant capabilities are implemented. International growth should follow preparation and validation, while retaining clear distinctions between broadly useful safety principles and guidance that depends on a particular country’s systems."
  },
  {
    id: 46,
    title: "Prioritizing Useful Features Over Feature Count",
    description: "An objective is to prioritize product work according to genuine user needs, feasibility, safety, and likely benefit. Adding more features does not automatically improve a cybersecurity product, especially when complex capabilities need reliable data and safeguards. Development decisions should explain the problem a feature is intended to address and how its usefulness might be evaluated. This approach supports a focused product roadmap and helps avoid promises that exceed technical readiness or create expectations the software cannot meet."
  },
  {
    id: 47,
    title: "Using Feedback to Improve Clarity",
    description: "When suitable feedback channels are available, the product may use comments and questions to identify confusing explanations or gaps in educational coverage. An objective is to assess feedback carefully without treating every submission as verified evidence of an incident. Any collection process should minimize sensitive data and explain how feedback will be used. The software should not imply that every message receives a case investigation or individual response. Feedback should support content improvement within a clearly defined scope."
  },
  {
    id: 48,
    title: "Keeping Development Status Transparent",
    description: "The product aims to make its progress understandable by distinguishing work that is planned, in development, tested, or available. An objective is to keep public descriptions aligned with the actual status of each capability. Clear status labels can reduce confusion and help users make informed choices about whether the software meets their needs. The product should avoid implying that a roadmap is a promise of delivery on a fixed date unless that commitment is justified and communicated responsibly."
  },
  {
    id: 49,
    title: "Maintaining Focus on Women’s and Girls’ Safety",
    description: "The software’s objectives should continue to recognize women’s and girls’ digital safety as an important consideration within broader cybersecurity awareness. Relevant content may address harassment, impersonation, privacy, and image-based abuse with a respectful tone and practical context. It should avoid victim-blaming and should not promise direct protection or intervention that is not available. The objective is to improve access to understandable information and clarify possible support options, while recognizing that serious situations may require specialized assistance."
  },
  {
    id: 50,
    title: "The Overall Objective for Future Development",
    description: "The overall objective of CR Cyber Threat Intelligence is to make cyber risks easier to understand and help people approach digital activity with greater awareness. The product aims to develop clear educational information, scam-prevention guidance, privacy awareness, and responsible research practices, with attention to women’s and girls’ digital safety. AI, advanced threat analysis, and monitoring-related capabilities remain subject to future design, testing, and safeguards. India-wide relevance and potential global use are longer-term goals, not claims of current coverage."
  }
];

/**
 * LESSON_PAGES: Animated Whiteboard Lessons
 * Contains all 50 Objectives (Heading, Line, Description - No geometric drawings)
 */
export const LESSON_PAGES = SOFTWARE_OBJECTIVES.map((obj) => ({
  id: obj.id,
  title: `${obj.id}. ${obj.title}`,
  heading: `${obj.id}. ${obj.title}`,
  description: obj.description,
  date: `Objective ${obj.id} / 50`,
}));

/**
 * BOOK_DATA: 6 Interactive Classroom Desk Books
 * Contains all 50 CR Cyber Threat Intelligence Software Objectives grouped systematically.
 */
export const BOOK_DATA = {
  stand: {
    title: 'CR CTI: Foundation & Awareness Objectives',
    subject: 'Core Software Objectives (1 - 8)',
    accentColor: '#10b981',
    pages: [
      {
        heading: '1. Defining Clear Software Objectives',
        content:
          'The primary objective of CR Cyber Threat Intelligence is to develop a useful software experience that helps people understand cyber risks and make more informed digital-safety decisions. Its objectives should be clear enough to guide planning, content development, review, and future evaluation. Because the product is still in development, these objectives describe intended outcomes rather than achievements already demonstrated. Each objective should remain realistic, measurable where possible, and consistent with the product’s educational and informational role.'
      },
      {
        heading: '2. Improving Cyber Safety Awareness',
        content:
          'One objective is to improve users’ understanding of common cybersecurity risks through clear and relevant awareness material. Content may explain suspicious messages, account safety, privacy choices, impersonation, and deceptive online offers. The intended result is stronger recognition of warning signs and a better understanding of practical precautions. The product should not claim that awareness alone prevents all incidents. Progress toward this objective could eventually be assessed through content quality, user feedback, and other suitable measures once those methods are established.'
      },
      {
        heading: '3. Making Threat Concepts Easier to Recognize',
        content:
          'The software aims to help users recognize and understand common threat patterns without requiring advanced technical knowledge. Explanations may cover how phishing, social engineering, impersonation, and other digital risks typically appear. The objective is better recognition and informed caution, not a promise of automatic threat detection. Any future detection feature would require separate implementation and validation. Educational material should use realistic, responsible examples that help users learn without giving harmful actors instructions for misuse.'
      },
      {
        heading: '4. Supporting Better-Informed Digital Decisions',
        content:
          'An objective of the product is to give users understandable context that can support careful decisions when they encounter unfamiliar online situations. This may include evaluating unexpected requests, checking identity through trusted channels, and considering privacy before sharing information. The software should encourage independent verification rather than present every explanation as a definitive answer. Success should be judged by whether the information is clear, relevant, and useful to its intended audience, not by unsupported promises about eliminating digital risk.'
      },
      {
        heading: '5. Strengthening Scam-Prevention Knowledge',
        content:
          'The product aims to improve understanding of common scam indicators, including urgency, secrecy, unusual payment requests, impersonation, and demands for confidential information. An objective is to help users pause and verify claims before acting. This does not guarantee that users will avoid every scam or recover money after a loss. Educational examples should be updated when reliable information supports a change and should avoid naming specific people or businesses as fraudulent without sufficient evidence.'
      },
      {
        heading: '6. Encouraging Practical Safety Habits',
        content:
          'Another objective is to make everyday digital-safety habits easier to understand and apply. Topics may include unique passwords, multifactor authentication where available, software updates, careful handling of links, and thoughtful privacy settings. The aim is to communicate why these habits matter and where their limits lie. The software should not claim that it directly configures or protects a user’s devices or accounts unless such functionality is later implemented, tested, and clearly described.'
      },
      {
        heading: '7. Improving Understanding of Threat Information',
        content:
          'The product aims to help users interpret cybersecurity information with appropriate context. An objective is to distinguish general examples, preliminary reports, and confirmed information so that users do not mistake a possibility for proof. Any future threat-related content should make its source, date, and limitations understandable. The software should not claim to operate a comprehensive or real-time threat-intelligence feed unless that capability genuinely exists. Clear communication is a key measure of whether this objective is being pursued responsibly.'
      },
      {
        heading: '8. Using Clear and Accessible Language',
        content:
          'An objective is to present cybersecurity concepts in language that is approachable for people with different levels of technical experience. Headings, definitions, examples, and structured explanations may help users find and understand relevant material. Simplicity must not distort technical meaning, so important qualifications should remain visible. The product should aim to reduce unnecessary confusion while acknowledging that some issues require specialist knowledge. Future reviews may use feedback to identify unclear passages and improve the presentation of information.'
      }
    ]
  },

  desk1: {
    title: 'Verification, Privacy & Women/Girls Safety',
    subject: 'Defense & Safeguards (9 - 16)',
    accentColor: '#0d9488',
    pages: [
      {
        heading: '9. Encouraging Independent Verification',
        content:
          'The software aims to encourage users to verify important claims through trusted channels separate from the message or request being assessed. This may include checking an organization’s published contact details or confirming an unusual request with a known person through another method. The objective is to strengthen a habit of verification, not to claim that the platform itself authenticates every account, identity, or offer. Guidance should explain its limits and avoid treating appearance alone as proof of legitimacy or fraud.'
      },
      {
        heading: '10. Improving Privacy Awareness',
        content:
          'An objective is to help users better understand privacy choices when using websites, applications, messaging services, and social platforms. Educational material may explain permission requests, public sharing, account visibility, and the possible consequences of disclosing sensitive details. The intended outcome is more informed control over personal information. The software should not imply that it currently changes privacy settings or manages user data across external services. Any future privacy-related feature would need clear permissions and appropriate safeguards.'
      },
      {
        heading: '11. Strengthening Account-Security Knowledge',
        content:
          'The product aims to explain account-protection practices such as using unique passwords, enabling multifactor authentication when available, securing recovery methods, and reviewing unfamiliar sign-in activity. The objective is to help users understand and consider these measures through the tools provided by their chosen services. It is not a claim that the software currently connects to or secures user accounts. Any future account integration would require explicit design, testing, permissions, and transparent communication.'
      },
      {
        heading: '12. Improving Recognition of Phishing Attempts',
        content:
          'The software aims to help users recognize possible phishing indicators, such as misleading links, unexpected attachments, copied branding, and pressure to act quickly. Educational examples should explain how to verify a request independently and avoid sharing sensitive information prematurely. The objective is awareness rather than a promise that every phishing attempt can be identified. Any future automated classification capability would need separate validation and clear disclosure of false positives, false negatives, and other limitations.'
      },
      {
        heading: '13. Raising Awareness of Impersonation',
        content:
          'An objective is to improve understanding of online impersonation and the ways a person or organization may be misrepresented. Users may be encouraged to check identities through a separate trusted channel and treat unexpected requests cautiously. The software should not make unsupported accusations about named individuals or organizations. Its objective is to teach safer verification habits and explain general options, while leaving formal determinations to appropriate processes and reliable evidence.'
      },
      {
        heading: '14. Promoting Safer Social Media Practices',
        content:
          'The product aims to help users understand social media risks related to oversharing, unwanted contact, harassment, impersonation, and misleading offers. An objective is to make privacy controls and platform reporting options easier to understand, subject to accurate and current information. The software should not promise to remove content, restore accounts, or compel action by external platforms. Progress should be reflected in the clarity and usefulness of educational resources, not in outcomes that depend on third parties.'
      },
      {
        heading: '15. Prioritizing Women’s Digital Safety',
        content:
          'An important objective is to give appropriate attention to digital-safety concerns that may affect women, including harassment, impersonation, privacy risks, unwanted contact, and image-based abuse. Content should be respectful, practical, and free from victim-blaming. The aim is to make information easier to access and help users understand possible support options. The software should not claim to provide crisis intervention or direct case management unless those services are formally established and responsibly delivered.'
      },
      {
        heading: '16. Considering Girls’ Online Safety',
        content:
          'The product aims to include age-appropriate awareness of online risks that may affect girls, with attention to privacy, respectful communication, and seeking help from a trusted adult or suitable support service. An objective is to present this information in a careful, non-sensational manner and avoid collecting unnecessary personal details. The software should not imply that it provides child-protection intervention. Content should respect safeguarding needs and explain when support from qualified people or services may be important.'
      }
    ]
  },

  deskCenter: {
    title: 'Incident Handling, Evidence & Ethics',
    subject: 'Response & Quality (17 - 25)',
    accentColor: '#ef4444',
    pages: [
      {
        heading: '17. Clarifying General Options After a Suspected Incident',
        content:
          'The software aims to help users understand general considerations after a suspected cybercrime incident. These may include keeping relevant records, avoiding further interaction with suspicious actors, and checking current support or reporting pathways. The objective is to reduce confusion without presenting general information as individualized legal advice or emergency assistance. The platform should not promise a particular investigation or outcome. Guidance should be clear about its scope and should direct users toward suitable assistance when the situation requires it.'
      },
      {
        heading: '18. Explaining Responsible Record Preservation',
        content:
          'An objective is to explain how relevant digital records may be retained carefully, such as messages, dates, transaction references, or other details that could help when seeking assistance. Guidance should emphasize privacy and safe handling. The software should not claim to authenticate evidence, establish chain of custody, or produce court-ready reports unless such capabilities are implemented and validated. The intended outcome is a better understanding of careful record keeping, not encouragement to collect information in ways that create additional risk.'
      },
      {
        heading: '19. Improving Awareness of Reporting Pathways',
        content:
          'The product aims to help users understand that different incidents may involve different reporting or support channels, including service providers and appropriate authorities. An objective is to explain how to look for current, trusted contact information and retain reference details when available. The software should not represent itself as an official reporting portal or imply that a message to the platform automatically starts an investigation. Any future resource directory should be checked and maintained so it remains accurate.'
      },
      {
        heading: '20. Encouraging Appropriate Help-Seeking',
        content:
          'The software aims to help users recognize when general information may not be enough and when additional support may be needed. Depending on the circumstances, that may mean contacting a service provider, trusted person, qualified adviser, or appropriate authority. The objective is to make possible next steps easier to understand without guaranteeing a response or resolution. Guidance should be particularly careful where threats, financial loss, ongoing harassment, or account compromise may require prompt attention.'
      },
      {
        heading: '21. Avoiding Fear-Based Communication',
        content:
          'An objective is to communicate cyber risks in a balanced way that informs rather than unnecessarily frightens users. Content should explain realistic threats, practical precautions, and relevant limitations without implying that every online activity is dangerous. The intended result is greater understanding and confidence, not avoidance of digital services. Reviews should check whether wording is proportionate, respectful, and useful. The software should not use alarming claims merely to attract attention or suggest that no precautions can ever help.'
      },
      {
        heading: '22. Communicating Uncertainty Accurately',
        content:
          'The product aims to make uncertainty visible when information is incomplete, preliminary, or open to more than one interpretation. An objective is to distinguish what is known from what is inferred and what remains unverified. This is especially important where a claim could affect someone’s reputation or influence a consequential decision. Content should avoid overstating evidence and should be corrected when credible new information changes the understanding. Careful wording is a key part of trustworthy cybersecurity communication.'
      },
      {
        heading: '23. Clarifying the Limits of General Guidance',
        content:
          'An objective is to help users understand when educational information differs from professional legal, financial, technical, or emergency assistance. Some situations require case-specific assessment beyond the scope of a software information resource. The platform should communicate this boundary clearly and avoid presenting general suggestions as definitive instructions for every user. This objective supports more appropriate help-seeking and reduces the risk that people rely on the product for services it does not provide.'
      },
      {
        heading: '24. Promoting Ethical Cybersecurity Learning',
        content:
          'The software aims to reinforce lawful, authorized, and defensive approaches to cybersecurity learning. An objective is to explain why consent and clearly defined scope matter when testing systems or handling digital information. Educational material should not encourage unauthorized access, surveillance, retaliation, or intrusion into private accounts. The intended outcome is responsible awareness and safer learning practices. Technical curiosity should be guided toward legitimate environments and responsible reporting rather than actions that could harm others.'
      },
      {
        heading: '25. Supporting Research-Led Information Quality',
        content:
          'The product aims to base future cybersecurity information on careful research and reliable sources rather than rumours or sensational claims. An objective is to consider source credibility, publication date, context, and whether multiple sources support a conclusion. Public availability alone does not prove that information is accurate. Research processes should be described according to what is genuinely performed, and the software should not claim comprehensive monitoring or a complete intelligence database unless those capabilities are implemented.'
      }
    ]
  },

  deskRightCenter: {
    title: 'AI, Threat Analysis & Accessibility',
    subject: 'Analysis & Reach (26 - 34)',
    accentColor: '#06b6d4',
    pages: [
      {
        heading: '26. Separating Facts From Interpretation',
        content:
          'An objective is to present information so users can distinguish directly supported facts from interpretation, possibilities, and recommendations. This separation helps prevent an early report or isolated indicator from being treated as conclusive evidence. Future content should use suitable context and make uncertainty understandable. The software should not declare a specific person, account, or organization malicious on the basis of an unverified claim. Reliable information requires both careful sourcing and disciplined wording.'
      },
      {
        heading: '27. Evaluating AI Use Responsibly',
        content:
          'The product may explore AI as a future tool for organizing information, explaining concepts, or supporting selected analysis. An objective is to evaluate whether such use can offer genuine benefit while addressing accuracy, privacy, bias, and misuse risks. AI-generated output should not be treated as authoritative without appropriate review. This is a development objective, not a claim that AI features are already operational. Any eventual feature should be tested and its scope and limitations explained clearly.'
      },
      {
        heading: '28. Assessing Advanced Threat Analysis Possibilities',
        content:
          'Advanced threat analysis may be considered as a longer-term objective if suitable data, methods, expertise, and safeguards can be established. The purpose would be to help users interpret relevant information more effectively, not to produce unsupported certainty. Any future analytical function would need testing, clear scope, and communication of uncertainty. The software should not claim current advanced detection or validated intelligence assessments unless they have been implemented and demonstrated to work as described.'
      },
      {
        heading: '29. Evaluating Monitoring Ideas With Safeguards',
        content:
          'Monitoring-related capabilities may be assessed during future planning, but only with a clear purpose, appropriate permissions, lawful sources, and safeguards against misuse. An objective is to determine whether any such feature can be useful and responsible before deciding to build it. The software should not claim that it currently monitors devices, accounts, or the internet in real time. Any future capability must be transparently described and separated from ideas that remain under consideration.'
      },
      {
        heading: '30. Keeping Information Maintained and Relevant',
        content:
          'An objective is to plan for review of educational content when important platform settings, threat patterns, or reporting processes change. Where updates are made, relevant details should be checked and outdated guidance corrected. Dates or source context may help users assess the currency of material. The product should not promise immediate updates to every change or imply that all content is continuously monitored. A realistic maintenance process is more trustworthy than an unsupported claim of permanent accuracy.'
      },
      {
        heading: '31. Improving Usability for Different Experience Levels',
        content:
          'The software aims to make relevant information usable for beginners and people with more technical experience. An objective is to organize material so users can locate essential explanations quickly while still having access to detail where appropriate. Readable structure, definitions, and practical examples may help. User feedback, when collected through suitable methods, could reveal where explanations are confusing. The product should not assume that a single presentation style will meet every user’s needs.'
      },
      {
        heading: '32. Considering Language and Accessibility Goals',
        content:
          'An objective is to consider language needs and accessible presentation as the product’s audience develops. Terminology, reading level, and local context can affect whether guidance is understood correctly. Translation should be reviewed for meaning, not treated as a word-for-word task alone. The software should clearly state which languages and accessibility features are actually supported, and should not claim comprehensive coverage before implementation and testing. This objective supports wider usability without overstating current readiness.'
      },
      {
        heading: '33. Supporting Student Digital Awareness',
        content:
          'The product aims to provide educational resources that may be useful to students and young adults using digital services for learning, communication, entertainment, and work opportunities. An objective is to explain common risks and safer choices in an approachable manner. Content should be age-appropriate where necessary and should encourage suitable help-seeking. The software is not intended to replace schools, families, or qualified support services, and it should not blame young people for misconduct directed at them.'
      },
      {
        heading: '34. Considering Organizational Awareness Needs',
        content:
          'The software may explore educational resources for organizations seeking to improve staff understanding of suspicious requests, account security, and safe information handling. An objective is to define any organization-focused content carefully and explain its scope. Educational material should not be presented as a formal audit, compliance certification, or guarantee of security. Organizational protection also depends on governance, technical controls, and suitable professional assessment. Future offerings should be evaluated for usefulness before being described as available services.'
      }
    ]
  },

  deskFarRight: {
    title: 'Payments, Device Defense & Verifiable Claims',
    subject: 'Safety Habits & Boundaries (35 - 42)',
    accentColor: '#f43f5e',
    pages: [
      {
        heading: '35. Improving Recognition of Suspicious Opportunities',
        content:
          'An objective is to help users assess online job offers, prizes, investment claims, and other opportunities that may use unrealistic promises or pressure. Educational material may explain warning signs such as upfront fees, unverifiable identities, and requests for sensitive information without a clear reason. Users should be encouraged to verify details independently. The product should not label specific offers or organizations fraudulent without reliable evidence. The goal is improved judgment, not a guarantee that every legitimate or fraudulent offer can be identified.'
      },
      {
        heading: '36. Promoting Safer Digital Payment Decisions',
        content:
          'The software aims to explain practical precautions for digital payments, including checking recipient details, protecting authentication codes, and verifying unexpected payment requests. An objective is to help users understand safer decision-making before a transaction and where to seek help if a problem occurs. The platform should not claim to process payments, access bank accounts, trace funds, or recover losses unless those capabilities are separately implemented and verified. Educational information should be balanced and should not promise that any payment is risk-free.'
      },
      {
        heading: '37. Improving Device-Safety Awareness',
        content:
          'An objective is to help users understand basic device-safety practices, such as installing updates from trusted sources, reviewing app permissions, using screen locks, and being careful with unfamiliar downloads. The software should not imply that it currently scans or repairs devices. If technical tools are considered in the future, their permissions, effects, and limits must be clear. Advice should account for differences among operating systems, devices, and software versions rather than assuming that one set of steps works everywhere.'
      },
      {
        heading: '38. Building Awareness of AI-Related Digital Risks',
        content:
          'As AI tools become more common, users may need to understand risks involving fabricated outputs, impersonation, sensitive prompts, and misleading content. An objective is to provide clear educational information that encourages verification and careful data sharing. This should remain separate from claims about the software’s own AI capabilities. Any AI feature developed in the future should be assessed for reliability, privacy, bias, and misuse potential, with human judgment remaining important for consequential decisions.'
      },
      {
        heading: '39. Making Product Claims Verifiable',
        content:
          'An objective is to ensure that descriptions of the software match its real development status and demonstrated capabilities. Planned features should be labelled as planned, while available features should have a clear and accurate scope. The product should not claim official status, certifications, real-time monitoring, or investigative powers without verifiable grounds. This discipline can help users form realistic expectations and guide future teams toward evidence-based communication. Trust should be built through accuracy rather than ambitious but unsupported wording.'
      },
      {
        heading: '40. Integrating Privacy Into Development Goals',
        content:
          'The product aims to consider privacy from the earliest stages of design. An objective is to evaluate data minimization, access controls, retention, and transparent explanations wherever future features may handle personal information. These are goals for responsible development, not claims that particular controls or certifications are already in place. Features involving sensitive reports or user submissions should receive suitable review before release. Privacy practices should be proportionate to the information handled and explained in a way users can understand.'
      },
      {
        heading: '41. Reducing the Risk of Misleading Conclusions',
        content:
          'An objective is to reduce the chance that users mistake a warning sign, rumour, or incomplete record for a confirmed conclusion. Content should separate evidence from interpretation and explain when additional verification is needed. This matters because cybersecurity claims can affect reputations, relationships, and decisions. The product should not make accusations against named people or organizations without reliable support. Responsible communication should acknowledge limitations and correct material when credible evidence shows that an explanation was inaccurate.'
      },
      {
        heading: '42. Maintaining Clear Limits on Authority',
        content:
          'The software is being developed as a cybersecurity information and awareness product, not as a government body, law-enforcement agency, or official investigative authority. An objective is to communicate this distinction consistently. The product should not promise arrests, enforcement action, official case outcomes, or direct intervention unless a legitimate and verified basis exists. Users need to understand what the software can realistically provide, particularly when they are distressed or seeking help after a suspected incident.'
      }
    ]
  },

  lowBench: {
    title: 'Governance, India Vision & Strategic Roadmap',
    subject: 'Strategy & Vision (43 - 50)',
    accentColor: '#f59e0b',
    pages: [
      {
        heading: '43. Defining Meaningful Measures of Progress',
        content:
          'As development matures, objectives may be evaluated using appropriate measures such as content accuracy reviews, usability feedback, accessibility checks, and the successful completion of planned development milestones. Measures should reflect actual product goals and should not be invented to suggest success. User feedback or usage figures alone may not prove that cybercrime has decreased. A responsible evaluation approach should explain what is being measured, what the result means, and what conclusions cannot be drawn from it.'
      },
      {
        heading: '44. Preparing for Relevance Across India',
        content:
          'An objective is to develop content that can become relevant to users across India while recognizing differences in language, digital services, and local reporting processes. This may require additional research and review before information is presented as suitable for a particular audience. The software should not imply that all states, communities, or languages are already covered. Progress should depend on product readiness and the quality of available information, with current support described accurately.'
      },
      {
        heading: '45. Exploring Future Global Relevance',
        content:
          'The longer-term objective is to assess whether selected educational resources can responsibly serve audiences beyond India. This may require research into local terminology, legal differences, support pathways, and user expectations. The product should not claim global coverage before these needs are addressed and the relevant capabilities are implemented. International growth should follow preparation and validation, while retaining clear distinctions between broadly useful safety principles and guidance that depends on a particular country’s systems.'
      },
      {
        heading: '46. Prioritizing Useful Features Over Feature Count',
        content:
          'An objective is to prioritize product work according to genuine user needs, feasibility, safety, and likely benefit. Adding more features does not automatically improve a cybersecurity product, especially when complex capabilities need reliable data and safeguards. Development decisions should explain the problem a feature is intended to address and how its usefulness might be evaluated. This approach supports a focused product roadmap and helps avoid promises that exceed technical readiness or create expectations the software cannot meet.'
      },
      {
        heading: '47. Using Feedback to Improve Clarity',
        content:
          'When suitable feedback channels are available, the product may use comments and questions to identify confusing explanations or gaps in educational coverage. An objective is to assess feedback carefully without treating every submission as verified evidence of an incident. Any collection process should minimize sensitive data and explain how feedback will be used. The software should not imply that every message receives a case investigation or individual response. Feedback should support content improvement within a clearly defined scope.'
      },
      {
        heading: '48. Keeping Development Status Transparent',
        content:
          'The product aims to make its progress understandable by distinguishing work that is planned, in development, tested, or available. An objective is to keep public descriptions aligned with the actual status of each capability. Clear status labels can reduce confusion and help users make informed choices about whether the software meets their needs. The product should avoid implying that a roadmap is a promise of delivery on a fixed date unless that commitment is justified and communicated responsibly.'
      },
      {
        heading: '49. Maintaining Focus on Women’s and Girls’ Safety',
        content:
          'The software’s objectives should continue to recognize women’s and girls’ digital safety as an important consideration within broader cybersecurity awareness. Relevant content may address harassment, impersonation, privacy, and image-based abuse with a respectful tone and practical context. It should avoid victim-blaming and should not promise direct protection or intervention that is not available. The objective is to improve access to understandable information and clarify possible support options, while recognizing that serious situations may require specialized assistance.'
      },
      {
        heading: '50. The Overall Objective for Future Development',
        content:
          'The overall objective of CR Cyber Threat Intelligence is to make cyber risks easier to understand and help people approach digital activity with greater awareness. The product aims to develop clear educational information, scam-prevention guidance, privacy awareness, and responsible research practices, with attention to women’s and girls’ digital safety. AI, advanced threat analysis, and monitoring-related capabilities remain subject to future design, testing, and safeguards. India-wide relevance and potential global use are longer-term goals, not claims of current coverage.'
      }
    ]
  }
};
