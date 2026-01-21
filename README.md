# BuyAI Commerce Agent

> AI agent built on Universal Commerce Protocol - One API for AI to transact with any merchant

[![YC S26](https://img.shields.io/badge/YC-Spring%202026-orange)](https://www.ycombinator.com)

## 🎯 Vision

We're building the **Stripe for AI commerce** - the infrastructure layer that enables AI agents to search, compare, and purchase from any merchant using a standardized protocol.

**Not a shopping chatbot. Infrastructure for the AI economy.**

## 🚀 The Problem

- Every AI company (OpenAI, Anthropic, Google) wants commerce capabilities
- Every merchant has different APIs (Shopify, Amazon, Walmart)
- No standard exists for AI-to-merchant transactions
- Result: Fragmentation, custom integrations, vendor lock-in

## 💡 Our Solution

**Universal Commerce Protocol (UCP)** - A standardized interface for commerce transactions
```
AI Agent → UCP Gateway → Merchant Adapters → Any Merchant
```

**Benefits:**
- **For AI Companies**: One integration → Access millions of merchants
- **For Merchants**: One adapter → Reach all AI agents
- **For Developers**: Open protocol, not closed platform

## 🏗️ Architecture
```
┌─────────────┐
│   User      │  Natural language
└──────┬──────┘
       │
┌──────▼──────┐
│  AI Agent   │  Structured UCP actions
└──────┬──────┘
       │
┌──────▼──────┐
│ UCP Gateway │  Routes & validates
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌──▼──┐
│Shop │ │Amaz │  Merchant-specific APIs
│ify  │ │ on  │
└─────┘ └─────┘
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed design.

## 📊 Current Status

**MVP (Targeting Feb 9, 2026 for YC Application)**

- ✅ Project structure & documentation
- 🏗️ UCP Gateway Service (in progress)
- 🏗️ Shopify adapter (in progress)
- 🏗️ AI orchestration layer (in progress)
- 📋 Payment integration (planned)
- 📋 Chat UI (planned)

**Goal:** Place one live order via AI agent before Feb 9, 2026

## 🛠️ Tech Stack

- **AI**: OpenAI GPT-4 / Anthropic Claude
- **Backend**: Node.js + TypeScript + Express
- **Database**: PostgreSQL + Prisma
- **Payment**: Stripe
- **Protocol**: Universal Commerce Protocol (UCP)
- **Frontend**: React + Next.js

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for details.

## 📦 Project Structure
```
buyai-commerce/
├── packages/
│   ├── ai-agent/       # AI orchestration layer
│   ├── gateway/        # UCP Gateway Service
│   ├── ui/            # Chat interface
│   └── shared/        # Shared types & utilities
├── docs/              # Documentation
└── ucp/              # UCP protocol (submodule)
```

## 🚀 Quick Start
```bash
# Clone
git clone https://github.com/surabhishail/buyai-commerce.git
cd buyai-commerce

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

## 📚 Documentation

- [System Architecture](./ARCHITECTURE.md)
- [User Journey](./docs/USER_JOURNEY.md)
- [API Design](./docs/API_DESIGN.md)
- [Tech Stack](./docs/TECH_STACK.md)
- [Development Guide](./docs/DEVELOPMENT_GUIDE.md)
- [DailyProgress Report](./PROGRESS_LOG.md)

## 🎯 Roadmap

**Week 1 (Jan 20-26)**
- [ ] UCP Gateway setup
- [ ] Shopify adapter implementation
- [ ] Basic product search working

**Week 2 (Jan 27 - Feb 2)**
- [ ] AI orchestration layer
- [ ] Payment integration (Stripe)
- [ ] Order creation flow

**Week 3 (Feb 3-9)**
- [ ] Simple chat UI
- [ ] End-to-end testing
- [ ] Demo video for YC

## 👥 Team

- Sumit Sharma - Product Manager
- Surabhi Shail - Senior Developer and Architect

Applying to Y Combinator Spring 2026 Batch


## 🔗 Links

- [Universal Commerce Protocol](https://github.com/universal-commerce-protocol/ucp)
- [Y Combinator Application](https://www.ycombinator.com/apply)

---

**Built with ❤️ for the AI economy**