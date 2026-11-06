export type StudioRequestType =
  | "FLASH_RESERVATION"
  | "ARTWORK_RESERVATION"
  | "PRODUCT_INTEREST"
  | "TATTOO_CUSTOM"
  | "ART_CUSTOM"
  | "VOICE_CUSTOM";

export type StudioRequestStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED";

export type CreateStudioRequestInput = {
  type: StudioRequestType;

  name: string;
  whatsapp: string;
  email: string;

  instagram?: string | null;
  message?: string | null;

  details?: Record<string, unknown>;

  professionalId?: number | null;
  flashId?: number | null;
  artworkId?: number | null;
  productId?: number | null;
};

export type StudioRequest = {
  id: number;

  type: StudioRequestType;
  status: StudioRequestStatus;

  name: string;
  whatsapp: string;
  email: string;

  instagram: string | null;
  message: string | null;

  details: Record<string, unknown> | null;

  professionalId: number | null;
  flashId: number | null;
  artworkId: number | null;
  productId: number | null;

  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export async function createStudioRequest(
  data: CreateStudioRequestInput,
): Promise<StudioRequest> {
  const response = await fetch(`${API_URL}/requests`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "Não foi possível enviar a solicitação.";

    try {
      const body = (await response.json()) as {
        message?: string;
      };

      if (body.message) {
        message = body.message;
      }
    } catch {
      // Mantém mensagem padrão.
    }

    throw new Error(message);
  }

  return response.json();
}