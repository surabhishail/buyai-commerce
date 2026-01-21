# API Design

## Base URL
**Development:** `http://localhost:3000/api`

---

## Endpoints

### 1. Search Products
**Endpoint:** `POST /api/search`

**Request:**
```json
{
  "query": "protein powder",
  "filters": {
    "maxPrice": 3000,
    "category": "grocery"
  }
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "id": "ucp_prod_abc123",
      "name": "Optimum Nutrition Whey",
      "price": 2899,
      "merchant": "shopify",
      "imageUrl": "https://..."
    }
  ]
}
```

---

### 2. Create Order
**Endpoint:** `POST /api/order/create`

**Request:**
```json
{
  "productId": "ucp_prod_abc123",
  "quantity": 1,
  "shippingAddress": {
    "name": "Sarah Johnson",
    "line1": "123 Main St",
    "city": "Austin",
    "state": "TX",
    "zip": "78701"
  }
}
```

---

### 3. Process Payment
**Endpoint:** `POST /api/order/pay`

**Request:**
```json
{
  "orderId": "ucp_order_xyz789",
  "paymentMethodId": "pm_abc123"
}
```

---

### 4. Track Order
**Endpoint:** `GET /api/order/:orderId`

---

**Last Updated:** January 20, 2026