import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageContextType } from '../types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.consultation': 'AI Consultation',
    'nav.subscription': 'Subscription',
    'nav.dashboard': 'Dashboard',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'hero.title': 'Your AI Health Companion',
    'hero.subtitle': 'Experience personalized healthcare with Tavus AI-powered video consultations',
    'consultation.title': 'Tavus AI Health Consultation',
    'consultation.subtitle': 'Start a face-to-face conversation with your AI health companion powered by Tavus',
    'subscription.title': 'Choose Your Health Plan',
    'subscription.subtitle': 'Select the perfect plan for your health and wellness journey with RevenueCat integration'
  },
  hi: {
    'nav.home': 'होम',
    'nav.consultation': 'AI परामर्श',
    'nav.subscription': 'सब्सक्रिप्शन',
    'nav.dashboard': 'डैशबोर्ड',
    'auth.login': 'लॉगिन',
    'auth.register': 'रजिस्टर',
    'auth.logout': 'लॉगआउट',
    'hero.title': 'आपका AI स्वास्थ्य साथी',
    'hero.subtitle': 'Tavus AI-संचालित वीडियो परामर्श के साथ व्यक्तिगत स्वास्थ्य सेवा का अनुभव करें',
    'consultation.title': 'Tavus AI स्वास्थ्य परामर्श',
    'consultation.subtitle': 'Tavus द्वारा संचालित अपने AI स्वास्थ्य साथी के साथ आमने-सामने बातचीत शुरू करें',
    'subscription.title': 'अपना स्वास्थ्य प्लान चुनें',
    'subscription.subtitle': 'RevenueCat एकीकरण के साथ अपनी स्वास्थ्य और कल्याण यात्रा के लिए सही प्लान चुनें'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};