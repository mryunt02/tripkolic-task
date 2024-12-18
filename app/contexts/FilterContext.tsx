'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export const FILTER_OPTIONS = {
  themes: ['Island Tour', 'Land tour', 'Safari'],
  activities: ['Swimming', 'Running', 'Elephant care', 'Snorkelling'],
  vehicles: ['Yacht', 'Speedboat', 'Safari', 'Catamaran', 'Speedcatamaran'],
  features: ['Transfer', 'Halal Food', 'Vegetarian food'],
};

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

interface FilterContextType {
  filters: FilterState;
  handleLocationChange: (value: string) => void;
  toggleArrayFilter: (type: keyof FilterState, value: string) => void;
  handleRangeChange: (type: 'price' | 'groupSize', value: number) => void;
  handleTimeChange: (value: string) => void;
  handleReset: () => void;
}

const initialState: FilterState = {
  location: '',
  theme: [],
  activities: [],
  price: 12500,
  startTime: '17:00',
  groupSize: 40,
  vehicle: [],
  features: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const handleLocationChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, location: value }));
  }, []);

  const toggleArrayFilter = useCallback(
    (type: keyof FilterState, value: string) => {
      setFilters((prev) => {
        const currentArray = prev[type] as string[];
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];
        return { ...prev, [type]: newArray };
      });
    },
    []
  );

  const handleRangeChange = useCallback(
    (type: 'price' | 'groupSize', value: number) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    },
    []
  );

  const handleTimeChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, startTime: value }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialState);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleLocationChange,
        toggleArrayFilter,
        handleRangeChange,
        handleTimeChange,
        handleReset,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return { ...context, FILTER_OPTIONS };
}
