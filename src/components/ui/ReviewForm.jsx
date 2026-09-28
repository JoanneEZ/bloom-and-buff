import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from './Button';
import StarRating from './StarRating';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReviewForm({ onSubmitted }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please add your name.');
      return;
    }
    if (rating < 1) {
      setErrorMsg('Please pick a star rating.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('reviews').insert({
      name: name.trim(),
      rating,
      body: body.trim() || null,
    });

    if (error) {
      console.error('Review insert failed:', error);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('idle');
      return;
    }

    setStatus('success');
    setName('');
    setRating(0);
    setBody('');
    onSubmitted?.();
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-blush text-center">
        <CheckCircle2 size={44} className="text-pink mx-auto" />
        <h3 className="font-serif text-2xl text-ink mt-3">
          Thank you! ✨
        </h3>
        <p className="text-muted text-sm mt-2">
          Your review was submitted. It'll appear here once approved.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-pink hover:text-pinkDeep text-sm font-medium underline"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 md:p-8 border border-blush"
    >
      <h3 className="font-serif text-xl md:text-2xl text-ink">
        Leave a Review
      </h3>
      <p className="text-muted text-sm mt-1">
        Tell us about your visit — or just drop some stars.
      </p>

      {/* Stars */}
      <div className="mt-5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-muted font-semibold">
          Your Rating
        </label>
        <div className="mt-2">
          <StarRating value={rating} onChange={setRating} size={26} />
        </div>
      </div>

      {/* Name */}
      <div className="mt-5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-muted font-semibold">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name + last initial"
          required
          className="w-full mt-2 bg-blushSoft rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-pink/40"
        />
      </div>

      {/* Body */}
      <div className="mt-5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-muted font-semibold">
          Your Review <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Loved your nails? Tell us about it..."
          rows={3}
          maxLength={300}
          className="w-full mt-2 bg-blushSoft rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-pink/40 resize-none"
        />
        <div className="text-right text-[10px] text-muted mt-1">
          {body.length}/300
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full mt-4"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Post Review'}
      </Button>

      {errorMsg && (
        <div className="flex items-center gap-2 mt-4 text-sm text-red-500">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}
    </form>
  );
}