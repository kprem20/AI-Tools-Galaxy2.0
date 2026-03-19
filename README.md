# AI Tools Galaxy

The most comprehensive directory of AI tools, built with Next.js 15, React 19, and Node.js.

## 📁 Project Structure

* `/frontend`: Next.js 15 application with Tailwind CSS and Framer Motion.
* `/backend`: Node.js & Express API with Mongoose and MongoDB.
* `/assets`: Shared assets and design resources.
* `/config`: Environment configurations and shared settings.

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* MongoDB (Local or Atlas)
* npm or yarn

### 1. Setup Backend

1. Navigate to `/backend`
2. Create/Check `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ai-tools-galaxy
   PORT=5000
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run start
   ```
4. (Optional) Seed the database:
   ```bash
   curl -X POST http://localhost:5000/api/seed
   ```

### 2. Setup Frontend

1. Navigate to `/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000`

## ✨ Features

* **Dynamic Search**: Instantly find AI tools by name, category, or tags.
* **Smart Categories**: All AI tools organized into intuitive categories.
* **Trending & Featured**: Discover what's popular and hand-picked tools.
* **Premium UI**: Glassmorphism design with responsive support and dark mode.
* **Bookmarking**: Save your favorite tools (persisted in local storage).
* **Tool Details**: Deep-dive into features, use cases, and pricing for each tool.

## 🛠️ Tech Stack

* **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Lucide Icons.
* **Backend**: Node.js, Express, Mongoose, MongoDB.
* **UI/UX**: Custom Design System with Dark Theme preference.
