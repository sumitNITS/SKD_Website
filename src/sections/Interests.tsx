import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, GitBranch, Cpu, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Interests = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const accent = '#14b8a6';

  const interests = [
    {
      title: 'Cloud Native DevOps',
      description: 'Building and scaling cloud-native infrastructure with containerization, microservices, and modern orchestration platforms for resilient, scalable systems.',
      icon: Cloud,
      color: 'from-[#0d9488] to-[#14b8a6]',
    },
    {
      title: 'GitOps Workflows',
      description: 'Implementing GitOps practices to streamline deployment workflows, improve collaboration, and achieve reliable, auditable infrastructure management.',
      icon: GitBranch,
      color: 'from-[#14b8a6] to-[#2dd4bf]',
    },
    {
      title: 'AI-Driven Workflows',
      description: 'Exploring how AI and automation can enhance DevOps pipelines, from intelligent monitoring to predictive scaling and automated incident response.',
      icon: Cpu,
      color: 'from-[#0d9488] to-[#5eead4]',
    },
    {
      title: 'Platform Engineering',
      description: 'Designing internal developer platforms that boost productivity, standardize processes, and empower teams to ship faster with self-service capabilities.',
      icon: Layers,
      color: 'from-[#14b8a6] to-[#34d399]',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      triggers.push(ScrollTrigger.create({ trigger: headingRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (headingRef.current) gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: cardsRef.current, start: 'top 70%', once: true, onEnter: () => {
        const cards = cardsRef.current?.querySelectorAll('.interest-card');
        if (cards?.length) gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out' });
      }}));
      return () => triggers.forEach((st) => st.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="interests" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>Interests</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Technological Interests</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Areas I am passionate about and continuously exploring to stay at the forefront of modern infrastructure practices.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <div key={index} className="interest-card group relative rounded-xl p-6 md:p-8" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <interest.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{interest.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{interest.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />
    </section>
  );
};

export default Interests;
