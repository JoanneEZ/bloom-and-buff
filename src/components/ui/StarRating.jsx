import { Star } from 'lucide-react';

export default function StarRating({
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            className={`transition-transform ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <Star
              size={size}
              className={
                filled
                  ? 'fill-gold text-gold'
                  : 'fill-transparent text-gold/40'
              }
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}