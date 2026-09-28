import { Heart } from 'lucide-react';

export default function GalleryCard({ item }) {
  const { title, price, trending, image, alt } = item;

  return (
    <div className="group">

      {/* Image wrapper with hover overlay */}
      <div className="relative rounded-2xl overflow-hidden aspect-square bg-blush">

        {/* Image */}
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* TRENDING badge */}
        {trending && (
          <span className="absolute top-3 left-3 z-20 bg-pink text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
            Trending Now
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <h4 className="font-serif text-white text-lg leading-tight">
            {title}
          </h4>
          <div className="flex items-center justify-between mt-3">
            <span className="text-white text-sm font-medium">₦{price}</span>
            <a
              href="#booking"
              className="bg-pink hover:bg-pinkDeep text-white text-xs font-medium px-4 py-2 rounded-full transition-colors"
            >
              Book Style
            </a>
          </div>
        </div>
      </div>

      {/* Info below image */}
      <div className="mt-4">
        <h3 className="font-serif text-lg text-ink leading-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-muted">Est. ₦{price}</span>
          <a
            href="#booking"
            className="inline-flex items-center gap-1 text-sm text-pink hover:text-pinkDeep transition-colors font-medium"
          >

            <Heart size={12} className="fill-current" />
          </a>
        </div>
      </div>

    </div>
  );
}