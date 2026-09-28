import { gallery } from '../../data/gallery';
import GalleryCard from '../ui/GalleryCard';
import TagPill from '../ui/TagPill';

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-cream py-20 md:py-28 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <TagPill icon="♡">Pinterest Worthy</TagPill>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-6">
            Our Nail Art Masterpieces
          </h2>
          <p className="text-muted mt-4 leading-relaxed">
           A few of our favorite sets. Tap any style to see pricing and book a time that works for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}