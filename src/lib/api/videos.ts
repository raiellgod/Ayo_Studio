export type Video = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;
  artistSlug: string;

  video: string;
  thumbnail: string | null;
  description: string | null;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export async function getVideos(
  artistId?: number,
): Promise<Video[]> {
  const url = new URL(`${API_URL}/videos`);

  if (artistId) {
    url.searchParams.set("artistId", String(artistId));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Não foi possível carregar os vídeos.");
  }

  return response.json();
}

export async function getVideoBySlug(
  slug: string,
): Promise<Video | null> {
  const response = await fetch(
    `${API_URL}/videos/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Não foi possível carregar o vídeo.");
  }

  return response.json();
}