# Development Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

## Setup
```bash
# Clone repository
git clone https://github.com/surabhishail/buyai-commerce.git
cd buyai-commerce

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Run development
npm run dev
```

## Project Structure
```
buyai-commerce/
├── packages/
│   ├── gateway/        # UCP Gateway Service
│   ├── ai-agent/       # AI Orchestration
│   ├── ui/            # Frontend
│   └── shared/        # Shared code
├── docs/              # Documentation
└── prisma/            # Database schema
```

## Running Locally
```bash
npm run dev:gateway    # Gateway service
npm run dev:ai         # AI agent
npm run dev:ui         # Frontend
```

---

**Last Updated:** January 20, 2026