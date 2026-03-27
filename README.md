# 🚀 BMSCE Nexus — Intelligent Campus Experience Platform

---

## 👥 Team Details

**Team Name:** Code Curry

**Live Link:** https://code-curry.vercel.app/ 

**Team Members:**

* Anish Balabattuni
* Anitej Padyana
* Chinmayi L C

---

## 🌟 Project Overview

**BMSCE Nexus** is a **next-generation intelligent campus platform** built to transform how students explore, understand, and interact with a university ecosystem.

This is **not a redesign** — it is a **complete reimagination of a college website as an interactive product**, combining:

* 🤖 AI-powered assistance
* 🎬 Immersive UI/UX
* 📊 Data-driven insights
* ⚡ High-performance frontend architecture

---

# ⚙️ Installation & Setup

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/bmsce-nexus.git
cd bmsce-nexus
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

---

## 🌐 Open in Browser

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

# 🎯 Vision

To build a system where:

> “A college website is not just informational — it is intelligent, interactive, and experiential.”

---

# 🔥 Key Highlights

* 💬 AI chatbot powered by Gemini (context-aware)
* 🧠 Custom knowledge base for accurate responses
* 📊 Real-world data integration via scraping
* 🎨 Premium UI with modern interaction design
* ⚡ Smooth scrolling & animation system
* 🧩 Modular, scalable architecture
* 🌐 Fully deployed on Vercel

---

# 🤖 AI SYSTEM (CORE FEATURE)

---

## 💬 AI Chatbot — Intelligent Assistant

The platform includes a **persistent floating AI chatbot** that:

* Answers student queries in real-time
* Uses a **custom-built college knowledge base**
* Avoids hallucination using strict prompt constraints
* Provides accurate, context-bound responses

---

## 🧠 How It Works

1. A centralized **college data file** stores structured information
2. User query is combined with context
3. Sent to **Google Gemini API**
4. AI responds based strictly on provided data

---

## ⚙️ AI Tech Stack

* Google Gemini API
* Prompt engineering
* Context injection system
* Controlled response architecture

---

## 🎯 AI Capabilities

* Admissions guidance
* Placement insights
* Department information
* Campus facilities
* General student queries

---

# 📊 DATA ENGINEERING (SCRAPER SYSTEM)

---

## 🧠 Real Data Integration

We implemented a **data scraping pipeline** to gather real-world data such as:

* Placement statistics
* Company recruiters
* Campus facilities
* Academic structure

---

## ⚙️ Approach

* Scraped structured data from multiple reliable sources
* Cleaned and formatted into usable datasets
* Integrated into frontend context system

---

## 🎯 Impact

* Ensures **real, accurate information**
* Avoids placeholder/static content
* Enhances AI chatbot reliability

---

# 🛠️ TECH STACK

---

## 🎨 Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Framer Motion
* GSAP (ScrollTrigger)

---

## ⚡ Animation System

* GSAP ScrollTrigger (scroll-based control)
* Lenis (smooth scrolling)
* Framer Motion (UI interactions)

---

## 🤖 AI Integration

* Google Gemini API
* Context-driven prompt system

---

## 🌐 Deployment

* Platform: **Vercel**
* Optimized build using Vite
* Fast global CDN delivery

---

## 🧱 Architecture

* Component-based design
* Modular file structure
* Centralized data layer
* Scalable routing system

---

# 📁 PROJECT STRUCTURE

```bash
src/
│
├── components/
│   ├── AIChatbot.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ScrollToTop.tsx
│   └── CustomCursor.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Admissions.tsx
│   ├── Academics.tsx
│   ├── PlacementsPage.tsx
│   ├── CampusLife.tsx
│   └── Alumni.tsx
│
├── lib/
│   ├── gemini.ts
│   ├── collegeData.ts
│   ├── lenis.ts
│   └── departmentsData.ts
│
├── App.tsx
└── main.tsx
```

---

# 🧭 PAGE-BY-PAGE BREAKDOWN

---

## 🏠 Home Page

* Cinematic hero section
* Key statistics (placements, legacy)
* Highlights of academics, campus life, alumni
* Smooth scroll-driven transitions

---

## 🏛️ About Page

* Clean structured overview
* History and legacy timeline
* Institutional philosophy
* Infrastructure overview

---

## 🎓 Admissions Page

* Admission process breakdown
* Eligibility criteria
* Fee structure
* Interactive guidance

---

## 📚 Academics Page

* All departments listed
* Structured categorization (Core, Advanced, Interdisciplinary)
* Dynamic routing to department pages

---

## 🧩 Department Pages

* Individual pages for each department
* Overview, courses, labs, career paths
* Placement insights

---

## 💼 Placements Page

* Key placement statistics
* Recruiter highlights
* Placement process timeline
* Role-based insights

---

## 🌿 Campus Life Page

* Live Virtual Campus Tour

* Infrastructure breakdown:

  * Academic blocks
  * Labs
  * Hostels
  * Library
* Student life experience
* Facilities and environment

---

## 🧑‍🎓 Alumni Page

* Global alumni network
* Career trajectories
* Industry presence
* Mentorship ecosystem

---

# 🎨 STYLE GUIDE

---

## 🎯 Design Philosophy

* Minimalism with depth
* Content-first design
* High visual hierarchy
* Smooth, intentional motion

---

## 🎨 Color System

* Background: #0A0A0A
* Accent: Blue → Purple gradient
* Text: White / Gray scale

---

## ✍️ Typography

* Clean sans-serif fonts
* Strong headings
* Readable body text

---

## ✨ UI Patterns

* Glassmorphism cards
* Subtle hover effects
* Smooth transitions
* Consistent spacing

---

# ⚡ PERFORMANCE OPTIMIZATION

---

* Lazy loading of components
* Optimized animations (GSAP batching)
* Efficient rendering with React
* Fast builds using Vite

---

# 🚀 DEPLOYMENT

---

Deployed on:

👉 **Vercel**

Features:

* Instant deployment
* Global CDN
* Fast load times
* Optimized production builds

---

# 🔐 SECURITY NOTE

---

* API key used on frontend for demo purposes
* In production:

  * Move AI calls to backend
  * Secure environment variables

---

# 🧠 LEARNINGS

---

* Building scalable frontend systems
* Integrating AI into real products
* Managing smooth animations with performance
* Designing for user experience, not just UI

---


