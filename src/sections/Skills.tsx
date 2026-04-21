import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Server, Container, GitBranch, Terminal, BarChart3, Shield, Code, Database, Settings, FileCode, Lock, Bell, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const accent = '#14b8a6';

  const skillCategories = [
    {
      name: 'Cloud & Infrastructure',
      icon: Cloud,
      skills: [
        { name: 'AWS', icon: Cloud },
        { name: 'Azure DevOps', icon: Server },
        { name: 'Docker', icon: Container },
        { name: 'Kubernetes', icon: Settings },
        { name: 'Helm Charts', icon: Settings },
        { name: 'On-Premise Infra', icon: Server },
      ],
    },
    {
      name: 'CI/CD & Automation',
      icon: GitBranch,
      skills: [
        { name: 'CI/CD', icon: GitBranch },
        { name: 'GitOps', icon: GitBranch },
        { name: 'ArgoCD', icon: GitBranch },
        { name: 'IAC', icon: Settings },
        { name: 'Terraform', icon: Settings },
        { name: 'Shell/Bash', icon: Terminal },
        { name: 'YAML', icon: FileCode },
        { name: 'Linux/Unix', icon: Terminal },
      ],
    },
    {
      name: 'Monitoring & Observability',
      icon: BarChart3,
      skills: [
        { name: 'Prometheus', icon: BarChart3 },
        { name: 'Grafana', icon: Monitor },
        { name: 'ScienceLogic', icon: Server },
        { name: 'Seq Logging', icon: Database },
        { name: 'Alerting', icon: Bell },
      ],
    },
    {
      name: 'Additional Skills',
      icon: Code,
      skills: [
        { name: 'DevSecOps', icon: Shield },
        { name: 'Python Scripting', icon: Code },
        { name: 'GIT', icon: GitBranch },
        { name: 'GitHub', icon: GitBranch },
        { name: 'Bitbucket', icon: GitBranch },
        { name: 'Cost Optimization', icon: Lock },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      triggers.push(ScrollTrigger.create({ trigger: headingRef.current, start: 'top 80%', once: true, onEnter: () => {
        if (headingRef.current) gsap.fromTo(headingRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: categoriesRef.current, start: 'top 70%', once: true, onEnter: () => {
        const cards = categoriesRef.current?.querySelectorAll('.category-card');
        if (cards?.length) gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'expo.out' });
      }}));
      triggers.push(ScrollTrigger.create({ trigger: categoriesRef.current, start: 'top 60%', once: true, onEnter: () => {
        const skills = categoriesRef.current?.querySelectorAll('.skill-item');
        if (skills?.length) gsap.fromTo(skills, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)' });
      }}));
      return () => triggers.forEach((st) => st.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>Skills</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Technologies I Work With</h2>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, cIndex) => (
            <div key={cIndex} className="category-card group rounded-xl p-6 md:p-8" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, #0d9488, ${accent})` }}>
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex} className="skill-item group/skill flex items-center gap-2 px-4 py-2 rounded-lg cursor-default transition-all duration-300 hover:border-[#14b8a6]/40" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
                    <skill.icon className="w-4 h-4 transition-colors duration-300 group-hover/skill:text-[#14b8a6]" style={{ color: 'var(--color-text-muted)' }} />
                    <span className="text-sm transition-colors duration-300 group-hover/skill:text-[var(--color-text-primary)]" style={{ color: 'var(--color-text-secondary)' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(20,184,166,0.04)' }} />
    </section>
  );
};

export default Skills;
