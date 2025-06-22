const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class APIService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${userData.token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Medicine APIs
  async searchMedicines(query: string, filters: any = {}) {
    const params = new URLSearchParams({
      query,
      ...filters,
    });
    return this.request(`/medicines/search?${params}`);
  }

  async getMedicineDetails(medicineId: string) {
    return this.request(`/medicines/${medicineId}`);
  }

  async getMedicineCategories() {
    return this.request('/medicines/categories');
  }

  async compareJanAushadhiPrices(medicineName: string) {
    return this.request(`/medicines/jan-aushadhi/compare/${encodeURIComponent(medicineName)}`);
  }

  async checkDrugInteractions(medicineIds: string[]) {
    return this.request('/medicines/interaction-check', {
      method: 'POST',
      body: JSON.stringify({ medicine_ids: medicineIds }),
    });
  }

  // Jan Aushadhi APIs
  async searchJanAushadhiStores(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/jan-aushadhi/stores/search?${params}`);
  }

  async getJanAushadhiStoreDetails(storeId: string) {
    return this.request(`/jan-aushadhi/stores/${storeId}`);
  }

  async getJanAushadhiMedicines(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/jan-aushadhi/medicines/available?${params}`);
  }

  async calculateJanAushadhiSavings(medicineName: string, quantity: number = 1) {
    const params = new URLSearchParams({
      medicine_name: medicineName,
      quantity: quantity.toString(),
    });
    return this.request(`/jan-aushadhi/savings-calculator?${params}`);
  }

  async getJanAushadhiStatistics() {
    return this.request('/jan-aushadhi/statistics');
  }

  // Hospital Tools APIs
  async searchHospitalTools(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/hospital/tools/search?${params}`);
  }

  async getToolDetails(toolId: string) {
    return this.request(`/hospital/tools/${toolId}`);
  }

  async getToolCategories() {
    return this.request('/hospital/categories');
  }

  async getHospitalDepartments() {
    return this.request('/hospital/departments');
  }

  async getToolSafetyGuidelines(toolId: string) {
    return this.request(`/hospital/tools/${toolId}/safety-guidelines`);
  }

  async getWHOComplianceInfo() {
    return this.request('/hospital/compliance/who-standards');
  }

  // Location APIs
  async searchHealthcareLocations(searchRequest: any) {
    return this.request('/locations/search', {
      method: 'POST',
      body: JSON.stringify(searchRequest),
    });
  }

  async getNearbyLocations(filters: any = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/locations/nearby?${params}`);
  }

  async getLocationDetails(locationId: string) {
    return this.request(`/locations/${locationId}`);
  }

  async getLocationTypes() {
    return this.request('/locations/types/available');
  }

  async getAvailableServices() {
    return this.request('/locations/services/available');
  }

  async getDirections(locationId: string, fromLatitude: number, fromLongitude: number) {
    const params = new URLSearchParams({
      from_latitude: fromLatitude.toString(),
      from_longitude: fromLongitude.toString(),
    });
    return this.request(`/locations/${locationId}/directions?${params}`);
  }

  // Health APIs
  async getHealthCheck() {
    return this.request('/health/ping');
  }

  // Auth APIs (if needed for backend integration)
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new APIService();
export default apiService;