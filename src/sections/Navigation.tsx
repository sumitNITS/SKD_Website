import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, Calendar, Sun, Moon, ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTheme } from '@/hooks/use-theme';
import { trackEvent } from '@/components/Analytics';
import { RESUME_ASSET_PATH, RESUME_FILE_NAME } from '@/lib/resume';

type NavigationMode = 'home' | 'resume';

interface NavigationProps {
  mode?: NavigationMode;
  resumeHref?: string;
}

const Navigation = ({ mode = 'home', resumeHref = RESUME_ASSET_PATH }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isResumePage = mode === 'resume';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Interests', href: '#interests' },
    { name: 'Certs', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isResumePage) {
      navigate('/');
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    trackEvent('click', 'navigation', 'resume_nav_back_to_portfolio');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleResumeDownload = () => {
    trackEvent('download', 'resume', 'resume_nav_download');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={
          isScrolled
            ? {
                background:
                  theme === 'dark'
                    ? 'rgba(9,9,11,0.85)'
                    : 'rgba(255,255,255,0.85)',
                borderBottom: '1px solid var(--color-border)',
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-bold tracking-tight transition-colors duration-300 whitespace-nowrap"
              style={{ color: 'var(--color-text-primary)' }}
              onClick={handleLogoClick}
            >
              SKD<span style={{ color: 'var(--color-accent)' }}>.</span>
            </a>

            {/* Desktop Navigation */}
            {!isResumePage && (
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-sm font-medium transition-colors duration-300 group"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <span className="group-hover:text-[var(--color-text-primary)] transition-colors">
                      {link.name}
                    </span>
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                      style={{ background: 'var(--color-accent)' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                )}
              </button>

              {isResumePage ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="font-semibold px-5 py-2 rounded-lg"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <a href={resumeHref} download={RESUME_FILE_NAME} onClick={handleResumeDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                  <Button
                    onClick={handleBackToPortfolio}
                    className="font-semibold px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-300 text-white border-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent), var(--color-accent-light))',
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Portfolio
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsCalendlyOpen(true)}
                  className="font-semibold px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-300 animate-pulse-glow text-white border-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent), var(--color-accent-light))',
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                )}
              </button>

              <button
                className="p-2"
                style={{ color: 'var(--color-text-primary)' }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            background:
              theme === 'dark'
                ? 'rgba(9,9,11,0.95)'
                : 'rgba(255,255,255,0.95)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="px-4 py-6 space-y-4">
            {isResumePage ? (
              <>
                <Button
                  onClick={handleBackToPortfolio}
                  className="w-full font-semibold px-6 py-3 rounded-lg text-white border-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Portfolio
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-semibold px-6 py-3 rounded-lg"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <a href={resumeHref} download={RESUME_FILE_NAME} onClick={handleResumeDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left text-lg font-medium py-2 transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.name}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCalendlyOpen(true);
                  }}
                  className="w-full font-semibold px-6 py-3 rounded-lg mt-2 text-white border-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Calendly Dialog */}
      <Dialog open={!isResumePage && isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent
          className="max-w-4xl h-[80vh] p-0"
          style={{
            background: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <DialogHeader
            className="p-6 border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <DialogTitle
              className="text-xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Schedule a Call with Sumit
            </DialogTitle>
          </DialogHeader>
          <div className="h-[calc(80vh-80px)]">
            <iframe
              src="https://calendly.com/krsumit449"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call"
              className="rounded-b-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
