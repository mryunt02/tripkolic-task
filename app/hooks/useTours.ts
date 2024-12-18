import { useState, useEffect } from 'react';
import { Tour } from '../types';
import { fetchTours } from '../services/api';

interface UseToursReturn {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

export function useTours(): UseToursReturn {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const response = await fetchTours();
        setTours(response.products);
      } catch (err) {
        setError('Failed to load tours');
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  return { tours, loading, error };
}
