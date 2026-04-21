import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="text-center max-w-lg">
        {/* 404 Graphic */}
        <div className="relative mb-8">
          <div className="text-9xl font-extrabold gradient-text opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-[var(--color-text-primary)]">
              404
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#2563eb]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={handleGoHome}
            className="gradient-bg text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
