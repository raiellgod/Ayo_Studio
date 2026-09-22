export type SelectableFlash = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;

  image: string;

  price: number;
  description: string;
  categories: string[];

  available: boolean;
};

export function selectFeaturedFlashes(
  flashes: SelectableFlash[],
  limit = 10,
) {
  const availableFlashes = flashes.filter(
    (flash) => flash.available,
  );

  const flashesByArtist = new Map<
    number,
    SelectableFlash[]
  >();

  for (const flash of availableFlashes) {
    const artistFlashes =
      flashesByArtist.get(flash.artistId) ?? [];

    artistFlashes.push(flash);

    flashesByArtist.set(
      flash.artistId,
      artistFlashes,
    );
  }

  for (const artistFlashes of flashesByArtist.values()) {
    shuffle(artistFlashes);
  }

  const artistIds = Array.from(
    flashesByArtist.keys(),
  );

  shuffle(artistIds);

  const selected: SelectableFlash[] = [];

  while (
    selected.length < limit &&
    artistIds.length > 0
  ) {
    for (let i = artistIds.length - 1; i >= 0; i--) {
      const artistId = artistIds[i];

      const artistFlashes =
        flashesByArtist.get(artistId);

      const flash = artistFlashes?.pop();

      if (flash) {
        selected.push(flash);
      }

      if (
        !artistFlashes ||
        artistFlashes.length === 0
      ) {
        artistIds.splice(i, 1);
      }

      if (selected.length === limit) {
        break;
      }
    }

    shuffle(artistIds);
  }

  return selected;
}

function shuffle<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1),
    );

    [items[i], items[randomIndex]] = [
      items[randomIndex],
      items[i],
    ];
  }

  return items;
}