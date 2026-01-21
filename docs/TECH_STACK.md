# Technology Stack

## Overview

BuyAI uses modern, proven technologies chosen for reliability, developer experience, and scalability.

---

## Frontend

### React + Next.js
**Version:** Next.js 14+ (App Router)

**Why:**
- Server-side rendering for SEO (future)
- Built-in API routes
- Excellent developer experience
- Fast deployment (Vercel)

**Alternatives Considered:**
- Vue.js - Less ecosystem support
- Svelte - Smaller community
- Plain React - Need routing/SSR setup

### Tailwind CSS
**Version:** 3.4+

**Why:**
- Rapid UI development
- Consistent design system
- Small bundle size
- No CSS conflicts

### shadcn/ui
**Purpose:** Pre-built components

**Why:**
- Accessible by default
- Customizable
- Copy-paste, not npm package
- Beautiful design

---

## Backend

### Node.js
**Version:** 18 LTS or 20 LTS

**Why:**
- JavaScript ecosystem
- Fast for I/O operations
- Great TypeScript support
- NPM package availability

**Alternatives Considered:**
- Python - Slower for async operations
- Go - Less AI library support
- Java - More verbose

### TypeScript
**Version:** 5.3+

**Why:**
- Type safety prevents bugs
- Better IDE support
- Self-documenting code
- Refactoring confidence

### Express.js
**Version:** 4.18+

**Why:**
- Minimal and flexible
- Huge middleware ecosystem
- Well-documented
- Battle-tested

**Alternatives Considered:**
- Fastify - Faster but smaller ecosystem
- NestJS - Too heavy for MVP
- Koa - Less middleware support

---

## AI Layer

### OpenAI API
**Model:** GPT-4 or GPT-4-Turbo

**Why:**
- Best structured output support
- Function calling capability
- Reliable and fast
- Great documentation

### Anthropic Claude (Alternative)
**Model:** Claude 3.5 Sonnet

**Why:**
- Larger context window
- Better at following instructions
- More affordable
- Good for complex reasoning

**Decision:** Start with OpenAI, support both

### Zod
**Version:** 3.22+

**Purpose:** Schema validation

**Why:**
- Type-safe validation
- Integrates with TypeScript
- Clear error messages
- Runtime type checking

---

## Database

### PostgreSQL
**Version:** 14+

**Why:**
- Reliable and proven
- JSONB support (flexible schema)
- Strong consistency
- Great performance

**Alternatives Considered:**
- MongoDB - Less ACID guarantees
- MySQL - Weaker JSON support
- SQLite - Not scalable

### Prisma ORM
**Version:** 5.8+

**Why:**
- Type-safe database access
- Auto-generated types
- Great migration system
- Excellent DX

**Schema Management:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Merchant Integration

### Shopify SDK
**Package:** `@shopify/shopify-api`
**Version:** Latest

**Why:**
- Official SDK
- Well-maintained
- GraphQL support
- Comprehensive docs

### HTTP Client: Axios
**Version:** 1.6+

**Why:**
- Promise-based
- Request/response interceptors
- Automatic transforms
- Browser + Node.js support

**Alternatives:**
- Fetch API - Less features
- Got - Node.js only
- Request - Deprecated

---

## Payment Processing

### Stripe
**Package:** `stripe`
**Version:** Latest

**Why:**
- Best developer experience
- Excellent documentation
- PCI compliance handled
- Strong fraud protection

**Features Used:**
- Payment Intents
- Webhooks
- Stripe Elements (frontend)

### Razorpay (India)
**Package:** `razorpay`

**Why:**
- Best for Indian market
- Local payment methods
- Good documentation

**Decision:** Support both, start with Stripe

---

## Development Tools

### Package Manager: npm
**Why:**
- Built into Node.js
- Workspaces support
- Familiar to team

**Alternatives:**
- yarn - Similar features
- pnpm - Faster but less common

### Code Quality

#### ESLint
**Config:** `@typescript-eslint`

**Why:**
- Catch bugs early
- Enforce code style
- Auto-fixable rules

#### Prettier
**Why:**
- Consistent formatting
- Automatic
- Works with ESLint

#### Husky (Git Hooks)
**Why:**
- Pre-commit linting
- Prevent bad commits
- Team consistency

---

## Testing (Future)

### Unit Testing: Jest
**Why:**
- Standard for Node.js
- Great mocking
- TypeScript support

### Integration Testing: Supertest
**Why:**
- Test API endpoints
- Works with Express
- Simple syntax

### E2E Testing: Playwright
**Why:**
- Fast and reliable
- Great debugging
- Multi-browser

---

## DevOps & Deployment

### Version Control: Git + GitHub
**Why:**
- Industry standard
- YC expects GitHub
- Good collaboration tools

### Hosting (MVP)

#### Backend: Railway or Render
**Why:**
- Easy deployment
- Free tier available
- PostgreSQL included
- Good for MVPs

#### Frontend: Vercel
**Why:**
- Made by Next.js team
- Zero-config deployment
- Excellent performance
- Free tier generous

### Environment Variables: dotenv
**Why:**
- Simple configuration
- Local development
- Secure secrets

---

## Monitoring & Logging (Future)

### Error Tracking: Sentry
**Why:**
- Catch production errors
- Source maps support
- Performance monitoring

### Logging: Winston or Pino
**Why:**
- Structured logging
- Multiple transports
- Good performance

---

## Additional Tools

### API Documentation: Swagger/OpenAPI
**Why:**
- Auto-generated docs
- Interactive testing
- Standard format

### Diagramming: Mermaid
**Why:**
- Text-based diagrams
- Version control friendly
- Renders on GitHub

### API Testing: Thunder Client or Postman
**Why:**
- Test endpoints easily
- Save requests
- Share collections

---

## Technology Decision Matrix

| Category | Choice | Alternatives | Why Chosen |
|----------|--------|-------------|------------|
| Frontend Framework | Next.js | Remix, SvelteKit | Best DX, Vercel deployment |
| Styling | Tailwind | CSS Modules, Styled Components | Speed, consistency |
| Backend | Express | Fastify, NestJS | Simplicity, ecosystem |
| Database | PostgreSQL | MongoDB, MySQL | Reliability, JSONB |
| ORM | Prisma | TypeORM, Sequelize | Type safety, DX |
| AI | OpenAI | Claude, Gemini | Structured outputs |
| Payment | Stripe | PayPal, Square | Developer experience |
| Hosting | Railway/Vercel | AWS, DigitalOcean | Easy setup, low cost |

---

## Dependencies

### Production Dependencies
```json
{
  "express": "^4.18.2",
  "@shopify/shopify-api": "^8.0.0",
  "stripe": "^14.11.0",
  "openai": "^4.24.0",
  "prisma": "^5.8.0",
  "@prisma/client": "^5.8.0",
  "zod": "^3.22.4",
  "axios": "^1.6.5",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.3.3",
  "@types/node": "^20.10.6",
  "@types/express": "^4.17.21",
  "ts-node-dev": "^2.0.0",
  "eslint": "^8.56.0",
  "prettier": "^3.1.1",
  "@typescript-eslint/eslint-plugin": "^6.18.0",
  "@typescript-eslint/parser": "^6.18.0"
}
```

---

## Infrastructure Costs (Estimated)

### MVP Phase (0-100 users)
- **Hosting:** $0-20/month (Railway/Vercel free tiers)
- **Database:** $0-10/month (Railway PostgreSQL)
- **OpenAI API:** $20-50/month
- **Stripe:** Free (pay per transaction)
- **Domain:** $12/year

**Total:** ~$50-100/month

### Growth Phase (100-1000 users)
- **Hosting:** $50-100/month
- **Database:** $25-50/month
- **OpenAI API:** $200-500/month
- **Monitoring:** $25/month (Sentry)

**Total:** ~$300-700/month

---

## Development Environment Setup

### Required Software
1. Node.js 18+ (LTS)
2. PostgreSQL 14+
3. Git
4. IntelliJ IDEA or VS Code

### Optional Tools
1. Docker (for consistent environments)
2. Postman (API testing)
3. TablePlus (database GUI)

---

**Last Updated:** January 20, 2026