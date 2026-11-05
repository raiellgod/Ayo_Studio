import type { Artist } from "@/types/artist";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

export async function getProfessionals(): Promise<Artist[]> {
  const response = await fetch(
    `${API_URL}/professionals`,
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar os profissionais.",
    );
  }

  return response.json();
}

export async function getProfessionalBySlug(
  slug: string,
): Promise<Artist | null> {
  const response = await fetch(
    `${API_URL}/professionals/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar o profissional.",
    );
  }

  return response.json();
}