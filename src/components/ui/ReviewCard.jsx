import StarRating from './StarRating';

export default function ReviewCard({ review }) {
  const { name, rating, body } = review;

  return (
    <div className="relative bg-white rounded-3xl p-6 md:p-7 shadow-sm border border-blush">

      {/* Stars */}
      <StarRating value={rating} readOnly size={18} />

      {/* Review text */}
      {body && (
        <p className="text-ink/85 text-sm md:text-[15px] leading-relaxed italic mt-4">
          "{body}"
        </p>
      )}

      {/* Divider + name */}
      <div className="mt-5 pt-4 border-t border-blush">
        <p className="text-ink font-semibold text-sm">{name}</p>
      </div>

      {/* Speech-bubble tail (bottom-left) */}
      <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b border-r border-blush rotate-45" />
    </div>
  );
}