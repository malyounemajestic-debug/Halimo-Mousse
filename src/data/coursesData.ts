import { Course } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'course-ebay',
    title: 'eBay Dropshipping Masterclass',
    somaliTitle: 'Kooraska eBay Dropshipping',
    category: 'E-Commerce',
    instructor: 'Eng. Abdullahi (SWA Lead Mentor)',
    thumbnailColor: 'from-blue-600 to-indigo-800',
    accentColor: '#2563eb',
    iconName: 'ShoppingBag',
    status: 'active',
    description: 'Master profitable eBay dropshipping: finding high-demand items, US supplier sourcing, title SEO, customer support, and account protection.',
    somaliDescription: 'Baro sida looga ganacsado eBay adigoon alaab haysan: cilmi-baarista alaabaha faa’iidada badan, xiriirka shirkadaha alaabta soo dira, iyo kor u qaadista dakhliga.',
    notes: 'Focus on 15% profit margins after eBay fees. Always use tracked shipping with US warehouses (CJ Dropshipping, Zendrop). Optimize titles with 80 characters using high-volume keywords.',
    lessons: [
      { id: 'eb-1', title: '01. eBay Seller Account Setup & Business Policies', duration: '28 min', completed: true, description: 'Setting up eBay Managed Payments, return policies, and shipping rate tables.' },
      { id: 'eb-2', title: '02. Winning Product Research with ZIK Analytics', duration: '35 min', completed: true, description: 'How to spot high sell-through rate products and avoid saturated categories.' },
      { id: 'eb-3', title: '03. Sourcing from Reliable US & Global Suppliers', duration: '42 min', completed: true, description: 'Vetting fast suppliers, negotiated pricing, and inventory sync.' },
      { id: 'eb-4', title: '04. Title SEO & High-Converting Descriptions', duration: '30 min', completed: false, description: 'Maximizing Cassinis search algorithm with keyword dense titles.' },
      { id: 'eb-5', title: '05. Order Fulfillment & Automated Tracking Sync', duration: '25 min', completed: false, description: 'Fulfilling orders promptly and keeping defect rate under 0.5%.' },
      { id: 'eb-6', title: '06. Scaling to $5,000+/Month & Account Health', duration: '40 min', completed: false, description: 'Increasing selling limits, multi-account strategies, and customer dispute resolution.' }
    ],
    assignments: [
      { id: 'as-eb-1', title: 'Submit 5 Validated eBay Dropshipping Products', dueDate: 'Oct 02, 2026', status: 'completed', instructions: 'Find 5 items with >60% sell-through rate and at least $8 profit margin.', score: '95/100' },
      { id: 'as-eb-2', title: 'Publish First 3 Live Optimized Listings', dueDate: 'Oct 06, 2026', status: 'in_progress', instructions: 'Draft listings with 80-char titles, multi-angle images, and standardized return policies.' }
    ]
  },
  {
    id: 'course-shopify',
    title: 'Shopify Dropshipping & Brand Building',
    somaliTitle: 'Dhisidda Dukaanka Shopify & Ganacsiga Caalamiga',
    category: 'E-Commerce',
    instructor: 'Ustaad Guled & SWA E-commerce Team',
    thumbnailColor: 'from-emerald-600 to-teal-800',
    accentColor: '#059669',
    iconName: 'Store',
    status: 'active',
    description: 'Build a modern high-converting branded Shopify store, select winning hero products, configure checkout, and master TikTok organic + Meta ads.',
    somaliDescription: 'Dhis dukaan casri ah oo Shopify ah, xulo alaabooyin si xawli ah u socda, xayeysiisyada TikTok iyo Facebook u samee si xirfadeysan.',
    notes: 'One-product store with clean trust badges converts best for beauty and home gadgets. Keep checkout 2-step with Apple Pay and credit cards enabled.',
    lessons: [
      { id: 'sh-1', title: '01. High-Converting Store Architecture & Theme Setup', duration: '45 min', completed: true, description: 'Designing clean mobile-first landing pages with high conversion rate principles.' },
      { id: 'sh-2', title: '02. Sourcing Viral TikTok Products with High Margins', duration: '38 min', completed: true, description: 'Analyzing TikTok Creative Center, Spy tools, and AliExpress suppliers.' },
      { id: 'sh-3', title: '03. App Integrations: Reviews, Bundles, & Upsells', duration: '32 min', completed: true, description: 'Loox reviews, Kaching bundles, and SMS bump abandoned cart recovery.' },
      { id: 'sh-4', title: '04. TikTok Organic Video Blueprint (Faceless Viral Strategy)', duration: '50 min', completed: false, description: 'Creating 3 hook variations daily to gain 10k+ followers and free traffic.' },
      { id: 'sh-5', title: '05. Meta Ads Manager: CBO vs ABO Campaign Setup', duration: '55 min', completed: false, description: 'Audience testing, broad targeting, pixel tracking, and ROAS optimization.' },
      { id: 'sh-6', title: '06. Private Agents & Fast 5-Day Global Shipping', duration: '36 min', completed: false, description: 'Moving away from AliExpress to private sourcing agents for high customer satisfaction.' }
    ],
    assignments: [
      { id: 'as-sh-1', title: 'Shopify Store Prototype Review', dueDate: 'Oct 08, 2026', status: 'in_progress', instructions: 'Share preview link of your Shopify store including home page, product page, and checkout.' }
    ]
  },
  {
    id: 'course-amazon-kdp',
    title: 'Amazon KDP (Kindle Direct Publishing)',
    somaliTitle: 'Daabacaadda Buugaagta Amazon KDP',
    category: 'Self-Publishing',
    instructor: 'Sister Halima & SWA Publishing Squad',
    thumbnailColor: 'from-amber-600 to-orange-800',
    accentColor: '#d97706',
    iconName: 'BookOpen',
    status: 'active',
    description: 'Generate passive royalties publishing low-content and medium-content books on Amazon KDP without writing or holding inventory.',
    somaliDescription: 'Daabac buugaagta qoraalka yar (journals, planners, carruurta) Amazon KDP oo hel dakhli bil kasta soo gala adigoo gurigaaga jooga.',
    notes: 'Niche idea: Somali bilingual children coloring books and gratitude journals for Muslim women. High search volume, low competition!',
    lessons: [
      { id: 'kd-1', title: '01. KDP Platform Overview & Royalty Structure', duration: '26 min', completed: true, description: 'Understanding 60% print and 70% digital royalties, ISBNs, and Amazon KDP rules.' },
      { id: 'kd-2', title: '02. Profitable Keyword & Niche Research with Helium10', duration: '40 min', completed: true, description: 'Finding BSR < 100,000 niches with fewer than 1,000 competing titles.' },
      { id: 'kd-3', title: '03. Designing Eye-Catching Book Covers in Canva Pro', duration: '48 min', completed: false, description: 'Spine calculations, bleed dimensions, color psychology for Amazon thumbnails.' },
      { id: 'kd-4', title: '04. Formatting Interior Manuscripts (Print & Kindle)', duration: '34 min', completed: false, description: 'Using Tangent Templates and Affinity Publisher for bleed and margin compliance.' },
      { id: 'kd-5', title: '05. Amazon Advertising (AMS) Sponsored Products', duration: '44 min', completed: false, description: 'Automatic targeting campaigns and keyword bidding for steady daily book sales.' }
    ],
    assignments: [
      { id: 'as-kd-1', title: 'Upload First Paperback Journal to Amazon KDP', dueDate: 'Oct 12, 2026', status: 'pending', instructions: 'Submit ASIN number once your book goes live on Amazon marketplace.' }
    ]
  },
  {
    id: 'course-ai-marketing',
    title: 'AI for Digital Marketing & Automation',
    somaliTitle: 'Sirdoonka Macmalka ah (AI) ee Ganacsiga',
    category: 'Technology',
    instructor: 'Dr. Mohamed Farah (AI & Systems Architect)',
    thumbnailColor: 'from-purple-600 to-indigo-900',
    accentColor: '#7c3aed',
    iconName: 'Cpu',
    status: 'active',
    description: 'Supercharge marketing workflows using ChatGPT, Midjourney, Make.com, and custom GPTs to automate copy, graphics, and email funnels.',
    somaliDescription: 'Isticmaal farsamooyinka ugu dambeeya ee AI si aad u abuurto qoraallo xayeysiis, sawirro xirfadeed, iyo automation ganacsigaaga kobciya.',
    notes: 'Use system prompts with role, goal, constraints, and examples for 10x better marketing copy outputs.',
    lessons: [
      { id: 'ai-1', title: '01. Advanced Prompt Engineering for Copywriters', duration: '36 min', completed: true, description: 'Direct-response copywriting frameworks: AIDA, PAS, and emotional hooks.' },
      { id: 'ai-2', title: '02. Midjourney & AI Visual Generation for Ad Assets', duration: '42 min', completed: true, description: 'Creating studio-grade product mockups and lifestyle photos without photography gear.' },
      { id: 'ai-3', title: '03. Automating Social Media & Content with Make.com', duration: '50 min', completed: false, description: 'Building no-code automations from Google Sheets to Canva and Instagram.' },
      { id: 'ai-4', title: '04. Custom AI Chatbots for 24/7 E-commerce Customer Care', duration: '40 min', completed: false, description: 'Training custom AI agents with store FAQs and order status lookup.' }
    ],
    assignments: [
      { id: 'as-ai-1', title: 'Build a Full AI-Generated Ad Campaign Pack', dueDate: 'Oct 15, 2026', status: 'pending', instructions: 'Generate 3 video scripts, 5 ad headlines, and 3 Midjourney visual concepts.' }
    ]
  },
  {
    id: 'course-youtube',
    title: 'YouTube Content & Cash Cow Automation',
    somaliTitle: 'Kanaalada YouTube & Dakhliga Joogtada ah',
    category: 'Media & Branding',
    instructor: 'Brother Khadar (Digital Creator)',
    thumbnailColor: 'from-rose-600 to-red-800',
    accentColor: '#e11d48',
    iconName: 'Youtube',
    status: 'active',
    description: 'Launch faceless YouTube channels that generate monetization revenue through AdSense, affiliate promotions, and digital product sponsorships.',
    somaliDescription: 'Samee kanaal YouTube adigoon wajigaaga tusin, abuuro muuqaallo xiiso leh oo soo jiita malaayiin daawade, dakhli joogto ahna ka samee.',
    notes: 'Thumbnail CTR + First 30s Retention = YouTube algorithm viral trigger. Aim for >8% CTR.',
    lessons: [
      { id: 'yt-1', title: '01. High-CPM YouTube Niches (Finance, Tech, Luxury)', duration: '30 min', completed: true, description: 'Identifying niches with $15 - $40 CPM rates for maximum AdSense payout.' },
      { id: 'yt-2', title: '02. Scriptwriting Formula for 70%+ Audience Retention', duration: '38 min', completed: false, description: 'Pattern interrupts, storytelling open loops, and visual cues.' },
      { id: 'yt-3', title: '03. Professional Editing with CapCut Desktop & AI Voiceovers', duration: '46 min', completed: false, description: 'B-roll footage sourcing, copyright-free audio, and dynamic pacing.' },
      { id: 'yt-4', title: '04. Click-Worthy Thumbnails (Photoshop & Canva Mastery)', duration: '35 min', completed: false, description: 'Color contrast, 3-element rule, and facial expression psychology.' }
    ],
    assignments: [
      { id: 'as-yt-1', title: 'Channel Branding & First Script Submission', dueDate: 'Oct 18, 2026', status: 'pending', instructions: 'Submit channel banner, avatar, about section, and 1,500-word retention script.' }
    ]
  },
  {
    id: 'course-truck-dispatch',
    title: 'Truck Dispatching & Freight Logistics',
    somaliTitle: 'Kooraska Truck Dispatching & Gaadiidka Xamuulka',
    category: 'Logistics',
    instructor: 'Abdiwahab (Senior Freight Broker & Dispatcher)',
    thumbnailColor: 'from-cyan-700 to-blue-900',
    accentColor: '#0284c7',
    iconName: 'Truck',
    status: 'active',
    description: 'Learn North American freight dispatching: DAT One load boards, rate negotiation, broker carrier agreements, and load booking for owner-operators.',
    somaliDescription: 'Baro shaqada Truck Dispatching-ka ee dalka Mareykanka: sida loo helo xamuul qaali ah, wadahadalka shirkadaha, iyo buuxinta waraaqaha rasmiga ah.',
    notes: 'Always calculate cost per mile (CPM) before booking. Target minimum $2.80 - $3.20/mile for dry van depending on lane.',
    lessons: [
      { id: 'td-1', title: '01. Trucking Industry Fundamentals & Equipment Types', duration: '35 min', completed: true, description: 'Dry van, reefer, flatbed, step deck specifications and market demand.' },
      { id: 'td-2', title: '02. Mastering DAT One & Truckstop Load Boards', duration: '48 min', completed: true, description: 'Searching loads, posting trucks, and calculating deadhead miles.' },
      { id: 'td-3', title: '03. Rate Negotiation Techniques with Freight Brokers', duration: '40 min', completed: false, description: 'How to ask for detention, layover, TONU, and push for top dollar per mile.' },
      { id: 'td-4', title: '04. Carrier Packets, Rate Confirmations & Factoring', duration: '36 min', completed: false, description: 'W-9, Certificate of Insurance (COI), NOA, and submitting invoices for same-day pay.' }
    ],
    assignments: [
      { id: 'as-td-1', title: 'Simulated Load Booking & Rate Negotiation', dueDate: 'Oct 20, 2026', status: 'pending', instructions: 'Complete a live roleplay dispatch call with mentor and fill out mock rate con.' }
    ]
  },
  {
    id: 'course-etsy',
    title: 'Etsy Marketplace & Digital Products',
    somaliTitle: 'Ganacsiga Etsy & Alaabaha Dijitaalka ah',
    category: 'E-Commerce',
    instructor: 'Sister Maryan (Etsy Top 1% Seller)',
    thumbnailColor: 'from-amber-700 to-amber-950',
    accentColor: '#b45309',
    iconName: 'Sparkles',
    status: 'active',
    description: 'Create and sell profitable digital downloads: Notion templates, financial spreadsheets, printable wall art, and wedding stationery with zero inventory.',
    somaliDescription: 'Samee oo ku iibi Etsy waxyaabo dijitaal ah sida jadwallada qorsheynta, qoraallada qurxinta guryaha, adigoo mar kaliya diyaarinaya oo marar badan iibinaya.',
    notes: 'Digital products have 95%+ profit margin. Create templates in Canva and share view-only template links.',
    lessons: [
      { id: 'et-1', title: '01. Etsy SEO & Keyword Optimization (eRank / Marmalead)', duration: '32 min', completed: true, description: 'Finding 13 long-tail tags with high search volume and low competition.' },
      { id: 'et-2', title: '02. Creating High-Value Digital Products in Canva & Google Sheets', duration: '45 min', completed: false, description: 'Budget trackers, daily planners, and social media template packs.' },
      { id: 'et-3', title: '03. Listing Photo Psychology & Video Mockups', duration: '30 min', completed: false, description: 'Creating eye-catching iPad and print frames mockups that drive instant clicks.' }
    ],
    assignments: [
      { id: 'as-et-1', title: 'Launch 5 Digital Products on Etsy Store', dueDate: 'Oct 24, 2026', status: 'pending', instructions: 'Submit live Etsy shop link with 5 complete listings and automated delivery PDFs.' }
    ]
  },
  {
    id: 'course-pod',
    title: 'Print on Demand (POD) Empire',
    somaliTitle: 'Daabacaadda Dalabka (Print on Demand)',
    category: 'E-Commerce',
    instructor: 'Ustaad Zakaria & SWA Apparel Team',
    thumbnailColor: 'from-violet-700 to-purple-950',
    accentColor: '#9333ea',
    iconName: 'Shirt',
    status: 'active',
    description: 'Design custom hoodies, t-shirts, mugs, and home decor printed and shipped automatically worldwide via Printify and Printful.',
    somaliDescription: 'Ku samee naqshado dhar, koobab, iyo bacado oo u xir dukaankaaga adigoon wax daabacaad ah ama kayd alaab ah gacanta ku qabanayn.',
    notes: 'Focus on passionate niches (e.g. nurse gifts, cat lovers, cultural diaspora heritage). Bella+Canvas 3001 t-shirt has best customer satisfaction.',
    lessons: [
      { id: 'pod-1', title: '01. Printify vs Printful Supplier Selection', duration: '28 min', completed: true, description: 'Comparing base costs, print providers, US vs Europe fulfillment times.' },
      { id: 'pod-2', title: '02. Typography & Graphic Design for Apparel', duration: '40 min', completed: false, description: 'Using Kittl, Illustrator, and Canva for high-DPI 300 DPI print-ready PNG files.' },
      { id: 'pod-3', title: '03. Connecting POD to Shopify, Etsy, & TikTok Shop', duration: '35 min', completed: false, description: 'Automating order routing, shipping price profiles, and tax settings.' }
    ],
    assignments: [
      { id: 'as-pod-1', title: 'Publish POD Collection of 10 Distinct Designs', dueDate: 'Oct 28, 2026', status: 'pending', instructions: 'Create 10 designs in a targeted niche and sync them to your live storefront.' }
    ]
  },
  {
    id: 'course-digital-marketing-core',
    title: 'SWA Digital Marketing & Paid Traffic Mastery',
    somaliTitle: 'Kooraska Aasaasiga ah ee Digital Marketing',
    category: 'Marketing Core',
    instructor: 'Eng. Abdullahi & Executive Faculty',
    thumbnailColor: 'from-emerald-700 to-slate-900',
    accentColor: '#047857',
    iconName: 'TrendingUp',
    status: 'active',
    description: 'The flagship Somali Wealth Academy program covering Meta Ads, Google PPC, TikTok Ads, Klaviyo email retention funnels, and analytics.',
    somaliDescription: 'Barnaamijka guud ee Somali Wealth Academy: xayeysiiska Facebook, Google, TikTok, iyo farsamooyinka macaamiisha dib loogu soo celiyo.',
    notes: 'Building an email list is the highest ROI asset you will own. Aim for $1 revenue per subscriber per month.',
    lessons: [
      { id: 'dm-1', title: '01. The Complete Customer Journey & Acquisition Funnel', duration: '40 min', completed: true, description: 'Top of funnel (TOF), Middle of funnel (MOF), and Bottom of funnel (BOF) architecture.' },
      { id: 'dm-2', title: '02. Meta Pixel, CAPI (Conversions API) & Tracking Mastery', duration: '50 min', completed: true, description: 'Setting up iOS14+ compliant tracking via Shopify partner integrations.' },
      { id: 'dm-3', title: '03. Google Search Ads & High Intent Buyer Keywords', duration: '45 min', completed: false, description: 'Keyword match types, quality score optimization, and negative keyword lists.' },
      { id: 'dm-4', title: '04. Klaviyo Email Flows: Welcome, Abandoned Cart, Post-Purchase', duration: '52 min', completed: false, description: 'Automated 5-email series that adds 20-30% extra store revenue automatically.' }
    ],
    assignments: [
      { id: 'as-dm-1', title: 'Klaviyo Email Automation Flow Setup', dueDate: 'Oct 30, 2026', status: 'pending', instructions: 'Implement 3 core automated flows with custom branding and discount codes.' }
    ]
  }
];
