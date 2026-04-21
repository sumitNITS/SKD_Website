import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameSumitRef = useRef<HTMLDivElement>(null);
  const nameKumarRef = useRef<HTMLDivElement>(null);
  const nameDasRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (introRef.current) {
        const chars = introRef.current.querySelectorAll('.char');
        if (chars.length > 0) {
          tl.fromTo(chars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.02 }, 0);
        }
      }

      if (nameSumitRef.current) {
        const chars = nameSumitRef.current.querySelectorAll('.char');
        if (chars.length > 0) {
          tl.fromTo(chars, { y: 120, opacity: 0, rotateX: 90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 }, 0.3);
        }
      }

      if (nameKumarRef.current) {
        const chars = nameKumarRef.current.querySelectorAll('.char');
        if (chars.length > 0) {
          tl.fromTo(chars, { y: 120, opacity: 0, rotateX: 90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 }, 0.6);
        }
      }

      if (nameDasRef.current) {
        const chars = nameDasRef.current.querySelectorAll('.char');
        if (chars.length > 0) {
          tl.fromTo(chars, { y: 120, opacity: 0, rotateX: 90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 }, 0.9);
        }
      }

      if (subheadlineRef.current) {
        tl.fromTo(subheadlineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.3);
      }

      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.5);
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, 1.7);
      }

      if (imageRef.current) {
        tl.fromTo(imageRef.current, { rotateY: -30, x: 100, opacity: 0 }, { rotateY: 0, x: 0, opacity: 1, duration: 1.2 }, 0.8);
      }

      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'bounce.out' }, 2);
      }

      const scrollTriggers: ScrollTrigger[] = [];
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const namesContainer = sectionRef.current?.querySelector('.names-container');
            if (namesContainer) gsap.set(namesContainer, { y: -80 * progress });
            if (subheadlineRef.current) gsap.set(subheadlineRef.current, { y: -40 * progress });
            if (imageRef.current) gsap.set(imageRef.current, { y: -60 * progress, scale: 1 - 0.05 * progress });
          },
        })
      );

      return () => { scrollTriggers.forEach((st) => st.kill()); };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={`${char}-${i}`} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative flex flex-col justify-center overflow-hidden" style={{ background: 'var(--color-bg-primary)', minHeight: '100dvh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(20,184,166,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#14b8a6]/6 blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-56 h-56 rounded-full bg-[#14b8a6]/4 blur-[80px] animate-float animation-delay-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center w-full">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="names-container perspective-1000">
              {/* Intro */}
              <div ref={introRef} className="text-base sm:text-lg md:text-2xl font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {splitText('Hi, my name is')}
              </div>

              {/* Sumit - teal accent */}
              <div ref={nameSumitRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85]" style={{ color: 'var(--color-accent)' }}>
                {splitText('Sumit')}
              </div>

              {/* Kumar */}
              <div ref={nameKumarRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.85]" style={{ color: 'var(--color-text-primary)' }}>
                {splitText('Kumar')}
              </div>

              {/* Das. */}
              <div ref={nameDasRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.85]" style={{ color: 'var(--color-text-primary)' }}>
                {splitText('Das.')}
              </div>
            </div>

            <p ref={subheadlineRef} className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              I'm a <span style={{ color: 'var(--color-accent)' }}>DevOps Engineer</span> from Assam, India.
            </p>

            <p ref={descriptionRef} className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              I architect and operate scalable cloud-native infrastructure, specializing in
              Kubernetes orchestration, CI/CD automation, and Infrastructure as Code.
            </p>

            <div ref={ctaRef} className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button onClick={scrollToAbout} className="gradient-bg text-white font-semibold px-5 sm:px-8 py-4 sm:py-6 rounded-lg hover:scale-105 transition-all duration-300 animate-pulse-glow group text-sm sm:text-base">
                Let's Connect
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 sm:px-8 py-4 sm:py-6 rounded-lg transition-all duration-300 text-sm sm:text-base" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                View Experience
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative perspective-1000">
              <div className="absolute inset-0 rounded-3xl blur-[60px] scale-110" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)' }} />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-3xl overflow-hidden shadow-2xl animate-float" style={{ border: '1px solid var(--color-border)' }}>
                <img src="/images/hero-profile.png" alt="Sumit Kumar Das" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
              </div>
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full" style={{ border: '1px solid rgba(20,184,166,0.2)' }} />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-4 sm:-right-4 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>5+</div>
                <div className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - positioned at bottom with safe spacing */}
      <div ref={scrollIndicatorRef} className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 cursor-pointer z-20" onClick={scrollToAbout}>
        <span className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>Scroll</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-subtle" style={{ color: 'var(--color-accent)' }} />
      </div>
    </section>
  );
};

export default Hero;
