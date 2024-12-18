interface FilterTagProps {
  label: string;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function FilterTag({
  label,
  count,
  isSelected = false,
  onClick,
}: FilterTagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full transition-colors ${
        isSelected
          ? 'bg-primary-500 text-white'
          : 'bg-primary-100 text-primary-600'
      }`}
    >
      {label} {count && `(${count})`}
    </button>
  );
}
