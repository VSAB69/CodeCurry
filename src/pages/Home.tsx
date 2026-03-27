import { HeroSection } from '../components/HeroSection';
import { LegacySection } from '../components/LegacySection';
import { PlacementsSection } from '../components/PlacementsSection';
import { CampusLifeSection } from '../components/CampusLifeSection';
import { WhyBMSCESection } from '../components/WhyBMSCESection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PageTransition } from '../components/PageTransition';

export function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <LegacySection />
      <PlacementsSection />
      <WhyBMSCESection />
      <TestimonialsSection />
    </PageTransition>
  );
}
