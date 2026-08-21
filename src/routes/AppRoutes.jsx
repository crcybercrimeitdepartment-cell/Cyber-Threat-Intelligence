import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/aboutUs/AboutUsPage';
import ServicesPage from '../pages/services/ServicesPage';
import PublicCyberServicesPage from '../pages/publicCyberServices/PublicCyberServicesPage';
import IncidentReportPage from '../pages/incidentReport/IncidentReportPage';
import CyberAssistancePage from '../pages/cyberAssistance/CyberAssistancePage';
import CyberLegalPage from '../pages/cyberLegal/CyberLegalPage';
import PublicInfoPage from '../pages/publicInfo/PublicInfoPage';
import BecomeMemberPage from '../pages/becomeMember/BecomeMemberPage';
import PartnershipPage from '../pages/partnership/PartnershipPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import GalleryPage from '../pages/gallery/GalleryPage';
import FaqPage from '../pages/faq/FaqPage';
import HelpPage from '../pages/help/HelpPage';
import ContactUsPage from '../pages/contactUs/ContactUsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/public-cyber-services" element={<PublicCyberServicesPage />} />
      <Route path="/incident-report" element={<IncidentReportPage />} />
      <Route path="/cyber-assistance" element={<CyberAssistancePage />} />
      <Route path="/cyber-legal-directory" element={<CyberLegalPage />} />
      <Route path="/public-info" element={<PublicInfoPage />} />
      <Route path="/become-member" element={<BecomeMemberPage />} />
      <Route path="/partnership" element={<PartnershipPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  );
};

export default AppRoutes;
