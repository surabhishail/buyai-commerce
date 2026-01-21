# API Design Documentation

## Base URL

**Development:** `http://localhost:3000/api`
**Production:** `https://api.buyai.com/api` (TBD)

**API Version:** v1

---

## Authentication

**MVP:** No authentication (for demo)

**Future:** Bearer token authentication
```http
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Search Products

Search for products across merchants.

**Endpoint:** `POST /api/search`

**Request:**
```json
{
  "query": "protein powder",
  "filters": {
    "maxPrice": 3000,        // in cents
    "minPrice": 1000,        // optional
    "category": "grocery",   // optional
    "merchant": "shopify"    // optional, "all" for multi-merchant
  },
  "limit": 10               // optional, default 10
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "results": [
    {
      "id": "ucp_prod_abc123",
      "name": "Optimum Nutrition Gold Standard Whey",
      "description": "100% Whey Protein Isolate...",
      "price": 2899,
      "currency": "USD",
      "merchant": "shopify",
      "merchantProductId": "gid://shopify/Product/123456",
      "imageUrl": "https://cdn.shopify.com/...",
      "productUrl": "https://store.com/products/...",
      "inStock": true,
      "rating": 4.8,
      "reviewCount": 1234
    }
  ],
  "count": 3,
  "timestamp": "2026-01-20T10:30:00Z"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_QUERY",
    "message": "Query cannot be empty"
  }
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "error": {
    "code": "MERCHANT_ERROR",
    "message": "Failed to fetch from Shopify",
    "details": "Connection timeout"
  }
}
```

---

### 2. Get Product Details

Get detailed information about a specific product.

**Endpoint:** `GET /api/product/:productId`

**Request:**
```http
GET /api/product/ucp_prod_abc123
```

**Response (Success - 200):**
```json
{
  "success": true,
  "product": {
    "id": "ucp_prod_abc123",
    "name": "Optimum Nutrition Gold Standard Whey",
    "description": "100% Whey Protein Isolate...",
    "price": 2899,
    "currency": "USD",
    "merchant": "shopify",
    "variants": [
      {
        "id": "var_001",
        "name": "Chocolate (2 lbs)",
        "price": 2899
      },
      {
        "id": "var_002",
        "name": "Vanilla (2 lbs)",
        "price": 2899
      }
    ],
    "images": [
      "https://cdn.shopify.com/image1.jpg",
      "https://cdn.shopify.com/image2.jpg"
    ],
    "inStock": true,
    "shippingInfo": {
      "estimatedDays": "3-5",
      "cost": 500  // in cents
    }
  }
}
```

---

### 3. Create Order

Create a new order (draft state, not yet paid).

**Endpoint:** `POST /api/order/create`

**Request:**
```json
{
  "productId": "ucp_prod_abc123",
  "variantId": "var_001",         // optional
  "quantity": 1,
  "shippingAddress": {
    "name": "Sarah Johnson",
    "line1": "123 Main St",
    "line2": "Apt 4B",             // optional
    "city": "Austin",
    "state": "TX",
    "zip": "78701",
    "country": "US",
    "phone": "+1234567890"         // optional
  },
  "email": "sarah@example.com"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "order": {
    "id": "ucp_order_xyz789",
    "status": "pending_payment",
    "products": [
      {
        "productId": "ucp_prod_abc123",
        "name": "Optimum Nutrition Gold Standard Whey",
        "quantity": 1,
        "price": 2899
      }
    ],
    "subtotal": 2899,
    "shipping": 500,
    "tax": 204,
    "total": 3603,
    "currency": "USD",
    "shippingAddress": { /* same as request */ },
    "createdAt": "2026-01-20T10:35:00Z",
    "paymentIntent": {
      "id": "pi_abc123",
      "clientSecret": "pi_abc123_secret_xyz"
    }
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ADDRESS",
    "message": "Invalid ZIP code for TX"
  }
}
```

---

### 4. Process Payment

Process payment for an order.

**Endpoint:** `POST /api/order/pay`

**Request:**
```json
{
  "orderId": "ucp_order_xyz789",
  "paymentMethodId": "pm_abc123"  // From Stripe.js on frontend
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "order": {
    "id": "ucp_order_xyz789",
    "status": "paid",
    "paymentStatus": "succeeded",
    "paidAt": "2026-01-20T10:36:00Z",
    "receiptUrl": "https://stripe.com/receipts/..."
  }
}
```

**Response (Error - 402):**
```json
{
  "success": false,
  "error": {
    "code": "PAYMENT_FAILED",
    "message": "Your card was declined",
    "declineCode": "insufficient_funds"
  }
}
```

---

### 5. Get Order Status

Get current status of an order.

**Endpoint:** `GET /api/order/:orderId`

**Request:**
```http
GET /api/order/ucp_order_xyz789
```

**Response (Success - 200):**
```json
{
  "success": true,
  "order": {
    "id": "ucp_order_xyz789",
    "status": "shipped",
    "products": [
      {
        "name": "Optimum Nutrition Gold Standard Whey",
        "quantity": 1,
        "price": 2899
      }
    ],
    "total": 3603,
    "currency": "USD",
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2026-01-20T10:30:00Z"
      },
      {
        "status": "paid",
        "timestamp": "2026-01-20T10:36:00Z"
      },
      {
        "status": "shipped",
        "timestamp": "2026-01-21T14:20:00Z",
        "trackingNumber": "1Z999AA10123456784",
        "carrier": "UPS"
      }
    ],
    "estimatedDelivery": "2026-01-25"
  }
}
```

---

### 6. Track Order

Get shipping tracking information.

**Endpoint:** `GET /api/order/:orderId/tracking`

**Request:**
```http
GET /api/order/ucp_order_xyz789/tracking
```

**Response (Success - 200):**
```json
{
  "success": true,
  "tracking": {
    "orderId": "ucp_order_xyz789",
    "carrier": "UPS",
    "trackingNumber": "1Z999AA10123456784",
    "status": "in_transit",
    "estimatedDelivery": "2026-01-25",
    "events": [
      {
        "status": "label_created",
        "location": "Austin, TX",
        "timestamp": "2026-01-21T10:00:00Z"
      },
      {
        "status": "picked_up",
        "location": "Austin, TX",
        "timestamp": "2026-01-21T14:20:00Z"
      },
      {
        "status": "in_transit",
        "location": "Dallas, TX",
        "timestamp": "2026-01-22T08:15:00Z"
      }
    ]
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_QUERY` | 400 | Search query is invalid or empty |
| `INVALID_ADDRESS` | 400 | Shipping address is incomplete or invalid |
| `PRODUCT_NOT_FOUND` | 404 | Product ID doesn't exist |
| `ORDER_NOT_FOUND` | 404 | Order ID doesn't exist |
| `OUT_OF_STOCK` | 409 | Product is no longer available |
| `PAYMENT_FAILED` | 402 | Payment processing failed |
| `MERCHANT_ERROR` | 500 | Error communicating with merchant API |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Rate Limiting (Future)
```
100 requests per minute per IP address
```

**Response when rate limited:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60  // seconds
  }
}
```

---

## Webhooks (Future)

### Order Status Updates

**Endpoint:** Client-provided webhook URL

**Payload:**
```json
{
  "event": "order.updated",
  "orderId": "ucp_order_xyz789",
  "status": "shipped",
  "timestamp": "2026-01-21T14:20:00Z",
  "data": {
    "trackingNumber": "1Z999AA10123456784",
    "carrier": "UPS"
  }
}
```

---

## UCP Action Schema (AI → Gateway)

This is the internal format used by the AI agent to communicate with the gateway.

### UCP_SEARCH
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

### UCP_ORDER
```json
{
  "action": "UCP_ORDER",
  "payload": {
    "productId": "ucp_prod_abc123",
    "quantity": 1,
    "shippingAddress": { /* address object */ }
  }
}
```

### UCP_PAY
```json
{
  "action": "UCP_PAY",
  "payload": {
    "orderId": "ucp_order_xyz789",
    "paymentMethodId": "pm_abc123"
  }
}
```

### UCP_TRACK
```json
{
  "action": "UCP_TRACK",
  "payload": {
    "orderId": "ucp_order_xyz789"
  }
}
```

---

**Last Updated:** January 20, 2026