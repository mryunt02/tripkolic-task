interface FilterSectionProps {
  label: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function FilterSection({
  label,
  subtitle,
  children,
}: FilterSectionProps) {
  return (
    <div>
      <label className='block text-gray-700 mb-2'>
        {label}
        {subtitle && (
          <span className='text-xs text-gray-400 ml-2'>{subtitle}</span>
        )}
      </label>
      <div className='flex flex-wrap gap-2'>{children}</div>
    </div>
  );
}
