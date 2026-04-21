const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative mb-6">
          <div className="text-4xl font-bold gradient-text animate-pulse">
            SKD.
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent animate-pulse" />
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
