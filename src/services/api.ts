import { API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants';
import { handleAPIError, logError } from '../utils/errorHandler';
import { APIResponse } from '../types';

class APIService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const user = localStorage.getItem('aarogya_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${userData.token}`,
          };
        }
      } catch (error) {
        logError(error as Error, 'APIService.request - token parsing');
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorMessage = handleAPIError({ response });
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return {
        success: true,
        data,
        message: 'Request successful'
      };
    } catch (error) {
      logError(error as Error, `APIService.request - ${endpoint}`);
      
      // Return mock data for development when API is not available
      if (endpoint.includes('/medicines/search')) {
        return this.getMockMedicinesData();
      } else if (endpoint.includes('/jan-aushadhi/stores')) {
        return this.getMockJanAushadhiData();
      } else if (endpoint.includes('/hospital/tools')) {
        return this.getMockHospitalToolsData();
      } else if (endpoint.includes('/locations')) {
        return this.getMockLocationsData();
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR
      };
    }
  }

  // Medicine APIs
  async searchMedicines(query: string, filters: any = {}) {
    const params = new URLSearchParams({
      query,
      ...filters,
    });
    return this.request(`${API_ENDPOINTS.MEDICINES}/search?${params}`);
  }

  async getMedicineDetails(medicineId: string) {
    return this.request(`${API_ENDPOINTS.MEDICINES}/${medicineId}`);
  }

  async getMedicineCategories() {
    return this.request(`${API_ENDPOINTS.MEDICINES}/categories`);
  }

  async compareJanAushadhiPrices(medicineName: string) {
    return this.request(`${API_ENDPOINTS.MEDICINES}/jan-aushadhi/compare/${encodeURIComponent(medicineName)}`);
  }

  async checkDrugInteractions(medicineIds: string[]) {
    return this.request(`${API_ENDPOINTS.MEDICINES}/interaction-check`, {
      method: 'POST',
      body: JSON.stringify({ medicine_ids: medicineIds }),
    });
  }

  // Jan Aushadhi APIs
  async searchJanAushadhiStores(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`${API_ENDPOINTS.JAN_AUSHADHI}/stores/search?${params}`);
  }

  async getJanAushadhiStoreDetails(storeId: string) {
    return this.request(`${API_ENDPOINTS.JAN_AUSHADHI}/stores/${storeId}`);
  }

  async getJanAushadhiMedicines(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`${API_ENDPOINTS.JAN_AUSHADHI}/medicines/available?${params}`);
  }

  async calculateJanAushadhiSavings(medicineName: string, quantity: number = 1) {
    const params = new URLSearchParams({
      medicine_name: medicineName,
      quantity: quantity.toString(),
    });
    return this.request(`${API_ENDPOINTS.JAN_AUSHADHI}/savings-calculator?${params}`);
  }

  async getJanAushadhiStatistics() {
    return this.request(`${API_ENDPOINTS.JAN_AUSHADHI}/statistics`);
  }

  // Hospital Tools APIs
  async searchHospitalTools(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`${API_ENDPOINTS.HOSPITALS}/tools/search?${params}`);
  }

  async getToolDetails(toolId: string) {
    return this.request(`${API_ENDPOINTS.HOSPITALS}/tools/${toolId}`);
  }

  async getToolCategories() {
    return this.request(`${API_ENDPOINTS.HOSPITALS}/categories`);
  }

  async getHospitalDepartments() {
    return this.request(`${API_ENDPOINTS.HOSPITALS}/departments`);
  }

  async getToolSafetyGuidelines(toolId: string) {
    return this.request(`${API_ENDPOINTS.HOSPITALS}/tools/${toolId}/safety-guidelines`);
  }

  async getWHOComplianceInfo() {
    return this.request(`${API_ENDPOINTS.HOSPITALS}/compliance/who-standards`);
  }

  // Location APIs
  async searchHealthcareLocations(searchRequest: any) {
    return this.request(`${API_ENDPOINTS.LOCATIONS}/search`, {
      method: 'POST',
      body: JSON.stringify(searchRequest),
    });
  }

  async getNearbyLocations(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`${API_ENDPOINTS.LOCATIONS}/nearby?${params}`);
  }

  async getLocationDetails(locationId: string) {
    return this.request(`${API_ENDPOINTS.LOCATIONS}/${locationId}`);
  }

  async getLocationTypes() {
    return this.request(`${API_ENDPOINTS.LOCATIONS}/types/available`);
  }

  async getAvailableServices() {
    return this.request(`${API_ENDPOINTS.LOCATIONS}/services/available`);
  }

  async getDirections(locationId: string, fromLatitude: number, fromLongitude: number) {
    const params = new URLSearchParams({
      from_latitude: fromLatitude.toString(),
      from_longitude: fromLongitude.toString(),
    });
    return this.request(`${API_ENDPOINTS.LOCATIONS}/${locationId}/directions?${params}`);
  }

  // Health APIs
  async getHealthCheck() {
    return this.request(`${API_ENDPOINTS.HEALTH}/ping`);
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.request(`${API_ENDPOINTS.AUTH}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request(`${API_ENDPOINTS.AUTH}/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Mock data methods for development
  private getMockMedicinesData(): APIResponse {
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Paracetamol',
          genericName: 'Acetaminophen',
          category: 'painkillers',
          description: 'Common pain reliever and fever reducer',
          janAushadhiPrice: '₹2-5 per tablet',
          brandPrice: '₹8-15 per tablet',
          whoApproved: true,
          janAushadhiAvailable: true
        }
      ]
    };
  }

  private getMockJanAushadhiData(): APIResponse {
    return {
      success: true,
      data: [
        {
          id: 'ja_001',
          name: 'Jan Aushadhi Store - Koramangala',
          address: '5th Block, Koramangala, Bangalore',
          phone: '+91 80 4112 3456',
          verified: true
        }
      ]
    };
  }

  private getMockHospitalToolsData(): APIResponse {
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Digital Stethoscope',
          category: 'diagnostic',
          description: 'Advanced digital stethoscope with noise cancellation',
          whoApproved: true,
          fdaApproved: true
        }
      ]
    };
  }

  private getMockLocationsData(): APIResponse {
    return {
      success: true,
      data: [
        {
          id: '1',
          name: 'Apollo Hospital',
          type: 'hospital',
          address: 'Bannerghatta Road, Bangalore',
          phone: '+91 80 2692 2222',
          rating: 4.5,
          verified: true
        }
      ]
    };
  }
}

export const apiService = new APIService();
export default apiService;