import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import ReviewCard from '../ui/ReviewCard';
import ReviewForm from '../ui/ReviewForm';
import TagPill from '../ui/TagPill';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, rating, body')
      .order('created_at', { ascending: false })
      .limit(9);

    if (error) {
      console.error('Failed to load reviews:', error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <section
      id="reviews"
      className="bg-blushSoft py-20 md:py-28 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <TagPill icon="♡">Salon Love</TagPill>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-6">
            Loved by the Lovely
          </h2>
          <p className="text-muted mt-4 leading-relaxed">
            Real words from real clients. Loved your visit? Leave a review below.
          </p>
        </div>

        {/* Reviews grid */}
        {loading ? (
          <p className="text-center text-muted mb-14">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-muted mb-14">
            No reviews yet — be the first to share your experience! ✨
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Submission form */}
        <div className="max-w-2xl mx-auto">
          <ReviewForm onSubmitted={loadReviews} />
        </div>

      </div>
    </section>
  );
}