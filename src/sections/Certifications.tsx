import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Shield, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const accent = '#14b8a6';

  const certifications = [
    {
      name: 'Certified Kubernetes Application Developer',
      abbr: 'CKAD',
      issuer: 'Cloud Native Computing Foundation',
      year: '2024',
      link: 'https://www.credly.com/badges/88da2752-0192-42a2-8197-3504a18853d7/public_url',
      verifyOn: 'Credly',
    },
    {
      name: 'Kubernetes for Developers',
      abbr: 'LFD259',
      issuer: 'The Linux Foundation',
      year: '2024',
      link: 'https://www.credly.com/badges/93f77ef4-a089-409f-b2c4-dd6dc645ee1d/public_url',
      verifyOn: 'Credly',
    },
    {
      name: 'Microsoft Certified DevOps Engineer',
      abbr: 'AZ-400',
      issuer: 'Microsoft',
      year: '2023',
      link: 'https://www.credly.com/badges/3af094be-923f-4bad-b265-7d1a0aa5e8e1/public_url',
      verifyOn: 'Credly',
    },
    {
      name: 'AWS Solutions Architect Associate',
      abbr: 'SAA',
      issuer: 'Amazon Web Services',
      year: '2020',
      link: 'https://www.credly.com/badges/39e0d1ee-c410-4188-933a-c79c2db56db7/public_url',
      verifyOn: 'Credly',
    },
    {
      name: 'ScienceLogic SL1 Professional',
      abbr: 'SL1',
      issuer: 'ScienceLogic',
      year: '2022',
      link: 'https://www.virtualbadge.io/certificate-validator?credential=cer-0e760364-cb16-48f6-b0db-dc1f3a7a',
      verifyOn: 'VirtualBadge',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      triggers.push(ScrollTrigger.create({ trigger: headingRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (headingRef.current) gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: certsRef.current, start: 'top 70%', once: true, onEnter: () => {
        const cards = certsRef.current?.querySelectorAll('.cert-card');
        if (cards?.length) gsap.fromTo(cards, { y: 60, opacity: 0, rotateX: 15 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'expo.out' });
      }}));
      return () => triggers.forEach((st) => st.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>Certifications</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Verified Credentials</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Industry-recognized certifications with verifiable digital credentials. Click any certificate to verify its authenticity.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
            <Shield className="w-4 h-4" style={{ color: accent }} />
            <span className="text-sm font-medium" style={{ color: accent }}>All credentials are publicly verifiable</span>
          </div>
        </div>

        <div ref={certsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {certifications.map((cert, index) => (
            <a key={index} href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card group relative rounded-2xl block transition-all duration-300 hover:-translate-y-2" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', transformStyle: 'preserve-3d' }}>
              <div className="h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, #0d9488, ${accent})` }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, #0d9488, ${accent})` }}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="text-xs font-medium" style={{ color: accent }}>Verified</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md mb-2" style={{ background: 'rgba(20,184,166,0.1)', color: accent }}>{cert.abbr}</span>
                  <h3 className="text-lg font-bold transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{cert.name}</h3>
                </div>

                <div className="space-y-1">
                  <p style={{ color: 'var(--color-text-muted)' }}>{cert.issuer}</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Issued {cert.year}</p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <ExternalLink className="w-4 h-4" style={{ color: accent }} />
                  <span className="text-sm font-medium" style={{ color: accent }}>Verify on {cert.verifyOn}</span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(20,184,166,0.06), transparent)' }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" style={{ border: '2px solid rgba(20,184,166,0.25)' }} />
            </a>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />
    </section>
  );
};

export default Certifications;
