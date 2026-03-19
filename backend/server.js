const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools-galaxy';
let isDbConnected = false;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    isDbConnected = true;
  })
  .catch(err => {
    console.error('MongoDB connection error. Falling back to Mock persistence.');
    isDbConnected = false;
  });

// Tool Schema
const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  rating: { type: Number, default: 0 },
  features: [String],
  example_uses: [String],
  website_link: String,
  logo: String,
  screenshots: [String],
  created_at: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  views_today: { type: Number, default: 0 },
  views_week: { type: Number, default: 0 },
  popularity_score: { type: Number, default: 0 },
  is_approved: { type: Boolean, default: true },
  pricing: String
});

toolSchema.index({ name: 'text', description: 'text', tags: 'text' });
const Tool = mongoose.model('Tool', toolSchema);

// Mock Data
let mockData = [
  {
    _id: 'v0-dev',
    name: 'Vercel v0',
    category: 'Coding AI',
    description: 'Generate production-ready React and Tailwind components from text prompts.',
    tags: ['react', 'tailwind', 'ui'],
    rating: 4.8,
    features: ['React Component Generation', 'Tailwind CSS support'],
    example_uses: ['Building a login page', 'Creating a dashboard'],
    website_link: 'https://v0.dev',
    logo: 'V0',
    popularity_score: 95,
    views: 1540, views_today: 45, views_week: 320,
    pricing: 'Freemium'
  },
  {
    _id: 'perplexity',
    name: 'Perplexity',
    category: 'Productivity AI',
    description: 'The AI search engine that delivers accurate, real-time answers with citations.',
    tags: ['search', 'research', 'citations'],
    rating: 4.9,
    features: ['Real-time Web Search', 'Source Citations'],
    example_uses: ['Market research', 'Fact checking'],
    website_link: 'https://perplexity.ai',
    logo: 'PX',
    popularity_score: 98,
    views: 8900, views_today: 230, views_week: 1500,
    pricing: 'Freemium'
  }
];

// Helper to determine whether to use DB or Mock
const useMock = () => !isDbConnected;

// Routes

// Get all tools or by ID list
app.get('/api/tools', async (req, res) => {
  try {
    const { ids } = req.query;
    if (useMock()) {
      let results = [...mockData];
      if (ids) {
        const idList = ids.split(',');
        results = results.filter(t => idList.includes(t._id));
      }
      return res.json({ success: true, data: results });
    }
    
    let query = { is_approved: true };
    if (ids) query._id = { $in: ids.split(',') };
    
    const tools = await Tool.find(query).sort({ popularity_score: -1 });
    res.json({ success: true, data: tools });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search tools
app.get('/api/tools/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    if (!q) return res.json({ success: true, data: [] });
    
    if (useMock()) {
      const results = mockData.filter(t => 
        t.name.toLowerCase().includes(q.toLowerCase()) || 
        t.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, Number(limit));
      return res.json({ success: true, data: results });
    }
    
    const query = {
      $and: [
        { is_approved: true },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      ]
    };
    
    const tools = await Tool.find(query).limit(Number(limit));
    res.json({ success: true, data: tools });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get tool by ID
app.get('/api/tools/:id', async (req, res) => {
  try {
    if (useMock()) {
      const tool = mockData.find(t => t._id === req.params.id);
      if (!tool) return res.status(404).json({ success: false, error: 'Tool not found' });
      return res.json({ success: true, data: tool });
    }

    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ success: false, error: 'Tool not found' });
    
    // Increment views
    tool.views += 1;
    tool.views_today += 1;
    tool.views_week += 1;
    await tool.save();
    
    res.json({ success: true, data: tool });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Trending tools
app.get('/api/trending', async (req, res) => {
  try {
    const { period = 'week', limit = 10 } = req.query;
    
    if (useMock()) {
      const sorted = [...mockData].sort((a,b) => (b.views_week || 0) - (a.views_week || 0)).slice(0, Number(limit));
      return res.json({ success: true, data: sorted });
    }

    let sort = { views_week: -1 };
    if (period === 'today') sort = { views_today: -1 };
    if (period === 'all') sort = { views: -1 };
    
    const tools = await Tool.find({ is_approved: true }).sort(sort).limit(Number(limit));
    res.json({ success: true, data: tools });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Newsletter Subscribe
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
  
  console.log(`Subscribing email: ${email}`);
  res.json({ success: true, message: 'Successfully subscribed to galaxy news!' });
});

// Seed Database
app.post('/api/seed', async (req, res) => {
  try {
    const seedData = [
      {
        _id: 'v0-dev',
        name: 'Vercel v0',
        category: 'Coding AI',
        description: 'Generate production-ready React and Tailwind components from text prompts.',
        tags: ['react', 'tailwind', 'ui'],
        rating: 4.8,
        features: ['React Component Generation', 'Tailwind CSS support'],
        example_uses: ['Building a login page', 'Creating a dashboard'],
        website_link: 'https://v0.dev',
        logo: 'V0',
        popularity_score: 95,
        views: 1540, views_today: 45, views_week: 320,
        pricing: 'Freemium'
      },
      {
        _id: 'perplexity',
        name: 'Perplexity',
        category: 'Productivity AI',
        description: 'The AI search engine that delivers accurate, real-time answers with citations.',
        tags: ['search', 'research', 'citations'],
        rating: 4.9,
        features: ['Real-time Web Search', 'Source Citations'],
        example_uses: ['Market research', 'Fact checking'],
        website_link: 'https://perplexity.ai',
        logo: 'PX',
        popularity_score: 98,
        views: 8900, views_today: 230, views_week: 1500,
        pricing: 'Freemium'
      },
      {
        _id: 'chatgpt',
        name: 'ChatGPT',
        category: 'Writing AI',
        description: 'OpenAI\'s conversational AI for writing, learning, coding, and more.',
        tags: ['writing', 'assistant', 'chatbot'],
        rating: 4.8,
        features: ['Multimodal support', 'GPT Store'],
        example_uses: ['Writing emails', 'Explaining topics'],
        website_link: 'https://chat.openai.com',
        logo: 'GPT',
        popularity_score: 100,
        views: 50000, views_today: 2000, views_week: 12000,
        pricing: 'Freemium'
      }
    ];

    if (useMock()) {
      mockData = [...seedData];
      return res.json({ success: true, message: 'Mock data seeded' });
    }

    await Tool.deleteMany({});
    await Tool.insertMany(seedData);
    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Seeding failed: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
