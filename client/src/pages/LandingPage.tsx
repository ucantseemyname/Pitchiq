import { CursorGlow } from '../components/atoms/CursorGlow';
import { AnimatedBackground } from '../components/atoms/AnimatedBackground';
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { SocialProof } from '../components/organisms/SocialProof';
import { Features } from '../components/organisms/Features';
import { Results } from '../components/organisms/Results';
import { UseCases } from '../components/organisms/UseCases';
import { HowItWorks } from '../components/organisms/HowItWorks';
import { Comparison } from '../components/organisms/Comparison';
import { Pricing } from '../components/organisms/Pricing';
import { FAQ } from '../components/organisms/FAQ';
import { FinalCTA } from '../components/organisms/FinalCTA';
import { Footer } from '../components/organisms/Footer';

/** The marketing landing page, assembled from section organisms. */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-canvas dark:bg-dark-canvas">
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SocialProof />
        <Features />
        <Results />
        <UseCases />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
