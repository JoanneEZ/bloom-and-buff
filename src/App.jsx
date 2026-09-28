import Navbar from './components/layout/Navbar';
import BookingCTA from './components/sections/BookingCTA';
import Gallery from './components/sections/Gallery';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}