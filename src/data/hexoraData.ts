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
      'Smart Budget Optimization & Bidding',
      'Conversion Tracking & Attribution Reports'
    ],
    techStack: ['Google Ads Manager', 'Google Tag Manager', 'GA4', 'Keyword Planner']
  },
  {
    id: 'seo-search-engine-optimization',
    title: 'SEO & Search Engine Optimization',
    category: 'Organic Growth',
    icon: 'trending_up',
    accentColor: 'tertiary',
    shortDesc: 'SEO & Search Engine Optimization service helps your website rank higher on search engines and attract targeted organic traffic.',
    fullDesc: 'We conduct a full website audit, optimize your content and keywords, build high-quality backlinks, and improve site speed and user experience. The result: your website appears on Google’s first pages, bringing you more visitors, leads, and sales — all organically, without paid ads.',
    deliverables: [
      'Comprehensive Technical Website Audit',
      'On-Page Keyword & Content Optimization',
      'High-Quality Backlink Acquisition',
      'Site Speed & Mobile UX Enhancements',
      'First-Page Organic Ranking Strategy'
    ],
    techStack: ['Semrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog']
  },
  {
    id: 'video-production-motion-graphics',
    title: 'Video Production & Motion Graphics',
    category: 'Video & Animation',
    icon: 'movie',
    accentColor: 'secondary',
    shortDesc: 'Video Production & Motion Graphics service delivers high-quality visual content that communicates your message in an engaging way.',
    fullDesc: 'We produce promotional, corporate, and educational videos with professional motion graphics that highlight your brand identity and capture audience attention. From scriptwriting and animation design to editing and sound design — we create complete, polished videos that leave a lasting impression and boost engagement.',
    deliverables: [
      'Scriptwriting & Visual Storyboarding',
      '2D & 3D Motion Graphics Design',
      'Promotional, Corporate & Explainer Videos',
      'Professional Sound Design & Color Grading',
      'High-Impact Edits for Ads & Social Media'
    ],
    techStack: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Audition']
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    category: 'Media & Visuals',
    icon: 'photo_camera',
    accentColor: 'primary',
    shortDesc: 'Product Photography service showcases your products with professional, high-quality visuals that attract customers and boost sales.',
    fullDesc: 'We capture your products with perfect lighting, clean backgrounds, and creative styling — ideal for e-commerce stores, social media, and advertising campaigns. Our photos highlight your brand identity and present every detail of your product in the best possible way.',
    deliverables: [
      'High-Resolution Studio Product Shots',
      'Creative Props & Custom Lighting Setup',
      'Clean Backgrounds for E-Commerce Catalogs',
      'Expert Retouching & Color Correction',
      'Social Media & Marketing Ready Media'
    ],
    techStack: ['Lightroom', 'Photoshop', 'Studio Lighting', 'Capture One']
  }
];

export const HEXORA_PROJECTS: ProjectItem[] = [
  {
    id: 'global-retailer',
    title: 'Global Retailer Redesign',
    category: 'E-Commerce Platform',
    tag: 'E-Commerce Platform',
    accentColor: '#5b54fc',
    gridSpan: 'md:col-span-2 md:row-span-2',
    imagePlaceholder: 'Global E-Commerce Flagship',
    client: 'Aura Luxury Group',
    year: '2025',
    metrics: [
      { label: 'Conversion Surge', value: '+142%' },
      { label: 'Page Speed Index', value: '99/100' },
      { label: 'Annual Revenue Impact', value: '+$14.8M' }
    ],
    summary: 'A complete end-to-end digital overhaul of a global luxury fashion retailer, replacing legacy monolithic architecture with a ultra-fast headless React commerce engine.',
    challenge: 'The client suffered from high cart abandonment, slow mobile render times, and fragmented brand messaging across international markets.',
    solution: 'Hexora designed a bespoke glassmorphic UI, deployed edge-cached API microservices, and launched dynamic personalized product recommendation engines.'
  },
  {
    id: 'fintech-startup',
    title: 'Fintech Startup',
    category: 'Branding',
    tag: 'Branding',
    accentColor: '#00eefc',
    gridSpan: 'md:col-span-1 md:row-span-1',
    client: 'Vaulta Pay',
    year: '2024',
    metrics: [
      { label: 'App Installs', value: '500K+' },
      { label: 'Brand Recall', value: '+88%' }
    ],
    summary: 'Visual brand identity and mobile app onboarding design for a next-gen cross-border digital banking platform.',
    challenge: 'Establishing trust and modern financial sophistication in a highly competitive digital banking sector.',
    solution: 'Engineered a sleek futuristic identity with custom motion graphics and frictionless 3-step KYC user onboarding flow.'
  },
  {
    id: 'health-tracker',
    title: 'Health Tracker',
    category: 'App Design',
    tag: 'App Design',
    accentColor: '#ffafd7',
    gridSpan: 'md:col-span-1 md:row-span-1',
    client: 'PulseBio Health',
    year: '2025',
    metrics: [
      { label: 'Daily Active Users', value: '320K' },
      { label: 'App Store Rating', value: '4.9★' }
    ],
    summary: 'Biometric health dashboard and wearable companion application featuring real-time AI biometrics parsing.',
    challenge: 'Translating complex medical data feeds into intuitive, visually calming UI widgets for everyday consumers.',
    solution: 'Created dark-mode adaptive charts, haptic feedback loops, and personalized AI wellness recommendation badges.'
  },
  {
    id: 'corporate-portal',
    title: 'Corporate Portal',
    category: 'Web Development',
    tag: 'Web Development',
    accentColor: '#c9beff',
    gridSpan: 'md:col-span-2 md:row-span-1',
    client: 'Assiut Industrial Dynamics',
    year: '2024',
    metrics: [
      { label: 'Efficiency Lift', value: '+65%' },
      { label: 'Global Traffic', value: '2.4M/mo' }
    ],
    summary: 'Enterprise web portal and digital operations command center integrating real-time telemetry and regional logistics.',
    challenge: 'Unifying disparate regional operational dashboards into a single high-security executive command center.',
    solution: 'Built a high-performance web portal with interactive GIS maps, role-based access control, and live automated reporting.'
  }
];

export const HEXORA_COURSES: AcademyCourse[] = [
  {
    id: 'fullstack-mastery',
    title: 'Full-Stack Web Engineering',
    category: 'Programming & Cloud',
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    instructor: 'Eng. Youssef El-Hawary (Lead Systems Architect)',
    price: '$899',
    rating: 4.9,
    studentsCount: 1420,
    badgeColor: '#5b54fc',
    description: 'Master modern TypeScript, React, Express, and cloud deployment pipelines. Build real production-ready web apps with industry standards.',
    modules: [
      'Modern TypeScript & Next-Gen React Architecture',
      'REST & GraphQL Microservices with Node.js',
      'Cloud Run, Docker Containers & Serverless Infra',
      'Database Design with PostgreSQL & Firestore',
      'Performance Optimization & Security Hardening'
    ]
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics & 3D Visuals',
    category: 'Creative Design',
    duration: '8 Weeks',
    level: 'All Levels',
    instructor: 'Maya Al-Mansoor (Creative Director)',
    price: '$699',
    rating: 4.95,
    studentsCount: 980,
    badgeColor: '#00eefc',
    description: 'Learn cinematic 2D/3D motion design for commercial ads, UI micro-interactions, and brand identity animations.',
    modules: [
      'Principles of Kinetic Typography & Animation',
      'Advanced After Effects Expressions & Compositing',
      'Intro to 3D Lighting & Materials in Cinema 4D',
      'Creating High-Converting Social Video Ads',
      'Exporting Lottie & Web Graphics for Developers'
    ]
  },
  {
    id: 'digital-marketing-growth',
    title: 'Digital Marketing & Growth Engine',
    category: 'Marketing',
    duration: '10 Weeks',
    level: 'Beginner to Advanced',
    instructor: 'Kareem Nabil (Growth Director)',
    price: '$799',
    rating: 4.88,
    studentsCount: 2150,
    badgeColor: '#ffafd7',
    description: 'Learn the exact paid media, SEO, and content strategies used by Hexora to generate millions in client revenue.',
    modules: [
      'Performance Marketing on Meta, Google & TikTok',
      'Data Analytics, Funnel Auditing & Attribution',
      'Technical SEO Strategy & Topical Authority',
      'Copywriting & Ad Creative Testing Frameworks',
      'AI Tools for Automated Content & Campaign Ops'
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    category: 'Creative Design',
    duration: '8 Weeks',
    level: 'All Levels',
    instructor: 'Creative Lead',
    price: '$649',
    rating: 4.9,
    studentsCount: 850,
    badgeColor: '#5b54fc',
    description: 'Master visual branding, logo design, typography, and advertising graphics with Photoshop and Illustrator.',
    modules: ['Visual Branding', 'Logo Design', 'Typography', 'Photoshop & Illustrator']
  }
];
