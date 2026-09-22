"use client";

import {
  useEffect,
  useState,
} from "react";

import type { Artwork } from "@/data/mockArtworks";

import { ArtworkEditorialGroup } from "./ArtworkEditorialGroup";

type ArtworkCarouselProps = {
  artworks: Artwork[];
};

function chunkArtworks(
  artworks: Artwork[],
  size: number,
) {
  const groups: Artwork[][] = [];

  for (
    let index = 0;
    index < artworks.length;
    index += size
  ) {
    groups.push(
      artworks.slice(
        index,
        index + size,
      ),
    );
  }

  return groups;
}

function shuffleArtworks(
  artworks: Artwork[],
) {
  const shuffled = [...artworks];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1),
    );

    [
      shuffled[i],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

export function ArtworkCarousel({
  artworks,
}: ArtworkCarouselProps) {
  const [currentGroup, setCurrentGroup] =
    useState(0);

  const [groups, setGroups] = useState<
    Artwork[][]
  >(() => chunkArtworks(artworks, 5));

  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        const shuffled =
          shuffleArtworks(artworks);

        setGroups(
          chunkArtworks(
            shuffled,
            5,
          ),
        );

        setCurrentGroup(0);
      }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [artworks]);

  function previousGroup() {
    setCurrentGroup((current) =>
      current === 0
        ? groups.length - 1
        : current - 1,
    );
  }

  function nextGroup() {
    setCurrentGroup((current) =>
      current ===
        groups.length - 1
        ? 0
        : current + 1,
    );
  }

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* SETAS */}

      {groups.length > 1 && (
        <div
          className="
            mb-5
            flex
            items-center
            justify-between
          "
        >
          <button
            type="button"
            onClick={previousGroup}
            aria-label="Ver obras anteriores"
            className="
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              font-sans
              text-lg
              text-white
              transition
              hover:bg-white/10
            "
          >
            &lt;
          </button>

          <button
            type="button"
            onClick={nextGroup}
            aria-label="Ver próximas obras"
            className="
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              font-sans
              text-lg
              text-white
              transition
              hover:bg-white/10
            "
          >
            &gt;
          </button>
        </div>
      )}

      {/* GRUPO EDITORIAL */}

      <div className="overflow-hidden">
        <ArtworkEditorialGroup
          artworks={
            groups[currentGroup]
          }
        />
      </div>
    </div>
  );
}