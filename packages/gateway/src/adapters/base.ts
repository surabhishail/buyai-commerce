import { UCPProduct, UCPSearchQuery, UCPOrder, UCPOrderResponse } from '@buyai/shared/src/types';

/**
 * Every merchant adapter MUST implement this interface
 * This is the core of our UCP abstraction
 */
export interface UCPMerchant {
    /**
     * Search for products
     */
    searchProducts(query: UCPSearchQuery): Promise<UCPProduct[]>;

    /**
     * Create a new order (not yet paid)
     */
    createOrder(order: Partial<UCPOrder>): Promise<UCPOrderResponse>;

    /**
     * Get order details
     */
    getOrder(orderId: string): Promise<UCPOrder>;

    /**
     * Get tracking information (optional for MVP)
     */
    trackOrder?(orderId: string): Promise<any>;
}

/**
 * Base class with common functionality
 * Adapters can extend this for shared logic
 */
export abstract class BaseAdapter implements UCPMerchant {
    protected merchantName: string;

    constructor(merchantName: string) {
        this.merchantName = merchantName;
    }

    /**
     * Generate UCP-formatted product ID
     */
    protected generateProductId(merchantProductId: string): string {
        return `ucp_prod_${this.merchantName}_${merchantProductId}`;
    }

    /**
     * Generate UCP-formatted order ID
     */
    protected generateOrderId(merchantOrderId: string): string {
        return `ucp_order_${this.merchantName}_${merchantOrderId}`;
    }

    /**
     * Convert price to cents (UCP standard)
     */
    protected toCents(amount: number): number {
        return Math.round(amount * 100);
    }

    /**
     * Convert cents to dollars
     */
    protected toDollars(cents: number): number {
        return cents / 100;
    }

    // Abstract methods - must be implemented by each adapter
    abstract searchProducts(query: UCPSearchQuery): Promise<UCPProduct[]>;
    abstract createOrder(order: Partial<UCPOrder>): Promise<UCPOrderResponse>;
    abstract getOrder(orderId: string): Promise<UCPOrder>;
}