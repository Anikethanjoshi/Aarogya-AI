import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseAPIOptions {
  immediate?: boolean;
  dependencies?: any[];
}

interface UseAPIResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAPI<T>(
  apiCall: () => Promise<T>,
  options: UseAPIOptions = {}
): UseAPIResult<T> {
  const { immediate = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Specific hooks for common API calls
export function useMedicineSearch(query: string, filters: any = {}) {
  return useAPI(
    () => apiService.searchMedicines(query, filters),
    { 
      immediate: query.length > 2,
      dependencies: [query, JSON.stringify(filters)]
    }
  );
}

export function useJanAushadhiStores(filters: any = {}) {
  return useAPI(
    () => apiService.searchJanAushadhiStores(filters),
    { dependencies: [JSON.stringify(filters)] }
  );
}

export function useHospitalTools(filters: any = {}) {
  return useAPI(
    () => apiService.searchHospitalTools(filters),
    { dependencies: [JSON.stringify(filters)] }
  );
}

export function useNearbyLocations(latitude?: number, longitude?: number, filters: any = {}) {
  return useAPI(
    () => apiService.getNearbyLocations({
      latitude: latitude?.toString(),
      longitude: longitude?.toString(),
      ...filters
    }),
    { 
      immediate: !!(latitude && longitude),
      dependencies: [latitude, longitude, JSON.stringify(filters)]
    }
  );
}

export function useJanAushadhiStatistics() {
  return useAPI(() => apiService.getJanAushadhiStatistics());
}

export function useMedicineCategories() {
  return useAPI(() => apiService.getMedicineCategories());
}

export function useToolCategories() {
  return useAPI(() => apiService.getToolCategories());
}

export function useLocationTypes() {
  return useAPI(() => apiService.getLocationTypes());
}