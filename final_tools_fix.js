const fs = require('fs');
const path = 'c:/QR CODES/artifacts/AI Website/frontend/src/data/tools.ts';
let content = fs.readFileSync(path, 'utf8');

const toolsMatch = content.match(/export const tools = \[([\s\S]*?)\];/);
let tools = eval(`[${toolsMatch[1]}]`);

// Add Resume Builder tools to ensure category is not empty
const resumeTools = [
  { id: 2001, name: "Kickresume", category: "Resume Builder", description: "AI-powered resume and cover letter builder with templates.", link: "https://kickresume.com", keywords: ["resume", "cv", "job", "career"], status: "approved" },
  { id: 2002, name: "Rezi", category: "Resume Builder", description: "AI resume builder optimized for Applicant Tracking Systems (ATS).", link: "https://rezi.ai", keywords: ["resume", "ats", "career"], status: "approved" },
  { id: 2003, name: "Enhancv", category: "Resume Builder", description: "Create modern, high-impact resumes with AI assistance.", link: "https://enhancv.com", keywords: ["resume", "design", "job"], status: "approved" }
];

tools.push(...resumeTools);

// Fix Perplexity category to Research AI
tools = tools.map(t => {
    if (t.name === "Perplexity") return { ...t, category: "Research AI" };
    if (t.name === "Gamma") return { ...t, category: "Design Tools" };
    return t;
});

const toolsExport = `export const tools = ${JSON.stringify(tools, null, 2)};`;

// Update keywords and categories again for safety
const newCategories = [
  "All", "Chatbot AI", "Image Generation", "Video Generation", "Content Writing", 
  "Resume Builder", "Design Tools", "Coding AI", "Productivity AI", "Marketing AI", 
  "SEO Tools", "Voice / Audio AI", "Research AI", "Trending AI Tools"
];

const categoryKeywords = `export const CATEGORY_KEYWORDS = {
  "Chatbot AI": ["chat", "bot", "assistant", "openai", "google", "anthropic"],
  "Image Generation": ["art", "photo", "generation", "paint", "draw", "midjourney", "stable"],
  "Video Generation": ["movie", "clip", "motion", "film", "runway", "sora"],
  "Content Writing": ["text", "write", "copy", "blog", "jasper"],
  "Resume Builder": ["resume", "cv", "job", "career", "ats"],
  "Design Tools": ["ui", "layout", "logo", "ux", "web", "figma", "gamma"],
  "Coding AI": ["programming", "dev", "software", "api", "script", "copilot"],
  "Productivity AI": ["notes", "meeting", "tasks", "office", "work", "notion"],
  "Marketing AI": ["ads", "marketing", "sales", "convert", "reach"],
  "SEO Tools": ["seo", "rank", "google", "search", "keyword"],
  "Voice / Audio AI": ["music", "voice", "sound", "speech", "podcast", "elevenlabs"],
  "Research AI": ["insight", "data", "analysis", "papers", "perplexity"],
  "Trending AI Tools": ["chatgpt", "midjourney", "gemini", "claude", "runway"]
};`;

const categoriesExport = `export const CATEGORIES = ${JSON.stringify(newCategories)};`;

fs.writeFileSync(path, `${toolsExport}\n\n${categoryKeywords}\n\n${categoriesExport}\n`);
console.log("Final tools update complete.");
