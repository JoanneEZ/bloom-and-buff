import Button from './Button';

export default function ServiceCard({ service }) {
  const { icon, name, desc, price, popular } = service;

  return (
    <div className="relative bg-white rounded-2xl p-6 border border-blush shadow-sm hover:shadow-md transition-shadow flex flex-col">

      {/* POPULAR badge */}
      {popular && (
        <span className="absolute top-4 right-4 bg-pink text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Popular
        </span>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-ink mb-2 leading-tight">
        {name}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed flex-grow">
        {desc}
      </p>

      {/* Footer: price + button */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-blush">
        <span className="text-sm text-ink">
          from <span className="font-semibold"> ₦{price}</span>
        </span>
        <Button href="#booking" size="sm">
          Book Now
        </Button>
      </div>
    </div>
  );
}