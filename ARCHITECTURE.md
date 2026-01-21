# System Architecture

## Overview

BuyAI is built as a multi-layer system where each component has a single, well-defined responsibility. The architecture follows clean separation of concerns and uses the adapter pattern for extensibility.

## Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                         USER LAYER                          │
│                    Chat UI (React/Next.js)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/WebSocket
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   AI ORCHESTRATION LAYER                    │
│   ┌──────────────────────────────────────────────────┐     │
│   │  LLM (GPT-4/Claude)                              │     │
│   │  - Parses natural language                       │     │
│   │  - Generates structured UCP actions              │     │
│   │  - Formats responses for user                    │     │
│   └──────────────────────────────────────────────────┘     │
│                                                              │
│   Actions: UCP_SEARCH | UCP_ORDER | UCP_PAY | UCP_TRACK   │
└────────────────────────┬────────────────────────────────────┘
                         │ JSON/REST
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     UCP GATEWAY SERVICE                     │
│   ┌────────────────┬──────────────────┬─────────────────┐  │
│   │  Validation    │   Routing        │  Normalization  │  │
│   │  - Input check │   - Merchant     │  - Response     │  │
│   │  - Schema      │     selection    │     format      │  │
│   └────────────────┴──────────────────┴─────────────────┘  │
│                                                              │
│   Endpoints:                                                 │
│   POST /api/search                                          │
│   POST /api/order/create                                    │
│   POST /api/order/pay                                       │
│   GET  /api/order/:id                                       │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       │                  │                  │
┌──────▼────────┐  ┌──────▼────────┐  ┌─────▼──────┐
│   Shopify     │  │   Amazon      │  │  Payment   │
│   Adapter     │  │   Adapter     │  │  Gateway   │
│ (implements   │  │  (future)     │  │ (Stripe)   │
│ UCPMerchant)  │  │               │  │            │
└──────┬────────┘  └──────┬────────┘  └────────────┘
       │                  │
┌──────▼────────┐  ┌──────▼────────┐
│   Shopify     │  │   Amazon      │
│   Store API   │  │   API         │
└───────────────┘  └───────────────┘
```

## Core Components

### 1. Frontend Layer

**Technology:** React + Next.js + Tailwind CSS

**Responsibilities:**
- Display chat interface
- Capture user input
- Render AI responses and product cards
- Handle payment UI (Stripe Elements)
- Show order confirmation

**Key Features:**
- Real-time message updates
- Product comparison cards
- Payment form integration
- Order tracking view

---

### 2. AI Orchestration Layer

**Technology:** OpenAI GPT-4 or Anthropic Claude

**Responsibilities:**
- Parse natural language into structured actions
- Maintain conversation context
- Generate user-friendly responses
- Handle multi-turn conversations

**Input Example:**
```
"I need protein powder under $30"
```

**Output Example:**
```json
{
  "action": "UCP_SEARCH",
  "payload": {
    "query": "protein powder",
    "filters": {
      "maxPrice": 3000,
      "category": "grocery"
    }
  }
}
```

**Supported Actions:**
- `UCP_SEARCH` - Search products
- `UCP_ORDER` - Create order
- `UCP_PAY` - Process payment
- `UCP_TRACK` - Track shipment

---

### 3. UCP Gateway Service

**Technology:** Node.js + Express + TypeScript

**Responsibilities:**
- Validate incoming requests
- Route to appropriate adapters
- Normalize responses to UCP format
- Persist orders in database
- Handle errors and retries
- Rate limiting and caching

**API Endpoints:**
```typescript
POST /api/search
{
  "query": string,
  "filters": {
    "maxPrice"?: number,
    "category"?: string,
    "merchant"?: string
  }
}

POST /api/order/create
{
  "productId": string,
  "quantity": number,
  "shippingAddress": {
    "name": string,
    "line1": string,
    "city": string,
    "state": string,
    "zip": string
  }
}

POST /api/order/pay
{
  "orderId": string,
  "paymentMethod": string
}

GET /api/order/:orderId
```

**Flow:**
1. Receive request from AI layer
2. Validate against schema
3. Determine which adapter(s) to use
4. Call adapter methods
5. Normalize responses to UCP format
6. Return to AI layer

---

### 4. Merchant Adapter Layer

**Pattern:** Adapter Pattern

**Purpose:** Translate between UCP standard and merchant-specific APIs

**Interface:**
```typescript
interface UCPMerchant {
  searchProducts(query: UCPSearchQuery): Promise<UCPProduct[]>
  createOrder(order: UCPOrder): Promise<UCPOrderResponse>
  getOrder(orderId: string): Promise<UCPOrder>
  trackOrder(orderId: string): Promise<UCPShipmentStatus>
}
```

**UCP Data Types:**
```typescript
interface UCPProduct {
  id: string;              // ucp_prod_xxx
  name: string;
  price: number;           // in cents
  currency: string;
  merchant: string;
  merchantProductId: string;
  imageUrl: string;
  productUrl: string;
  inStock: boolean;
}

interface UCPOrder {
  id: string;              // ucp_order_xxx
  userId: string;
  products: UCPOrderItem[];
  totalAmount: number;     // in cents
  status: OrderStatus;
  merchant: string;
  createdAt: Date;
}

type OrderStatus = 
  | 'pending' 
  | 'payment_required' 
  | 'paid' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';
```

**Example: Shopify Adapter**
```typescript
class ShopifyAdapter implements UCPMerchant {
  async searchProducts(query: UCPSearchQuery): Promise<UCPProduct[]> {
    // 1. Convert UCP query to Shopify GraphQL
    const shopifyQuery = this.toShopifyQuery(query);
    
    // 2. Call Shopify API
    const response = await this.shopifyClient.query(shopifyQuery);
    
    // 3. Convert Shopify response to UCP format
    return response.products.map(this.toUCPProduct);
  }
  
  async createOrder(order: UCPOrder): Promise<UCPOrderResponse> {
    // 1. Convert UCP order to Shopify format
    const shopifyOrder = this.toShopifyOrder(order);
    
    // 2. Create draft order in Shopify
    const response = await this.shopifyClient.createDraftOrder(shopifyOrder);
    
    // 3. Return UCP response
    return {
      id: this.toUCPOrderId(response.id),
      status: 'payment_required',
      checkoutUrl: response.invoiceUrl
    };
  }
}
```

---

### 5. Database Layer

**Technology:** PostgreSQL + Prisma ORM

**Schema:**
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  merchant VARCHAR(50),
  merchant_order_id VARCHAR(255),
  status VARCHAR(50),
  total_amount INTEGER,
  currency VARCHAR(3),
  products JSONB,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Search Logs (for analytics)
CREATE TABLE search_logs (
  id UUID PRIMARY KEY,
  user_id UUID,
  query TEXT,
  filters JSONB,
  results JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Merchant Logs (for debugging)
CREATE TABLE merchant_logs (
  id UUID PRIMARY KEY,
  merchant VARCHAR(50),
  action VARCHAR(50),
  request JSONB,
  response JSONB,
  status VARCHAR(20),
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

### 6. Payment Integration

**Technology:** Stripe

**Flow:**
1. User confirms order
2. Gateway creates Stripe PaymentIntent
3. Frontend shows Stripe payment form
4. User enters card details
5. Stripe processes payment
6. Gateway receives webhook
7. Update order status to 'paid'
8. Call merchant adapter to finalize order

---

## Data Flow Examples

### Search Flow
```
1. User: "protein powder under $30"
   ↓
2. Frontend → POST /api/chat
   {message: "protein powder under $30"}
   ↓
3. AI Agent → Parses intent
   Output: {action: "UCP_SEARCH", payload: {...}}
   ↓
4. Frontend → POST /api/gateway/search
   {query: "protein powder", filters: {maxPrice: 3000}}
   ↓
5. Gateway → Validates & routes to ShopifyAdapter
   ↓
6. ShopifyAdapter → Calls Shopify API
   ↓
7. Shopify API → Returns products (Shopify format)
   ↓
8. ShopifyAdapter → Converts to UCPProduct[]
   ↓
9. Gateway → Returns normalized results
   ↓
10. AI Agent → Formats for display
    ↓
11. Frontend → Renders product cards
```

### Order Flow
```
1. User selects product → Clicks "Buy"
   ↓
2. Frontend → POST /api/gateway/order/create
   {productId: "ucp_prod_xxx", quantity: 1, address: {...}}
   ↓
3. Gateway → Validates order
   ↓
4. ShopifyAdapter → Creates draft order
   ↓
5. Gateway → Saves order to database (status: 'pending')
   ↓
6. Gateway → Creates Stripe PaymentIntent
   ↓
7. Frontend → Shows Stripe payment form
   ↓
8. User → Enters card details
   ↓
9. Stripe → Processes payment
   ↓
10. Stripe → Sends webhook to Gateway
    ↓
11. Gateway → Updates order status to 'paid'
    ↓
12. Gateway → Calls ShopifyAdapter.finalizeOrder()
    ↓
13. Frontend → Shows confirmation
```

---

## Why This Architecture?

### ✅ Separation of Concerns
- Each layer has one job
- Easy to debug and test
- Clear boundaries

### ✅ Extensibility
- Add new merchant = implement UCPMerchant interface
- Add new AI provider = swap AI layer
- Add new payment method = add payment adapter

### ✅ Reliability
- Adapter failures don't crash the system
- Database persistence survives restarts
- Retry logic at gateway level

### ✅ Scalability
- Stateless gateway can scale horizontally
- Database handles all state
- Caching reduces API calls

### ✅ Testability
- Mock adapters for testing
- Test each layer independently
- Integration tests at gateway level

### ✅ Business Moat
- UCP becomes the standard
- Network effects (more merchants → more AI agents)
- Infrastructure, not application

---

## Security Considerations

1. **API Keys:** Stored in environment variables, never in code
2. **Payment:** PCI compliance via Stripe (never store card data)
3. **Authentication:** User tokens for API access
4. **Rate Limiting:** Prevent abuse at gateway level
5. **Input Validation:** All inputs validated against schema
6. **HTTPS:** All external communication encrypted

---

## Future Enhancements

1. **Multi-merchant search:** Query multiple merchants simultaneously
2. **Price comparison:** Real-time price checking across merchants
3. **Inventory sync:** Check stock before order creation
4. **Order tracking:** Real-time shipment updates
5. **Recommendation engine:** ML-based product suggestions
6. **Caching layer:** Redis for frequent queries
7. **Webhooks:** Real-time order status updates

---

**Last Updated:** January 20, 2026