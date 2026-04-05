window.SITE_DATA = {

  profile: {
    name: "Mohammed Ansha",
    firstName: "Mohammed",
    lastName: "Ansha",
    role: "AI Engineer",
    tagline: "Building intelligent systems that actually work.",
    bio: [
      "I'm a developer obsessed with the intersection of AI and backend engineering — crafting systems that handle real-world complexity.",
      "From async trading pipelines to multi-agent AI orchestration, I ship things end-to-end. Clean architecture, smart APIs, and products people actually use.",
    ],
    location: "India",
    email: "anshamohammed14@gmail.com",
    phone: "+91 9947363114",    // ← replace with your number
    whatsapp: "9947363114",    // ← country code + number, no + or spaces
    socials: {
      github: "https://github.com/anshamohammed",
      linkedin: "https://www.linkedin.com/in/mohammed-ansha-5aa2131a4",
      instagram: null,
    },
    resume: "https://drive.google.com/file/d/159OOkUxJG9Kj3SKqpJOoVOQl7V1aVmJI/view?usp=share_link",
  },

  projects: [
    {
      title: "Trading Assist",
      description: "AI-powered trading assistant with real-time market data, options chain analysis, and automated strategy backtesting. Integrates DhanHQ broker APIs with rate limiting and live order execution.",
      summary: [
        "Trading Assist is a full-stack AI-powered trading platform built for serious traders who need real-time intelligence at their fingertips.",
        "It integrates directly with DhanHQ broker APIs, streaming live market data and options chain snapshots. A FastAPI backend handles order routing with strict rate limiting, while a React frontend surfaces the data in an intuitive dashboard.",
        "The backtesting engine replays historical data against user-defined strategies, producing detailed PnL reports and Sharpe ratio metrics. Redis caches frequently-accessed market snapshots to keep latency under 50ms.",
      ],
      tags: ["Python", "FastAPI", "React", "Docker", "Redis"],
      github: "https://github.com/ansha-1998/Trade_assist_ai_backend.git",
      website: "https://trade-assist-ai-frontend.vercel.app",
      featured: true,
      year: "2024",
    },
    {
      title: "News Intelligence Agent",
      description: "Multi-LLM news gathering agent built with LangGraph. Performs NER, sentiment analysis, event classification, and generates actionable market insight scores.",
      summary: [
        "News Intelligence Agent is an autonomous multi-LLM pipeline that turns raw news feeds into structured market signals.",
        "Built on LangGraph, the agent orchestrates calls across OpenAI, Gemini, and Claude — each model handles a specialised subtask: entity recognition, sentiment scoring, and event classification. Results are merged into a unified insight score per ticker.",
        "The architecture is fully async, processing hundreds of articles per minute without blocking. Insight scores feed directly into the Trading Assist platform to augment trading decisions with real-time news context.",
      ],
      tags: ["Python", "LangGraph", "OpenAI", "Gemini", "Claude"],
      github: null,
      website: null,
      featured: true,
      year: "2024",
    },
    {
      title: "Telegram trade automater",
      description: "High-performance concurrent API aggregator using aiohttp and httpx with exponential backoff retries and comprehensive pytest coverage with aioresponses mocking.",
      summary: [
        "Async API Aggregator is a production-ready library for fetching and merging data from multiple external APIs concurrently — without the complexity of managing raw asyncio primitives.",
        "Built on aiohttp and httpx, it fires all requests in parallel and collects results as they arrive. Failed requests are retried automatically using exponential backoff with jitter, keeping downstream systems stable under flaky upstream APIs.",
        "The test suite achieves 95%+ coverage using pytest and aioresponses to mock HTTP interactions — no live network needed in CI.",
      ],
      tags: ["Python", "asyncio", "aiohttp", "pytest"],
      github: "git@github.com:ansha-1998/Telegram_auto_trade_manager.git",
      website: null,
      featured: false,
      year: "2024",
    },
    // ── ADD NEW PROJECTS HERE ──
    // {
    //   title:       "My Project",
    //   description: "Short card description shown in the grid.",
    //   summary:     ["Paragraph 1 shown on the detail page.", "Paragraph 2...", "Paragraph 3..."],
    //   tags:        [],
    //   github:      "https://github.com/...",  // or null
    //   website:     "https://...",             // or null — shown as "Try it" button
    //   featured:    false,
    //   year:        "2025",
    // },
  ],

  skills: {
    "Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
    "Backend": ["FastAPI", "Node.js", "asyncio", "WebSockets", "REST APIs"],
    "Frontend": ["React", "HTML/CSS", "Vite"],
    "AI / ML": ["LangGraph", "LangChain", "OpenAI", "Gemini", "Claude"],
    "Infrastructure": ["Docker", "PostgreSQL", "Redis", "Linux", "Git"],
    "Data": ["pandas", "Market Data APIs", "Web Scraping"],
  },

  experience: [
    {
      role: "AI Engineer",
      company: "Independent / Freelance",
      companyUrl: null,
      period: "2023 — Present",
      description: "Building AI-powered trading systems, asynchronous data pipelines, and full-stack web applications. Focus on production-grade architecture, broker API integrations, and multi-agent AI orchestration.",
    },
    // ── ADD MORE ROLES BELOW ──
  ],

  stats: [
    { value: "3+", label: "Years coding" },
    { value: "10+", label: "Projects shipped" },
    { value: "5+", label: "AI integrations" },
    { value: "∞", label: "Cups of chai" },
  ],

};
