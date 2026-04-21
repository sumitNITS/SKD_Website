import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const accent = '#14b8a6';

  const experiences = [
    {
      title: 'Site Reliability Engineer II',
      company: 'Better World Technology Pvt. Ltd. (Zeta)',
      companyUrl: 'https://www.zeta.tech/us/',
      period: 'July 2025 – Nov 2025',
      location: 'Hyderabad, India',
      highlights: [
        'Managed high-throughput AWS MSK (Kafka) clusters and multi-environment SaaS deployments',
        'Provided L2/L3 on-call support, conducting Root Cause Analysis (RCA) and writing postmortems',
        'Collaborated with engineering teams to maintain resilient and compliant cloud operations',
      ],
    },
    {
      title: 'DevOps Engineer',
      company: 'Qapita Fintech Pte. Ltd. (Qapita)',
      companyUrl: 'https://www.qapita.com/',
      period: 'April 2024 – July 2025',
      location: 'Hyderabad, India',
      highlights: [
        'Achieved 80% reduction in deployment timelines with Terraform and Helm Charts for EKS',
        'Built CI/CD pipelines with Azure DevOps and AWS CI/CD, streamlining releases',
        'Automated API/UI testing with AWS CodeBuild, cutting QA time by 90% (4 hours to 30 minutes)',
        'Reduced AWS billing by 25% through optimized service management',
      ],
    },
    {
      title: 'DevOps Engineer',
      company: 'Sify Technologies Limited (Sify)',
      companyUrl: 'https://www.sifytechnologies.com/',
      period: 'Sept 2020 – Feb 2024',
      location: 'Chennai, India',
      highlights: [
        'Spearheaded migration of monolithic applications to Dockerized microservices on AWS EKS',
        'Accelerated release cycles by 80% through automated CI/CD pipelines and Shell/Bash scripting',
        'Deployed ScienceLogic and Zabbix for infrastructure observability with custom dashboards',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (labelRef.current) gsap.fromTo(labelRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
      }}));

      scrollTriggers.push(ScrollTrigger.create({ trigger: headingRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (headingRef.current) gsap.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' });
      }}));

      scrollTriggers.push(ScrollTrigger.create({ trigger: timelineRef.current, start: 'top 80%', once: true, onEnter: () => {
        const line = timelineRef.current?.querySelector('.timeline-line');
        if (line) gsap.fromTo(line, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 1.5, ease: 'expo.out' });
      }}));

      scrollTriggers.push(ScrollTrigger.create({ trigger: timelineRef.current, start: 'top 70%', once: true, onEnter: () => {
        const cards = timelineRef.current?.querySelectorAll('.job-card');
        if (cards && cards.length > 0) gsap.fromTo(cards, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'expo.out' });
      }}));

      return () => { scrollTriggers.forEach((st) => st.kill()); };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span ref={labelRef} className="inline-block text-sm font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>Experience</span>
          <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Where I've Worked</h2>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-0 md:left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(to bottom, ${accent}, rgba(20,184,166,0.4), transparent)` }} />

          <div className="space-y-12">
            {experiences.map((job, index) => (
              <div key={index} className="job-card relative pl-0 md:pl-20">
                <div className="absolute left-0 md:left-8 top-0 -translate-x-1/2 w-4 h-4 rounded-full hidden md:block" style={{ background: accent, border: '4px solid var(--color-bg-secondary)' }} />

                <div className="group relative rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{job.title}</h3>
                        <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:underline group/company" style={{ color: accent }} onClick={(e) => e.stopPropagation()}>
                          <Briefcase className="w-4 h-4" />
                          <span>{job.company}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover/company:opacity-100 transition-opacity" />
                        </a>
                      </div>
                      <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{job.period}</span></div>
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{job.location}</span></div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {job.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-3 transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />
    </section>
  );
};

export default Experience;
