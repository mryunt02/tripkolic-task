import Image from 'next/image';
import { Tour } from '../types';
import { formatDate } from '../utils/dateFormatter';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const mainImage = tour.galleries[0]?.url || '';
  const route = tour.routes[0];
  const startTimes = route?.startTime || [];
  const operatingDays = route?.operatingDays || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className='rounded-lg overflow-hidden shadow-md bg-white'>
      <div className='relative h-48'>
        <Image
          src={mainImage}
          alt={tour.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium z-10 text-black'>
          {route?.duration} Days
        </div>

        <div className='absolute bottom-2 left-2 bg-white/90 px-3 py-1 rounded-full text-xs z-10 text-black'>
          {tour.tourCategory.name}
        </div>
      </div>

      <div className='p-4 space-y-4'>
        <div>
          <h3 className='font-semibold text-lg mb-2 text-primary-600'>
            {tour.title}
          </h3>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {tour.description}
          </p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center text-sm text-gray-600'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            {tour.activityLocation.address}
          </div>
          {tour.isTransfer && (
            <div className='text-sm bg-blue-50 text-blue-600 p-2 rounded'>
              <div className='font-semibold'>
                Transfer Type: {tour.transferType}
              </div>
              <div className='text-xs'>{tour.transferDescription}</div>
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='space-y-1 text-black'>
            <div className='font-medium'>Schedule:</div>
            <div className='text-xs space-y-1 text-black'>
              {route && (
                <>
                  <div>Start: {formatDate(route.startDate)}</div>
                  <div>End: {formatDate(route.endDate)}</div>
                  <div className='flex flex-wrap gap-1'>
                    {operatingDays.map((day, idx) => (
                      <span
                        key={idx}
                        className='bg-gray-100 px-2 py-0.5 rounded-full text-xs'
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='space-y-1 text-black'>
            <div className='font-medium'>Start Times:</div>
            <div className='flex flex-wrap gap-1'>
              {startTimes.map((time, idx) => (
                <span
                  key={idx}
                  className='bg-gray-100 px-2 py-0.5 rounded-full text-xs'
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>

        {route && route.locations.length > 0 && (
          <div className='space-y-2'>
            <div className='font-medium text-sm text-primary-400'>
              Tour Stops:
            </div>
            <div className='space-y-2'>
              {route.locations.map((location, idx) => (
                <div key={idx} className='text-xs bg-gray-50 p-2 rounded'>
                  <div className='font-medium text-black'>{location.name}</div>
                  {location.stop && (
                    <div>Stop Duration: {location.stop} min</div>
                  )}
                  {location.activities.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {location.activities.map((activity, actIdx) => (
                        <span
                          key={actIdx}
                          className='bg-primary-100 text-primary-600 px-2 py-0.5 rounded'
                        >
                          {activity.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {location.sightseeing && (
                    <span className='bg-green-100 text-green-600 px-2 py-0.5 rounded mt-1 inline-block'>
                      Sightseeing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='space-y-2'>
          <div className='font-medium text-sm text-primary-400'>Included:</div>
          <div className='flex flex-wrap gap-1'>
            {tour.foodAndDrinks.map((item) => (
              <span
                key={item.id}
                className='text-xs bg-green-50 text-green-600 px-2 py-1 rounded'
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {route?.guideLanguage && route.guideLanguage.length > 0 && (
          <div className='space-y-2'>
            <div className='font-medium text-sm text-primary-400'>
              Languages:
            </div>
            <div className='flex flex-wrap gap-1'>
              {route.guideLanguage.map((lang, idx) => (
                <span
                  key={idx}
                  className='text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded'
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className='border-t pt-4 mt-4'>
          <div className='flex justify-between items-start'>
            <div>
              <div className='text-sm font-medium text-primary-400'>
                Group Size: {route?.groupSize || 'N/A'}
              </div>
              <div className='text-xs text-gray-500 mt-1'>
                Cut-off time: {tour.cutOffTime} hours
              </div>
            </div>
            <div className='text-right'>
              <div className='text-xs text-gray-500'>From</div>
              <div className='text-lg font-bold text-primary-500'>
                {formatPrice(tour.price.adultPrice)}
              </div>
              <div className='text-xs text-gray-500'>
                Child: {formatPrice(tour.price.childPrice)}
              </div>
              {tour.price.infantPrice > 0 && (
                <div className='text-xs text-gray-500'>
                  Infant: {formatPrice(tour.price.infantPrice)}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-wrap gap-2 mt-2'>
            {tour.price.isPrivate && (
              <span className='text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded'>
                Private Available
              </span>
            )}
            {tour.price.isShared && (
              <span className='text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded'>
                Shared Available
              </span>
            )}
            {tour.isPayLater && (
              <span className='text-xs bg-green-50 text-green-600 px-2 py-1 rounded'>
                Pay Later Available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
