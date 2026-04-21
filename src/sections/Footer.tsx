import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const accent = '#14b8a6';

  return (
    <footer className="relative py-12" style={{ background: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              © {currentYear} Sumit Kumar Das. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <span>Built with</span>
            <Heart className="w-4 h-4" style={{ color: accent, fill: accent }} />
            <span>in Assam, India</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm transition-colors duration-300 hover:text-[#14b8a6]" style={{ color: 'var(--color-text-muted)' }}>About</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm transition-colors duration-300 hover:text-[#14b8a6]" style={{ color: 'var(--color-text-muted)' }}>Experience</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm transition-colors duration-300 hover:text-[#14b8a6]" style={{ color: 'var(--color-text-muted)' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
