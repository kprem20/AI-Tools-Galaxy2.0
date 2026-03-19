const fs = require('fs');
const path = 'c:/QR CODES/artifacts/AI Website/frontend/src/data/tools.ts';
let content = fs.readFileSync(path, 'utf8');

// Add status: "approved" to each tool
// The tools have format: { id: 1, name: "ChatGPT", category: "Writing", description: "...", link: "...", keywords: [...] }
content = content.replace(/keywords: \[(.*?)\] }/g, (match) => {
    return match.replace(' }', ', status: "approved" }');
});

// Update CATEGORY_KEYWORDS
const newKeywords = `
  "Writing": ["text", "write", "content", "gpt", "blog"],
  "Image": ["art", "photo", "design", "paint", "draw"],
  "Video": ["movie", "clip", "motion", "film", "youtube"],
  "Coding": ["programming", "dev", "software", "api", "script"],
  "Marketing": ["ads", "seo", "sales", "convert", "reach"],
  "Productivity": ["notes", "meeting", "tasks", "office", "work"],
  "Audio": ["music", "voice", "sound", "speech", "podcast"],
  "Design": ["ui", "layout", "logo", "ux", "web"],
  "Chatbot": ["chat", "bot", "assistant", "support"],
  "Research": ["insight", "data", "analysis", "papers"],
  "Education": ["learn", "study", "student", "teacher", "school"],
  "Business": ["startup", "enterprise", "corp", "finance"],
  "Finance": ["money", "crypto", "trading", "invest"],
  "Social Media": ["social", "insta", "twitter", "fb", "post"],
  "SEO": ["rank", "google", "search", "keyword"],
  "Developer Tools": ["dev", "api", "cloud", "stack"]
`;

content = content.replace(/export const CATEGORY_KEYWORDS = \{[\s\S]*?\};/, "export const CATEGORY_KEYWORDS = {" + newKeywords + "\n};");

// Add CATEGORIES array if it doesn't exist
if (!content.includes('export const CATEGORIES =')) {
  content += '\nexport const CATEGORIES = ["All", "Writing", "Image", "Video", "Coding", "Marketing", "Productivity", "Audio", "Design", "Chatbot", "Research", "Education", "Business", "Finance", "Social Media", "SEO", "Developer Tools"];\n';
}

fs.writeFileSync(path, content);
console.log("Successfully updated tools.ts");
