import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services',         href: '#services' },
  { label: 'Nail Art Gallery', href: '#gallery' },
  { label: 'Reviews',          href: '#reviews' },
  { label: 'Contact',          href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-blush'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        <a
            href="#"
            className="flex items-center gap-2 font-script text-2xl sm:text-3xl md:text-4xl text-plum hover:text-pink transition-colors whitespace-nowrap leading-none"
            >
            <span>Bloom &amp; Buff</span>
            <img
                src="public/images/polish.png.png"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
            />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink/80 hover:text-pink transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#booking"
          className="hidden md:inline-flex items-center bg-pink hover:bg-pinkDeep text-white text-sm font-medium px-6 py-3 rounded-full transition-colors shadow-sm"
        >
          Book Appointment
        </a>

        {/* Mobile: Book pill + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#booking"
            className="bg-pink hover:bg-pinkDeep text-white text-xs font-medium px-4 py-2 rounded-full transition-colors"
          >
            Book
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-plum p-1"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blush">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-medium text-ink/80 hover:text-pink transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}