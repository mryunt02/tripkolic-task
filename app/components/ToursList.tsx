'use client';

import { useTours } from '../hooks/useTours';
import TourCard from './TourCard';

export default function ToursList() {
  const { tours, loading, error } = useTours();

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
      </div>
    );
  }

  if (error) {
    return <div className='text-center text-red-500 mt-8'>{error}</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-4 py-4'>
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
