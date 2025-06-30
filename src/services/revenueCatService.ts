import { SUBSCRIPTION_PLANS } from '../utils/constants';
import { handleAPIError, logError } from '../utils/errorHandler';

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PurchasePackage {
  identifier: string;
  packageType: string;
  product: {
    identifier: string;
    description: string;
    title: string;
    price: number;
    priceString: string;
    currencyCode: string;
  };
}

class RevenueCatService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_REVENUECAT_API_KEY || '';
    this.baseURL = 'https://api.revenuecat.com/v1';
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async getSubscriberInfo(userId: string): Promise<Subscription | null> {
    try {
      const response = await fetch(`${this.baseURL}/subscribers/${userId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // User not found
        }
        throw new Error(`Failed to get subscriber info: ${response.statusText}`);
      }

      const data = await response.json();
      const subscription = data.subscriber?.subscriptions;
      
      if (!subscription || Object.keys(subscription).length === 0) {
        return null;
      }

      const activeSubscription = Object.values(subscription)[0] as any;
      
      return {
        id: activeSubscription.original_purchase_date,
        planId: activeSubscription.product_identifier,
        status: activeSubscription.expires_date > new Date().toISOString() ? 'active' : 'expired',
        currentPeriodStart: new Date(activeSubscription.purchase_date),
        currentPeriodEnd: new Date(activeSubscription.expires_date),
        cancelAtPeriodEnd: activeSubscription.will_renew === false
      };
    } catch (error) {
      logError(error as Error, 'RevenueCatService.getSubscriberInfo');
      return null;
    }
  }

  async purchasePackage(userId: string, packageId: string): Promise<boolean> {
    try {
      // In a real implementation, this would handle the purchase flow
      // For now, we'll simulate a successful purchase
      const response = await fetch(`${this.baseURL}/subscribers/${userId}/purchases`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          package_id: packageId,
          price: this.getPriceForPackage(packageId),
          currency: 'USD'
        })
      });

      return response.ok;
    } catch (error) {
      logError(error as Error, 'RevenueCatService.purchasePackage');
      return false;
    }
  }

  async cancelSubscription(userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/subscribers/${userId}/subscriptions/cancel`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      return response.ok;
    } catch (error) {
      logError(error as Error, 'RevenueCatService.cancelSubscription');
      return false;
    }
  }

  async getAvailablePackages(): Promise<PurchasePackage[]> {
    try {
      // Mock packages for development
      return [
        {
          identifier: 'basic_monthly',
          packageType: 'monthly',
          product: {
            identifier: 'basic_monthly',
            description: 'Basic plan with 5 AI consultations per month',
            title: 'Basic Monthly',
            price: 9.99,
            priceString: '$9.99',
            currencyCode: 'USD'
          }
        },
        {
          identifier: 'premium_monthly',
          packageType: 'monthly',
          product: {
            identifier: 'premium_monthly',
            description: 'Premium plan with unlimited AI consultations',
            title: 'Premium Monthly',
            price: 19.99,
            priceString: '$19.99',
            currencyCode: 'USD'
          }
        }
      ];
    } catch (error) {
      logError(error as Error, 'RevenueCatService.getAvailablePackages');
      return [];
    }
  }

  private getPriceForPackage(packageId: string): number {
    const prices: { [key: string]: number } = {
      'basic_monthly': 9.99,
      'premium_monthly': 19.99,
      'enterprise_custom': 99.99
    };
    
    return prices[packageId] || 0;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const revenueCatService = new RevenueCatService();
export default revenueCatService;