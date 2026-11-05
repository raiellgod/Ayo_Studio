export type Flash = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;
  artistSlug: string;

  image: string;

  price: number;

  description: string;

  categories: string[];

  available: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

export async function getFlashes(
  artistId?: number,
): Promise<Flash[]> {
  const url = new URL(
    `${API_URL}/flashes`,
  );

  if (artistId) {
    url.searchParams.set(
      "artistId",
      String(artistId),
    );
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar os flashes.",
    );
  }

  return response.json();
}

export async function getFlashBySlug(
  slug: string,
): Promise<Flash | null> {
  const response = await fetch(
    `${API_URL}/flashes/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar o flash.",
    );
  }

  return response.json();
}