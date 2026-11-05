export type ArtistService = "tattoo" | "art" | "voice";

export type Artist = {
  id: number;
  slug: string;
  name: string;
  role: string;
  services: ArtistService[];

  image?: string | null;
  fullImage?: string | null;
  profileImage?: string | null;

  specialties?: string | null;
  description?: string | null;

  isActive?: boolean;
};