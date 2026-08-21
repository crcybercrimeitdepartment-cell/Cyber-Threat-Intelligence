import {
    Lock, UserCircle, ShoppingCart, CreditCard,
    Building2, Wallet, Mail, MessageSquare, UserSquare2,
    ShieldAlert, Smartphone, Laptop, Camera, Megaphone,
    Database, Wifi, Bug, GlobeLock,
    CircleDollarSign, Flag
} from 'lucide-react';

export const directoryData = [
    { id: '01', title: 'Online Financial\nFraud', desc: 'Protect your bank accounts and report unauthorized transaction activities.', icon: UserCircle },
    { id: '02', title: 'FIR Registration\n(Online)', desc: 'Register your cyber FIR with ease through our portal.', icon: ShoppingCart },
    { id: '03', title: 'Credit / Debit\nCard Fraud', desc: 'Secure card details against skimming, cloning, and unauthorized transactions.', icon: CreditCard },
    { id: '04', title: 'Banking\nFraud', desc: 'Detect net banking scams, unauthorized fund transfers, and credential theft.', icon: Building2 },
    { id: '05', title: 'Digital Wallet\nFraud', desc: 'Defend UPI, e-wallets, and mobile payment apps from extortion scams.', icon: Wallet },
    { id: '06', title: 'Phishing\nScams', desc: 'Identify deceptive links, malicious emails, and spoofed bank login pages.', icon: Mail },
    { id: '07', title: 'Social Media\nHarassment', desc: 'Report online stalking, cyberbullying, profiling, and fake profile creation.', icon: MessageSquare },
    { id: '08', title: 'Identity\nTheft', desc: 'Prevent impersonation and misuse of your critical government identification.', icon: UserSquare2 },
    { id: '09', title: 'Police Station\nDirectory', desc: 'Find cyber police stations and nodal officers near you.', icon: ShieldAlert },
    { id: '10', title: 'Mobile\nFraud', desc: 'Combat malicious apps, call spoofing, SMS phishing, and SIM swap scams.', icon: Smartphone },
    { id: '11', title: 'Cyber\nStalking', desc: 'Report persistent online tracking, location spying, and unwanted intrusion.', icon: Laptop },
    { id: '12', title: 'Online\nDefamation', desc: 'File reports against fake campaigns, social damage, and malicious rumors.', icon: Camera },
    { id: '13', title: 'Threats &\nIntimidation', desc: 'Take action against digital blackmail, threat emails, and online extortion.', icon: Megaphone },
    { id: '14', title: 'Corporate\nData Breach', desc: 'Respond to database leaks, credential dumps, and unauthorized server access.', icon: Database },
    { id: '15', title: 'Cyber\nBullying', desc: 'Protect minors and students from online hate, trolling, and harassment.', icon: Wifi },
    { id: '16', title: 'Malware /\nVirus Attack', desc: 'Clean system trojans, ransomware, adware, and install active shields.', icon: Bug },
    { id: '17', title: 'Website\nHacking', desc: 'Protect sites against SQL injection, XSS defacement, and server takeovers.', icon: GlobeLock },
    { id: '18', title: 'Copyright\nInfringement', desc: 'Take down unauthorized copies of digital assets, designs, and content.', icon: Lock },
    { id: '19', title: 'Ransomware\nAttack', desc: 'Isolate compromised nodes, backup databases, and handle network lockout.', icon: CircleDollarSign },
    { id: '20', title: 'Other Cyber\nCrimes', desc: 'File reports for miscellaneous digital offenses, fraud, and legal violations.', icon: Flag },
];

export const themes = [
    { baseGrad: 'linear-gradient(135deg, #0F2046 0%, #050B19 100%)', underlayGrad: 'linear-gradient(135deg, #0066FF 0%, #0022AA 100%)', accent: '#0066FF', shadow: 'rgba(0, 102, 255, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #3B0764 0%, #2E1065 100%)', underlayGrad: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)', accent: '#9333EA', shadow: 'rgba(147, 51, 234, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #14532D 0%, #064E3B 100%)', underlayGrad: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)', accent: '#16A34A', shadow: 'rgba(22, 163, 74, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #7C2D12 0%, #451A03 100%)', underlayGrad: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', accent: '#EA580C', shadow: 'rgba(234, 88, 12, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #831843 0%, #4C0519 100%)', underlayGrad: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', accent: '#E11D48', shadow: 'rgba(225, 29, 72, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #164E63 0%, #083344 100%)', underlayGrad: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', accent: '#0891B2', shadow: 'rgba(8, 145, 178, 0.4)' },
    { baseGrad: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', underlayGrad: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', accent: '#DC2626', shadow: 'rgba(220, 38, 38, 0.4)' },
];
