import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Github, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const accent = '#14b8a6';

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'krsumit449@gmail.com', href: 'mailto:krsumit449@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Assam, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sumit-kumar-das-87a599158' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/sumitNITS' },
    { icon: BookOpen, label: 'Hashnode', href: 'https://sumitnits.hashnode.dev/' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      triggers.push(ScrollTrigger.create({ trigger: headingRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (headingRef.current) gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: contentRef.current, start: 'top 70%', once: true, onEnter: () => {
        const items = contentRef.current?.querySelectorAll('.contact-item');
        if (items?.length) gsap.fromTo(items, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: contentRef.current, start: 'top 60%', once: true, onEnter: () => {
        const icons = contentRef.current?.querySelectorAll('.social-icon');
        if (icons?.length) gsap.fromTo(icons, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' });
      }}));
      return () => triggers.forEach((st) => st.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'linear-gradient(to bottom, var(--color-bg-primary), var(--color-bg-secondary))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div ref={headingRef}>
              <span className="inline-block text-sm font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Let's Work Together</h2>
              <p className="text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>
                Interested in collaborating or have a project in mind? I'd be happy to discuss
                how my expertise in cloud infrastructure and DevOps can help your organization
                achieve its goals.
              </p>
            </div>

            <div ref={contentRef}>
              <div className="space-y-4 mb-10">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="contact-item group flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(20,184,166,0.1)]" style={{ background: 'var(--color-bg-primary)' }}>
                      <item.icon className="w-5 h-5 transition-colors duration-300" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                      <p className="transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>Connect With Me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 rounded-xl flex items-center justify-center group hover:border-[#14b8a6]/40" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }} aria-label={social.label}>
                      <social.icon className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:text-[#14b8a6]" style={{ color: 'var(--color-text-muted)' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-2xl blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)' }} />
            <div className="relative rounded-2xl p-8 md:p-12" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow" style={{ background: `linear-gradient(135deg, #0d9488, ${accent})` }}>
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Schedule a Call</h3>
                <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                  Book a 30-minute consultation to discuss your infrastructure needs,
                  DevOps challenges, or potential collaboration opportunities.
                </p>
                <Button onClick={() => setIsCalendlyOpen(true)} className="w-full font-semibold px-8 py-6 rounded-xl hover:scale-[1.02] transition-all duration-300 animate-pulse-glow group text-lg text-white" style={{ background: `linear-gradient(135deg, #0d9488, ${accent}, #2dd4bf)` }}>
                  Book Your Slot
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>Powered by Calendly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
          <DialogHeader className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <DialogTitle className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Schedule a Call with Sumit</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(80vh-80px)]">
            <iframe src="https://calendly.com/krsumit449" width="100%" height="100%" frameBorder="0" title="Schedule a call" className="rounded-b-lg" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
