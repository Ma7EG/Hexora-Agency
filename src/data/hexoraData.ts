import { ServiceItem, ProjectItem, AcademyCourse } from '../types';

export const HEXORA_SERVICES: ServiceItem[] = [
  {
    id: 'logo-brand-identity',
    title: 'Logo Design & Brand Identity',
    category: 'Brand & Identity',
    icon: 'brush',
    accentColor: 'primary',
    shortDesc: 'Logo Design & Brand Identity is a creative service focused on building a unique visual identity that reflects your company’s vision and values.',
    fullDesc: 'We design a professional, distinctive logo that represents your business, along with a complete visual identity system including color palettes, typography, patterns, and business cards — all designed to create a cohesive, memorable brand that stands out and builds customer trust.',
    deliverables: [
      'Custom Distinctive Logo Design',
      'Visual Identity System & Brand Book',
      'Curated Color Palettes & Typography',
      'Patterns, Stationeries & Business Cards',
      'Cohesive Brand Assets for Web & Print'
    ],
    techStack: ['Figma', 'Illustrator', 'Photoshop', 'Brand Systems']
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    category: 'Social & Content',
    icon: 'campaign',
    accentColor: 'secondary',
    shortDesc: 'Social Media Management helps you build a strong and engaging presence for your brand across platforms like Facebook, Instagram, TikTok, and LinkedIn.',
    fullDesc: 'We create a strategic content plan, design eye-catching posts, schedule publications, engage with your audience, and analyze performance regularly — ensuring optimal results, stronger brand awareness, and increased sales.',
    deliverables: [
      'Strategic Content Calendar & Planning',
      'Eye-Catching Post & Reel Designs',
      'Scheduled Publishing & Community Engagement',
      'Regular Performance Analytics & Insights',
      'Cross-Platform Brand Growth Strategy'
    ],
    techStack: ['Meta Business Suite', 'TikTok Center', 'Canva', 'Sprout Social', 'Analytics']
  },
  {
    id: 'facebook-instagram-ads',
    title: 'Facebook & Instagram Ads',
    category: 'Paid Advertising',
    icon: 'ads_click',
    accentColor: 'primary',
    shortDesc: 'Facebook & Instagram Ads service is designed to boost your brand visibility and attract real potential customers through targeted campaigns.',
    fullDesc: 'We create and design professional ad creatives, select the right target audience, manage your budget efficiently, and analyze performance regularly — ensuring the best return on investment and higher sales growth.',
    deliverables: [
      'Professional Ad Creatives & Motion Visuals',
      'Laser-Targeted Audience Profiling',
      'Efficient Budget Management & Scaling',
      'Continuous A/B Testing & Retargeting',
      'ROAS-Driven Performance Analytics'
    ],
    techStack: ['Meta Ads Manager', 'Pixel Tracking', 'CAPI Integration', 'A/B Testing']
  },
  {
    id: 'websites-online-stores',
    title: 'Websites & Online Stores',
    category: 'Web & Commerce',
    icon: 'web',
    accentColor: 'tertiary',
    shortDesc: 'Websites & Online Stores service helps you build a professional digital presence that reflects your brand identity and drives more sales.',
    fullDesc: 'We design modern, user-friendly websites that are fully responsive and optimized for speed and performance. Our e-commerce solutions include secure payment systems, order and inventory management, and a smooth user experience that enhances customer satisfaction and trust.',
    deliverables: [
      'Modern Fully Responsive Web Architecture',
      'High-Converting E-Commerce Storefronts',
      'Secure Payment Systems & Gateway Setup',
      'Automated Order & Inventory Management',
      'Optimized Speed, Performance & User Experience'
    ],
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    category: 'App Development',
    icon: 'smartphone',
    accentColor: 'secondary',
    shortDesc: 'Mobile App Development service turns your idea into a fully functional and professional mobile application for Android and iOS platforms.',
    fullDesc: 'We design modern, user-friendly apps with intuitive interfaces and smooth user experiences — optimized for performance, speed, and security. Whether you need a business app, educational tool, service platform, or e-commerce solution, we’ll help you create an app that meets your goals and strengthens your digital presence.',
    deliverables: [
      'iOS & Android Cross-Platform App Development',
      'Intuitive UI/UX Interface Design',
      'High-Speed Performance & Security Hardening',
      'Backend API & Database Integration',
      'App Store & Play Store Deployment'
    ],
    techStack: ['Flutter', 'React Native', 'Firebase', 'REST APIs', 'App Store Connect']
  },
  {
    id: 'google-advertising',
    title: 'Google Advertising',
    category: 'Paid Search & Video',
    icon: 'search',
    accentColor: 'primary',
    shortDesc: 'Google Advertising helps you reach potential customers at the exact moment they’re searching for your products or services on Google.',
    fullDesc: 'We create and manage professional Google Ads campaigns — including Search, Display, and YouTube ads — with ongoing performance optimization and smart budget management to achieve the best results and maximum return on investment.',
    deliverables: [
      'High-Intent Google Search Campaigns',
      'Visual Display & Remarketing Networks',
      'YouTube Video Ad Strategy & Targeting',
