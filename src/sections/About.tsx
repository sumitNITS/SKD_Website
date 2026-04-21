import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '99.9%', label: 'Uptime Maintained' },
    { value: '80%', label: 'Deployment Time Reduced' },
    { value: '25%', label: 'Cost Savings Achieved' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (labelRef.current) {
              gsap.fromTo(labelRef.current, { width: 0, opacity: 0 }, { width: 'auto', opacity: 1, duration: 0.6, ease: 'none' });
            }
          },
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const words = headingRef.current?.querySelectorAll('.word');
            if (words && words.length > 0) {
              gsap.fromTo(words, { y: 50, opacity: 0, rotateX: 45 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' });
            }
          },
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: paragraphsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const paras = paragraphsRef.current?.querySelectorAll('p');
            if (paras && paras.length > 0) {
              gsap.fromTo(paras, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'expo.out' });
            }
          },
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const cards = statsRef.current?.querySelectorAll('.stat-card');
            if (cards && cards.length > 0) {
              gsap.fromTo(cards, { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' });
            }
          },
        })
      );

      return () => { scrollTriggers.forEach((st) => st.kill()); };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
    ));
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <span ref={labelRef} className="inline-block text-sm font-medium tracking-widest uppercase mb-6 overflow-hidden whitespace-nowrap" style={{ color: '#14b8a6' }}>
              About Me
            </span>

            <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 perspective-1000" style={{ color: 'var(--color-text-primary)' }}>
              {splitWords('DevOps Engineer with 5+ years of experience')}
            </h2>

            <div ref={paragraphsRef} className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Results-driven DevOps Engineer specializing in cloud infrastructure automation,
                Kubernetes orchestration, and CI/CD pipeline optimization. I design resilient
                systems that maintain 99.9% uptime while significantly reducing operational costs.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                My expertise spans Infrastructure as Code (Terraform, Helm), containerization
                (Docker, Kubernetes), and comprehensive monitoring solutions (Prometheus, Grafana).
                I excel at streamlining deployment workflows and implementing DevSecOps best practices
                across enterprise environments.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Beyond technical execution, I'm committed to knowledge sharing and team enablement.
                I actively mentor junior engineers and contribute to building a culture of continuous
                improvement and operational excellence.
              </p>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group relative rounded-xl p-6 md:p-8 perspective-1000"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: '#14b8a6' }}>{stat.value}</div>
                <div className="text-sm transition-colors duration-300" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'rgba(20,184,166,0.05)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default About;
