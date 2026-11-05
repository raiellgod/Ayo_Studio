export type Artwork = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;
  artistSlug: string;

  image: string;
  type: string;
  price: number | null;
  available: boolean;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

export async function getArtworks(
  artistId?: number,
): Promise<Artwork[]> {
  const url = new URL(`${API_URL}/artworks`);

  if (artistId) {
    url.searchParams.set(
      "artistId",
      artistId.toString(),
    );
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar as obras.",
    );
  }

  return response.json();
}

export async function getArtworkBySlug(
  slug: string,
): Promise<Artwork | null> {
  const response = await fetch(
    `${API_URL}/artworks/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar a obra.",
    );
  }

  return response.json();
}