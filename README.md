
# BuyAI

> **The Stripe for AI Commerce**  
> Universal protocol enabling AI agents to transact with any merchant

[![YC S26](https://img.shields.io/badge/YC-Spring%202026-orange)](https://www.ycombinator.com)

## 🎯 The Problem

Every AI company is rebuilding the same wheel:
- OpenAI wants commerce → builds 50 merchant integrations
- Anthropic wants commerce → builds 50 merchant integrations
- Google wants commerce → builds 50 merchant integrations

Every merchant faces the same problem:
- Gets 10+ different AI integration requests
- Massive duplication and wasted effort

## 💡 Our Solution

**One universal protocol. One integration for AI companies. One integration for merchants.**
```
AI Companies → BuyAI Protocol → All Merchants
(1 integration)              (1,000s accessible)
```

## 🚀 Why This Matters

- **Market:** $6.3T e-commerce × AI agent adoption
- **Comparable:** Stripe ($95B), Plaid ($13.4B), Twilio ($50B+)
- **Network Effects:** More merchants → More AI adoption → Winner-take-all

## 🏗️ What We're Building

Infrastructure for the AI economy, not a shopping chatbot.

**For AI Companies:**
```typescript
import { BuyAI } from '@buyai/sdk';
const cart = await buyai.search("protein powder");
const order = await buyai.purchase(cart[0]);
// Works with ANY merchant
```

## 📊 Current Status

- ✅ Protocol design (UCP integration)
- 🏗️ MVP in development (target: Feb 9, 2026)
- 🎯 Goal: First live AI-placed order

## 🛠️ Tech Stack

- **Frontend:** Next.js + React + Tailwind
- **Backend:** Node.js + TypeScript + Express
- **AI:** OpenAI GPT-4
- **Database:** PostgreSQL + Prisma
- **Payment:** Stripe

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md)
- [User Journey](./docs/USER_JOURNEY.md)
- [API Design](./docs/API_DESIGN.md)
- [Tech Stack](./docs/TECH_STACK.md)
- [Development Guide](./docs/DEVELOPMENT_GUIDE.md)

## 👥 Team

- **[Your Name]** - [Role]
- **[Teammate Name]** - [Role]

Applying to Y Combinator Spring 2026

## 📄 License

MIT

---

**Built for the AI economy. YC S26.**