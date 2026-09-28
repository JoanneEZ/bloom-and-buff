import Button from '../ui/Button';
import TagPill from '../ui/TagPill';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

          {/* ─── LEFT: Text ─── */}
          <div className="text-center md:text-left">
            <TagPill>Boutique Nail Studio</TagPill>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ink mt-6">
              Bloom into your ultimate{' '}
              <em className="italic">hand-crafted</em> shine
            </h1>

            <p className="text-muted text-base md:text-lg mt-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Bloom & Buff is your go‑to spot for acrylics, gels, and pedicures. We focus on clean, careful work so you walk out with nails you’ll be happy to show off.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
              <Button href="#booking" size="lg">Book Now</Button>
              <Button href="#gallery" variant="outline" size="lg">View Designs</Button>
            </div>
          </div>

          {/* ─── RIGHT: Polaroids ─── */}
          <div className="relative h-[420px] md:h-[520px] flex items-center justify-center">

            {/* Soft pink blob behind the photos */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-blush rounded-full blur-2xl opacity-70" />
            </div>

            {/* Polaroid 1 — The Chrome Set */}
            <div className="absolute top-6 left-4 md:left-0 w-44 md:w-52 bg-white rounded-lg shadow-xl p-3 rotate-[-8deg] hover:rotate-[-5deg] transition-transform duration-500">
              <img
                src="public/images/Nail-1.png"
                alt="The Chrome Set — glossy chrome nail art on dark skin"
                className="w-full aspect-square object-cover rounded-md"
              />
              <p className="font-script text-center text-plum text-lg mt-2 leading-tight">
                The Chrome Set
              </p>
              <p className="text-center text-[10px] text-muted uppercase tracking-wider">
                Signature
              </p>
            </div>

            {/* Polaroid 2 — Cheetah Girls */}
            <div className="absolute bottom-6 right-4 md:right-0 w-44 md:w-52 bg-white rounded-lg shadow-xl p-3 rotate-[6deg] hover:rotate-[3deg] transition-transform duration-500">
              <img
                src="public/images/Nail-2.png"
                alt="Cheetah Girls — bold animal print nail art on dark skin"
                className="w-full aspect-square object-cover rounded-md"
              />
              <p className="font-script text-center text-plum text-lg mt-2 leading-tight">
                Cheetah Girls
              </p>
              <p className="text-center text-[10px] text-muted uppercase tracking-wider">
                Statement
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}