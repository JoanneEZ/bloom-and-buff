import { useState, useEffect, useCallback } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import TagPill from '../ui/TagPill';
import { supabase } from '../../lib/supabase';
import {
  timeSlots,
  getCurrentWeekDays,
  formatDayShort,
  formatDayNumber,
  formatFullDate,
  isPast,
} from '../../data/schedule';

const WEB3FORMS_KEY = '1711144d-1f6a-48bb-97e3-d9d0e8ff4214';

// Convert a Date → "YYYY-MM-DD" (Supabase expects this format for `date` cols)
const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function BookingCTA() {
  const weekDays = getCurrentWeekDays();
  const firstAvailable = weekDays.find((d) => !isPast(d)) || weekDays[0];

  const [selectedDate, setSelectedDate] = useState(firstAvailable);
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bookedSlots, setBookedSlots] = useState([]); // array of "YYYY-MM-DD|10:00 AM"
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // ─── Fetch booked slots ───────────────────────────
  const loadBookedSlots = useCallback(async () => {
    const { data, error } = await supabase.rpc('get_booked_slots');
    if (error) {
      console.error('Failed to load booked slots:', error);
      return;
    }
    const keys = data.map((s) => `${s.booking_date}|${s.booking_time}`);
    setBookedSlots(keys);
  }, []);

  useEffect(() => {
    loadBookedSlots();
  }, [loadBookedSlots]);

  // ─── Check if a given day+time is already booked ──
  const isSlotBooked = (date, time) =>
    bookedSlots.includes(`${toISODate(date)}|${time}`);

  // Auto-select first available time when date changes
  useEffect(() => {
    const available = timeSlots.find((t) => !isSlotBooked(selectedDate, t));
    setSelectedTime(available || '');
  }, [selectedDate, bookedSlots]);

  // ─── Submit ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      setErrorMsg('Please select an available time slot.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const bookingDate = toISODate(selectedDate);

    // 1. Insert into Supabase
    const { error: insertError } = await supabase.from('bookings').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      booking_date: bookingDate,
      booking_time: selectedTime,
    });

    if (insertError) {
      // Race condition: someone took it between load and submit
      if (insertError.code === '23505') {
        setErrorMsg(
          'Sorry, that slot was just taken. Please pick another.'
        );
        await loadBookedSlots();
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
      setStatus('idle');
      return;
    }

    // 2. Send email via Web3Forms
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `✨ New booking — ${form.name}`,
          from_name: 'Bloom & Buff Website',
          name: form.name,
          email: form.email,
          phone: form.phone || '(not provided)',
          appointment_date: formatFullDate(selectedDate),
          appointment_time: selectedTime,
        }),
      });
    } catch (err) {
      console.warn('Web3Forms notify failed:', err);
      // Don't fail the booking just because email failed — Supabase is source of truth
    }

    // 3. Success
    setStatus('success');
    setForm({ name: '', email: '', phone: '' });
    await loadBookedSlots();
  };

  return (
    <section id="booking" className="bg-blush py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="text-center lg:text-left">
            <TagPill icon="♡">Reserve Your Spot</TagPill>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-6 leading-tight">
              Claim Your Hour of Bliss
            </h2>
            <p className="text-muted mt-5 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Ready to bloom? Select your desired slot below for instant,
              stress-free reservation. No deposit required — bring your
              dream moodboard!
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/80">
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <Sparkles size={16} className="text-pink shrink-0" />
                Sanitized premium medical-grade equipment
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <Sparkles size={16} className="text-pink shrink-0" />
                Complimentary foot or hand massage
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 size={56} className="text-pink mx-auto" />
                <h3 className="font-serif text-2xl text-ink mt-4">
                  You're booked! ✨
                </h3>
                <p className="text-muted mt-2">
                  We've received your request and sent you a confirmation.
                  Check your inbox — see you soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-pink hover:text-pinkDeep text-sm font-medium underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif text-2xl text-ink">
                  Select Date &amp; Time
                </h3>

                {/* Date picker */}
                <div className="grid grid-cols-5 gap-2 mt-5">
                  {weekDays.map((day) => {
                    const disabled = isPast(day);
                    const active =
                      day.toDateString() === selectedDate.toDateString();
                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedDate(day)}
                        className={`rounded-xl py-3 text-center transition-all ${
                          active
                            ? 'bg-pink text-white shadow-md'
                            : disabled
                            ? 'bg-blushSoft text-muted/40 cursor-not-allowed'
                            : 'bg-blushSoft text-ink hover:bg-blush'
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider opacity-80">
                          {formatDayShort(day)}
                        </div>
                        <div className="text-base font-semibold mt-0.5">
                          {formatDayNumber(day)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted mt-6 mb-2 font-semibold">
                  Available Times
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((time) => {
                    const booked = isSlotBooked(selectedDate, time);
                    const active = selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={booked}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-full py-2 text-xs font-medium transition-all ${
                          booked
                            ? 'bg-blushSoft text-muted/40 cursor-not-allowed line-through'
                            : active
                            ? 'bg-pink text-white shadow-sm'
                            : 'bg-blushSoft text-ink hover:bg-blush'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                {/* Inputs */}
                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-blushSoft rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-pink/40"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-blushSoft rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-pink/40"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-blushSoft rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-pink/40"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  disabled={status === 'submitting' || !selectedTime}
                >
                  {status === 'submitting'
                    ? 'Booking...'
                    : 'Confirm Appointment'}
                </Button>

                {errorMsg && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-red-500">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}