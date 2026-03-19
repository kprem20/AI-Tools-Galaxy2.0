export interface Tool {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  rating: number;
  features: string[];
  example_uses: string[];
  website_link: string;
  logo: string;
  screenshots: string[];
  created_at: string;
  views: number;
  views_today: number;
  views_week: number;
  popularity_score: number;
  is_approved: boolean;
  pricing: string;
}

export const mockTools: Tool[] = [
  {
    _id: 'v0-dev',
    name: 'Vercel v0',
    category: 'Coding AI',
    description: 'Generate production-ready React and Tailwind components from text prompts. Describe what you want, and watch v0 build it in seconds.',
    tags: ['react', 'tailwind', 'ui', 'frontend'],
    rating: 4.8,
    features: ['React Component Generation', 'Tailwind CSS support', 'Interactive Previews', 'Version History'],
    example_uses: ['Building a login page', 'Creating a dashboard', 'Prototyping a landing page'],
    website_link: 'https://v0.dev',
    logo: 'V0',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 1540,
    views_today: 45,
    views_week: 320,
    popularity_score: 95,
    is_approved: true,
    pricing: 'Freemium'
  },
  {
    _id: 'perplexity',
    name: 'Perplexity',
    category: 'Productivity AI',
    description: 'The AI search engine that delivers accurate, real-time answers with citations. Skip the links and get answers instantly.',
    tags: ['search', 'research', 'citations', 'knowledge'],
    rating: 4.9,
    features: ['Real-time Web Search', 'Source Citations', 'Follow-up Questions', 'Pro Mode with GPT-4/Claude 3'],
    example_uses: ['Market research', 'Fact checking', 'Learning new topics'],
    website_link: 'https://perplexity.ai',
    logo: 'PX',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 8900,
    views_today: 230,
    views_week: 1500,
    popularity_score: 98,
    is_approved: true,
    pricing: 'Freemium'
  },
  {
    _id: 'midjourney',
    name: 'Midjourney',
    category: 'Image Generation',
    description: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    tags: ['art', 'images', 'design', 'creative'],
    rating: 4.9,
    features: ['High-quality Art Generation', 'Discord Integration', 'Vary Region', 'Upscaling'],
    example_uses: ['Digital art creation', 'Concept design', 'Marketing visuals'],
    website_link: 'https://midjourney.com',
    logo: 'MJ',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 12000,
    views_today: 450,
    views_week: 2800,
    popularity_score: 99,
    is_approved: true,
    pricing: 'Paid'
  },
  {
    _id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Writing AI',
    description: 'OpenAI\'s conversational AI that can help with writing, learning, coding, and much more using GPT-4o.',
    tags: ['writing', 'assistant', 'chatbot', 'openai'],
    rating: 4.8,
    features: ['Multimodal support', 'Custom Instructions', 'GPT Store', 'Mobile App'],
    example_uses: ['Writing emails', 'Explaining complex topics', 'Generating creative ideas'],
    website_link: 'https://chat.openai.com',
    logo: 'GPT',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 50000,
    views_today: 2000,
    views_week: 12000,
    popularity_score: 100,
    is_approved: true,
    pricing: 'Freemium'
  },
  {
    _id: 'claude',
    name: 'Claude',
    category: 'Writing AI',
    description: 'Anthropic\'s AI assistant known for being helpful, harmless, and honest, with exceptional reasoning and writing capabilities.',
    tags: ['writing', 'reasoning', 'ethical', 'anthropic'],
    rating: 4.9,
    features: ['Large Context Window', 'Artifacts', 'Project Folders', 'Vision capabilities'],
    example_uses: ['Analyzing long documents', 'Writing nuanced content', 'Complex problem solving'],
    website_link: 'https://claude.ai',
    logo: 'CL',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 15000,
    views_today: 600,
    views_week: 4000,
    popularity_score: 97,
    is_approved: true,
    pricing: 'Freemium'
  },
  {
    _id: 'cursor',
    name: 'Cursor',
    category: 'Coding AI',
    description: 'The AI Code Editor built on VS Code, allowing you to build software at the speed of thought with integrated AI.',
    tags: ['coding', 'editor', 'ide', 'development'],
    rating: 4.9,
    features: ['Codebase indexing', 'Tab autocomplete', 'Chat with code', 'Composer mode'],
    example_uses: ['Building entire features', 'Refactoring code', 'Learning a new codebase'],
    website_link: 'https://cursor.com',
    logo: 'CU',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 7000,
    views_today: 300,
    views_week: 2000,
    popularity_score: 96,
    is_approved: true,
    pricing: 'Freemium'
  },
  {
    _id: 'sora',
    name: 'Sora',
    category: 'Video Generation',
    description: 'OpenAI\'s text-to-video model that can create realistic and imaginative scenes from text instructions.',
    tags: ['video', 'generation', 'realistic', 'openai'],
    rating: 4.9,
    features: ['High-fidelity Video', 'Minute-long Clips', 'Complex Camera Motion', 'Multiple Characters'],
    example_uses: ['Cinematic storytelling', 'Educational animations', 'Visual effects'],
    website_link: 'https://openai.com/sora',
    logo: 'SR',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 25000,
    views_today: 1200,
    views_week: 8000,
    popularity_score: 99,
    is_approved: true,
    pricing: 'Paid'
  },
  {
    _id: 'descript',
    name: 'Descript',
    category: 'Video Generation',
    description: 'The simple, powerful, and fun way to edit videos. AI-powered editing that works like a text document.',
    tags: ['video editing', 'transcription', 'podcast', 'voice'],
    rating: 4.7,
    features: ['Script-based Editing', 'Underlord AI Assistant', 'Eye Contact Correction', 'Overdub Voice'],
    example_uses: ['Editing podcasts', 'Creating social clips', 'Webinar production'],
    website_link: 'https://descript.com',
    logo: 'DS',
    screenshots: [],
    created_at: new Date().toISOString(),
    views: 4500,
    views_today: 120,
    views_week: 900,
    popularity_score: 92,
    is_approved: true,
    pricing: 'Freemium'
  }
];

export const getTrendingTools = (limit: number = 10, period: 'today' | 'week' | 'all' = 'week') => {
  return [...mockTools]
    .sort((a, b) => {
      if (period === 'today') return b.views_today - a.views_today;
      if (period === 'week') return b.views_week - a.views_week;
      return b.views - a.views;
    })
    .slice(0, limit);
};

export const getToolById = (id: string) => {
  return mockTools.find(t => t._id === id);
};

export const getToolsByCategory = (category: string) => {
  return mockTools.filter(t => t.category === category);
};

export const searchTools = (query: string) => {
  const q = query.toLowerCase();
  return mockTools.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );
};
