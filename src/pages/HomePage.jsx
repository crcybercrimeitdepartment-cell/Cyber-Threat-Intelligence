import React from 'react';
import Hero from '../section/Hero';
import AboutUsSection from '../section/AboutUs';
import CyberPsychologyVictimCounsellingSection from '../section/CyberPsychologyVictimCounsellingSection';
import CyberCommunityResilienceSection from '../section/CyberCommunityResilienceSection';
import CyberIncidentVictimSupport from '../section/CyberIncidentVictimSupport';
import CyberScamFraudInformationSection from '../section/CyberScamFraudInformationSection';
import CyberResourcesSection from '../section/CyberResourcesSection';
import CyberEducationLearningSection from '../section/CyberEducationLearningSection';
import CyberCrimeAwarenessSection from '../section/CyberCrimeAwarenessSection';
import CyberAwarenessSection from '../section/CyberAwarenessSection';
import CyberScamBroadcastingSection from '../section/CyberScamBroadcastingSection';
import CyberSafetyLegalGuidanceSection from '../section/CyberSafetyLegalGuidanceSection';

import { CyberLawLegalAwarenessCards } from '../section/CyberLawLegalAwarenessSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutUsSection /> 
        <CyberAwarenessSection />
        <CyberIncidentVictimSupport />
        <CyberLawLegalAwarenessCards />
        <CyberEducationLearningSection />
        <CyberScamFraudInformationSection />
        <CyberPsychologyVictimCounsellingSection />
        <CyberCommunityResilienceSection />
        <CyberResourcesSection />
        <CyberCrimeAwarenessSection />
        <CyberScamBroadcastingSection />
        <CyberSafetyLegalGuidanceSection />
    </>
  );
};

export default HomePage;
