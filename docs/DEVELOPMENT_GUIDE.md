# Development Guide

## Prerequisites

### Required Software
- **Node.js:** 18.x or 20.x LTS
- **npm:** 9.x or higher (comes with Node.js)
- **PostgreSQL:** 14.x or higher
- **Git:** Latest version

### Accounts Needed
- GitHub account
- Shopify Partner account (free)
- Stripe account (free test mode)
- OpenAI API key (paid)

---

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/surabhishail/buyai-commerce.git
cd buyai-commerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
# (Use your text editor or IDE)
```

**Required Environment Variables:**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/buyai"

# AI
OPENAI_API_KEY="sk-..."

# Shopify
SHOPIFY_STORE_URL="your-store.myshopify.com"
SHOPIFY_API_KEY="..."
SHOPIFY_API_SECRET="..."
SHOPIFY_ACCESS_TOKEN="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Application
NODE_ENV="development"
PORT="3000"
```

### 4. Setup Database
```bash
# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

---

## Running the Application

### Development Mode
```bash
# Run all services
npm run dev

# Or run individually:
npm run dev:gateway    # Gateway service
npm run dev:ai         # AI agent
npm run dev:ui         # Frontend
```

### Access Points
- **Frontend:** http://localhost:3000
- **Gateway API:** http://localhost:3001/api
- **Database GUI:** `npx prisma studio` → http://localhost:5555

---

## Project Structure
```
buyai-commerce/
├── packages/
│   ├── gateway/           # UCP Gateway Service
│   │   ├── src/
│   │   │   ├── index.ts              # Entry point
│   │   │   ├── routes/               # API routes
│   │   │   ├── adapters/             # Merchant adapters
│   │   │   │   ├── base.ts           # UCPMerchant interface
│   │   │   │   └── shopify.ts        # Shopify implementation
│   │   │   ├── services/             # Business logic
│   │   │   ├── middleware/           # Express middleware
│   │   │   └── utils/                # Helper functions
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ai-agent/          # AI Orchestration
│   │   ├── src/
│   │   │   ├── index.ts              # Entry point
│   │   │   ├── llm/                  # LLM integration
│   │   │   ├── actions/              # UCP action parsers
│   │   │   └── prompts/              # System prompts
│   │   └── package.json
│   │
│   ├── ui/                # Frontend (React/Next.js)
│   │   ├── src/
│   │   │   ├── app/                  # Next.js app directory
│   │   │   ├── components/           # React components
│   │   │   └── lib/                  # Utilities
│   │   └── package.json
│   │
│   └── shared/            # Shared code
│       ├── src/
│       │   ├── types/                # TypeScript types
│       │   └── utils/                # Shared utilities
│       └── package.json
│
├── docs/                  # Documentation
├── prisma/                # Database schema
│   └── schema.prisma
├── .env.example
├── package.json           # Root package
└── README.md
```

---

## Development Workflow

### Creating a New Feature
```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes

# 3. Test locally
npm run test

# 4. Lint code
npm run lint

# 5. Commit changes
git add .
git commit -m "feat: add your feature"

# 6. Push to GitHub
git push origin feature/your-feature-name

# 7. Create Pull Request on GitHub
```

### Commit Message Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
chore: Update dependencies
refactor: Refactor code
test: Add tests
```

---

## Testing

### Manual Testing with cURL
```bash
# Test search endpoint
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "protein powder", "filters": {"maxPrice": 3000}}'

# Test health check
curl http://localhost:3001/health
```

### Using Postman/Thunder Client

1. Import collection (if provided)
2. Set environment variables
3. Run requests

---

## Database Management

### View Data
```bash
# Open Prisma Studio (database GUI)
npx prisma studio
```

### Run Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

### Reset Database
```bash
# WARNING: Deletes all data
npx prisma migrate reset
```

---

## Common Tasks

### Adding a New Merchant Adapter

1. Create new file in `packages/gateway/src/adapters/`:
```typescript
// packages/gateway/src/adapters/amazon.ts
import { UCPMerchant, UCPProduct, UCPOrder } from './base';

export class AmazonAdapter implements UCPMerchant {
  async searchProducts(query: any): Promise<UCPProduct[]> {
    // Implementation
  }
  
  async createOrder(order: UCPOrder): Promise<any> {
    // Implementation
  }
}
```

2. Register in adapter registry:
```typescript
// packages/gateway/src/adapters/index.ts
import { AmazonAdapter } from './amazon';

export const adapterRegistry = {
  shopify: new ShopifyAdapter(),
  amazon: new AmazonAdapter(),
};
```

### Adding a New API Endpoint

1. Create route file:
```typescript
// packages/gateway/src/routes/newEndpoint.ts
import { Router } from 'express';

const router = Router();

router.post('/new-endpoint', async (req, res) => {
  // Handle request
});

export default router;
```

2. Register in main app:
```typescript
// packages/gateway/src/index.ts
import newEndpointRouter from './routes/newEndpoint';

app.use('/api', newEndpointRouter);
```

---

## Debugging

### VS Code Launch Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Gateway",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev:gateway"],
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### IntelliJ Debug Configuration

1. Run → Edit Configurations
2. Add new "npm" configuration
3. Package.json: `packages/gateway/package.json`
4. Command: `run`
5. Scripts: `dev`

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_ctl status

# Start PostgreSQL
brew services start postgresql  # Mac
# or
sudo service postgresql start   # Linux
```

### TypeScript Errors
```bash
# Regenerate types
npm run type-check

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

---

## Code Style Guidelines

### TypeScript
- Use `interface` for public APIs
- Use `type` for unions and intersections
- Always specify return types for functions
- Use `const` instead of `let` when possible

### Naming Conventions
- Files: `kebab-case.ts`
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `PascalCase` (no `I` prefix)

### Example:
```typescript
// Good
interface Product {
  id: string;
  name: string;
}

const MAX_RETRIES = 3;

async function fetchProducts(): Promise<Product[]> {
  // ...
}

// Bad
interface IProduct { ... }
let maxRetries = 3;
function FetchProducts() { ... }
```

---

## Useful Commands
```bash
# Install new dependency
npm install package-name

# Install dev dependency
npm install -D package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm start
```

---

## Getting Help

### Documentation
- [UCP Protocol](https://github.com/universal-commerce-protocol/ucp)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Shopify API](https://shopify.dev/docs)

### Team Communication
- GitHub Issues for bugs/features
- Pull Request comments for code review
- [Your team chat tool] for quick questions

---

**Last Updated:** January 20, 2026