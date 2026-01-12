import HeroSection from '@/components/home/HeroSection';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import Marquee from '@/components/home/Marquee';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import TrendingSection from '@/components/home/TrendingSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedGrid />
      <Marquee />
      <TrendingSection />
      <CategoryShowcase />
      <div id="trustflow-widget"></div>
    </main>
  );
}
