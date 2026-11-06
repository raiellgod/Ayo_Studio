"use client";

import Image from "next/image";

type ProtectedArtworkImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  unoptimized?: boolean;
  imageClassName?: string;
};

export function ProtectedArtworkImage({
  src,
  alt,
  sizes,
  priority = false,
  unoptimized = false,
  imageClassName = "",
}: ProtectedArtworkImageProps) {
  return (
    <div
      className="absolute inset-0 select-none"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes}
        draggable={false}
        className={imageClassName}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -inset-[35%] flex rotate-[-28deg] flex-wrap content-center justify-center gap-x-14 gap-y-10 opacity-[0.50]">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className="whitespace-nowrap font-sans text-[10px] font-bold tracking-[0.22em] text-white uppercase sm:text-xs"
            >
              AYŌ STUDIO
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
