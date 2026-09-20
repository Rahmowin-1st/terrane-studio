"use client";

import { useState } from "react";

type Props = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
};

export function ResilientImage({
  src,
  srcSet,
  sizes,
  alt,
  className = "",
  fallbackClassName = "",
  loading = "lazy",
  fetchPriority = "auto",
  width,
  height,
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={"resilient-image-shell relative h-full w-full overflow-hidden " + fallbackClassName} role={failed ? "img" : undefined} aria-label={failed ? alt : undefined}>
      <div className="resilient-image-fallback absolute inset-0" aria-hidden="true" />
      {!failed && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={className}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          width={width}
          height={height}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
