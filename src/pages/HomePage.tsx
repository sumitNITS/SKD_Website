import { Suspense, lazy, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const Hero = lazy(() => import('@/sections/Hero'));
const About = lazy(() => import('@/sections/About'));
const Experience = lazy(() => import('@/sections/Experience'));
const Skills = lazy(() => import('@/sections/Skills'));
const Interests = lazy(() => import('@/sections/Interests'));
const Certifications = lazy(() => import('@/sections/Certifications'));
const Contact = lazy(() => import('@/sections/Contact'));

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen antialiased overflow-x-hidden theme-transition"
      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      <ScrollProgress />
      <Navigation mode="home" />
      <Suspense fallback={<LoadingSkeleton />}>
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Interests />
          <Certifications />
          <Contact />
        </main>
        <Footer mode="home" />
      </Suspense>
    </div>
  );
};

export default HomePage;
