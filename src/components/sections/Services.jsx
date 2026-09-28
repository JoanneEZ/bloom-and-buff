import { services } from '../../data/services';
import ServiceCard from '../ui/ServiceCard';
import TagPill from '../ui/TagPill';

export default function Services() {
  return (
    <section
      id="services"
      className="bg-blushSoft py-20 md:py-28 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <TagPill icon="✎">The Menu</TagPill>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-6">
            Indulge in Sweet Perfection
          </h2>
          <p className="text-muted mt-4 leading-relaxed">
            Every appointment includes custom cuticle prep, organic cuticle
            oil nourishment, and our signature relaxing massage during prep.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}