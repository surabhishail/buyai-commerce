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

---

### 2. AI Orchestration Layer

**Technology:** OpenAI GPT-4 or Anthropic Claude

**Responsibilities:**
- Parse natural language into structured actions
- Maintain conversation context
- Generate user-friendly responses

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

---

### 4. Merchant Adapter Layer

**Pattern:** Adapter Pattern

**Interface:**
```typescript
interface UCPMerchant {
  searchProducts(query: UCPSearchQuery): Promise<UCPProduct[]>
  createOrder(order: UCPOrder): Promise<UCPOrderResponse>
  getOrder(orderId: string): Promise<UCPOrder>
  trackOrder(orderId: string): Promise<UCPShipmentStatus>
}
```

---

## Why This Architecture?

### ✅ Separation of Concerns
- Each layer has one job
- Easy to debug and test

### ✅ Extensibility
- Add new merchant = implement UCPMerchant interface
- Add new AI provider = swap AI layer

### ✅ Business Moat
- UCP becomes the standard
- Network effects (more merchants → more AI agents)

---

**Last Updated:** January 20, 2026