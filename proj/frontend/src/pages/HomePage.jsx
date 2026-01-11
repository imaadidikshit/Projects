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
      <script src="https://trustflow-nu.vercel.app/embed.js" data-space-id="2e689c9c-1430-4404-8240-7649f5a77920"></script>
    </main>
  );
}
