'use client';

import { useTours } from '../hooks/useTours';
import TourCard from './TourCard';
import { useFilters } from '../contexts/FilterContext';
import { useMenu } from '../contexts/MenuContext';

export default function ToursList() {
  const { tours, loading, error } = useTours();
  const { filters } = useFilters();
  const { setIsMenuOpen } = useMenu();

  const filteredTours = tours.filter((tour) => {
    const route = tour.routes[0];

    // Location filter
    if (
      filters.location &&
      !tour.activityLocation.address
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Theme filter
    if (
      filters.theme.length > 0 &&
      !filters.theme.includes(tour.tourCategory.name)
    ) {
      return false;
    }

    // Activities filter
    if (filters.activities.length > 0) {
      const tourActivities =
        route?.locations.flatMap((loc) =>
          loc.activities.map((act) => act.name)
        ) || [];
      if (
        !filters.activities.some((activity) =>
          tourActivities.includes(activity)
        )
      ) {
        return false;
      }
    }

    // Price filter
    if (tour.price.adultPrice > filters.price) {
      return false;
    }

    // Start time filter
    if (route?.startTime) {
      const filterTime = parseInt(filters.startTime.replace(':', ''));
      const tourTimes = route.startTime.map((time) =>
        parseInt(time.replace(':', ''))
      );
      if (!tourTimes.some((time) => time <= filterTime)) {
        return false;
      }
    }

    // Group size filter
    if (route?.groupSize && route.groupSize > filters.groupSize) {
      return false;
    }

    // Vehicle filter
    if (
      filters.vehicle.length > 0 &&
      tour.vehicle &&
      !filters.vehicle.includes(tour.vehicle.name)
    ) {
      return false;
    }

    // Features filter
    if (filters.features.length > 0) {
      const tourFeatures = tour.foodAndDrinks.map((f) => f.name);
      if (!filters.features.some((feature) => tourFeatures.includes(feature))) {
        return false;
      }
    }

    return true;
  });

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

  if (filteredTours.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4'>
        <svg
          className='w-12 h-12 text-primary-500 mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <h3 className='text-xl font-semibold text-primary-500 mb-2'>
          No tours found
        </h3>
        <p className='text-primary-400 text-center max-w-md'>
          Try adjusting your filters or search criteria to find more tours
        </p>
        <button
          className='mt-6 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2'
          onClick={() => setIsMenuOpen(true)}
        >
          <svg
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
            />
          </svg>
          Change Filter Settings
        </button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 py-4'>
      {filteredTours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
