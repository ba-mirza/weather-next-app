"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
  showLoadingIndicator?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  fallbackSrc,
  fallbackComponent,
  showLoadingIndicator = false,
  className = "",
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(showLoadingIndicator);
  const [error, setError] = useState(false);

  const defaultFallback =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle><line x1="16.5" y1="7.5" x2="16.5" y2="7.5"></line></svg>';

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (error && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  return (
    <div className="relative inline-block">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded">
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
        </div>
      )}
      <Image
        src={error ? fallbackSrc || defaultFallback : src}
        alt={alt}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
