interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export function RangeSlider({
  label,
  min,
  max,
  value,
  step = 1,
  onChange,
  formatValue = (val) => val.toString(),
}: RangeSliderProps) {
  return (
    <div>
      <label className='block text-gray-700 mb-2'>{label}</label>
      <div className='px-2'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='w-full accent-primary-500'
        />
        <div className='flex justify-between text-sm mt-1 text-primary-500'>
          <span>{formatValue(min)}</span>
          <span>{formatValue(value)}</span>
        </div>
      </div>
    </div>
  );
}
