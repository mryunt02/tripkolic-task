'use client';

import { FilterSection } from '../ui/FilterSection';
import { FilterTag } from '../ui/FilterTag';
import { RangeSlider } from '../ui/RangeSlider';
import { SearchInput } from '../ui/SearchInput';
import { useFilters } from '@/app/contexts/FilterContext';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterMenu({ isOpen, onClose }: FilterMenuProps) {
  const {
    filters,
    handleLocationChange,
    toggleArrayFilter,
    handleRangeChange,
    handleTimeChange,
    handleReset,
    FILTER_OPTIONS,
  } = useFilters();

  const formatTime = (value: number) => {
    const timeString = value.toString().padStart(4, '0');
    return `${timeString.slice(0, 2)}:${timeString.slice(2)}`;
  };

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='h-full overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>TOURS</span>
            <span className='text-gray-500'>Filter</span>
          </div>
          <button onClick={onClose} className='p-2 rounded-full'>
            <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none'>
              <path
                d='M6 18L18 6M6 6l12 12'
                stroke='currentColor'
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className='p-4 space-y-6'>
          {/* Location */}
          <FilterSection label='Location'>
            <SearchInput
              value={filters.location}
              onChange={handleLocationChange}
              placeholder='Where do you wanna visit? (Pin Phi Island, Chaloklum temple...)'
            />
          </FilterSection>

          {/* Theme */}
          <FilterSection label='Theme'>
            {FILTER_OPTIONS.themes.map((theme) => (
              <FilterTag
                key={theme}
                label={theme}
                count={43}
                isSelected={filters.theme.includes(theme)}
                onClick={() => toggleArrayFilter('theme', theme)}
              />
            ))}
          </FilterSection>

          {/* Activities */}
          <FilterSection label='Activity' subtitle='Select list'>
            {FILTER_OPTIONS.activities.map((activity) => (
              <FilterTag
                key={activity}
                label={activity}
                count={43}
                isSelected={filters.activities.includes(activity)}
                onClick={() => toggleArrayFilter('activities', activity)}
              />
            ))}
          </FilterSection>

          {/* Price Range */}
          <RangeSlider
            label='Price'
            min={0}
            max={25000}
            value={filters.price}
            onChange={(value) => handleRangeChange('price', value)}
          />

          {/* Start Time */}
          <RangeSlider
            label='Start time'
            min={0}
            max={2359}
            step={100}
            value={parseInt(filters.startTime.replace(':', ''))}
            onChange={(value) => handleTimeChange(formatTime(value))}
            formatValue={formatTime}
          />

          {/* Group Size */}
          <RangeSlider
            label='Group size'
            min={1}
            max={40}
            value={filters.groupSize}
            onChange={(value) => handleRangeChange('groupSize', value)}
          />

          {/* Vehicle */}
          <FilterSection label='Vehicle'>
            {FILTER_OPTIONS.vehicles.map((vehicle) => (
              <FilterTag
                key={vehicle}
                label={vehicle}
                count={43}
                isSelected={filters.vehicle.includes(vehicle)}
                onClick={() => toggleArrayFilter('vehicle', vehicle)}
              />
            ))}
          </FilterSection>

          {/* Features */}
          <FilterSection label='Features'>
            {FILTER_OPTIONS.features.map((feature) => (
              <FilterTag
                key={feature}
                label={feature}
                count={43}
                isSelected={filters.features.includes(feature)}
                onClick={() => toggleArrayFilter('features', feature)}
              />
            ))}
          </FilterSection>

          {/* Action Buttons */}
          <div className='flex gap-4 mt-8'>
            <button
              onClick={handleReset}
              className='flex-1 py-3 rounded-lg border border-primary-500 text-primary-500'
            >
              RESET
            </button>
            <button
              onClick={onClose}
              className='flex-1 py-3 rounded-lg bg-primary-500 text-white'
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
