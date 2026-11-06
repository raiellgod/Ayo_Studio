"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  RequestStatusSelect,
  type StudioRequestStatus,
} from "@/components/admin/RequestStatusSelect";

type StudioRequestType =
  | "FLASH_RESERVATION"
  | "ARTWORK_RESERVATION"
  | "PRODUCT_INTEREST"
  | "TATTOO_CUSTOM"
  | "ART_CUSTOM"
  | "VOICE_CUSTOM";

type RelatedItem = {
  id: number;
  slug: string;
  name: string;
} | null;

type Professional = {
  id: number;
  slug: string;
  name: string;
} | null;

type StudioRequest = {
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

  professional: Professional;
  flash: RelatedItem;
  artwork: RelatedItem;
  product: RelatedItem;
};

function getTypeLabel(type: StudioRequestType) {
  const labels: Record<StudioRequestType, string> = {
    FLASH_RESERVATION: "Reserva de flash",
    ARTWORK_RESERVATION: "Reserva de obra",
    PRODUCT_INTEREST: "Interesse em produto",
    TATTOO_CUSTOM: "Tatuagem personalizada",
    ART_CUSTOM: "Arte personalizada",
    VOICE_CUSTOM: "Dublagem personalizada",
  };

  return labels[type];
}

function getRelatedItem(request: StudioRequest) {
  if (request.flash) {
    return request.flash.name;
  }

  if (request.artwork) {
    return request.artwork.name;
  }

  if (request.product) {
    return request.product.name;
  }

  return null;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminSolicitacoesPage() {
  const [requests, setRequests] = useState<
    StudioRequest[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );
  const [updatingId, setUpdatingId] = useState<
    number | null
  >(null);

  const loadRequests = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(
        "/api/admin/requests",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar as solicitações.",
        );
      }

      const data =
        (await response.json()) as StudioRequest[];

      setRequests(data);
    } catch (loadError) {
      console.error(loadError);

      setError(
        "Não foi possível carregar as solicitações.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadRequests]);

  async function updateStatus(
    requestId: number,
    status: StudioRequestStatus,
  ) {
    try {
      setUpdatingId(requestId);

      const response = await fetch(
        `/api/admin/requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível atualizar o status.",
        );
      }

      await loadRequests();
    } catch (updateError) {
      console.error(updateError);

      setError(
        "Não foi possível atualizar o status da solicitação.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <header className="border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Solicitações
          </h1>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
            Pedidos, reservas e interesses enviados pelo
            site.
          </p>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando solicitações...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="py-16 font-sans text-sm text-white/40">
            Nenhuma solicitação encontrada.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {requests.map((request) => {
            const relatedItem =
              getRelatedItem(request);

            return (
              <article
                key={request.id}
                className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-accent text-xs uppercase tracking-[0.12em] text-ayo-red">
                        Pedido #{request.id}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.08em] text-white/50">
                        {getTypeLabel(request.type)}
                      </span>
                    </div>

                    <h2 className="mt-4 font-title text-2xl">
                      {request.name}
                    </h2>

                    <div className="mt-4 space-y-1 font-sans text-sm text-white/55">
                      <p>
                        WhatsApp: {request.whatsapp}
                      </p>

                      <p>
                        E-mail: {request.email}
                      </p>

                      {request.instagram && (
                        <p>
                          Instagram:{" "}
                          {request.instagram}
                        </p>
                      )}

                      {request.professional && (
                        <p>
                          Profissional:{" "}
                          {request.professional.name}
                        </p>
                      )}

                      {relatedItem && (
                        <p>Item: {relatedItem}</p>
                      )}

                      <p>
                        Recebido em:{" "}
                        {formatDate(request.createdAt)}
                      </p>
                    </div>

                    {request.message && (
                      <div className="mt-5 max-w-3xl rounded-2xl border border-white/5 bg-black/30 p-4">
                        <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                          Mensagem
                        </p>

                        <p className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/65">
                          {request.message}
                        </p>
                      </div>
                    )}

                    <Link
                      href={`/admin/solicitacoes/${request.id}`}
                      className="mt-5 inline-flex rounded-full border border-ayo-red/50 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-ayo-red"
                    >
                      Ver detalhes
                    </Link>
                  </div>

                  <div className="w-full lg:w-64">
                    <RequestStatusSelect
                      requestId={request.id}
                      value={request.status}
                      disabled={
                        updatingId === request.id
                      }
                      onChange={updateStatus}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
