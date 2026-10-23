import type { Artwork } from "@/data/mockArtworks";

import { ArtworkCard } from "./ArtworkCard";

type ArtworkEditorialGroupProps = {
  artworks: Artwork[];
};

export function ArtworkEditorialGroup({
  artworks,
}: ArtworkEditorialGroupProps) {
  const [
    featured,
    second,
    third,
    fourth,
    fifth,
  ] = artworks;

  return (
    <div
      className="
        grid
        min-w-full
        grid-cols-1
        gap-4
        sm:grid-cols-2
        sm:gap-5
        lg:grid-cols-[1.25fr_0.85fr_0.85fr]
        lg:grid-rows-2
      "
    >
      {/* DESTAQUE */}

      {featured && (
        <div
          className="
            sm:col-span-2
            lg:col-span-1
            lg:row-span-2
          "
        >
          <ArtworkCard
            artwork={featured}
            featured
          />
        </div>
      )}

      {/* COLUNA 2 */}

      {second && (
        <ArtworkCard artwork={second} />
      )}

      {third && (
        <ArtworkCard artwork={third} />
      )}

      {/* COLUNA 3 */}

      {fourth && (
        <ArtworkCard artwork={fourth} />
      )}

      {fifth && (
        <ArtworkCard artwork={fifth} />
      )}
    </div>
  );
}