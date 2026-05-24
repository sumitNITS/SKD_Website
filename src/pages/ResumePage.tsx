import { Download, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/components/Analytics';
import { RESUME_ASSET_PATH, RESUME_FILE_NAME } from '@/lib/resume';

const resumeAssetPath = RESUME_ASSET_PATH;
const resumePreviewPath = `${resumeAssetPath}#toolbar=1&navpanes=0&view=FitH`;
const resumeDownloadName = RESUME_FILE_NAME;

const ResumePage = () => {
  const navigate = useNavigate();

  const handleBackToPortfolio = () => {
    trackEvent('click', 'navigation', 'back_to_portfolio_resume_page');
    navigate('/');
  };

  const handleDownload = () => {
    trackEvent('download', 'resume', resumeDownloadName);
  };

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      <ScrollProgress />
      <Navigation mode="resume" resumeHref={resumeAssetPath} />

      <main className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 75% 55% at 20% 10%, rgba(20,184,166,0.08) 0%, transparent 60%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: 'rgba(20, 184, 166, 0.1)',
                border: '1px solid rgba(20, 184, 166, 0.25)',
                color: 'var(--color-accent)',
              }}
            >
              <FileText className="h-4 w-4" />
              Resume Preview
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              Review my resume without leaving the portfolio.
            </h1>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Recruiters and hiring managers can preview the PDF inline, download a copy, or jump
              straight back to the main site to explore experience, skills, and projects.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="gradient-bg px-5 py-5 font-semibold text-white">
              <a href={resumeAssetPath} download={resumeDownloadName} onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>

            <Button
              variant="outline"
              onClick={handleBackToPortfolio}
              className="px-5 py-5 font-semibold"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </div>

          <div
            className="overflow-hidden rounded-[28px] shadow-2xl"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 30px 120px rgba(13, 148, 136, 0.12)',
            }}
          >
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div>
                <h2 className="text-lg font-semibold">Inline PDF Preview</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  If your browser blocks embedded PDFs, use the download button above.
                </p>
              </div>
              <a
                href={resumeAssetPath}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-accent)' }}
              >
                Open in new tab
              </a>
            </div>

            <div className="h-[65vh] min-h-[420px] bg-white sm:h-[70vh] sm:min-h-[640px]">
              <object
                data={resumePreviewPath}
                type="application/pdf"
                aria-label="Resume PDF preview"
                className="h-full w-full"
              >
                <div
                  className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                >
                  <p className="max-w-md text-base" style={{ color: 'var(--color-text-secondary)' }}>
                    Your browser could not render the inline PDF preview. You can still open or
                    download the resume below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild variant="outline">
                      <a href={resumeAssetPath} target="_blank" rel="noreferrer">
                        Open Resume
                      </a>
                    </Button>
                    <Button asChild className="gradient-bg text-white">
                      <a href={resumeAssetPath} download={resumeDownloadName} onClick={handleDownload}>
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </div>
              </object>
            </div>
          </div>
        </section>
      </main>

      <Footer mode="resume" resumeHref={resumeAssetPath} />
    </div>
  );
};

export default ResumePage;
