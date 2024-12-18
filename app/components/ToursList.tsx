'use client';

import { useTours } from '../hooks/useTours';
import TourCard from './TourCard';
import { useFilters } from '../contexts/FilterContext';

export default function ToursList() {
  const { tours, loading, error } = useTours();
  const { filters } = useFilters();

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
      <div className='text-center text-gray-500 mt-8'>
        No tours found matching your filters
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
