// UCP Product - Standardized product format
export interface UCPProduct {
    id: string;                    // ucp_prod_xxx
    name: string;
    description?: string;
    price: number;                 // in cents
    currency: string;              // USD, INR, etc.
    merchant: string;              // shopify, amazon, etc.
    merchantProductId: string;     // Original ID from merchant
    imageUrl?: string;
    productUrl?: string;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
}

// UCP Search Query
export interface UCPSearchQuery {
    query: string;
    filters?: {
        maxPrice?: number;           // in cents
        minPrice?: number;
        category?: string;
        merchant?: string;
    };
    limit?: number;
}

// UCP Order
export interface UCPOrder {
    id: string;                    // ucp_order_xxx
    userId?: string;
    products: UCPOrderItem[];
    subtotal: number;              // in cents
    shipping: number;
    tax: number;
    total: number;
    currency: string;
    status: OrderStatus;
    merchant: string;
    merchantOrderId?: string;
    shippingAddress: Address;
    createdAt: Date;
    updatedAt: Date;
}

export interface UCPOrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;                 // in cents
}

export interface Address {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
}

export type OrderStatus =
    | 'pending'
    | 'payment_required'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

// UCP Order Response
export interface UCPOrderResponse {
    id: string;
    status: OrderStatus;
    checkoutUrl?: string;
    total: number;
    currency: string;
}

// Search Response
export interface SearchResponse {
    success: boolean;
    results: UCPProduct[];
    count: number;
    timestamp: string;
}

// Error Response
export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: string;
    };
}