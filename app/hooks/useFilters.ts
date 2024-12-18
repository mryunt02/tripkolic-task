import { useState } from 'react';

interface FilterState {
  location: string;
  theme: string[];
  activities: string[];
  price: number;
  startTime: string;
  groupSize: number;
  vehicle: string[];
  features: string[];
}

const FILTER_OPTIONS = {
  themes: ['Island Tour', 'Land tour', 'Safari'],
  activities: ['Swimming', 'Running', 'Elephant care', 'Snorkelling'],
  vehicles: ['Yacht', 'Speedboat', 'Safari', 'Catamaran', 'Speedcatamaran'],
  features: ['Transfer', 'Halal Food', 'Vegetarian food'],
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    theme: [],
    activities: [],
    price: 12500,
    startTime: '17:00',
    groupSize: 40,
    vehicle: [],
    features: [],
  });

  const handleLocationChange = (value: string) => {
    setFilters((prev) => ({ ...prev, location: value }));
  };

  const toggleArrayFilter = (type: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[type] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [type]: newArray };
    });
  };

  const handleRangeChange = (type: 'price' | 'groupSize', value: number) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleTimeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, startTime: value }));
  };

  const handleReset = () => {
    setFilters({
      location: '',
      theme: [],
      activities: [],
      price: 12500,
      startTime: '17:00',
      groupSize: 40,
      vehicle: [],
      features: [],
    });
  };

  return {
    filters,
    handleLocationChange,
    toggleArrayFilter,
    handleRangeChange,
    handleTimeChange,
    handleReset,
    FILTER_OPTIONS,
  };
}
