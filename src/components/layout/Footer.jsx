import { MapPin, Clock, Camera, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-plum text-cream/90 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">

        {/* ─── Row 1: 4 columns ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Column 1 — Brand */}
          <div>
            <h3 className="font-script text-3xl text-cream">
              Bloom &amp; Buff
            </h3>
            <p className="text-sm text-cream/70 mt-4 leading-relaxed max-w-xs">
               A small studio for acrylics, gel, and pedicures. Come as you are — leave with nails you love.
            </p>
          </div>

          {/* Column 2 — Address */}
            <div>
                <h4 className="font-serif text-lg text-cream mb-4">
                visit Us
                </h4>
                <p className="text-sm text-cream/70 leading-relaxed flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-pink" />
                <span>
                    Indepence Layout <br />
                    Nza street, Enugu, Nigeria
                </span>
                </p>
            </div>

          

          {/* Column 4 — Socials */}
          <div>
                <h4 className="font-serif text-lg text-cream mb-4">
                Below Friend
                </h4>
                <ul className="space-y-3 text-sm">
                    <li>
                        <span className="inline-flex items-center gap-2 text-cream/50 cursor-not-allowed">
                        <span className="text-base leading-none">📷</span>
                        @coming-soon
                        </span>
                    </li>
                    <li>
                        <span className="inline-flex items-center gap-2 text-cream/50 cursor-not-allowed">
                        <span className="text-base leading-none">🎵</span>
                        @coming-soon
                        </span>
                    </li>
                </ul>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="border-t border-cream/10 my-12" />

        {/* ─── Row 2: Hours + copyright ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-serif text-base text-cream mb-3 flex items-center gap-2">
              <Clock size={14} className="text-pink" />
              Hours of Magic
            </h4>
            <ul className="space-y-1.5 text-cream/70">
              <li>Mon – Fri · 9:00 AM – 2:00 PM</li>
              <li>Sat – Sun · Sat: 10:00 AM – 6:00 PM, Sun: closed</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-cream mb-3">
              Say Hello
            </h4>
            <p className="text-cream/70 leading-relaxed">
              Our Whatsapp<br />
              09019289066
            </p>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Bloom &amp; Buff. All rights reserved.</p>
          <p className="font-script text-base text-cream/70">
            Crafted with love &amp; a little glitter ✨
            <br />  Images used here are mostly not mine.
          </p>
        </div>
      </div>
    </footer>
  );
}