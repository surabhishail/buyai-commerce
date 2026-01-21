# User Journey Documentation

## Scenario: Sarah Wants to Buy Protein Powder

### Persona
- **Name:** Sarah
- **Age:** 28
- **Goal:** Find and buy protein powder quickly
- **Tech savvy:** Medium
- **Budget:** Under $30

---

## Journey Map

### Stage 1: Discovery & Search

**User Action:**
```
Sarah opens BuyAI chat interface and types:
"I need protein powder under $30"
```

**System Response:**
```
AI: "I'll search for protein powder options under $30 for you."
[Loading animation - 2 seconds]
```

**Behind the scenes:**
1. Frontend sends message to AI agent
2. AI parses intent → UCP_SEARCH action
3. Gateway routes to Shopify adapter
4. Adapter queries Shopify API
5. Results normalized to UCP format
6. AI formats results for display

**User Sees:**
```
AI: "I found 3 great options for you:

┌─────────────────────────────────────────┐
│ 1. Optimum Nutrition Gold Standard     │
│    Whey Protein (2 lbs)                 │
│    $28.99                               │
│    ⭐⭐⭐⭐⭐ (1,234 reviews)              │
│    [Image]                              │
│    [Select]                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 2. MyProtein Impact Whey (2.2 lbs)     │
│    $29.99                               │
│    ⭐⭐⭐⭐ (856 reviews)                 │
│    [Image]                              │
│    [Select]                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 3. BSN Syntha-6 (2 lbs)                │
│    $27.50                               │
│    ⭐⭐⭐⭐⭐ (2,100 reviews)             │
│    [Image]                              │
│    [Select]                             │
└─────────────────────────────────────────┘

Which one would you like to order?
```

**Time:** 3-5 seconds

**User Sentiment:** ✅ Happy - Quick results, clear options

---

### Stage 2: Product Selection

**User Action:**
```
Sarah clicks on "Optimum Nutrition Gold Standard"
or types: "The first one"
```

**System Response:**
```
AI: "Great choice! Let me prepare your order."
[Loading - 1 second]
```

**Behind the scenes:**
1. AI identifies selected product
2. Retrieves product details
3. Prepares order summary

**User Sees:**
```
AI: "Here's your order summary:

┌─────────────────────────────────────────┐
│ Product: Optimum Nutrition Gold         │
│          Standard Whey (2 lbs)          │
│ Price: $28.99                           │
│ Shipping: $5.00 (Standard - 3-5 days)   │
│ Tax: $2.04                              │
│ ─────────────────────────────────────   │
│ Total: $36.03                           │
│                                          │
│ Deliver to:                             │
│ Sarah Johnson                           │
│ 123 Main St, Apt 4B                     │
│ Austin, TX 78701                        │
│                                          │
│ [Change Address]                        │
│                                          │
│ [✓] I confirm this order                │
│ [Proceed to Payment] [Cancel]           │
└─────────────────────────────────────────┘
```

**Time:** 1-2 seconds

**User Sentiment:** ✅ Confident - Clear pricing, can review before paying

---

### Stage 3: Address Confirmation

**User Action:**
```
Option A: Sarah clicks "Proceed to Payment" (address is correct)
Option B: Sarah clicks "Change Address"
```

**If Option B (Change Address):**
```
AI: "Where should we deliver your order?"

[Form]
Name: [          ]
Address Line 1: [          ]
Address Line 2: [          ]
City: [          ]
State: [  ]
ZIP: [     ]

[Save and Continue]
```

**User enters address and clicks "Save and Continue"**

---

### Stage 4: Payment

**System Response:**
```
AI: "Almost done! Please complete payment."
```

**User Sees (Stripe Payment Form):**
```
┌─────────────────────────────────────────┐
│ Pay $36.03                              │
│                                          │
│ Card Number                             │
│ [1234 5678 9012 3456]                   │
│                                          │
│ Expiry          CVV                     │
│ [MM / YY]      [123]                    │
│                                          │
│ Name on Card                            │
│ [Sarah Johnson]                         │
│                                          │
│ [Pay Securely] 🔒                       │
│                                          │
│ Powered by Stripe                       │
└─────────────────────────────────────────┘
```

**User Action:**
```
Sarah enters card details and clicks "Pay Securely"
```

**Behind the scenes:**
1. Stripe validates card
2. Processes payment
3. Sends webhook to Gateway
4. Gateway updates order status
5. Gateway calls Shopify to finalize order

**User Sees (Processing):**
```
[Loading spinner]
"Processing your payment..."
```

**Time:** 2-4 seconds

---

### Stage 5: Order Confirmation

**System Response:**
```
✅ Order placed successfully!

┌─────────────────────────────────────────┐
│ Order #BUY-AI-12345                     │
│                                          │
│ Optimum Nutrition Gold Standard Whey    │
│ Quantity: 1                             │
│ Total Paid: $36.03                      │
│                                          │
│ Estimated Delivery:                     │
│ January 25-27, 2026                     │
│                                          │
│ Tracking Number: 1Z999AA10123456784     │
│ [Track Package]                         │
│                                          │
│ Receipt sent to: sarah@email.com        │
│                                          │
│ [View Order Details]                    │
│ [Buy Something Else]                    │
└─────────────────────────────────────────┘
```

**Time:** Instant

**User Sentiment:** ✅ Delighted - Fast, easy, confirmed

---

### Stage 6: Post-Purchase (Optional)

**User Action (Days later):**
```
Sarah: "Where's my protein powder order?"
```

**System Response:**
```
AI: "Let me check on your order #BUY-AI-12345"
[Loading - 1 second]

"Your package is out for delivery today!

┌─────────────────────────────────────────┐
│ Status: Out for Delivery                │
│ Expected: Today by 8:00 PM              │
│                                          │
│ Tracking History:                       │
│ ✅ Jan 21, 9:00 AM - Order Placed       │
│ ✅ Jan 21, 2:00 PM - Shipped            │
│ ✅ Jan 23, 8:00 AM - In Transit         │
│ ✅ Jan 24, 6:00 AM - Out for Delivery   │
│                                          │
│ [See Full Tracking Details]             │
└─────────────────────────────────────────┘
```

---

## Journey Summary

### Total Time: 2-3 minutes
- Search: 5 seconds
- Selection: 10 seconds
- Review: 15 seconds
- Address confirmation: 10 seconds
- Payment: 30 seconds
- Confirmation: Instant

### User Touchpoints: 5
1. Initial search query
2. Product selection
3. Address confirmation
4. Payment information
5. Order confirmation

### System Interactions: 8
1. AI parses query
2. Gateway searches products
3. Display results
4. Create order
5. Confirm address
6. Process payment
7. Finalize with merchant
8. Send confirmation

---

## Success Metrics

### User Satisfaction
- ✅ Clear product options
- ✅ Transparent pricing
- ✅ Easy payment process
- ✅ Immediate confirmation
- ✅ Order tracking available

### Technical Performance
- Search results: < 3 seconds
- Payment processing: < 5 seconds
- Order creation: < 2 seconds
- Total transaction time: < 3 minutes

### Business Goals
- Conversion rate: High (simple flow)
- Cart abandonment: Low (fewer steps)
- Support tickets: Low (clear process)

---

## Edge Cases & Error Handling

### Scenario 1: Out of Stock
```
User: "The first one"

AI: "I'm sorry, but Optimum Nutrition Gold Standard 
     is currently out of stock. 
     
     Would you like option 2 (MyProtein) instead? 
     It has similar ratings and is in stock."
```

### Scenario 2: Payment Failed
```
[Payment processing...]

❌ Payment failed

"Your payment could not be processed. 
 Reason: Insufficient funds

Your order has been saved. You can:
- [Try another payment method]
- [Contact your bank]
- [Cancel order]"
```

### Scenario 3: Address Invalid
```
User enters invalid ZIP code

AI: "The ZIP code you entered (99999) doesn't match 
     Austin, TX. Please verify your address."

[Highlights ZIP field in red]
```

---

## Comparison with Traditional E-commerce

### Traditional E-commerce (Amazon)
1. Open app/website
2. Search "protein powder"
3. Scroll through 100+ results
4. Read reviews
5. Add to cart
6. Enter shipping address
7. Select shipping speed
8. Review order
9. Enter payment info
10. Place order

**Time:** 5-10 minutes
**Steps:** 10+

### BuyAI
1. "I need protein powder under $30"
2. Select product
3. Confirm and pay

**Time:** 2-3 minutes
**Steps:** 3

**Result:** 50-70% faster ⚡

---

**Last Updated:** January 20, 2026