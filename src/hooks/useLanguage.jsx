import React, { createContext, useContext, useState } from "react";

// All translations
const translations = {
  English: {
    navbarHome: "Home",
    navbarExperiences: "Experiences",
    navbarServices: "Services",
    navbarAddPackage: "Add Package",
    navbarBecomeHost: "Become a Host",
    navbarHelpCenter: "Help Center",
    navbarSignIn: "Sign In or Sign Up",

    homeWelcome: "Welcome to our site!",
    homeDescription: "Find amazing places to stay and explore.",
    homeSearch: "Search destinations",
    homeCheckIn: "Check In",
    homeCheckOut: "Check Out",
    homeGuests: "Add guests",

    packageStayIn: "Stay in London",
    packageDiscover: "Discover amazing places to stay in London",
    packageGuestFavorites: "Guest favorites",
    packagePlacesToStay: "Places to stay in London",
    packageNextMonth: "Available next month in Toronto",
    packageMoreComing: "More properties coming soon for next month!",
    packageShowMore: "Show more",
    packageFavorite: "Favorite",

    footerContact: "Contact Us",
    footerTerms: "Terms & Conditions",
  },
  Bangla: {
    navbarHome: "হোম",
    navbarExperiences: "অভিজ্ঞতা",
    navbarServices: "সেবা",
    navbarAddPackage: "প্যাকেজ যোগ করুন",
    navbarBecomeHost: "হোস্ট হোন",
    navbarHelpCenter: "সহায়তা কেন্দ্র",
    navbarSignIn: "সাইন ইন বা সাইন আপ করুন",

    homeWelcome: "আমাদের সাইটে স্বাগতম!",
    homeDescription: "অসাধারণ স্থানে থাকা এবং অন্বেষণ করুন।",
    homeSearch: "গন্তব্য অনুসন্ধান করুন",
    homeCheckIn: "চেক ইন",
    homeCheckOut: "চেক আউট",
    homeGuests: "অতিথি যোগ করুন",

    packageStayIn: "লন্ডনে থাকার স্থান",
    packageDiscover: "লন্ডনে থাকার জন্য চমৎকার স্থানগুলি অন্বেষণ করুন",
    packageGuestFavorites: "অতিথিদের পছন্দ",
    packagePlacesToStay: "লন্ডনে থাকার স্থান",
    packageNextMonth: "আগামী মাসে টরন্টোতে উপলব্ধ",
    packageMoreComing: "আগামী মাসে আরও সম্পত্তি আসছে!",
    packageShowMore: "আরও দেখুন",
    packageFavorite: "পছন্দের",

    footerContact: "যোগাযোগ করুন",
    footerTerms: "শর্তাবলী",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  const toggleLanguage = (lang) => setLanguage(lang);

  // current dictionary
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
