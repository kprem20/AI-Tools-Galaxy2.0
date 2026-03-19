const fs = require('fs');
const path = 'c:/QR CODES/artifacts/AI Website/frontend/src/data/tools.ts';
let content = fs.readFileSync(path, 'utf8');

// Use regex to extract the tools array content
const toolsMatch = content.match(/export const tools = \[([\s\S]*?)\];/);
if (!toolsMatch) {
    console.error("Could not find tools array");
    process.exit(1);
}

let toolsStr = toolsMatch[1];
// Re-parse the tools by using a trick: wrapping in a function to return the array
const tools = eval(`[${toolsStr}]`);

const newCategories = [
  "All", "Chatbot AI", "Image Generation", "Video Generation", "Content Writing", 
  "Resume Builder", "Design Tools", "Coding AI", "Productivity AI", "Marketing AI", 
  "SEO Tools", "Voice / Audio AI", "Research AI", "Trending AI Tools"
];

const trendingTools = ["ChatGPT", "Midjourney", "Gemini", "Claude", "Runway"];

// Add Gemini if it doesn't exist
if (!tools.some(t => t.name === "Gemini")) {
    tools.push({ 
        id: 999, 
        name: "Gemini", 
        category: "Chatbot AI", 
        description: "Google's most capable AI model, built for multimodality and reasoning.", 
        link: "https://gemini.google.com", 
        keywords: ["google", "bard", "gemini", "assistant"], 
        status: "approved" 
    });
}

const updatedTools = tools.map(t => {
    let oldCat = t.category;
    let newCat = oldCat;
    let name = t.name.toLowerCase();

    // Mapping logic
    if (name.includes("chatgpt") || name.includes("claude") || name.includes("gemini") || name.includes("pi") || name.includes("hugging face chat")) {
        newCat = "Chatbot AI";
    } else if (oldCat === "Writing") {
        newCat = "Content Writing";
    } else if (oldCat === "Image") {
        newCat = "Image Generation";
    } else if (oldCat === "Video") {
        newCat = "Video Generation";
    } else if (oldCat === "Coding") {
        newCat = "Coding AI";
    } else if (oldCat === "Marketing") {
        if (t.description.toLowerCase().includes("seo") || t.keywords.includes("seo")) newCat = "SEO Tools";
        else newCat = "Marketing AI";
    } else if (oldCat === "Productivity") {
        if (t.description.toLowerCase().includes("resume")) newCat = "Resume Builder";
        else newCat = "Productivity AI";
    } else if (oldCat === "Audio") {
        newCat = "Voice / Audio AI";
    } else if (oldCat === "Design") {
        newCat = "Design Tools";
    } else if (oldCat === "Research") {
        newCat = "Research AI";
    } else if (oldCat === "Chatbot") {
        newCat = "Chatbot AI";
    } else if (oldCat === "SEO") {
        newCat = "SEO Tools";
    }

    // Default fallbacks for categories not in the new list
    if (!newCategories.includes(newCat) && newCat !== "All") {
        newCat = "Productivity AI"; // Fallback for Business, Finance, etc.
    }

    return { ...t, category: newCat };
});

const toolsExport = `export const tools = ${JSON.stringify(updatedTools, null, 2)};`;

const categoryKeywords = `export const CATEGORY_KEYWORDS = {
  "Chatbot AI": ["chat", "bot", "assistant", "openai", "google", "anthropic"],
  "Image Generation": ["art", "photo", "generation", "paint", "draw", "midjourney", "stable"],
  "Video Generation": ["movie", "clip", "motion", "film", "runway", "sora"],
  "Content Writing": ["text", "write", "copy", "blog", "jasper"],
  "Resume Builder": ["resume", "cv", "job", "career"],
  "Design Tools": ["ui", "layout", "logo", "ux", "web", "figma"],
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
console.log("Successfully updated tools.ts with new categories and Gemini");
