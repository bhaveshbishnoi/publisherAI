import { ProjectRequirements } from './types';

export const STARTER_PROJECTS: ProjectRequirements[] = [
  {
    id: 'starter-india-festivals',
    name: 'Utsav India',
    domain: 'utsavindia.com',
    category: 'Cultural Heritage & Festivals',
    websiteType: 'Blog',
    country: 'India',
    language: 'English',
    primaryAudience: 'Global Indian Diaspora, Cultural Enthusiasts & Travelers',
    brandStyle: 'Modern & Vibrant',
    colorPreference: {
      primary: '#f97316', // Orange / Saffron
      secondary: '#1e293b',
      accent: '#eab308'
    },
    typography: {
      heading: 'Outfit',
      body: 'Inter'
    },
    primaryKeyword: 'Indian Festivals',
    secondaryKeywords: ['Diwali Rituals', 'Holi Colors Science', 'Navratri Garba Guide', 'Durga Puja Pandals', 'Eco-friendly Diwali'],
    numberPages: 8,
    needBlog: true,
    needAdminPanel: true,
    needDatabase: true,
    needAuth: true,
    needSearch: true,
    needCategories: true,
    needTags: true,
    needContactForm: true,
    needNewsletter: true,
    needFaq: true,
    needTestimonials: false,
    needAnalytics: true,
    needAds: true,
    needCookieConsent: true,
    needDarkMode: true,
    needRssFeed: true,
    needSitemap: true,
    needRobots: true,
    needSocialSharing: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'starter-fintech-hub',
    name: 'FinTech Pulse',
    domain: 'fintechpulse.io',
    category: 'Finance & Technology',
    websiteType: 'Magazine',
    country: 'United States',
    language: 'English',
    primaryAudience: 'Tech Leaders, Investors, Financial Analysts & Developers',
    brandStyle: 'Dark & Glassmorphism',
    colorPreference: {
      primary: '#6366f1', // Indigo
      secondary: '#0f172a',
      accent: '#38bdf8'
    },
    typography: {
      heading: 'Inter',
      body: 'Fira Code'
    },
    primaryKeyword: 'Open Banking API',
    secondaryKeywords: ['Embedded Finance', 'AI Wealth Management', 'Blockchain Security', 'Stripe Integration API', 'RegTech Trends'],
    numberPages: 10,
    needBlog: true,
    needAdminPanel: true,
    needDatabase: true,
    needAuth: true,
    needSearch: true,
    needCategories: true,
    needTags: true,
    needContactForm: true,
    needNewsletter: true,
    needFaq: true,
    needTestimonials: true,
    needAnalytics: true,
    needAds: true,
    needCookieConsent: true,
    needDarkMode: true,
    needRssFeed: true,
    needSitemap: true,
    needRobots: true,
    needSocialSharing: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'starter-health-wellness',
    name: 'AyurLife Daily',
    domain: 'ayurlifedaily.com',
    category: 'Health & Wellness',
    websiteType: 'Portal',
    country: 'United Kingdom',
    language: 'English',
    primaryAudience: 'Wellness Seekers, Holistic Living Practitioners & Nutritionists',
    brandStyle: 'Clean & Minimalist',
    colorPreference: {
      primary: '#10b981', // Emerald Green
      secondary: '#1f2937',
      accent: '#06b6d4'
    },
    typography: {
      heading: 'Outfit',
      body: 'Inter'
    },
    primaryKeyword: 'Ayurvedic Wellness',
    secondaryKeywords: ['Holistic Nutrition Guide', 'Herbal Immunity Boosters', 'Mindful Meditation Daily', 'Seasonal Dosha Balance'],
    numberPages: 7,
    needBlog: true,
    needAdminPanel: false,
    needDatabase: true,
    needAuth: false,
    needSearch: true,
    needCategories: true,
    needTags: true,
    needContactForm: true,
    needNewsletter: true,
    needFaq: true,
    needTestimonials: false,
    needAnalytics: true,
    needAds: true,
    needCookieConsent: true,
    needDarkMode: true,
    needRssFeed: true,
    needSitemap: true,
    needRobots: true,
    needSocialSharing: true,
    createdAt: new Date().toISOString()
  }
];
